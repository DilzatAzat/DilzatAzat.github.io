---
title: Agent Engineering mental model
permalink: /learn/engineering-agent-for-ai/agent-engineering-model/
lesson_id: "10"
module: "4 - Agent Engineering"
description: 区分 prompt、instruction、skill、tool/MCP、subagent、harness、hook 和 eval，知道何时停止加复杂度。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/docker-compose/
previous_title: 09 Docker Compose 与项目选择边界
next_url: /learn/engineering-agent-for-ai/agents-skills/
next_title: 11 AGENTS.md 与 Skills
---

## 八个词，八种工程问题

| 组件 | 它解决的问题 |
|---|---|
| prompt | 当前任务的目标、输入和约束 |
| instruction | 稳定的行为规则和边界 |
| skill | 可复用的任务流程、检查和参考资料 |
| tool / MCP | Agent 可调用的外部能力或数据合同 |
| subagent | 把一个可隔离子任务交给独立上下文 |
| harness | 让计划、实现、验证、review 能重复运行的控制层 |
| hook | 在生命周期节点自动检查或阻止 |
| eval | 用例、判定标准和回归信号 |

它们不是同义词。一个清晰的 prompt 不能替代权限边界；一个 MCP tool 也不等于 Agent 已经知道什么时候调用它。

## 仓库里的 Agent

Agent 需要知道工作目录、可读写范围、验证命令、不可触碰的文件和完成标准。把这些写成显式合同，任务就能被另一个人或另一次运行复现。对于一次两分钟的改动，直接单 Agent 往往比多 Agent 更可靠。

## 从 ad-hoc prompt 到任务合同

```text
目标：为模板增加一个 smoke test
范围：只改 tests/ 和 README
验证：python -m pytest -q（若可用）
风险：不要改依赖锁文件，不要提交数据或 secret
完成：测试通过，diff 可解释，review 无高优先级问题
```

把这五段合同保存成 `harness/task-contract.md`，再让一个人或一个 Agent 按合同执行。合同本身不创建权限；它让范围、证据和停止条件可以被另一次运行复核。

## 练习

把“帮我把项目变好”改写成上面的五段合同，保存为 `harness/task-contract.md`；再标记其中哪些内容是 prompt，哪些应长期放进 instruction 或 skill。运行模板的 `python scripts/check_project.py .`，把 JSON 输出作为合同的第一份证据。若没有真实工具，先用人工执行合同。

<details class="lesson-answer"><summary>查看答案</summary>
<p>临时目标和输入属于 prompt；仓库边界、验证和安全规则属于 instruction；重复的流程和检查适合 skill。只有当分工降低风险或并行成本时才引入 subagent。</p>
</details>

## 当前资料

Codex 的界面、CLI 和可用工具会变化。本课程只固定上述工程关系，具体入口以 [OpenAI Codex 文档](https://developers.openai.com/codex)和仓库实际配置为准。
