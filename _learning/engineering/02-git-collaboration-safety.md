---
title: 分支、冲突与 AI 项目安全边界
permalink: /learn/engineering-agent-for-ai/git-collaboration-safety/
lesson_id: "02"
module: "0 - Foundations"
description: 让实验、模型和 Agent 改动都可审查、可恢复、不会意外泄露。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/git-workflow/
previous_title: 01 Git 仓库与 GitHub 工作流
next_url: /learn/engineering-agent-for-ai/windows-wsl-linux/
next_title: 03 Windows、PowerShell、WSL2 与 Linux
---

## 一个可审查的改变

把“一个想法”变成一条短分支：先写目标，再改最少文件，运行验证，提交一个动词开头的 commit。分支隔离的是正在变化的快照，不是备份系统；真正的备份还需要远端和可恢复的提交。

## 冲突实验

```bash
git switch -c conflict-a
echo "owner: A" >> notes.txt
git add notes.txt && git commit -m "docs: add owner A"
git switch main
git switch -c conflict-b
echo "owner: B" >> notes.txt
git add notes.txt && git commit -m "docs: add owner B"
git switch main
git merge conflict-a
git merge conflict-b
```

打开 `notes.txt`，保留正确内容，删除 `<<<<<<<`、`=======`、`>>>>>>>`，然后运行 `git add notes.txt` 和 `git commit`。不要用强制推送“解决”冲突。

## 训练资产的边界

代码、配置模式和小型测试适合 Git；用户数据、私有数据、API key、模型权重和可再生缓存通常不适合。为大文件或数据仓库选择专门存储，并在 README 写清获取方式。

## Hooks、检查与 review

本地 hook 可以在 commit 前运行格式化或测试，但 hook 不是安全边界：CI、review 和远端保护仍然需要。把“我运行过什么”写进 PR 描述，review 重点看行为、数据边界和回滚路径。

## 快速检查

- `git status` 是否显示了你以外的改动？先停下来。
- `.env` 是否被忽略？用 `git check-ignore -v .env` 验证。
- 合并前是否有干净的工作树？避免把无关实验一起合并。

## 练习

在模板中加入 `.gitignore` 和 `.env.example`，故意创建 `.env` 并确认 `git status` 不显示它。再写一条 commit，说明为什么没有提交 checkpoint。

<details class="lesson-answer"><summary>参考答案</summary>
<p>忽略规则只能阻止未追踪文件进入候选集，已经提交的 secret 仍需撤销和轮换；所以第一次提交前检查 `git diff --staged` 和 `git status` 很重要。</p>
</details>
