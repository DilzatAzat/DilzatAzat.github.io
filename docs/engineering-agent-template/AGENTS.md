# Project instructions

- Preserve the repository structure and user changes.
- Run `python -m unittest discover -s tests` and `python scripts/check_project.py .` after changes.
- Do not commit `.env`, secrets, datasets, checkpoints, model weights, or build output.
- Keep the CPU smoke path working when Docker, CUDA, or a remote server is unavailable.
- Record scope, evidence, and unresolved risks in `harness/` before declaring completion.
