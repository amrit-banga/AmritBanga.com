# Amrit Banga — Personal Portfolio

A clean, fast, fully responsive personal portfolio and website built with the latest Next.js stack.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2+ (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (New York style) |
| Dark mode | next-themes |
| Icons | lucide-react |
| Toasts | sonner |
| Fonts | Geist / Geist Mono (next/font) |
| Deploy | Vercel |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (ThemeProvider, Navbar, Footer)
│   ├── globals.css         # Tailwind v4 + CSS variables (shadcn/ui tokens)
│   ├── page.tsx            # / — Hero / home
│   ├── error.tsx           # Global error boundary
│   ├── loading.tsx         # Global loading skeleton
│   ├── not-found.tsx       # 404 page
│   ├── about/
│   │   └── page.tsx        # /about — Bio, skills, experience
│   ├── projects/
│   │   └── page.tsx        # /projects — Project grid
│   └── contact/
│       ├── page.tsx        # /contact — Contact page shell (Server)
│       ├── contact-form.tsx # Contact form (Client Component)
│       └── actions.ts      # Server action for form submission
├── components/
│   ├── Navbar.tsx          # Sticky navbar with mobile menu + dark toggle
│   ├── Footer.tsx          # Footer with social links
│   ├── theme-provider.tsx  # next-themes wrapper
│   └── ui/                 # shadcn/ui primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       └── separator.tsx
└── lib/
    └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local and fill in any keys (optional for now)
```

### 3. Run the dev server (Turbopack)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push to GitHub (or any Git provider)
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repository
4. Vercel auto-detects Next.js — just click **Deploy**
5. Add any environment variables in the Vercel dashboard under **Settings → Environment Variables**

## Customising Content

| What to change | Where |
|---|---|
| Bio text | `src/app/about/page.tsx` |
| Skills | `skillCategories` array in `about/page.tsx` |
| Work experience | `experience` array in `about/page.tsx` |
| Projects | `projects` array in `src/app/projects/page.tsx` |
| Hero tagline | `src/app/page.tsx` |
| Social links | `src/components/Navbar.tsx` and `src/components/Footer.tsx` |
| Brand colours | CSS variables in `src/app/globals.css` |
| Contact email | `src/app/contact/actions.ts` (swap console.log for Resend) |

## Adding Real Email (Resend)

1. `npm install resend`
2. Add `RESEND_API_KEY` and `CONTACT_EMAIL` to `.env.local`
3. Follow the `TODO` comment in `src/app/contact/actions.ts`

## Adding More shadcn/ui Components

```bash
npx shadcn@latest add accordion
npx shadcn@latest add dialog
# etc.
```
