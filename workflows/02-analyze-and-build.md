# Workflow 02: Analyze Screenshots and Build Implementation

## Objective
Analyze captured screenshots → identify shared components → build Next.js implementation.

## Prerequisites
- Completed workflow 01 (`manifest.json` + screenshots exist)
- Next.js project running (`pnpm dev`)
- Skills loaded: `nextjs`, `ultimateuiux`

## Phase A: Deduplication (DO THIS FIRST)

```bash
python tools/find_shared_components.py --manifest .tmp/[app]/manifest.json
```

Output: `.tmp/[app]/component-map.json`
```json
{
  "shared_components": { "sidebar": {...}, "topbar": {...} },
  "build_order": { "shared_first": ["sidebar", "topbar"], "then_screens": [...] }
}
```

**Read `component-map.json` before building anything.**
Build shared components first — they appear in every screen.

## Phase B: Extract Design Tokens

Run analyze_screen on 2-3 key screenshots:
```bash
python tools/analyze_screen.py --image screenshots/[app]/[flow]/01-[name].png
```

From the color output, create `src/app/globals.css` with `@theme` tokens:
```css
@theme inline {
  --color-background: #...; /* dominant color */
  --color-brand: #...;      /* accent color */
  --color-border: #...;     /* border color */
}
```

**Do not skip this step** — tokens used across all components.

## Phase C: Build Shared Components

Order from `component-map.json → shared_first`:

For each shared component:
1. Read ALL screenshots where it appears (Read tool reads images directly)
2. Identify: collapsed/expanded states, hover states, active items
3. Build `src/components/[app]/[component].tsx`
4. Start dev server and visual diff:
```bash
python tools/visual_diff.py \
  --original screenshots/[app]/[flow]/01.png \
  --url http://localhost:3000 \
  --output .tmp/[app]/diffs/[component].png
```
5. Target ≥80% match. Fix until passing.

**Component build order (typical):**
1. `layout.tsx` — app shell (sidebar + main)
2. `sidebar.tsx` — navigation
3. `topbar.tsx` — header bar
4. `chat-input.tsx` or equivalent input
5. Other shared elements

## Phase D: Build Each Screen

Process flows in `manifest.json` order:

For each screen:
1. Read the screenshot: `Read tool → screenshots/[app]/[flow]/[N]-[name].png`
2. Identify: layout structure, unique elements vs shared
3. Build `src/app/(clone)/[flow]/page.tsx`
4. Visual diff: `python tools/visual_diff.py --original [screen].png --url http://localhost:3000/[route]`

## Visual Validation Loop

```
visual_diff shows 65% match
  → Read both images (original + diff output)
  → Identify the specific region that differs
  → Fix the component
  → Re-run visual_diff
  → If ≥80%: pass, move on
  → Document what was wrong in component ref
```

## Edge Cases

| Situation | Approach |
|-----------|----------|
| Screen shows open dropdown/modal | Build default state first, note interaction |
| Component looks different across flows | Add props for variants, document all variants |
| Font rendering differs | Expected — focus on layout/spacing/colors, not fonts |
| Visual diff fails but looks correct | Use `--threshold 70` for font-heavy screens |
| Screen is full-page scroll | Screenshot `--full` already captures everything |

## Self-Improvement Loop
When visual diff shows wrong region:
1. Read both images (original + diff)
2. Fix the specific CSS/layout issue
3. Re-run diff
4. Add note to component ref: `Bug: [X], Fix: [Y]`

The note lives in the skill forever — prevents repeating the mistake.

## Expected Output
```
src/
  app/
    globals.css           ← Design tokens
    (clone)/
      layout.tsx          ← App shell
      [flow]/
        page.tsx          ← Each screen
  components/
    [app]/
      sidebar.tsx
      topbar.tsx
      ...
.tmp/[app]/
  component-map.json
  diffs/                  ← Visual diff outputs (review these)
```

## Next Step
```bash
python tools/generate_skill_refs.py --app [app] --component-map .tmp/[app]/component-map.json
```
Then: `workflows/03-generate-skill.md`
