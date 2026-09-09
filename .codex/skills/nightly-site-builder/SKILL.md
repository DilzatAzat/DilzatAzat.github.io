---
name: nightly-site-builder
description: Safely continue bounded autonomous engineering tasks for this Jekyll GitHub Pages site using its persistent roadmap and state files.
metadata:
  short-description: Run the site's safe overnight engineering loop
---

# Nightly Site Builder

Use this skill for autonomous work on this repository. It is deliberately bounded: preserve the real personal site and stop when a decision or risky operation is required.

## Resume and Select

At the start of every run, read `AGENTS.md`, `docs/agent/ROADMAP.md`, `docs/agent/STATE.md`, and `docs/agent/DECISIONS.md`. Run `git status --short` and inspect overlapping user changes. Select the highest-priority `TODO` task whose dependencies are `DONE`; change only that task to `IN_PROGRESS` in the state/roadmap files. Never treat the entire roadmap as one task.

## Autonomous Loop

For one bounded task, execute this loop:

`READ STATE -> SELECT NEXT SAFE TASK -> PLAN -> IMPLEMENT -> BUILD / TEST -> SELF REVIEW -> FIX -> RE-RUN TESTS -> UPDATE STATE -> SELECT NEXT TASK`

Plan against the task's acceptance criteria, then implement incrementally using existing Jekyll, Liquid, Sass, data, and content patterns. After implementation:

1. Inspect `git diff` and every changed file.
2. Run `bundle exec jekyll build` (or the repository's documented equivalent) and available checks.
3. Check obvious links/routes, duplicated code, Jekyll/Liquid correctness, accessibility basics, responsive behavior, and accidental changes to existing routes.
4. Review as an independent engineer, fix findings immediately, and repeat the checks.
5. Mark the task `DONE` only when its acceptance criteria pass. Append meaningful findings to `docs/agent/REVIEW_LOG.md` and update `docs/agent/STATE.md` with the current phase, task, build result, problems, next task, and files in progress.

After marking a task done, reread `ROADMAP.md` and continue automatically while a safe, unambiguous task remains. Do not ask for confirmation after each successful task.

## Safety Boundaries

Apply all rules in `AGENTS.md`. Stop and mark `BLOCKED` if a destructive migration, overwrite of user work, unresolved build failure, material ambiguity, secret/credential, Git history rewrite, or high-risk deployment change is encountered. Do not push, force-push, deploy, delete branches, or rewrite history during overnight work.

Keep learning content concise, original, technically accurate, and D2L-like. Do not generate every lesson in one pass or copy copyrighted textbook content.
