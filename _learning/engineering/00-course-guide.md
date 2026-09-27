---
title: 课程说明：从 AI 项目到工程闭环
permalink: /learn/engineering-agent-for-ai/course-guide/
lesson_id: "00"
module: "0 - Foundations"
description: 用 7–10 天建立能立刻用于 AI 项目的工程基础和 Agent Engineering mental model。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_title: Python for AI
next_url: /learn/engineering-agent-for-ai/git-workflow/
next_title: 01 Git 仓库与 GitHub 工作流
---

## 这门课解决什么问题

训练代码能跑只是起点。真实 AI 项目还要回答：代码如何恢复、依赖如何重建、GPU 为什么不可见、长任务如何留在远程服务器、Agent 如何在仓库里安全协作。本课把这些问题串成一条可执行路径。

课程不要求你成为 Linux 管理员、Docker 专家或 Agent SDK 开发者。目标是建立最小完整理解，然后在一个小模板里反复使用它。

## 学习闭环

每课都遵循：先画 mental model，再运行最小例子，修改一个变量，故意制造一个可恢复的失败，最后把修复写进项目说明。每次练习都在临时目录或本地分支中完成，不要在真实服务器上执行破坏性命令。

## 预期成果

完成本课后，你会在第 14–15 课交付并验证一个 `ai-project-template`：它有 Git 边界、可复现 Python 环境、可选 Docker、`AGENTS.md`、一个 Skill，以及 Boss → Planner/Explorer → Worker → Reviewer 的闭环。

## 快速检查

1. 为什么“能运行”不等于“可复现”？
2. 哪些内容不能随意提交到 Git？
3. 课程最后的模板应该让后来者能解释每个主要文件的用途，而不是堆工具名。

<details class="lesson-answer"><summary>查看答案</summary>
<p>运行还依赖解释器、依赖、数据和配置；secret、数据集、checkpoint 和个人凭据应留在 Git 边界外；模板的价值是可解释、可恢复和可重复。</p>
</details>

## 练习

创建一个空目录 `ai-project-template`，只写一份三行 README：项目目标、如何运行、哪些文件永不提交。下一课开始后再逐步填充它。

完成标准：README 必须能让另一个人说出项目目标、CPU smoke 命令和至少三类不应提交的文件；如果对方仍需要口头补步骤，就把缺失内容写回 README。

<details class="lesson-answer"><summary>练习反馈</summary>
<p>合格 README 至少包含一个目标句、一个可复制的本地运行命令，以及 `.env`、数据集、checkpoint 等不应提交的边界。让同学只看 README 复述这些内容，就是最小验收。</p>
</details>

## 速查表

| 问题 | 先问什么 |
|---|---|
| 代码在我电脑能跑吗 | 解释器、依赖、路径是否明确？ |
| 远程任务会丢吗 | SSH、tmux、日志和恢复步骤是否存在？ |
| Agent 改坏了吗 | 是否有计划、验证、review 和可回滚的提交？ |
