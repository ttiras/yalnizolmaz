import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { contribTypeBySlug, getContributionTypeLabel } from "@/lib/contribConfig";
import CommentsClient from "@/components/interactions/comments/CommentsClient";
import { Heart, MessageCircle, Calendar, User, ExternalLink, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

type Params = { params: Promise<{ blogSlug: string; itemSlug: string }> };

export async function generateMetadata({ params }: Params) {
  const { blogSlug, itemSlug } = await params;
  return {
    title: `${itemSlug} | Sizden Gelenler`,
    description: `Topluluk katkısı: ${itemSlug}`,
  };
}

export default async function ContributionDetailPage({ params }: Params) {
  const { blogSlug, itemSlug } = await params;
  const type = contribTypeBySlug(blogSlug);
  if (type === "none") notFound();

  const graphqlUrl =
    process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL ||
    (process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN
      ? `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.nhost.run/v1/graphql`
      : null);

  if (!graphqlUrl) notFound();

  // First attempt: look up by external_id (string)
  const byExternalQuery = `
    query ByExternal($ext: String!, $type: contribution_types_enum!) {
      contributions(where: { _and: [{ type: { _eq: $type } }, { external_id: { _eq: $ext } }] }, limit: 1) {
        id external_id title year note type poster_url source_url created_at user { id displayName avatarUrl }
      }
    }
  `;
  const resp1 = await fetch(graphqlUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: byExternalQuery, variables: { ext: itemSlug, type } }),
  });
  const j1 = (await resp1.json()) as { data?: { contributions?: Array<ContributionGql> }; errors?: unknown };
  if (!resp1.ok || j1.errors) notFound();
  let c = j1.data?.contributions?.[0] || null;

  // Fallback: if not found and slug looks like a uuid, search by id
  if (!c && isUuid(itemSlug)) {
    const byIdQuery = `
      query ById($id: uuid!, $type: contribution_types_enum!) {
        contributions(where: { _and: [{ type: { _eq: $type } }, { id: { _eq: $id } }] }, limit: 1) {
          id external_id title year note type poster_url source_url created_at user { id displayName avatarUrl }
        }
      }
    `;
    const resp2 = await fetch(graphqlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: byIdQuery, variables: { id: itemSlug, type } }),
    });
    const j2 = (await resp2.json()) as { data?: { contributions?: Array<ContributionGql> }; errors?: unknown };
    if (!resp2.ok || j2.errors) notFound();
    c = j2.data?.contributions?.[0] || null;
  }

  if (!c) notFound();

  const displayYear = c.year ? ` (${c.year})` : "";
  const submittedBy = c.user?.displayName || "Anonim";
  const heroBg = c.poster_url
    ? `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.7)), url(${c.poster_url})`
    : undefined;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Beautiful Header - Keep Previous Design */}
      <section
        className="relative overflow-hidden border-b border-slate-200/60 dark:border-slate-700/60"
        style={{
          background: heroBg || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: heroBg ? "cover" : undefined,
          backgroundPosition: heroBg ? "center" : undefined,
        }}
      >
        {/* Elegant overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Subtle pattern overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-12">
          {/* Navigation */}
          <div className="mb-4">
            <Link
              href={`/sizden-gelenler/${blogSlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {getContributionTypeLabel(type)} listesine dön
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Poster/Image */}
            {c.poster_url && (
              <div className="relative h-[240px] w-[180px] overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/20 lg:sticky lg:top-8">
                <img
                  src={c.poster_url}
                  alt={c.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 space-y-4">
              {/* Title and Meta */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                  {c.title}
                  {displayYear && (
                    <span className="text-xl font-normal text-white/80 md:text-2xl lg:text-3xl">
                      {displayYear}
                    </span>
                  )}
                </h1>

                {/* Meta Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    <Heart className="h-3 w-3 text-red-300" />
                    {getContributionTypeLabel(type)}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    <Calendar className="h-3 w-3" />
                    {new Date(c.created_at).toLocaleDateString("tr-TR")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    <User className="h-3 w-3" />
                    {submittedBy}
                  </span>
                  {c.source_url && (
                    <a 
                      href={c.source_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Kaynağa git
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                  <Share2 className="h-3 w-3 mr-1" />
                  Paylaş
                </Button>
                <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                  <Bookmark className="h-3 w-3 mr-1" />
                  Kaydet
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Floating User Message Card - Extended Header Background */}
      <section className="relative -mt-6 z-10">
        <div className="mx-auto max-w-4xl px-4">
          {/* Beautiful Floating Message Card with Extended Header Background */}
          <div className="relative">
            {/* Extended Header Background */}
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: heroBg || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundSize: heroBg ? "cover" : undefined,
                backgroundPosition: heroBg ? "center" : undefined,
              }}
            >
              {/* Same overlays as header */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            
            {/* Main Message Card - Transparent with Extended Background */}
            <div className="relative bg-transparent backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              {/* Message Content */}
              <div className="relative px-6 py-6 z-10">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center ring-2 ring-white/30 flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-white">
                        {submittedBy}
                      </span>
                      <span className="text-xs text-white/70">
                        {new Date(c.created_at).toLocaleDateString("tr-TR")} {new Date(c.created_at).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <p className="text-white/90 whitespace-pre-wrap leading-relaxed text-sm font-medium">
                        {c.note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poem Content - Elegant Display */}
              {type === "poem" && (
                <div className="relative px-6 py-6 z-10 border-t border-white/20">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Şiir</h3>
                      <div className="w-16 h-px bg-white/40 mx-auto"></div>
                    </div>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <div className="text-white/95 text-center leading-relaxed text-base font-medium whitespace-pre-wrap italic">
                        {c.title}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interaction Footer */}
              <div className="relative border-t border-white/20 px-6 py-4 z-10">
                <div className="flex items-center justify-between">
                  {/* Interaction Icons */}
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-white/70 hover:text-red-400 transition-colors group">
                      <div className="p-1.5 rounded-full group-hover:bg-red-500/20 backdrop-blur-sm">
                        <Heart className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">0</span>
                    </button>
                    <div className="w-px h-6 bg-white/30"></div>
                    <button className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors group">
                      <div className="p-1.5 rounded-full group-hover:bg-blue-500/20 backdrop-blur-sm">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">0</span>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-white/50 hover:text-white/80 hover:bg-white/10 rounded-full transition-all backdrop-blur-sm">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-white/50 hover:text-white/80 hover:bg-white/10 rounded-full transition-all backdrop-blur-sm">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section - Full Width Ekşi Sözlük Style */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        {/* Comments Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Yorumlar
          </h2>
          <div className="w-full h-px bg-gray-200 dark:bg-slate-700"></div>
        </div>

        {/* Comments Content - Ekşi Sözlük Style */}
        <div className="space-y-0">
          <CommentsClient slug={`contrib:${blogSlug}:${c.id}`} totalCount={0} initialComments={[]} />
        </div>
      </section>
    </main>
  );
}

type ContributionGql = {
  id: string;
  external_id: string | null;
  title: string;
  year: number | null;
  note: string;
  type: "film" | "book" | "music" | "poem" | "quote";
  poster_url: string | null;
  source_url: string | null;
  created_at: string;
  user: { id: string; displayName: string | null; avatarUrl: string | null } | null;
};

function isUuid(v: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}
