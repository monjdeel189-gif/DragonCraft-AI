# DragonCraft AI

Cyber-anime creative studio for forging brand identities, landing pages, and launch-ready worlds from one sharp idea.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/dragoncraft-ai/src/App.tsx` — presentation-first product surface and interactive demo state
- `artifacts/dragoncraft-ai/src/index.css` — DragonCraft theme tokens, glass/sunset utilities, and motion styles
- `artifacts/dragoncraft-ai/package.json` — web artifact scripts and frontend dependencies
- `artifacts/api-server` — shared API service scaffold, currently reserved for future persistence and auth routes

## Architecture decisions

- The first release is a presentation-first React/Vite experience; Supabase Auth is now connected while generation persistence and billing remain separate integration work.
- The interface keeps the two core workflows visible as separate realms: Dragon Logo Forge for identity and Dragon Web Architect for conversion surfaces.
- The initial interaction layer uses local React state for the forge, realm scanner, battle comparison, evolution story, gallery, voice-to-design demo, and assistant so every obvious click is meaningful without placeholder routes.

## Product

DragonCraft AI helps founders turn a rough idea into a distinctive brand world. The landing experience includes realm selection, logo and web builder entry points, voice-to-design, QR business card preview, Dragon Battle comparison, gallery lightbox, tiered access preview, Google sign-in mock, WhatsApp support, and a floating forge guide.

## User preferences

- Use DragonCraft AI / Dragon Realm Services naming, cyber-anime sunset styling, neon magenta/orange/purple/cream palette, and gamified dragon motifs.

## Gotchas

- Google OAuth is invoked through Supabase Auth from the browser. Enable the Google provider and add the preview/deployed callback URLs in Supabase Auth URL Configuration before testing sign-in outside the local preview.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
