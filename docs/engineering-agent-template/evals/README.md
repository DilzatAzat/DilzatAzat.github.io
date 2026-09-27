# Evaluation fixtures

Run the executable fixtures with:

```bash
python evals/run_evals.py
```

The checker should pass for the normal template. Add two disposable failure
fixtures when practicing:

1. Remove `AGENTS.md`; expected result: `has_agents_md` is false and `ok` is false.
2. Add a `.env` file; expected result: `git status` remains clean when the file
   is untracked and the ignore rule is present.

Keep the pass conditions observable. A prose claim that the project “looks
good” is not an eval. The runner also parses the checker JSON, so malformed
tool output becomes a failed evaluation rather than a silent pass.
