---
title: 综合项目：构建可复用的 AI Project Template
permalink: /learn/engineering-agent-for-ai/integrated-project/
lesson_id: "14"
module: "5 - Integrated Project"
description: 从空目录交付一个能在本地和 Linux server 重建的 AI 项目模板。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/mcp-hooks-evals/
previous_title: 13 MCP、Hooks 与 Evals
next_url: /learn/engineering-agent-for-ai/capstone-debug-release/
next_title: 15 Capstone：故意破坏、调试与发布门
---

## 交付目标

你的模板要让一个新使用者在干净目录中回答：代码在哪里、如何创建环境、如何运行 smoke test、哪些数据不能提交、Docker 是否值得、Agent 如何计划和 review。仓库中的 `docs/engineering-agent-template/` 提供了可直接复制的最小起点；先复制它，再按本课清单逐层改造。

## 建议结构

```text
ai-project-template/
  src/ai_project/
  tests/
  scripts/check_env.py
  scripts/check_project.py
  .agents/skills/verify-project/SKILL.md
  harness/
  evals/
  logs/smoke.log
  docs/diagnostics/
  AGENTS.md
  README.md
  .gitignore
  pyproject.toml
  Dockerfile
```

至少实现一个不依赖 GPU 的 CLI 或函数，让测试可在 Windows、WSL 和 Linux 上运行。Dockerfile 只复制必要文件；Compose 只有在确实需要多个服务时加入。

## Harness 文件

在 `AGENTS.md` 写项目边界、真实验证命令和停止条件；在 `.agents/skills/verify-project/SKILL.md` 写重复的检查流程；在 `harness/` 保存任务合同、状态和 review 证据；在 README 放 Boss → Planner/Explorer → Worker → Reviewer 的角色说明和证据清单。不要把当前仓库的个人路径、token 或大模型文件复制进去。

## 验收清单

- `git status` 干净且 `.gitignore` 阻止 `.env`、数据和 checkpoint。
- 新环境可安装依赖并运行 smoke test。
- `python scripts/check_project.py .` 输出 `ok: true` 和稳定 JSON。
- `python -c "import sys; print(sys.executable)"` 指向项目环境。
- `docker build`（若 Docker 可用）和 `docker run` 的行为写在 README。
- `AGENTS.md`、Skill 和 harness roles 能被另一个人解释。
- `logs/smoke.log` 和 `docs/diagnostics/smoke-report.md` 保存一次真实 CPU 验证的摘要，并明确未测试的基础设施。

## 练习

先复制 `docs/engineering-agent-template/`，运行 `python -m unittest discover -s tests` 和 `python scripts/check_project.py .`，再逐项添加环境、Docker 和 Agent 文件。每完成一层就提交一次，保持提交可回滚。下一课会在干净副本中故意破坏它。

<details class="lesson-answer"><summary>参考答案</summary>
<p>模板的最小闭环是代码 + 环境 + 验证 + 边界 + 协作说明。若一项无法在无 GPU、无 secret 的环境中运行，应提供安全替代或明确前置条件。</p>
</details>
