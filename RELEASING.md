# Releasing PowerPilz

This document describes the **exact steps** to ship a new PowerPilz release so that HACS users get the new version automatically.

## TL;DR

```bash
# 1. Work on main — code, test, commit
git checkout main
# ... normal dev ...

# 2. Bump the version in TWO places
#    - package.json        ("version": "X.Y.Z")
#    - src/version.ts      (POWER_PILZ_VERSION)
# Commit the version bump.

# 3. Rebuild the committed HACS bundle so the tree stays reasonably fresh
npm run build:hacs
git add power-pilz.js
git commit -m "build: refresh HACS bundle for vX.Y.Z"

# 4. Push main
git push origin main

# 5. Fast-forward merge main to build — this triggers the release
git checkout build
git pull --ff-only          # guard: make sure build isn't ahead remotely
git merge main --ff-only
git push origin build
git checkout main
```

The **Production Release** GitHub Action then:

1. Reads the version from `package.json`
2. Checks that the tag `vX.Y.Z` doesn't already exist (fails hard if it does — bump first)
3. Runs `npm run build:hacs`
4. Creates the tag at the new `build` commit
5. Publishes a GitHub Release `vX.Y.Z`
6. Uploads `power-pilz.js` as a release asset

HACS users pick up the new release automatically (via `render_readme`/`content_in_root` discovery + the attached asset).

## Golden rules

1. **Never push directly to `build`.** Always work on `main`, then merge `main → build`. Anything committed directly on `build` creates divergence that later forces surgical merges.
2. **Always bump `package.json` AND `src/version.ts` in the same commit.** The Production Release workflow derives the tag from `package.json`. `src/version.ts` is what the card renders in the editor footer.
3. **Always use fast-forward merge for `main → build`.** `git merge main --ff-only`. If ff isn't possible, `build` has diverged — stop, investigate, pull, or rebase. Do not create merge commits on `build`.
4. **Commit the fresh HACS bundle before pushing main.** Run `npm run build:hacs` and commit `power-pilz.js`. The Validate CI does NOT enforce this (it would reject most day-to-day commits), but keeping the tree bundle reasonably fresh avoids surprises if someone installs via git clone instead of HACS.

## Full walkthrough

### 1. Code changes on main

Everything lives on `main`. Feature branches merge into `main` via PR (or direct push if you're the only maintainer). Each logical change is one commit with a clear message (`feat: …`, `fix: …`, `docs: …`, `chore: …`).

The **Validate** workflow runs on every push to main and every PR. It:
- Installs deps
- Type-checks (`npm run check`)
- Builds the HACS bundle (catches build-time errors)
- Validates HACS metadata (via `hacs/action@main`)

It does NOT verify that the committed `power-pilz.js` matches the build output. That check used to exist and kept failing on harmless source/bundle drift — it's gone now (HACS ships the release-asset bundle anyway).

### 2. Version bump commit

In a single commit:

```diff
# package.json
-  "version": "0.3.0",
+  "version": "0.4.0",
```

```diff
# src/version.ts
-export const POWER_PILZ_VERSION = "0.3.0";
+export const POWER_PILZ_VERSION = "0.4.0";
```

Commit message pattern: `release: bump version to X.Y.Z` — matches past history.

### 3. Refresh the committed bundle (optional but recommended)

```bash
npm run build:hacs
git add power-pilz.js
git commit -m "build: refresh HACS bundle for vX.Y.Z"
```

`build:hacs` runs `vite build` and then copies `dist/power-pilz.js` to the repo root (where `hacs.json` says the file lives).

### 4. Push main

```bash
git push origin main
```

Validate CI runs. It must be green before proceeding.

### 5. Release via build

```bash
git checkout build
git pull --ff-only
git merge main --ff-only
git push origin build
git checkout main
```

The **Production Release** workflow runs automatically on the `build` push. Watch it:

```bash
gh run watch
```

If the tag already exists (`Tag vX.Y.Z already exists`), you forgot to bump the version. Go back to step 2 with a higher version number.

### 6. Verify

```bash
gh release view vX.Y.Z
```

Should show:
- Tag `vX.Y.Z`
- Latest = true
- Asset `power-pilz.js`
- Auto-generated release notes (from commit messages since the previous tag)

Optionally, edit the release notes to add a human-written summary:

```bash
gh release edit vX.Y.Z --notes "$(cat release-notes.md)"
```

## Common problems

### "Tag vX.Y.Z already exists"

You pushed build without bumping the version. Fix:

```bash
# Bump versions in package.json + src/version.ts, commit
git push origin main
git checkout build
git merge main --ff-only
git push origin build
```

### build and main have diverged

Someone (maybe you from another machine) pushed directly to `build`. Don't force-push — you'd lose that change. Instead:

```bash
git checkout build
git pull
git checkout main
git merge build --no-edit   # pull the orphan change back into main
# resolve conflicts if any — usually prefer main's version fields
git push origin main
git checkout build
git merge main --ff-only
git push origin build
```

This is what happened during the v0.3.0 release: a v0.2.2-era commit on `build` never made it back to `main`. The merge reconciles the history.

### Validate fails on main push

Look at the CI log. The usual suspects are now (after the workflow cleanup):
- Type-check errors (`npm run check`)
- Build errors (`vite build`)
- HACS metadata validation (`hacs.json` shape)

The old "committed bundle is stale" failure mode is gone.

### Local build:hacs doesn't match the release

That's normal — the release workflow runs `npm ci` (clean install) and `npm run build:hacs` in a clean Ubuntu env. Your local workspace may have different node_modules. Only the release-asset bundle is what HACS users get.

## When in doubt

- **Something's red and I don't know why** → `gh run list --limit 5` and `gh run view <id> --log-failed`
- **I need to re-run the release** → bump to the next patch version, push main, merge to build, push build
- **I accidentally pushed v0.X.Y with a wrong build** → bump to v0.X.Y+1 and release again. Don't force-push tags.
