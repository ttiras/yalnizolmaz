import Link from "next/link";

type ArticleHeaderProps = {
  title: string;
  description?: string;
  date: string;
  readingTimeMinutes?: number;
};

export function ArticleHeader({
  title,
  description,
  date,
  readingTimeMinutes,
}: ArticleHeaderProps) {
  const formatted = new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8">
      <nav className="mb-3 text-sm text-neutral-500">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
      </nav>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">{title}</h1>
      {description ? (
        <p className="mb-3 text-neutral-600 dark:text-neutral-400">{description}</p>
      ) : null}
      <p className="text-sm text-neutral-500">
        {formatted}
        {readingTimeMinutes ? (
          <span aria-hidden className="mx-1">
            •
          </span>
        ) : null}
        {readingTimeMinutes ? <span>{readingTimeMinutes} min read</span> : null}
      </p>
    </header>
  );
}
