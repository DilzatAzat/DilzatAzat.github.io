# AI Project Template

This is a small CPU-first project that demonstrates the course's engineering
boundaries. It has no model weights, secrets, network dependency, or required
GPU.

## Run it

```bash
python -m venv .venv
python -m pip install -e .
python scripts/check_env.py
python -m unittest discover -s tests
python scripts/check_project.py .
```

The last command prints stable JSON and exits non-zero when a required file or
the smoke test is missing. Keep `.env`, data, checkpoints, and build output
outside Git.

## Optional Docker path

```bash
docker build -t ai-project-template .
docker run --rm ai-project-template
docker compose up --build
```

The Compose file is an optional local HTTP preview. Visit
`http://localhost:8000/health` for `ok`. GPU access is not implied.

## Harness evidence

Start with `harness/task-contract.md`, record current work in
`harness/state.md`, and put independent findings in `harness/review.md`.
The roles in this template are a coordination pattern: use one agent for a
small task and split work only when the boundaries and evidence are clear.
