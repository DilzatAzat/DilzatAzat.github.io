---
title: Subagents 与 Harness Engineering
permalink: /learn/engineering-agent-for-ai/harness-subagents/
lesson_id: "12"
module: "4 - Agent Engineering"
description: 用 Boss、Planner、Explorer、Worker、Reviewer 形成 plan → implement → verify → repair 闭环。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/agents-skills/
previous_title: 11 AGENTS.md 与可复用 Skills
next_url: /learn/engineering-agent-for-ai/mcp-hooks-evals/
next_title: 13 MCP、Hooks 与 Evals
---

## 角色不是头衔

- Boss/Main Agent 决定范围、接受证据并保护用户改动。
- Planner 把需求拆成可验收任务和风险。
- Explorer 只读追踪架构、路由和现有模式。
- Worker/Coder 一次负责明确的写入边界。
- Reviewer 在新上下文中寻找回归、错误和缺失测试。

角色可以由一个人轮流承担。小任务若拆成五个 Agent，只会增加协调成本。

## 最小闭环

```text
Understand → Plan/Explore → Decide → Implement
→ Verify → Independent Review → Repair → Accept
```

每一步产生可检查物：计划、diff、build/test 输出、review findings、修复后的再次验证。并行工作只发生在文件边界独立时；同一文件不要同时写。

最小持久状态可以只是三个文本文件：`harness/task-contract.md`（目标与范围）、`harness/state.md`（当前步骤与阻塞）、`harness/review.md`（finding 与修复证据）。模板还提供 `scripts/check_project.py`，让角色之间共享一份机器可读的验收结果。

## 练习：角色卡

给模板增加一个 `README` 段落。先写 Planner 卡片（目标/范围/验收）到 `harness/task-contract.md`，再由 Worker 修改，运行 `python scripts/check_project.py .`，最后用 Reviewer 卡片把一个边界问题写进 `harness/review.md` 并修复。若没有 Codex runtime，用人工记录模拟，但保留证据文件。

<details class="lesson-answer"><summary>查看答案</summary>
<p>review 不是重复实现者的自我确认，而是从验收标准出发的独立检查。修复后必须重新运行受影响的验证，不能只改文字关闭 finding。</p>
</details>

## 当前仓库案例

本仓库的 `docs/agent/` 保存 roadmap、state、decisions 和 review log；这些文件把一次长任务限制成可恢复的小步。学习者应提炼原则，不要机械复制项目私有配置。
