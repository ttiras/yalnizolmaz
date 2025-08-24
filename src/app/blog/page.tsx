import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const revalidate = 60;

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="text-lg font-medium hover:underline">
              {p.data.title}
            </Link>
            <p className="text-sm text-neutral-500">
              {new Date(p.data.date).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">{p.data.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
