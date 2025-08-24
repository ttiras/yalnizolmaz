## yalnizolmaz

Modern Next.js 15 app using TypeScript, Tailwind v4, Turbopack, pnpm, ESLint, Prettier, Husky + lint-staged, Vitest + Testing Library, and Playwright.

### Scripts

- `pnpm dev`: Start dev server (Turbopack)
- `pnpm build`: Production build
- `pnpm start`: Start production server
- `pnpm lint`: Lint code
- `pnpm type-check`: TypeScript type check
- `pnpm format`: Format with Prettier
- `pnpm test`: Run unit tests (Vitest)
- `pnpm test:ui`: Vitest UI
- `pnpm test:e2e`: Run Playwright tests

### Structure

- `src/` with App Router
- `@/*` import alias (rooted at `src/`)

### CI

GitHub Actions runs lint, type-check, build, unit, and e2e tests on pushes/PRs to `main`.
