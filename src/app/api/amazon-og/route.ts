// app/api/amazon-og/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const u = searchParams.get("u");
    if (!u) return NextResponse.json({ error: "Missing ?u=" }, { status: 400 });

    // Güvenlik: yalnızca Amazon domain’lerine izin ver
    const url = new URL(u);
    if (!/\.amazon\.(com(\.tr)?|co\.uk|de|it|fr|es|nl|jp)$/i.test(url.hostname)) {
      return NextResponse.json({ error: "Unsupported domain" }, { status: 400 });
    }

    // Amazon bazı User-Agent’lerde görsel meta’yı döndürmüyor → desktop UA kullan
    const html = await fetch(url.toString(), {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36",
        "accept-language": "tr-TR,tr;q=0.9,en;q=0.8",
      },
      // Hafif cache
      next: { revalidate: 60 * 60 * 24 }, // 1 gün
    }).then((r) => r.text());

    // 1) og:image
    const og = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html);
    let img: string | undefined = og?.[1];

    // 2) Alternatif: sayfa JSON içi (hiRes/large)
    if (!img) {
      const hiRes = /"hiRes"\s*:\s*"([^"]+)"/.exec(html)?.[1];
      const large = /"large"\s*:\s*"([^"]+)"/.exec(html)?.[1];
      img = hiRes || large || undefined;
    }

    if (!img) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Görsel linkine yönlendir
    return NextResponse.redirect(img, {
      status: 302,
      headers: { "Cache-Control": "public, s-maxage=86400" },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to resolve image" }, { status: 500 });
  }
}
