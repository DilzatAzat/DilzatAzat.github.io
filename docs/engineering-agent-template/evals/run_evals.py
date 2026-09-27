"""Run small, repeatable contract checks without third-party dependencies."""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def checker(root: Path) -> tuple[int, dict]:
    result = subprocess.run(
        [sys.executable, "scripts/check_project.py", str(root)],
        cwd=root,
        capture_output=True,
        text=True,
    )
    return result.returncode, json.loads(result.stdout)


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    normal_code, normal = checker(root)
    with tempfile.TemporaryDirectory() as directory:
        candidate = Path(directory) / "fixture"
        shutil.copytree(
            root,
            candidate,
            ignore=shutil.ignore_patterns(".venv", "__pycache__", "*.pyc", ".git"),
        )
        (candidate / "AGENTS.md").unlink()
        missing_code, missing = checker(candidate)

        (candidate / ".env").write_text("API_KEY=fixture\n", encoding="utf-8")
        subprocess.run(["git", "init", "-q"], cwd=candidate, check=True)
        ignored = subprocess.run(
            ["git", "check-ignore", "--no-index", ".env"],
            cwd=candidate,
            capture_output=True,
            text=True,
        ).returncode == 0
        status = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=candidate,
            capture_output=True,
            text=True,
        ).stdout.splitlines()
        clean_status = not any(line.strip().endswith(".env") for line in status)

    ignore_lines = (root / ".gitignore").read_text(encoding="utf-8").splitlines()
    result = {
        "ok": normal_code == 0 and normal["ok"] and missing_code != 0 and not missing["has_agents_md"] and ignored and clean_status and ".env" in ignore_lines,
        "normal_template": normal["ok"],
        "missing_agents_fixture": not missing["has_agents_md"] and missing_code != 0,
        "env_fixture_ignored": ignored and clean_status,
    }
    print(json.dumps(result, ensure_ascii=True, sort_keys=True))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
