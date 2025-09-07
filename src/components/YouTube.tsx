type YouTubeProps = {
  id?: string;
  url?: string;
  title?: string;
  start?: number;
  className?: string;
};

function extractYouTubeId(input: string): string | null {
  try {
    // If it's a bare ID (11 chars typical), return as-is
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      // Watch URLs: /watch?v=ID
      const v = url.searchParams.get("v");
      if (v) return v;
      // Shorts or embed or v path
      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => ["embed", "shorts", "v"].includes(p));
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }

    return null;
  } catch {
    return null;
  }
}

export function YouTube({ id, url, title, start, className }: YouTubeProps) {
  const resolvedId = id || (url ? extractYouTubeId(url) : null);
  if (!resolvedId) return null;

  let startParam = "";
  if (start && Number.isFinite(start) && start > 0) {
    startParam = `&start=${Math.floor(start)}`;
  } else if (url) {
    // Parse t query param like 1m30s or 90
    try {
      const u = new URL(url);
      const t = u.searchParams.get("t");
      if (t) {
        const match = /^((\d+)h)?((\d+)m)?((\d+)s)?$/.exec(t);
        if (match) {
          const hours = parseInt(match[2] || "0", 10);
          const minutes = parseInt(match[4] || "0", 10);
          const seconds = parseInt(match[6] || "0", 10);
          const total = hours * 3600 + minutes * 60 + seconds;
          if (total > 0) startParam = `&start=${total}`;
        } else if (/^\d+$/.test(t)) {
          startParam = `&start=${parseInt(t, 10)}`;
        }
      }
    } catch {
      // ignore
    }
  }

  const src = `https://www.youtube.com/embed/${resolvedId}?rel=0${startParam}`;

  return (
    <div className={className || "not-prose my-6"}>
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border shadow-sm"
        style={{ borderColor: "var(--border)" }}
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title || "YouTube video player"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default YouTube;
