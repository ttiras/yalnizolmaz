import Link from "next/link";

export function SupportCTA() {
  return (
    <div className="text-center text-white">
      <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/10 p-3">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h3 className="font-serif text-2xl font-medium">Yalnız Değilsiniz</h3>
      <p className="mt-3 text-lg text-white/80">
        Bugün ağır geliyorsa, sorun değil. Kendinize nazik davranın.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/blog"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/20"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Diğer Yazılar
        </Link>
        <Link
          href="/kaynaklar"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-all hover:bg-white/90"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Kaynaklar
        </Link>
      </div>
    </div>
  );
}
