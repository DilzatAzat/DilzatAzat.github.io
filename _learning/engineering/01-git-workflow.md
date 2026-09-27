---
title: Git 仓库与 GitHub 工作流
permalink: /learn/engineering-agent-for-ai/git-workflow/
lesson_id: "01"
module: "0 - Foundations"
description: 用 working tree、staging、commit、branch 和 remote 管理可恢复的 AI 项目历史。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/course-guide/
previous_title: 00 课程说明：从 AI 项目到工程闭环
next_url: /learn/engineering-agent-for-ai/git-collaboration-safety/
next_title: 02 分支、冲突与安全边界
---

## Mental model

Git 记录的是一组快照。working tree 是你正在编辑的文件，staging area 是下一次快照的候选集合，commit 是带说明的本地快照，remote 是另一个仓库地址。`push` 上传本地提交，`fetch` 只更新远端信息，`pull` 通常是 fetch 加整合。

## 最小实验

在课程模板目录中运行：

```bash
git init
git status
git add README.md
git commit -m "docs: start AI project template"
git branch --show-current
git branch -M main
```

PowerShell 和 Bash 的 Git 命令相同；差异主要在文件操作和环境变量语法。课程后续示例统一使用 `main`，所以在练习仓库中先运行 `git branch -M main`；真实团队仓库应先确认约定。

## GitHub 的位置

`clone` 是把远端仓库取到本地，`fork` 是在 GitHub 上创建你自己的远端副本，Pull Request 是请求把一个分支的可审查提交合并到另一个分支。个人实验不必每次都 fork；团队协作通常需要 PR 和 review。

## 故意失败与诊断

编辑 README 后先运行 `git diff`，再 `git diff --staged`。如果 `git commit` 没包含改动，先看文件是否只 add 了部分内容；不要直接使用 `reset --hard`。安全恢复优先用 `git restore --staged file`、新建分支或从 reflog 了解历史，并先确认没有未保存工作。

## AI 项目边界

`.gitignore` 至少应排除 `.venv/`、`.env`、模型权重、缓存、数据目录和大 checkpoint。提交一个 `.env.example` 只保留变量名，例如 `API_KEY=replace-me`，绝不放真实 token。

```gitignore
.venv/
.env
data/
checkpoints/
__pycache__/
*.pt
```

## 练习

1. 建立 `experiment` 分支，修改 README，提交后切回 `main`。
2. 在两个分支改同一行，合并并手动解决冲突；冲突标记消失后再提交。
3. 解释 `fetch`、`pull`、`push` 的风险边界。

<details class="lesson-answer"><summary>参考答案</summary>
<p>合并冲突不是数据丢失，而是 Git 要求你选择最终内容；解决后应运行检查并提交。fetch 不改工作文件，pull 会整合远端提交，push 会改变远端历史，因而应先 review。</p>
</details>

## 官方延伸阅读

- [Git Book: Getting Started](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [GitHub: About pull requests](https://docs.github.com/en/pull-requests/get-started/about-pull-requests)
