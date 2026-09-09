# Codex Repository Guidance

This repository is Dilzat Azat's real GitHub Pages personal website. Treat it as a production site: preserve existing content and routes, protect the GitHub Pages deployment, and make incremental, reviewable changes.

## Working Rules

- Inspect existing patterns, layouts, collections, data files, and styles before inventing architecture.
- Keep the existing Jekyll architecture unless a migration is explicitly approved.
- Preserve existing content, URLs, and user-authored uncommitted changes. Never overwrite or discard them.
- Run the appropriate Jekyll build and available tests/checks after modifications.
- Keep learning documentation concise, technically accurate, and D2L-like. Never copy copyrighted textbook content.
- Do not publish, push, or deploy automatically. Never force-push, rewrite Git history, or delete branches.
- Before modifying files, run `git status` and inspect any overlapping changes.
- After each meaningful task, update `docs/agent/STATE.md` and append a concise result to `docs/agent/REVIEW_LOG.md`.
- Prefer a clean, reviewable diff. Local commits are allowed only when clearly safe and consistent with repository conventions.

## Verification

For every bounded task: inspect the diff and changed files, run the relevant build command (normally `bundle exec jekyll build`), run available tests/checks, check obvious links and routes, look for duplicated code, confirm existing behavior was not accidentally changed, and review the acceptance criteria. Fix findings and repeat verification before marking a task `DONE`.

## Stop Conditions

Stop autonomous progression and record the blocker in `STATE.md` when:

- a destructive migration appears necessary;
- existing user work would need to be overwritten or discarded;
- build failures cannot be resolved safely;
- requirements are materially ambiguous;
- secrets or credentials are required;
- Git history needs rewriting;
- deployment configuration would require a high-risk change.

When stopped, do not push or deploy. Leave the working tree recoverable and state what user decision or external change is needed.

## Resuming Work

At the beginning of every autonomous run, read `AGENTS.md`, `docs/agent/ROADMAP.md`, `docs/agent/STATE.md`, and `docs/agent/DECISIONS.md`. Work on one bounded roadmap task at a time. After a task is complete, reread the roadmap and continue with the highest-priority TODO whose dependencies are complete, while safe and unambiguous.
