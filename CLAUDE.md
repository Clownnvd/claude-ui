# Claude Code — CViet Project Instructions

## Project

**CViet** — AI-powered CV builder for the Vietnamese market.
- Target: Vietnamese job seekers, students graduating, bilingual (VI/EN) CVs
- Monetization: Polar subscriptions (Free → Pro $5/month)

## Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Node.js
- **Package manager**: pnpm (always use `pnpm`, never npm or yarn)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **React**: v19
- **Database**: Prisma 7 + Neon PostgreSQL
- **Auth**: Better Auth (email/password + Google OAuth)
- **Payments**: Polar (`@polar-sh/nextjs`, `@polar-sh/sdk`)
- **AI**: Anthropic SDK (claude-sonnet-4-6 for CV enhancement)
- **PDF Export**: `@react-pdf/renderer`

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm lint       # Lint
pnpm db:push    # Push Prisma schema
pnpm db:studio  # Open Prisma Studio
```

## Project Structure

```
src/
  app/
    page.tsx                    # Landing page
    layout.tsx                  # Root layout
    globals.css                 # Design tokens + base styles
    (auth)/
      login/page.tsx
      signup/page.tsx
    (app)/
      layout.tsx                # App shell (sidebar + main)
      dashboard/page.tsx        # CV list dashboard
      cv/
        new/page.tsx            # Create CV wizard
        [id]/page.tsx           # Edit CV
        [id]/preview/page.tsx   # Preview CV
      billing/page.tsx          # Polar billing
    api/
      auth/[...all]/route.ts
      ai/enhance/route.ts       # Claude AI endpoint
      export/[id]/route.ts      # PDF export
      polar/route.ts            # Polar webhooks
      polar/checkout/route.ts
  components/
    landing/
    cv/
    ui/
  lib/
    db.ts
    auth.ts
    auth-client.ts
    polar.ts
    claude.ts
prisma/
  schema.prisma
```

## Design System

| Token | Value |
|-------|-------|
| Background | `#FAFAF8` (warm white) |
| Surface | `#FFFFFF` |
| Brand | `#1B4FD8` (professional blue) |
| Accent | `#0EA5E9` (sky blue) |
| Success | `#10B981` (Pro badge) |
| Text primary | `#0F172A` |
| Text muted | `#64748B` |
| Border | `#E2E8F0` |
| CTA | `bg-[#1B4FD8] text-white` |
| Font | `Inter, system-ui` |

## Polar Plans

- **Free**: 1 CV, 1 basic template, 3 AI enhancements/month
- **Pro** ($5/month): Unlimited CVs, all templates, unlimited AI, bilingual export

## CV Data Type

```ts
type CVData = {
  personal: { name, email, phone, location, linkedin, website, summary }
  experience: Array<{ company, role, startDate, endDate, current, bullets: string[] }>
  education: Array<{ school, degree, field, startDate, endDate, gpa? }>
  skills: Array<{ category, items: string[] }>
  languages: Array<{ name, level }>
  certifications: Array<{ name, issuer, date, url? }>
}
```

## Coding Conventions

- Server Components by default; `"use client"` only when needed
- Tailwind arbitrary values for brand colors: `bg-[#1B4FD8]`
- All interactive elements: `cursor-pointer` + hover states
- Min touch target: 44x44px
- `transition-colors duration-200` for hover
- No emojis as icons — use lucide-react or SVG
- Server Actions for form mutations
- `use cache` for expensive queries

## Environment Variables

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
POLAR_ACCESS_TOKEN=
POLAR_WEBHOOK_SECRET=
POLAR_PRO_PRODUCT_ID=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
