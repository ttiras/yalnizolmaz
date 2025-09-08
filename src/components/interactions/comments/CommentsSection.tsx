import CommentsClient from "./CommentsClient";
import type { CommentsSectionProps, BlogComment } from "@/lib/types/comments";

// JSON-LD helper function for comments
function generateCommentsJsonLd(comments: BlogComment[], totalCount: number) {
  const commentElements = comments.slice(0, 3).map((comment) => ({
    "@type": "Comment",
    text: comment.body,
    dateCreated: comment.createdAt,
    author: {
      "@type": "Person",
      name: comment.author.displayName,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    commentCount: totalCount,
    comment: commentElements,
  };
}

export default function CommentsSection({
  slug,
  totalCount,
  initialComments,
  loggedIn = false,
}: CommentsSectionProps) {
  // Generate JSON-LD for SEO
  const jsonLd = generateCommentsJsonLd(initialComments, totalCount);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section id="yorumlar" className="mt-16 border-t border-gray-200 pt-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Yorumlar</h2>
            <p className="leading-relaxed text-gray-600">
              Bu yazı hakkındaki düşüncelerinizi paylaşın. Toplam {totalCount} yorum var.
            </p>
          </div>

          {/* Client-side interactive content */}
          <CommentsClient
            slug={slug}
            totalCount={totalCount}
            initialComments={initialComments}
            loggedIn={loggedIn}
          />
        </div>
      </section>
    </>
  );
}
