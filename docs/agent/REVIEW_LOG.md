# Review Log

## 2026-09-08 - Harness setup

- Added repository operating rules, stop conditions, persistent state files, and the `nightly-site-builder` skill.
- Confirmed pre-existing uncommitted Learn/site changes are recorded as a known problem and were not overwritten.
- Build verification for the harness is pending; run the normal Jekyll build before the next implementation task.

## 2026-09-08 - Verification

- `quick_validate.py .codex/skills/nightly-site-builder` passed.
- `bundle exec jekyll build` failed in the pre-existing `assets/css/main.scss` change: missing Sass import `layout/learning`.
- Per stop conditions, no attempt was made to overwrite or repair the overlapping user Learn implementation; the failure is recorded in `STATE.md` for the architecture audit.

## 2026-09-08 - Verification rerun

- The current tree included the previously missing user-created `_sass/layout/_learning.scss` and `assets/js/learning.js` files.
- `bundle exec jekyll build` then passed successfully (Jekyll 3.9.0); only environment warnings were emitted.
- The harness remains limited to setup; the next recommended roadmap task is P0-1.

## 2026-09-09 - Architecture audit and course IA

- Confirmed the site remains Academic Pages/Jekyll with `_learning` as an output collection at `/learn/:path/`; existing collections, GitHub Pages configuration, and Learn navigation remain intact.
- Replaced the 64-entry provisional curriculum with a data-driven 25-lesson structure across Modules 0-6. The three existing routes remain `/learn/python/course-guide/`, `/learn/python/variables/`, and `/learn/python/lists/`.
- Updated lesson numbering metadata and replaced progress-count hardcoding with `site.data.python_course.total_lessons` plus a DOM-derived JS fallback.
- Verification: YAML count check reported `25` configured and `25` listed lessons; `node --check assets/js/learning.js` passed; `bundle exec jekyll build` passed with only existing environment warnings.
- Review finding: only three lesson pages are currently published; remaining curriculum entries intentionally stay planned until their original Chinese lesson content is implemented.

## 2026-09-09 - Infrastructure and Module 0 verification

- Revalidated the data-driven progress total after the 25-lesson restructure; course home and lesson shell now report `0 / 25`, and JS derives the total from the data attribute with a DOM fallback.
- Fixed completion-button label targeting so the completed state preserves its check icon instead of replacing the first decorative span.
- Desktop review at 1280px showed the full curriculum and no horizontal overflow. Mobile review at 390px showed the collapsed course navigation, hidden desktop sidebar, and no horizontal overflow.
- Added the original Chinese `01` environment/workflow lesson covering terminal execution, venv, pip, VS Code, Jupyter, exercises, and D2L context. Build and route checks passed; the new lesson's next link resolves to the existing variables lesson.

## 2026-09-09 - Module 1 lesson implementation

- Added original Chinese lessons for strings, dictionaries/sets, and indexing/slicing; connected the existing variables and lists lessons into the new sequence without changing their established URLs.
- Added exercises, answer checks, AI-context examples, and D2L connections for each new lesson. The indexing lesson intentionally ends at the course fallback until Module 2 is published, avoiding a circular next link.
- Verification: Jekyll build passed; `node --check assets/js/learning.js` passed; YAML count remained 25; all 7 published curriculum URLs resolved under `_site`.

## 2026-09-09 - Module 2 and Module 3 implementation

- Added original Chinese control-flow lessons for conditions, loops, loop tools, and comprehensions, followed by functions, flexible parameters, modules/scope, and readable Pythonic patterns.
- Connected all new pages with linear previous/next navigation; the final published page currently falls back to the course index until Module 4 is available.
- Verification: Jekyll build passed, `node --check assets/js/learning.js` passed, curriculum count remained 25, and all 15 published URLs resolved. A responsive regression check on a representative control-flow lesson reported no horizontal overflow.
- Accessibility review fixed static completion labels by making the checkmark decorative (`aria-hidden`); completion state remains represented by the live progress UI.

## 2026-09-09 - Final Python for AI course review

- Completed Modules 4-6: files/JSON, exceptions/debugging, AI-oriented classes, type hints/dataclasses/testing, NumPy foundations and operations, Matplotlib/Jupyter practice, Tensor basics, autograd/DataLoader preview, and the D2L readiness checkpoint.
- Final curriculum contains 25 lessons and all 25 have published routes. Internal Learn links checked: 26 unique links, no missing targets. No stale `64` progress counters or `Lesson 63` references remain outside ordinary code examples.
- Representative NumPy code ran successfully (`shape=(2, 2)`, centered column sums zero); representative PyTorch autograd code ran successfully (`loss=25.0`, gradient `30.0`).
- Final visual regression: course home and lesson shell were checked at desktop 1280px and mobile 390px; no horizontal overflow, mobile navigation collapsed correctly, and the final readiness page exposed the `READY` checkpoint and previous link.
- Final verification: `bundle exec jekyll build` passed; `node --check assets/js/learning.js` passed. Only existing Jekyll environment warnings were emitted.

## 2026-09-09 - Quality repair phase opened

- An independent audit scored the course C / 44 for structural completeness with shallow pedagogy. The prior COMPLETE/READY conclusion is revoked for this repair cycle.
- Added bounded quality-repair tasks QR-1 through QR-4. Current state is `PYTHON FOR AI - REPAIR IN PROGRESS`; no D2L readiness claim is valid until the repair is independently audited.

## 2026-09-09 - QR-1 scientific/PyTorch repair

- Expanded Lessons 19-24 with shape-first NumPy teaching, ndim/dtype/axis/reshape, boolean indexing, broadcast compatibility and errors, view/copy, a NumPy-to-Matplotlib mini-project, Tensor creation/device/reshape, element-wise vs matrix multiplication, non-zero autograd, a concrete Dataset/DataLoader, and a scored 14-point readiness gate.
- Representative checks passed: NumPy shape/reshape/indexing/broadcast/aggregation, Tensor `@` and `*`, non-zero gradient (`loss=0.5`, gradient `-4.0`), and DataLoader batch shapes `(2, 1)`/`(2,)`.
- `bundle exec jekyll build`, `node --check assets/js/learning.js`, and `git diff --check` passed. QR-2 is now the active repair task.

## 2026-09-09 - QR-2 Python backbone repair

- Rewrote Course Guide, Variables, and List lessons in Simplified Chinese; List now teaches tuple creation, immutability, indexing, unpacking, and why shapes use tuples.
- Expanded Functions with docstrings, input boundaries, multiple returns, tuple unpacking, composition, and graded exercises; expanded Classes with instantiate/call/read flow, inheritance/super instance, and a minimal `MyModel(nn.Module)` preview; expanded pytest guidance with a runnable test function and graded practice.
- Repaired prerequisite order by labeling range/for/raise/dict-unpacking examples as Preview where they intentionally appear early, removing the conditional-expression challenge, and making external-module examples explicit and runnable.
- Expanded files/JSON and exceptions/debugging lessons with complete examples, boundaries, graded exercises, and reference answers. Added ★/★★/★★★ exercise progression to the core control-flow/container lessons.
- Fixed 00-24 navigation metadata so every previous/next link forms one continuous chain. All 126 fenced Python blocks compile successfully; Jekyll build, JS syntax check, and chain validation passed.

## 2026-09-09 - QR-3 navigation, metadata, and UI language review

- Verified the complete 00-24 front matter chain after repairing Lessons 06, 10, and 14; no module boundary returns to the course page.
- Replaced stale `/learn/` copy (`3 lessons ready`, old current-release list) with data-driven `25 / 25 lessons published` and explicit repair/re-audit status.
- Translated lesson shell, progress controls, navigation labels, roadmap status, and course overview copy to Simplified Chinese while preserving existing route and layout structure.
- Desktop 1280px and mobile 390px browser checks passed with no horizontal overflow; mobile course navigation remained visible as a collapsed disclosure and desktop lesson TOC remained visible.

## 2026-09-09 - QR-4 final repair review

- Hardened local progress: stored values are normalized to strings, filtered to lesson IDs present in the current DOM curriculum, deduplicated, capped at the configured total, and rendered with a 0-100% percentage clamp.
- Added graded ★/★★/★★★ exercises and complete reference answers across the repaired substantive lessons; verified all 126 fenced Python blocks compile.
- Re-ran Jekyll build, JS syntax, curriculum route and 00-24 chain checks after the final UI-language and progress changes. All passed; only existing environment warnings remain.
- Scientific runtime verification remains green: NumPy shape/reshape/indexing/broadcast/aggregation, Matplotlib workflow data generation, Tensor `*` vs `@`, non-zero autograd, and DataLoader batch shape checks.
- Final state intentionally changed to `READY FOR INDEPENDENT RE-AUDIT`; no COMPLETE or READY learning claim is made by this task.

## 2026-09-09 - Independent re-audit and targeted corrections

- Re-read all 25 lesson sources and independently checked front matter, exercise progression, answer coverage, preview labels, standalone/continuation code notes, and the complete 00-24 navigation chain.
- Corrected Lesson 03's string-slice answer (the original indices were off by one) and corrected Lesson 20's "按样本中心化" answer to subtract each sample's mean across axes 1 and 2.
- Added complete folded reference answers for the substantive Functions, Modules/Scope, Classes, and pytest lessons; verified the new Python blocks parse successfully.
- Improved Simplified Chinese consistency in the Learn landing page, course catalog, module labels, and scientific/readiness headings without changing routes or architecture.
- Verification passed: 25 lesson files, 130 fenced Python blocks parse, NumPy/function answer assertions run, 00-24 chain passes, 26 Learn internal links resolve, desktop 1280px page has no horizontal overflow, and `bundle exec jekyll build` passes with only existing environment warnings.
- PyTorch runtime examples were re-executed successfully (`loss=0.500`, non-zero `gradient=-4.000`, DataLoader batch shapes `(2, 1)` and `(2,)`); the pytest test suite remains unavailable because `pytest` is not installed in the current Python runtime. State remains `READY FOR INDEPENDENT RE-AUDIT`; no completion claim is made.

## 2026-09-09 - QR-5 final D2L bridge targeted repair

- Lesson 12 now maps positional, keyword, default, `*args`, and `**kwargs` definitions to calls, with separate basic/application/integrated exercises and explanations.
- Lesson 13 now explains local scope, global lookup, module/file boundaries, both import styles, `__name__` protection, and a runnable `metrics.py` → `train.py` AI-style example with graded exercises.
- Lesson 14 now presents ordinary loop code alongside equivalent Pythonic forms for unpacking, `enumerate`, `zip`, comprehensions, `lambda`, sorting, `any`, and `all`, plus a normalize → summarize function chain and graded answers.
- Lesson 17 now teaches `nn.Module`, `super().__init__()`, `forward`, callable `model(X)`, registered submodules, and parameter inspection with an executable `TinyModel` example.
- Lesson 23 now includes a runnable Dataset → DataLoader → model → prediction → scalar loss → `zero_grad` → `backward` → `optimizer.step` training step, including shape and parameter-change assertions.
- Lesson 24 now includes the 14-question Before D2L Mini Challenge and complete per-checkpoint answers, with the challenge required as an additional readiness gate.
- Verification passed: PyTorch model output `(3, 1)`, non-zero loss, non-zero gradients, parameter update, and batch shapes `(2, 1)`/`(2, 1)`; 142 Python blocks parse; Jekyll build, JS syntax, diff check, 25 routes, 00-24 chain, 26 Learn links, and desktop/mobile responsive spot checks passed. `pytest` remains unavailable but is explicitly recorded as non-blocking.
- QR-5 is complete. State is now `READY FOR FINAL INDEPENDENT AUDIT`; no course completion or D2L readiness claim is made.

## 2026-09-09 - Final independent audit and release preflight

- Recorded the independent audit result: 85/100, verdict B (Good, ready for D2L with minor issues), no P0 findings, and `READY FOR D2L`.
- Updated the public Learn and About status labels so they no longer describe the completed course as under repair or in progress.
- Release preflight passed: `bundle exec jekyll build`, `node --check assets/js/learning.js`, and `git diff --check` all completed successfully; Jekyll emitted only the existing Logger/Faraday environment warnings.
- Verified all 25 configured lesson routes, the complete 00-24 Previous/Next chain in source and rendered HTML, and 1,401 Learn-link references across 26 unique internal targets with no missing destination.

## 2026-09-09 - Minimal public homepage refinement

- Reduced the visible top navigation to the brand, Learn, and the existing theme toggle. Publications, Talks, Teaching, Portfolio, Blog Posts, CV, and Guide entries remain commented in `_data/navigation.yml`; their pages, collections, routes, and files were not deleted.
- Replaced the root page's Academic Pages welcome/template copy with a concise Simplified Chinese profile, Current Focus list, and a single Python for AI learning entry at `/learn/python/`.
- Updated the sidebar author bio to the user-provided USTC/AI identity and removed the template placeholder location `Earth`; existing verified email and GitHub links were retained.
- Verification passed: Jekyll build, `node --check assets/js/learning.js`, and `git diff --check`; `/`, `/learn/`, and `/learn/python/` generated successfully, homepage links resolve, and template-residual scanning passed.
- Responsive spot checks passed at 1280px desktop and 390px mobile. Both viewports have no horizontal overflow; mobile navigation remains usable and Learn is visible.

## 2026-09-09 - Release push blocked

- Local release commit `d0b5dd5` was created successfully with message `feat: launch personal homepage and Python for AI course`.
- Two unchanged ordinary push attempts to `origin master` failed before remote update: first `Recv failure: Connection was reset`, then `Failed to connect to github.com port 443 after 21211 ms: Could not connect to server`.
- No force push, history rewrite, remote/configuration change, workflow change, or deployment attempt was made. Actions/Pages status remains pending until network access is restored.

## 2026-09-09 - Home/Learn information architecture

- Removed the homepage `Current Learning` course section and the remaining Python-to-D2L route wording from `Current Focus`, keeping the page identity and contact focused.
- Replaced `/learn/`'s linear AI roadmap with a dedicated `learning-catalog` layout backed by `_data/learning_catalog.yml`; only visible catalog items render, currently one Python for AI card under Programming & Foundations.
- Reserved future catalog entries (C++, Machine Learning, D2L, Deep Learning, LLM, Multimodal, AI Systems, English/IELTS) in data with `visible: false`; no empty categories are shown.
- Verification passed: `bundle exec jekyll build`, `node --check assets/js/learning.js`, `git diff --check`, generated routes `/`, `/learn/`, `/learn/python/`, and all 25 lesson directories. Responsive visual checks passed at 1280px and 390px; no horizontal overflow observed.
- No commit, push, deploy, Python lesson edits, collection-data edits, or navigation changes were made.

## 2026-09-19 - Codex Engineering Harness setup

- Confirmed local Codex CLI version `0.155.0-alpha.9`, stable `multi_agent` feature, no configured MCP servers, and no existing `~/.agents/skills/` directory.
- Added the Boss/Lead full-cycle orchestration policy to the repository `AGENTS.md` and copied the same policy to global `C:\Users\ROG\.codex\AGENTS.md` without changing existing site safety rules.
- Prepared auditable staging copies for `full-cycle-engineering`, `bugfix`, `code-review`, and `experiment` under `docs/agent/harness/`.
- Persistent global `config.toml` and new global Skill directories were protected by the current filesystem policy; no unsafe overwrite, MCP installation, Hook installation, model change, push, deploy, or blog-content change was made.
- Official Codex manual retrieval was attempted but blocked by the local TLS/automatic-review environment; configuration claims are limited to capabilities verified from the installed CLI and binary schema.

- Verification: sanitized Harness TOML draft parsed successfully with Python `tomllib`; `git diff --check` passed after trimming STATE.md. `bundle exec jekyll build` was attempted and failed on the pre-existing missing `vendor/breakpoint/breakpoint` Sass import; no site source was changed to mask it.

## 2026-09-19 - Harness v1 official path recheck

- Retried the official global Skill path `C:\Users\ROG\.agents\skills`; creation was denied by the current filesystem ACL.
- Created the project `.agents\skills` root as the requested fallback, but its ACL denies creating Skill subdirectories or writing files.
- Retried project and global custom-agent locations under `.codex\agents`; both are protected and unavailable. Prepared final three-field `planner.toml` and `reviewer.toml` staging drafts using `name`, `description`, and `developer_instructions` only.
- No `.codex\config.toml` change, MCP, Hook, model, or blog-content change was made. The remaining blocker is official-path filesystem permission plus the unavailable automatic approval reviewer (HTTP 404).

- Added the explicit Boss orchestration sequence, built-in Explorer/Worker routing, fresh-review requirement, overlap rule, trivial-task exception, and two-cycle repair limit to the project AGENTS.md. The already-populated global AGENTS.md could not be rewritten a second time because its protected ACL now denies writes; the complete wording remains in docs/agent/harness/AGENTS.global.md for the next permitted installation.

## 2026-09-24 - Engineering & Agent for AI course

- Added a visible `Engineering & Agent for AI` catalog entry with an isolated `engineering-agent-for-ai-progress-v1` storage key and a six-module, 16-lesson path from Git and Windows/WSL/Linux through Python/CUDA, Docker, Agent Engineering, and a reusable AI Project Template capstone.
- Generalized the lesson shell and course home to read per-course metadata while retaining the Python compatibility include and Python defaults; no existing Python routes or progress keys were changed.
- Link-checked official Git, GitHub, Microsoft WSL, Python Packaging, uv, Conda, PyTorch, NVIDIA, Docker, OpenAI Codex, and MCP reference pages.
- Verification passed: `bundle exec jekyll build`, `node --check assets/js/learning.js`, `git diff --check`, all 16 engineering lesson routes, Python home/course-guide routes, generated sidebar links, and distinct Python/engineering storage keys. Jekyll emitted only the existing Logger/Faraday warnings.
- Docker/GPU/pytest execution was unavailable in this runtime; those examples remain statically reviewed with safe CPU alternatives. No push or deploy was attempted.

## 2026-09-27 - Final course UI smoke check

- Rendered the generated Engineering & Agent for AI course home through a local browser preview. The page showed the course title, goals, prerequisites, progress bar, start link, six module sections, and all 16 lesson links without a visible layout failure.
- Closed the temporary preview and stopped the local server after the check. No external site was contacted and no deployment action was taken.

## 2026-09-27 - Independent audit repair and quality gate

- Repaired the audit P1 findings: corrected the CUDA CPU probe and toolkit/runtime explanation, established the `main` branch before later Git exercises, created the SSH log directory, made the Compose example runnable with a health endpoint, aligned Skills with `.agents/skills`, and added executable Agent/Harness/MCP/Eval practice.
- Added `docs/engineering-agent-template/` with a CPU-first package, tests, checker, current Skill path, harness evidence files, Docker/Compose files, smoke log, diagnostic report, and disposable eval fixtures for missing `AGENTS.md` and ignored `.env`.
- Verification passed: `bundle exec jekyll build`, `node --check assets/js/learning.js`, `git diff --check`, template `check_env.py`, unit smoke test, `check_project.py`, `evals/run_evals.py`, Python compileall, 17 Engineering generated pages, 26 Python generated pages, complete navigation chain, and isolated progress keys.
- Fresh independent review returned **A — no P0/P1/P2 findings**. Docker runtime remains unexecuted because Docker is unavailable; Compose was statically reviewed and the limitation is documented. No push or deploy was attempted.
