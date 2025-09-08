import type { ContributionMovie } from "@/lib/types/contributions";

const seedRandom = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => (
    (h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)),
    (h >>> 0) / 2 ** 32
  );
};

export async function getInitialContributions(
  slug: string,
  limit = 6,
): Promise<{
  popular: ContributionMovie[];
  recent: ContributionMovie[];
}> {
  // Deterministic mock data per slug
  const rand = seedRandom(slug);
  const make = (i: number): ContributionMovie => {
    const id = `${slug}-${i}`;
    const year = 1990 + Math.floor(rand() * 30);
    return {
      id,
      title: `Topluluk Önerisi ${i + 1}`,
      year,
      posterUrl: null,
      sourceUrl: null,
      likeCount: Math.floor(rand() * 123),
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      submittedBy: { displayName: `Kullanıcı ${i + 1}`, avatarUrl: null },
    };
  };
  const items = Array.from({ length: Math.max(limit, 6) }, (_, i) => make(i));
  return { popular: items.slice(0, limit), recent: items.slice(0, limit) };
}
