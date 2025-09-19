# YalnızOlmaz · Cursor Guide (How we work with the repo)

This file tells Cursor exactly **how to help** on this codebase. Keep it at `docs/CURSOR_GUIDE.md`. When you start a new Cursor chat, **paste the “Quick Kickoff Prompt”** below so the agent follows our rules.

---

## 0) Project snapshot (stack & goals)

- **Framework:** Next.js 15 (App Router, RSC-first), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (no inline styles by default)
- **Routing:** Blog post route at `src/app/blog/[slug]/page.tsx`
- **Data (next):** Nhost/Hasura (GraphQL + subscriptions)
- **Auth (next):** Nhost Auth; secrets live server-side only (Route Handlers)
- **Testing (next):** Vitest + Testing Library + MSW; Playwright for e2e

**North Star:** fast, SEO-friendly content site with a path to community features (likes, accounts) and monetization (affiliate, digital products, membership) without heavy client JS.

---

## 1) Repo conventions & guardrails (Cursor must follow)

1. **RSC-first.** Server Components by default. Only use `"use client"` where interactive UI is required.
2. **Tailwind v4 only.** No CSS-in-JS, no inline styles for layout/typography unless justified.
3. **Aliases.** Use `@/` imports (configured via `tsconfig.json`).
4. **MDX rules.** Each `.mdx` file exports `metadata` and a default component. No YAML frontmatter.
5. **Dynamic imports caution.** **Do not** use template-literal `import("@/content/posts/${slug}.mdx")` at runtime. Build-time mapping is required (see §3).
6. **Secrets.** Never expose service/admin keys to the client. Use Route Handlers (`app/api/*`) or server actions.
7. **Accessibility.** Proper semantics (`<main>`, `<article>`, `<time>`), focus states, labels, color contrast.
8. **Performance.** Lean client bundles, minimal hydration, image optimization, stable CLS.
9. **Pagespeedinsisghts and vW3C validations.** Google PageSpeed Insights ve W3C validations must be perfect.

---

## 5) Next tasks Cursor can run (pick as needed)

**A. UI components (server-first)**

- `PostHeader` (title, description, author/date/readTime, category, tags)
- `PostCard` + `BlogFeed` (grid of posts with link to `/blog/[slug]`)
- `NewsletterCTA` (form markup only; action to be added later)

**B. Nhost/Hasura wiring (server-safe)**

- Add `lib/apollo.ts` with HTTP + `graphql-ws` split (server-safe)
- Route Handlers for mutations that require secrets; client uses those endpoints
- Example query + subscription with tests (Vitest + MSW)

**C. Testing**

- Vitest setup, Testing Library, MSW handlers for GraphQL
- Example unit + integration tests for `lib/mdx.ts` and a simple page

For each task, ask Cursor to propose a **plan + diff**, then implement.

---

## 6) Commands & scripts (suggested)

Add to `package.json` (Cursor can do it):

- `dev` – Next dev (Turbopack)
- `gen:posts` – run `scripts/generate-post-map.ts`
- `test` – Vitest

---

## 7) Security & quality checklist

- No secrets in client code; use Route Handlers for anything requiring tokens
- Hasura/Nhost roles enforced per operation (later work)
- a11y: labels, focus order, semantic HTML
- performance: minimal client components, stable container sizes, image dims set
- lint passes; type errors resolved

---

## 8) How to use this file

- Keep it in repo; update when conventions change
- When opening a fresh Cursor chat, paste §4 **Quick Kickoff Prompt**
- For new features, write a one-paragraph task with acceptance criteria and ask Cursor for a plan + diffs

That’s it — this guide keeps Cursor aligned with how we want the codebase to evolve. Copy it into `docs/CURSOR_GUIDE.md` now and kick off the first task (post map).

---

## 9) Environments & deploys

- **Branches → Vercel**
  - `develop` → **staging** at `https://yalnizolmaz.vercel.app/`
  - `main` → **production** (custom domain to be configured)
- **Vercel env mapping**
  - `VERCEL_ENV=development` → local dev
  - `VERCEL_ENV=preview` → staging/preview (used for `develop`)
  - `VERCEL_ENV=production` → production
- **Nhost configuration (web app)**
  - The Nhost client reads the following env vars (client-safe):
    - `NEXT_PUBLIC_NHOST_BACKEND_URL` → use for local/self-hosted
    - `NEXT_PUBLIC_NHOST_SUBDOMAIN` and `NEXT_PUBLIC_NHOST_REGION` → use for Nhost Cloud (staging/prod)
  - Local development:
    - Copy values from `/nhost/.env` into `/web/.env.local`:
      - `NEXT_PUBLIC_NHOST_BACKEND_URL=<from nhost .env>`
  - Staging (Vercel Preview for `develop`):
    - In Vercel Project → Settings → Environment Variables (Scope: Preview):
      - `NEXT_PUBLIC_NHOST_SUBDOMAIN=<from /nhost/.env.staging>`
      - `NEXT_PUBLIC_NHOST_REGION=<from /nhost/.env.staging>`
  - Production (Vercel Production for `main`):
    - In Vercel Project → Settings → Environment Variables (Scope: Production):
      - `NEXT_PUBLIC_NHOST_SUBDOMAIN=<prod values>`
      - `NEXT_PUBLIC_NHOST_REGION=<prod values>`
  - Secrets/admin keys must remain server-only and are not required for the public client.
  - The client automatically prefers `NEXT_PUBLIC_NHOST_BACKEND_URL` when present; otherwise it falls back to `NEXT_PUBLIC_NHOST_SUBDOMAIN` + `NEXT_PUBLIC_NHOST_REGION`.

  ## 2) Folder layout (expected)

```
src/
  app/
    blog/[slug]/page.tsx
    layout.tsx
  components/
    blog/…
    common/…
    interactions/…
  content/
    posts/
      <slug>.mdx
      …
    postMap.ts      ← generated (see §3)
  lib/
    mdx.ts          ← helpers to list/resolve posts via postMap
    apollo.ts       ← GraphQL client wiring (later)
  styles/
    globals.css

docs/
  CURSOR_GUIDE.md   ← this file
```

---

## 3) Posts mapping (critical)

**Why:** Next can’t statically analyze `import("…/${slug}.mdx")`. We generate a static map so builds can include all posts.

**What Cursor should create:** a tiny Node script `scripts/generate-post-map.ts` that scans `src/content/posts/*.mdx` and writes `src/content/postMap.ts` with static imports and an object like:

```ts
export const postMap = {
  'yalnizlik-sozleri': /* module ref */,
  // …other slugs
} as const
```

Then `lib/mdx.ts` exposes:

- `getAllPosts()` → iterate `postMap`, read `metadata`, return sorted list
- `getPostBySlug(slug)` → return `{ metadata, Content }` or `null`

And `app/blog/[slug]/page.tsx` does:

- `generateStaticParams()` from `Object.keys(postMap)`
- `generateMetadata()` from the selected module’s `metadata`
- Render `<Content />` inside a server component

> **Definition of Done:** No dynamic template-literal imports. Build succeeds with all posts; `/blog/[slug]` pages SSG correctly.

---

## 4) Quick Kickoff Prompt (paste this into a new Cursor chat)

> **Context:** You are assisting on a Next.js 15 + React 19 + Tailwind v4 app named YalnızOlmaz. Content is MDX under `src/blog/slug` with `metadata` and MDX Remote. RSC-first.


>App uses nhost as backend. Playwrite, shadcn and nhost mcp servers are running. If a component has to be client component then you need to use shadcn ui in that component. On graphql mutations where a user is needed, user_id is generated by hasura from x-hasura-user-id so don't send user_id in the query. All the ids, cerated and updated_at columns on db is auto generated. You don't need to include them in the mutations.  
> **Task:**
>
> 1. Create a login/signup page, using nhosts methods wired at yalnizolmaz/nhost.
> 2. Create an env file for local and add nhost endpoints to wire local nhost dev which is running. You can find the endpoints at yalnizolmaz/nhost/.env
> 3. Link users to login on navbar anf at places where login is needed like writing a comment or posting.
> 4. Use Shadcn UI where applicable.
>    **Acceptance criteria:**
>
> - No `import("@/content/posts/${slug}.mdx")` anywhere.
> - `pnpm gen:posts` produces `src/content/postMap.ts` deterministically.
> - Visiting `/blog/<existing-slug>` renders metadata + content.
> - Build works with SSG; dev server hot reloads after adding a new `.mdx` and re-running the generator.

---
