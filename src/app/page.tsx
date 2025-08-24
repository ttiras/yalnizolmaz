import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-soft flex min-h-dvh items-center justify-center p-8">
      <div className="container text-center">
        <h1 className="mb-3 text-4xl font-semibold tracking-tight">Yalnız Olmaz</h1>
        <p className="mx-auto mb-6 max-w-2xl text-neutral-600 dark:text-neutral-300">
          Yalnız yaşayanlar için yumuşak, sakin ve destekleyici yazılar. Bugün sadece bir sayfa
          okuyalım.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/blog" className="btn btn-primary">
            Bloga Git
          </Link>
          <Link href="/blog/yalnizlik-sozleri" className="btn">
            Yalnızlık sözleri
          </Link>
        </div>
      </div>
    </main>
  );
}
