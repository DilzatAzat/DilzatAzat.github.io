"""Check the template contract and emit stable JSON for a harness or eval."""

from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path


REQUIRED = (
    "AGENTS.md",
    ".gitignore",
    "README.md",
    "pyproject.toml",
    "scripts/check_env.py",
    ".agents/skills/verify-project/SKILL.md",
    "harness/task-contract.md",
    "harness/state.md",
    "harness/review.md",
    "evals/README.md",
    "evals/run_evals.py",
)


def main(project_root: str = ".") -> int:
    root = Path(project_root).resolve()
    missing = [path for path in REQUIRED if not (root / path).is_file()]
    environment = dict(os.environ)
    environment["PYTHONPATH"] = str(root / "src")
    smoke = subprocess.run(
        [sys.executable, "-m", "unittest", "discover", "-s", "tests"],
        cwd=root,
        capture_output=True,
        text=True,
        env=environment,
    )
    result = {
        "ok": not missing and smoke.returncode == 0,
        "has_agents_md": (root / "AGENTS.md").is_file(),
        "has_gitignore": (root / ".gitignore").is_file(),
        "missing": missing,
        "smoke_passed": smoke.returncode == 0,
    }
    print(json.dumps(result, ensure_ascii=True, sort_keys=True))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    argument = sys.argv[1] if len(sys.argv) > 1 else "."
    raise SystemExit(main(argument))
