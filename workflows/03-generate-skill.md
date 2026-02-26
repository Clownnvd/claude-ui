# Workflow 03: Generate Skill from Implementation

## Objective
Package the completed implementation as a reusable skill.
Future sessions can clone any screen without scraping PageFlows again.

## Prerequisites
- Completed workflow 02 (implementation built, visual diffs ≥80%)
- `.tmp/[app]/manifest.json` and `component-map.json` exist
- `tools/generate_skill_refs.py` installed

## Step 1: Generate Reference Scaffold

```bash
python tools/generate_skill_refs.py \
  --app [app-name] \
  --component-map .tmp/[app]/component-map.json
```

Creates skeleton in `.claude/skills/[app]-ui/`:
- `SKILL.md` — auto-generated index
- `references/components/[name].md` — one per shared component
- `references/pages/[flow]/[screen].md` — one per screen

## Step 2: Fill Component References

For each `references/components/[name].md`:

1. Read the actual source file (`src/components/[app]/[name].tsx`)
2. Add:
   - Key props/interface
   - States (collapsed/expanded, hover, active)
   - Important Tailwind classes (non-obvious ones)
   - Known quirks / bugs fixed
3. **Do NOT** copy the full component — just link to the file:
   ```md
   **File:** `src/components/[app]/sidebar.tsx`
   ```
4. Link to 1-2 reference screenshots

**What goes in refs = things you can't read from the code:**
- Why a class was chosen (not just what it is)
- Bugs that were non-obvious
- Design decisions (e.g., "New chat is a nav row, NOT a button")

## Step 3: Fill Page References

For each `references/pages/[flow]/[screen].md`:
- Add layout structure (ASCII diagram if helpful)
- Link to screenshot: `**Screenshot:** screenshots/[app]/[flow]/01-[name].png`
- Note unique elements (not in shared components)
- Add any bugs/gotchas discovered

## Step 4: Write Design Tokens

Read `src/app/globals.css` → extract to `references/design-tokens.md`:

```md
| Token | Value | Usage |
|-------|-------|-------|
| Background | #... | Page background |
| Brand | #... | Primary accent |
| Border | #... | All borders |
```

Also add typography and spacing conventions.

## Step 5: Write Critical Rules Section in SKILL.md

The most valuable part. From the implementation, add the top bugs/mistakes:

```md
## Critical Rules

| Bug | Correct |
|-----|---------|
| [mistake made] | [correct approach] |
```

Minimum 5 rules. These come from your visual diff failures.

## Step 6: Validate Skill Size

- `SKILL.md` must be **< 150 lines** — pure index
- Each reference file must be **< 150 lines**
- If any file exceeds limit: split into sub-files

```bash
wc -l .claude/skills/[app]-ui/SKILL.md
wc -l .claude/skills/[app]-ui/references/**/*.md
```

## Step 7: Commit to GitHub

```bash
cd .claude/skills
git add [app]-ui/
git commit -m "feat: add [app]-ui skill (N flows, M screens)"
git push origin master
```

## Quality Checklist

- [ ] SKILL.md < 150 lines
- [ ] Each reference file < 150 lines
- [ ] All shared components have reference files
- [ ] Critical rules section has ≥5 entries
- [ ] `design-tokens.md` has complete color + typography table
- [ ] Screenshots referenced (path only, not embedded)
- [ ] Pushed to GitHub

## Expected Output

```
.claude/skills/[app]-ui/
  SKILL.md                    ← < 150 lines index
  references/
    design-tokens.md
    flows.md
    components/
      sidebar.md
      topbar.md
      ...
    pages/
      [flow]/
        [screen].md
```

## Reuse Pattern

Next time someone says "build [screen] of [app]":
1. Invoke `[app]-ui` skill
2. Read `references/pages/[flow]/[screen].md`
3. Read linked source file
4. Build immediately — no PageFlows scraping needed

## Self-Improvement Trigger

If a future session finds a bug or new screen:
1. Fix the component
2. Update the reference file
3. Add to Critical Rules if it was non-obvious
4. Commit to GitHub

The skill gets better with every project.
