# Claude Code — Project Instructions

## Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Node.js
- **Package manager**: pnpm (always use `pnpm`, never npm or yarn)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **React**: v19

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm lint       # Lint
```

## Project Structure

```
src/
  app/
    page.tsx              # Login page
    layout.tsx            # Root layout
    globals.css           # Design tokens + base styles
    (chat)/
      layout.tsx          # App shell with sidebar
      new/page.tsx        # Home/chat page
      recents/page.tsx    # Chat history
      settings/page.tsx   # Settings tabs
  components/
    sidebar.tsx           # Collapsible sidebar
    chat-input.tsx        # Chat input component
```

## Design System — Claude-like UI

This project recreates the Claude.ai interface. Use these tokens:

| Token | Value |
|-------|-------|
| Background | `#F9F6F0` (warm cream) |
| Surface | `#FFFFFF` |
| Brand accent | `#C96A4A` (coral — logo, send btn, new chat) |
| Text primary | `#0F0F0F` |
| Text muted | `#6B6B6B` |
| Border | `#E0E0E0` |
| CTA buttons | `bg-black text-white` |
| Heading font | Georgia serif |
| Body font | system-ui sans-serif |

## Coding Conventions

- Use **Server Components** by default; add `"use client"` only when needed
- Use **Tailwind arbitrary values** for brand colors: `bg-[#F9F6F0]`, `text-[#C96A4A]`
- All interactive elements must have `cursor-pointer` and hover states
- Minimum touch target: 44×44px
- Use `transition-colors duration-200` for hover transitions
- Avoid emojis as icons — use lucide-react or inline SVGs

## WAT Framework (Workflows · Agent · Tools)

This project uses the WAT architecture for agentic UI clone tasks.

```
workflows/   ← Markdown SOPs — what to do and how
tools/       ← Python scripts — deterministic execution
.tmp/        ← Intermediate files (regeneratable, gitignored)
```

### Core workflow: Clone any app UI from PageFlows

```bash
# Step 1: Capture all screens
python tools/pageflows_capture.py --app [app-name]

# Step 2: Find shared components (sidebar, topbar, etc.)
python tools/find_shared_components.py --manifest .tmp/[app]/manifest.json

# Step 3: Analyze design tokens from a key screenshot
python tools/analyze_screen.py --image screenshots/[app]/[flow]/01-[name].png

# Step 4: Visual diff after building (target ≥80% match)
python tools/visual_diff.py --original screenshots/[app]/[flow]/01.png --url http://localhost:3000/[route]

# Step 5: Package as reusable skill
python tools/generate_skill_refs.py --app [app] --component-map .tmp/[app]/component-map.json
```

**Read workflows before starting any clone task:**
- `workflows/01-capture-app-ui.md` — PageFlows capture
- `workflows/02-analyze-and-build.md` — Deduplication + build order
- `workflows/03-generate-skill.md` — Package as skill

**Rules:**
- Always run `find_shared_components.py` BEFORE building — shared components first
- Target ≥80% visual diff match per screen
- Update workflow files when you learn new constraints or better approaches
- Install Python deps first: `pip install -r tools/requirements.txt`

## Skills

Skills are installed at `.claude/skills/` (git submodule → https://github.com/Clownnvd/claude-code-skills).

### Primary skills for this project
- **claude-ui** — Full Claude.ai UI clone spec (19 flows, all components, exact tokens)
- **ultimateuiux** — UI/UX design intelligence + Claude.ai blueprint
- **nextjs** — Next.js 16 App Router patterns

### Quality & audit skills
- **api** — API quality system (score / fix / loop)
- **auth** — Auth quality system
- **caching** — Caching quality system
- **database** — Database quality system (Prisma + Neon)
- **email** — Email quality system (Resend + React Email)
- **infrastructure** — CI/CD, Docker, monitoring
- **payment** — Payment quality system
- **security** — Security (OWASP Top 10)
- **stripe** — Stripe integration patterns

### Dev tooling skills
- **prisma-better-auth-nextjs** — Prisma 7 + Better Auth scaffold
- **react-doctor** — React issue detector (run after changes)
- **vercel-react-best-practices** — Performance optimization
- **agent-browser** — Browser automation CLI
