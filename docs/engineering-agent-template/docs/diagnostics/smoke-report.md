# Smoke diagnostic report

This report is a reproducible evidence summary for the CPU path.

```text
command: python -m unittest discover -s tests
result: 1 test, OK
command: python scripts/check_project.py .
result: ok=true, smoke_passed=true, missing=[]
command: python scripts/check_env.py
result: interpreter and Python version printed
command: python evals/run_evals.py
result: normal, missing-AGENTS, and disposable .env fixtures passed
```

The report does not claim Docker, CUDA, SSH, or a remote server was tested.
