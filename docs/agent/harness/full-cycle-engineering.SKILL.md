---
name: full-cycle-engineering
description: Run a bounded full engineering cycle for features, meaningful refactors, non-trivial bugfixes, and multi-file changes.
---

# Full-Cycle Engineering

## Trigger

Use for feature development, meaningful refactors, non-trivial bugfixes, and multi-file engineering work. Do not use for a one-line text change, trivial typo, or explanation-only request.

## Workflow

`Understand -> Plan / Explore -> Decide -> Implement -> Verify -> Review -> Repair -> Accept`

- Read requirements, repository guidance, Git status, relevant code, tests, and real commands first.
- For substantial uncertainty, run read-only Planner and built-in Explorer work in parallel. Boss chooses scope and acceptance criteria before implementation.
- Use the built-in Worker for implementation; do not run overlapping write workers. Preserve unrelated behavior and add regression tests for behavior changes.
- Verify with project commands that actually exist, then inspect the complete diff.
- Run a fresh, read-only Reviewer after substantial changes. Boss validates findings rather than accepting them mechanically.
- Repair high-confidence correctness, regression, security, acceptance, edge-case, data-integrity, and test findings. Run verification again; use at most two main repair cycles unless a safe extension is justified.

## Completion Gate

Accept only when acceptance criteria are met, verification was actually run, blocking reviewer findings are resolved, and the diff is scoped. Report unrun checks, residual risks, and blockers explicitly. Never delete or weaken tests or claim checks that did not run.
