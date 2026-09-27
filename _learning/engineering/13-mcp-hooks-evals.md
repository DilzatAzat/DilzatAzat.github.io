---
title: MCP、Hooks 与 Evals 基础
permalink: /learn/engineering-agent-for-ai/mcp-hooks-evals/
lesson_id: "13"
module: "4 - Agent Engineering"
description: 把外部工具、生命周期检查和回归用例放进可信边界，而不是堆概念。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/harness-subagents/
previous_title: 12 Subagents 与 Harness Engineering
next_url: /learn/engineering-agent-for-ai/integrated-project/
next_title: 14 构建 AI Project Template
---

## MCP 是合同，不是魔法

Model Context Protocol（MCP）定义模型应用与外部 servers/tools/resources 如何交换结构化信息。把它看作工具和数据的合同：名称、输入 schema、输出和权限都需要审查。连接一个 server 就是在扩大信任边界，先确认来源、最小权限和可撤销方式。

## Hook 与 Eval 的区别

Hook 在事件发生时自动运行，例如提交前检查 secret 或任务结束后运行 build；它是 guardrail。Eval 是一组输入、期望行为和评分规则，用来比较一次改动是否回归。一个 `git diff` 检查可以是 hook，但不是完整 eval。

## 最小可执行设计

为模板设计一个本地 `check_project`：输入项目目录，输出 JSON，包含 `has_agents_md`、`has_gitignore`、`smoke_passed`。Hook 在交付前调用它；Eval 准备三个夹具：缺少 AGENTS、包含 `.env`、正常模板，并为每个写出通过条件。

```text
tool: check_project(path: string) -> {
  ok: boolean,
  findings: [{code, severity, message}]
}
```

先用普通脚本实现并测试，再考虑 MCP 包装。工具越复杂，越需要明确超时、错误和权限。

课程模板中的 `scripts/check_project.py` 是这个设计的本地实现：它只读项目目录并输出稳定 JSON，不需要网络或 Agent runtime。先运行它，再把三个夹具结果写入 `evals/README.md`；接入具体 Codex hook 时，按当前官方 Hook 文档确认事件和信任设置，不把版本敏感配置伪装成永久接口。

## 版本敏感内容

MCP specification、Codex hooks 和 eval 入口都可能变化。教学中固定的是合同、信任边界和回归思维；具体字段和 UI 应以 [MCP 官方规范](https://modelcontextprotocol.io/specification)与当前 OpenAI 文档为准。

## 练习

写两个 eval：一个检查 secret 边界，一个检查 smoke 命令；为每个准备正常和失败样例并记录到 `evals/README.md`。运行 `python scripts/check_project.py .`，再故意让工具返回 malformed JSON，观察 harness 是否清楚报告错误，而不是静默通过。

<details class="lesson-answer"><summary>查看答案</summary>
<p>工具输出要有稳定 schema 和错误状态；eval 必须有可判定的通过条件。先做本地脚本可降低权限和版本风险，只有重复调用需求明确时才接入 MCP。</p>
</details>
