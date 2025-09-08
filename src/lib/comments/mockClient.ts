import type { BlogComment } from "@/lib/types/comments";

// In-memory storage for client-side operations
let clientComments: BlogComment[] = [];
let nextCommentId = 1000; // Start from high number to avoid conflicts with server data

// Initialize with server data when needed
export function initializeClientComments(serverComments: BlogComment[]) {
  clientComments = [...serverComments];
}

export async function postComment(
  slug: string,
  body: string,
  parentId?: string,
): Promise<BlogComment> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newComment: BlogComment = {
    id: `comment-${nextCommentId++}`,
    slug,
    body,
    author: {
      id: "current-user",
      displayName: "Anonim Kullanıcı",
      avatarUrl: null,
    },
    createdAt: new Date().toISOString(),
    likeCount: 0,
    parentId: parentId || null,
  };

  // Add to in-memory storage
  clientComments.unshift(newComment); // Add to beginning (newest first)

  return newComment;
}

export async function fetchMoreComments(
  slug: string,
  afterId?: string,
  limit: number = 10,
): Promise<BlogComment[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filter comments for the specific blog post
  let postComments = clientComments.filter((comment) => comment.slug === slug);

  // If afterId is provided, get comments after that ID
  if (afterId) {
    const afterIndex = postComments.findIndex((comment) => comment.id === afterId);
    if (afterIndex !== -1) {
      postComments = postComments.slice(afterIndex + 1);
    }
  }

  // Sort by creation date (newest first)
  postComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Return up to the limit
  return postComments.slice(0, limit);
}

export async function toggleHelpful(commentId: string, nextLiked: boolean): Promise<{ ok: true }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Find and update the comment
  const commentIndex = clientComments.findIndex((comment) => comment.id === commentId);
  if (commentIndex !== -1) {
    clientComments[commentIndex].likeCount += nextLiked ? 1 : -1;
  }

  return { ok: true };
}
