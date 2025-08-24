import Link from "next/link";

type ArticleHeaderProps = {
  title: string;
  description?: string;
  date: string;
  readingTimeMinutes?: number;
  coverImage?: string;
};

export function ArticleHeader({
  title,
  description,
  date,
  readingTimeMinutes,
  coverImage,
}: ArticleHeaderProps) {
  const formatted = new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="relative text-center">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Blog&apos;a dön
        </Link>
      </nav>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          Duygusal Yaşam
        </span>
      </div>

      {/* Title */}
      <h1 className="heading-serif mb-6 text-4xl leading-tight font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-slate-100">
        {title}
      </h1>

      {/* Description */}
      {description ? (
        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-300">
          {description}
        </p>
      ) : null}

      {/* Meta Info */}
      <div className="mb-8 flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <time dateTime={date} className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatted}
        </time>
        {readingTimeMinutes ? (
          <>
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {readingTimeMinutes} dk okuma
            </span>
          </>
        ) : null}
      </div>

      {/* Cover Image */}
      {coverImage ? (
        <div className="relative mx-auto max-w-4xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt=""
            className="h-64 w-full rounded-2xl border border-slate-200 object-cover shadow-lg md:h-80 lg:h-96 dark:border-slate-700"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      ) : null}

      {/* Decorative Element */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
      </div>
    </header>
  );
}
