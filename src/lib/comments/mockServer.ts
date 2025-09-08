import type { BlogComment } from "@/lib/types/comments";

// Mock data for comments - deterministic for SSR
const mockComments: BlogComment[] = [
  {
    id: "comment-1",
    slug: "yalnizlar-icin-film-onerileri",
    body: "Bu film listesi gerçekten çok güzel! Özellikle 'Her' filmini çok beğendim. Yalnızlık temasını bu kadar güzel işleyen başka film yok.",
    author: {
      id: "user-1",
      displayName: "Ayşe K.",
      avatarUrl: "/images/poets/attila-ilhan.jpg",
    },
    createdAt: "2024-01-20T14:30:00Z",
    likeCount: 12,
    parentId: null,
  },
  {
    id: "comment-2",
    slug: "yalnizlar-icin-film-onerileri",
    body: "Lost in Translation'ı izledim, çok etkileyiciydi. Yalnızlık hissini çok güzel yansıtmış.",
    author: {
      id: "user-2",
      displayName: "Mehmet Y.",
      avatarUrl: "/images/poets/ozdemir-asaf.jpg",
    },
    createdAt: "2024-01-19T16:45:00Z",
    likeCount: 8,
    parentId: null,
  },
  {
    id: "comment-3",
    slug: "yalnizlar-icin-film-onerileri",
    body: "Evet, Lost in Translation gerçekten güzel bir film. Ben de çok beğenmiştim.",
    author: {
      id: "user-3",
      displayName: "Zeynep A.",
      avatarUrl: null,
    },
    createdAt: "2024-01-19T18:20:00Z",
    likeCount: 3,
    parentId: "comment-2",
  },
  {
    id: "comment-4",
    slug: "yalnizlar-icin-film-onerileri",
    body: "Manchester by the Sea'yi de eklemenizi öneririm. Çok güçlü bir yalnızlık hikayesi.",
    author: {
      id: "user-4",
      displayName: "Can S.",
      avatarUrl: "/images/poets/van-gogh.jpg",
    },
    createdAt: "2024-01-18T11:15:00Z",
    likeCount: 15,
    parentId: null,
  },
  {
    id: "comment-5",
    slug: "yalnizlar-icin-film-onerileri",
    body: "The Perks of Being a Wallflower'ı okumuştum ama filmi izlememiştim. Bu yazıdan sonra izleyeceğim.",
    author: {
      id: "user-5",
      displayName: "Elif M.",
      avatarUrl: null,
    },
    createdAt: "2024-01-17T09:30:00Z",
    likeCount: 6,
    parentId: null,
  },
  {
    id: "comment-6",
    slug: "yalnizlar-icin-film-onerileri",
    body: "Eternal Sunshine of the Spotless Mind'ı izledim ama çok karmaşık geldi bana. Tekrar izlemem gerek sanırım.",
    author: {
      id: "user-6",
      displayName: "Ahmet T.",
      avatarUrl: null,
    },
    createdAt: "2024-01-16T20:10:00Z",
    likeCount: 4,
    parentId: null,
  },
  {
    id: "comment-7",
    slug: "yalnizlar-icin-film-onerileri",
    body: "İkinci kez izlemenizi öneririm, gerçekten değerli bir film.",
    author: {
      id: "user-7",
      displayName: "Deniz K.",
      avatarUrl: null,
    },
    createdAt: "2024-01-16T21:45:00Z",
    likeCount: 2,
    parentId: "comment-6",
  },
];

export async function getInitialComments(
  slug: string,
  limit: number = 5,
): Promise<{ totalCount: number; comments: BlogComment[] }> {
  // Filter comments for the specific blog post
  const postComments = mockComments.filter((comment) => comment.slug === slug);

  // Sort by creation date (newest first)
  const sortedComments = postComments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Take the latest comments up to the limit
  const comments = sortedComments.slice(0, limit);

  return {
    totalCount: postComments.length,
    comments,
  };
}
