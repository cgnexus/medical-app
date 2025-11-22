# Repository Guidelines

## Project Structure & Modules
- `src/app`: Next.js App Router routes, layouts, and API handlers.
- `src/components`: Reusable UI primitives; keep new components colocated with stories/examples when relevant.
- `src/lib` and `src/utils`: Server/helpers (data access, formatting, validation); prefer `@/` path alias from `tsconfig.json`.
- `src/generated/client`: Prisma client output; regenerate after schema changes.
- `prisma`: Database schema and migrations; update `schema.prisma` and run migrations here.
- `public`: Static assets served as-is. `tests`: Playwright E2E specs. `playwright-report` / `test-results`: generated artifacts (do not hand-edit).

## Build, Test, and Development Commands
```bash
pnpm dev      # Run the Next.js dev server on :3000
pnpm build    # Production build
pnpm start    # Start the built app
pnpm lint     # ESLint with Next Core Web Vitals rules
pnpm test     # Playwright E2E suite (spawns dev server from config)
```
Ensure `DATABASE_URL` is set for any Prisma-backed flows; use `pnpm prisma migrate dev` after schema edits.

## Coding Style & Naming Conventions
- TypeScript-first with strict mode; keep React components in PascalCase and hooks prefixed with `use`.
- Prefer `@/` absolute imports over relative ladders; co-locate component styles alongside component files.
- Tailwind CSS v4 classes live in JSX `className`; keep class lists readable and deduplicated with `tailwind-merge`.
- Default to 2-space indentation; run `pnpm lint` before committing to satisfy ESLint/Next rules.

## Testing Guidelines
- Playwright specs live in `tests/*.spec.ts`; follow descriptive file names (`upload.spec.ts` pattern).
- `pnpm test` runs chromium/firefox/webkit with HTML reporter; ensure port 3000 is free or adjust `playwright.config.ts`.
- For debugging, use `pnpm test -- --headed` or `pnpm test -- --project=chromium --debug`.
- Keep E2E steps deterministic (stable selectors, predictable seed data); update fixtures alongside UI changes.

## Commit & Pull Request Guidelines
- Use Conventional Commits as in history (`feat: ...`, `fix: ...`); keep messages imperative and scoped.
- Before opening a PR, include: brief summary, linked issue/ticket, screenshots for UI changes, and mention of tests/lint run.
- Avoid committing secrets; exclude local `.env` files and generated reports. If schema changes, note migration name and regeneration of `src/generated/client`.

## Security & Configuration Tips
- Store secrets only in `.env` (never commit); required keys include `DATABASE_URL` for Prisma/PostgreSQL connectivity.
- Run migrations and client generation locally before pushing to avoid drift: `pnpm prisma migrate dev && pnpm prisma generate`.
- When adding new upload or data-handling flows, validate inputs server-side and prefer centralized helpers in `src/lib`.
