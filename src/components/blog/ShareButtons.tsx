"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type ShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
  size?: "sm" | "md";
};

export function ShareButtons({ url, title, className, size = "md" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const itemClass = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const iconClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  const encoded = useMemo(
    () => ({
      url: encodeURIComponent(url),
      title: encodeURIComponent(title),
      text: encodeURIComponent(`${title} ${url}`),
    }),
    [url, title],
  );

  const links = {
    twitter: `https://twitter.com/intent/tweet?text=${encoded.title}&url=${encoded.url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
    whatsapp: `https://wa.me/?text=${encoded.text}`,
    email: `mailto:?subject=${encoded.title}&body=${encoded.url}`,
  } as const;

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [url]);

  const onWebShare = useCallback(async () => {
    if (
      typeof navigator !== "undefined" &&
      (navigator as Navigator & { share?: (data: { title: string; url: string }) => Promise<void> })
        .share
    ) {
      try {
        await (
          navigator as Navigator & {
            share: (data: { title: string; url: string }) => Promise<void>;
          }
        ).share({ title, url });
      } catch {}
    } else {
      onCopy();
    }
  }, [title, url, onCopy]);

  return (
    <div className={`${className ?? ""} flex w-full justify-center px-4 sm:px-0`}>
      <div className="relative inline-flex">
        <div
          className="inline-flex items-center gap-3 rounded-2xl border px-3 py-2 shadow-sm backdrop-blur-xl"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
        >
          <span className="pl-1 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
            Paylaş
          </span>

          <Button
            type="button"
            onClick={onWebShare}
            aria-label="Paylaş (cihaz)"
            variant="outline"
            className={`group relative rounded-full ${itemClass}`}
            title="Cihazda paylaş"
          >
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 6l-4-4-4 4M12 2v14" />
            </svg>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white/90 dark:text-black">
              Cihazda paylaş
            </span>
          </Button>

          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) ile paylaş"
            className={`group relative inline-flex items-center justify-center rounded-full ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:bg-[#111111] hover:text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#111111]/60 focus-visible:ring-offset-2 dark:ring-black/30 ${itemClass}`}
            style={{ color: "var(--foreground)", backgroundColor: "var(--card)" }}
          >
            <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18 2h-2l-4 5-4-5H6l5.5 7.1L6 22h2l4.5-6 4 6H20l-6.1-8.2L18 2z"
              />
            </svg>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              X (Twitter)
            </span>
          </a>

          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook'ta paylaş"
            className={`group relative inline-flex items-center justify-center rounded-full ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:bg-[#1877F2] hover:text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#1877F2]/60 focus-visible:ring-offset-2 dark:ring-black/30 ${itemClass}`}
            style={{ color: "var(--foreground)", backgroundColor: "var(--card)" }}
          >
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12.06C22 6.503 17.523 2 12 2S2 6.503 2 12.06C2 17.08 5.657 21.2 10.438 22v-7.024H7.898v-2.916h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.47h-1.26c-1.243 0-1.63.776-1.63 1.57v1.88h2.773l-.443 2.916h-2.33V22C18.343 21.2 22 17.08 22 12.06z" />
            </svg>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              Facebook
            </span>
          </a>

          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn'de paylaş"
            className={`group relative inline-flex items-center justify-center rounded-full ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:bg-[#0A66C2] hover:text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#0A66C2]/60 focus-visible:ring-offset-2 dark:ring-black/30 ${itemClass}`}
            style={{ color: "var(--foreground)", backgroundColor: "var(--card)" }}
          >
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.8v2h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.14V23h-4v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.68-2.49 3.42V23h-4V8.5z" />
            </svg>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              LinkedIn
            </span>
          </a>

          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile paylaş"
            className={`group relative inline-flex items-center justify-center rounded-full ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 dark:ring-black/30 ${itemClass}`}
            style={{ color: "var(--foreground)", backgroundColor: "var(--card)" }}
          >
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163A11.867 11.867 0 0111.9 0C18.6 0 24 5.373 24 12s-5.4 12-12.1 12c-2.07 0-4.042-.515-5.788-1.487L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.269 1.593 5.448.003 9.89-4.43 9.894-9.88.003-5.45-4.43-9.89-9.88-9.894-5.45-.003-9.89 4.43-9.894 9.88-.002 2.225.651 3.891 1.746 5.634L2.2 21.8l4.454-1.607zM17.52 14.29c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.966-.272-.099-.47-.149-.669.149-.198.297-.768.966-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.253-.461-2.386-1.47-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.61-.916-2.206-.242-.58-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.718 2.007-1.412.248-.694.248-1.289.173-1.413z" />
            </svg>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              WhatsApp
            </span>
          </a>

          <a
            href={links.email}
            aria-label="E-posta ile paylaş"
            className={`group relative inline-flex items-center justify-center rounded-full ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:bg-[#111827] hover:text-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 dark:ring-black/30 ${itemClass}`}
            style={{ color: "var(--foreground)", backgroundColor: "var(--card)" }}
          >
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 8l-10 6L2 8" />
            </svg>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              E-posta
            </span>
          </a>

          <Button
            type="button"
            onClick={onCopy}
            aria-label="Bağlantıyı kopyala"
            variant="outline"
            className={`group relative rounded-full ${itemClass}`}
            title={copied ? "Kopyalandı" : "Bağlantıyı kopyala"}
          >
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {copied ? "Kopyalandı" : "Kopyala"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
