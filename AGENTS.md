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

## Engineering Harness

- Treat the main Codex thread as Boss/Lead Agent. For non-trivial work, use the smallest useful cycle: Understand -> Plan/Explore -> Decide -> Implement -> Verify -> Independent Review -> Repair -> Accept.
- Use read-only Planner/Explorer agents to reduce uncertainty and one write-capable Coder for overlapping files; parallelize only independent work.
- Use a fresh read-only Reviewer for substantial changes. Boss validates findings and repairs high-confidence correctness, regression, security, acceptance, edge-case, data-integrity, and test issues before acceptance.
- Keep changes scoped, preserve unrelated behavior and user work, run only real project checks, inspect the diff, and never claim verification that was not run.
- Do not delete or weaken tests, hide errors with broad exception handling, add dependencies without a clear reason, publish/deploy, or rewrite history. Stop and record blockers when safe completion is not possible.
## Orchestration Details

For non-trivial tasks, follow:

`UNDERSTAND -> PLAN + EXPLORE -> DECIDE -> IMPLEMENT -> VERIFY -> FRESH REVIEW -> REPAIR -> FINAL ACCEPTANCE`

- The main thread is Boss/Lead and makes final scope, finding, and acceptance decisions.
- Planner and Explorer may run in parallel; prefer the built-in Explorer for repository tracing.
- Prefer the built-in Worker for implementation. Do not run multiple workers against overlapping files.
- After substantial changes, use a fresh, read-only Reviewer. Repair high-confidence findings before delivery, with no more than two main review-repair cycles unless a safe extension is justified.
- Trivial tasks may be handled directly without starting a team.
