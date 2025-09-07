import fs from "node:fs";
import path from "node:path";

const WEB_ROOT = "/Users/tacettintiras/Documents/yalnizolmaz/web";
const MDX_FILE = path.join(
  WEB_ROOT,
  "src/content/blog/yalnizken-iyi-gelen-kitaplar.mdx",
);
const OUTPUT_DIR = path.join(WEB_ROOT, "public/images/books");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36";

/**
 * Extract Amazon product image URL from product page HTML
 */
function extractImageUrlFromHtml(html) {
  const og = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(
    html,
  );
  if (og?.[1]) return og[1];

  const hiRes = /"hiRes"\s*:\s*"([^"]+)"/.exec(html)?.[1];
  const large = /"large"\s*:\s*"([^"]+)"/.exec(html)?.[1];
  return hiRes || large || undefined;
}

function inferExtensionFromContentType(contentType) {
  if (!contentType) return "jpg";
  if (contentType.includes("image/webp")) return "webp";
  if (contentType.includes("image/png")) return "png";
  if (contentType.includes("image/jpeg")) return "jpg";
  return "jpg";
}

function toSafeFilename(base) {
  return base
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getProductCodeFromUrl(u) {
  try {
    const url = new URL(u);
    const dp = /\/dp\/([A-Z0-9]+)/i.exec(url.pathname)?.[1];
    if (dp) return dp;
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || "urun";
  } catch {
    return "urun";
  }
}

async function fetchAmazonImage(productUrl) {
  const pageRes = await fetch(productUrl, {
    headers: {
      "user-agent": USER_AGENT,
      "accept-language": "tr-TR,tr;q=0.9,en;q=0.8",
    },
  });
  if (!pageRes.ok) {
    throw new Error(`Failed to fetch product page: ${pageRes.status}`);
  }
  const html = await pageRes.text();
  const imageUrl = extractImageUrlFromHtml(html);
  if (!imageUrl) throw new Error("Image URL not found in page");

  const imgRes = await fetch(imageUrl, {
    headers: { "user-agent": USER_AGENT },
  });
  if (!imgRes.ok) {
    throw new Error(`Failed to fetch image: ${imgRes.status}`);
  }
  const arrayBuffer = await imgRes.arrayBuffer();
  const contentType = imgRes.headers.get("content-type") || "image/jpeg";
  const ext = inferExtensionFromContentType(contentType);
  return { buffer: Buffer.from(arrayBuffer), ext, imageUrl };
}

async function main() {
  if (!fs.existsSync(MDX_FILE)) {
    console.error("MDX file not found:", MDX_FILE);
    process.exit(1);
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const mdx = fs.readFileSync(MDX_FILE, "utf8");

  const regex = /src="\/api\/amazon-og\?u=([^"]+)"/g;
  const matches = Array.from(mdx.matchAll(regex));
  if (matches.length === 0) {
    console.log("No amazon-og image references found. Nothing to do.");
    return;
  }

  const mapping = new Map();

  for (const m of matches) {
    const encoded = m[1];
    if (mapping.has(encoded)) continue;
    const productUrl = decodeURIComponent(encoded);
    const code = getProductCodeFromUrl(productUrl);
    const fileBase = toSafeFilename(code);

    try {
      console.log("→ Processing:", productUrl);
      const { buffer, ext } = await fetchAmazonImage(productUrl);
      const filename = `${fileBase}.${ext}`;
      const filePath = path.join(OUTPUT_DIR, filename);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, buffer);
        console.log("  Saved:", filePath);
      } else {
        console.log("  Skipped (exists):", filePath);
      }

      mapping.set(encoded, `/images/books/${filename}`);
    } catch (err) {
      console.error("  Failed:", err?.message || err);
    }
  }

  let updated = mdx;
  for (const [encoded, localPath] of mapping) {
    const needle = `src="/api/amazon-og?u=${encoded}"`;
    const replacement = `src="${localPath}"`;
    updated = updated.split(needle).join(replacement);
  }

  if (updated !== mdx) {
    fs.writeFileSync(MDX_FILE, updated);
    console.log("Updated MDX with local image paths:", MDX_FILE);
  } else {
    console.log("No changes made to MDX (paths likely already local).");
  }
}

await main();


