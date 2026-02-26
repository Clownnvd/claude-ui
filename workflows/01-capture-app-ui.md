# Workflow 01: Capture App UI from PageFlows

## Objective
Capture all screens for a target app from PageFlows.
Output: `screenshots/[app]/` + `.tmp/[app]/manifest.json`

## Prerequisites
- `agent-browser` installed and in PATH
- `pageflows-auth.json` in project root (login session)
- Python 3.x + `pip install -r tools/requirements.txt`

## Tool
```bash
python tools/pageflows_capture.py --app [app-name]
# With specific flows:
python tools/pageflows_capture.py --app [app-name] --flows "onboarding,settings,login"
```

## Steps

### Step 1: Verify auth
Check `pageflows-auth.json` exists. If missing or expired:
```bash
agent-browser --headed open https://pageflows.com
# Login manually, then:
agent-browser state save pageflows-auth.json
```

### Step 2: Discover flows
The tool auto-discovers flows via PageFlows search.
If auto-discovery fails — navigate manually to find flow slugs:
```
https://pageflows.com/search/?q=[app-name]
```
Then pass them explicitly: `--flows "flow1,flow2,flow3"`

### Step 3: Run capture
```bash
python tools/pageflows_capture.py --app [app-name]
```
Tool will:
1. Load auth session
2. Discover all flows
3. For each flow: extract screen URLs via `eval + data-url`
4. Screenshot each screen to `screenshots/[app]/[flow]/[N]-[name].png`
5. Save `manifest.json`

### Step 4: Verify output
```
screenshots/[app]/
  [flow-1]/
    01-[screen].png
    02-[screen].png
  [flow-2]/
    ...
.tmp/[app]/
  manifest.json
```
Open a few screenshots with the Read tool to confirm they captured correctly.

## Edge Cases

| Problem | Fix |
|---------|-----|
| Screenshots look like login page | Re-auth: delete `pageflows-auth.json`, re-login |
| Auto-discovery finds 0 flows | Use `--flows` with manual slugs |
| App not found | Check exact slug at `pageflows.com/search/?q=[name]` |
| Blank/loading screenshots | Add `--wait 3000` flag (slower but safer) |
| Some screens timeout | Tool continues — check manifest for missing entries |

## Lessons Learned
- PageFlows click interactions timeout → use `eval + data-url` extraction (already in tool)
- Screen images are 1920×1080 JPG — full resolution, no auth required once URL known
- Keep browser session alive during capture — don't close between flows
- Auth session expires after ~1 day — re-authenticate if screenshots look wrong

## Next Step
```bash
python tools/find_shared_components.py --manifest .tmp/[app]/manifest.json
```
Then: `workflows/02-analyze-and-build.md`
