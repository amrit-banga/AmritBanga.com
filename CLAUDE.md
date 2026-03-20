# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Run production server
npm run lint         # ESLint
npm run type-check   # TypeScript check (no emit)
```

No test framework is configured.

## Architecture

**Next.js 16 App Router** portfolio site using React 19, Tailwind CSS v4, and shadcn/ui.

### Server vs. Client Components

Pages and layouts default to Server Components. Client Components are explicitly marked with `"use client"` and include:
- `Navbar.tsx` — scroll detection, theme toggle, mobile menu state
- `contact/contact-form.tsx` — form with `useActionState` (React 19)
- `theme-provider.tsx` — wraps `next-themes`
- `error.tsx` — error boundary

### Contact Form Flow

`contact-form.tsx` (client) → `contact/actions.ts` (Server Action) → returns `{ status: "success" | "error" | "idle", message? }`. The Server Action currently logs to console; Resend email integration is stubbed out and requires `RESEND_API_KEY` in `.env.local`.

### Styling

Tailwind CSS v4 uses a CSS-first config (`globals.css`) rather than `tailwind.config.js`. All color tokens are OKLCH CSS custom properties defined in `globals.css`. Dark mode is implemented via `next-themes` with `attribute="class"`. Custom utilities `.gradient-text` and `.hero-glow` are defined at the bottom of `globals.css`.

### UI Components

shadcn/ui components live in `src/components/ui/`. Add new ones with:
```bash
npx shadcn@latest add <component>
```
The `cn()` utility in `src/lib/utils.ts` merges Tailwind classes via `clsx` + `tailwind-merge`.

### Content

Page content (skills, experience, projects) is stored as static arrays directly in the page components (`about/page.tsx`, `projects/page.tsx`). There is no CMS or database.

### Environment Variables

See `.env.local.example`. Only `RESEND_API_KEY` (or `FORMSPREE_ID`) is needed, and only for contact form email delivery.

### Path Alias

`@/*` maps to `./src/*` — use this for all internal imports.
