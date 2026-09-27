---
title: AGENTS.md 与可复用 Skills
permalink: /learn/engineering-agent-for-ai/agents-skills/
lesson_id: "11"
module: "4 - Agent Engineering"
description: 把仓库规则、工作流和安全边界写成短而可执行的说明。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/agent-engineering-model/
previous_title: 10 Agent Engineering mental model
next_url: /learn/engineering-agent-for-ai/harness-subagents/
next_title: 12 Subagents 与 Harness Engineering
---

## AGENTS.md 的职责

`AGENTS.md` 是给在仓库中工作的 Agent 和人看的项目合同。它应说明架构、验证命令、文件边界、危险操作和完成标准；不要复制整本工具手册，也不要把一次性需求写成永久规则。子目录可以补充更具体的约束，冲突时遵循更近的说明和当前任务要求。

```markdown
# Project instructions
- Preserve routes and user changes.
- Run `bundle exec jekyll build` after content changes.
- Never commit secrets, data, checkpoints, or build output.
- Review `git diff` before declaring completion.
```

## Skill 的职责

Skill 是可复用的流程包：触发条件、读取哪些参考、执行哪些检查、何时停止。当前 Codex 的仓库级自动发现路径是 `.agents/skills/<name>/SKILL.md`；其他 Agent 宿主可以有自己的目录约定。Skill 不应偷偷扩大权限。把“先读状态，再选一个任务，再 build/review”写进 Skill，比在每次 prompt 里重复更稳定。

## 故意违规

在模板的 `AGENTS.md` 写一条“修改后必须运行 smoke test”，然后创建一个只改 README 的任务，故意省略检查；让 reviewer 根据合同指出缺口。规则只有在可观察、有证据时才有价值。

## 练习

为模板创建一个 `.agents/skills/verify-project/SKILL.md`，包含触发条件、三步验证、失败时的停止条件。把当前仓库的 Jekyll build 当作真实案例，但不要复制私有路径或凭据。

<details class="lesson-answer"><summary>参考答案</summary>
<p>AGENTS.md 管长期规则，Skill 管可复用流程；二者都应短、可执行，并明确不能做什么。完成证据应该是命令输出或可检查文件，而不是“看起来没问题”。</p>
</details>

## 官方延伸阅读

- [OpenAI Codex documentation](https://developers.openai.com/codex)
