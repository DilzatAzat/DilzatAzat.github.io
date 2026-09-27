## Engineering Harness

Codex's main thread is the Boss/Lead Agent. For non-trivial engineering work, run the smallest useful full cycle:

`Understand -> Plan/Explore -> Decide -> Implement -> Verify -> Independent Review -> Repair -> Accept`

- Inspect the repository, instructions, and Git status before editing.
- Plan first for non-trivial work; use read-only Planner/Explorer agents when they reduce uncertainty.
- Prefer evidence and root-cause fixes over assumptions or broad refactors.
- Keep changes scoped and preserve unrelated behavior, routes, data, and user changes.
- Use one write-capable Coder at a time for overlapping files; parallelize only independent work.
- Verify with commands that actually exist in the project, then inspect the diff.
- Use a fresh, read-only Reviewer for substantial changes. Treat findings as input to Boss acceptance, not automatic truth.
- Repair high-confidence correctness, regression, security, acceptance, edge-case, data-integrity, or test findings; run verification again. Limit the main review/repair loop to two cycles.
- Do not delete or weaken tests, hide errors with broad exception handling, add dependencies without a clear reason, or claim checks that were not run.
- Prefer official documentation when API/config behavior is uncertain.
- Stop and report blockers when safe completion would require destructive migration, discarding user work, credentials, history rewriting, deployment, or unresolved build failure.

For trivial tasks, work directly. For substantial tasks, finish only after Boss checks requirements, acceptance criteria, verification results, review findings, scope, and remaining risks.
## Orchestration Details

For non-trivial tasks, follow:

`UNDERSTAND -> PLAN + EXPLORE -> DECIDE -> IMPLEMENT -> VERIFY -> FRESH REVIEW -> REPAIR -> FINAL ACCEPTANCE`

- The main thread is Boss/Lead and makes the final scope, finding, and acceptance decisions.
- Planner and Explorer may run in parallel; prefer the built-in Explorer for repository tracing.
- Prefer the built-in Worker for implementation. Do not run multiple workers against overlapping files.
- After substantial changes, use a fresh, read-only Reviewer. Repair high-confidence findings before delivery, with no more than two main review-repair cycles unless a safe extension is justified.
- Trivial tasks may be handled directly without starting a team.
