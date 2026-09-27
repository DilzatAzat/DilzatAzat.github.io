---
name: verify-project
description: Verify the CPU smoke path and project contract before delivery.
---

# Verify project

1. Run `python -m unittest discover -s tests`.
2. Run `python scripts/check_project.py .` and inspect its JSON.
3. Review `git status` and record the result in `harness/review.md`.

Stop when a check fails. Do not hide failures by changing the checker or
removing the failing fixture.
