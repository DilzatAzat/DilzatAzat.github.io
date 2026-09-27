---
title: Windows、PowerShell、WSL2 与 Linux
permalink: /learn/engineering-agent-for-ai/windows-wsl-linux/
lesson_id: "03"
module: "1 - Local to Remote"
description: 从 Windows 文件系统走到 WSL2 和 Linux server，建立不会迷路的路径 mental model。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/git-collaboration-safety/
previous_title: 02 分支、冲突与 AI 项目安全边界
next_url: /learn/engineering-agent-for-ai/shell-runtime-basics/
next_title: 04 Shell、环境变量与进程
---

## 两套路径，不是两种 Git

Windows PowerShell 常见路径是 `C:\Users\you\project`，WSL/Linux 路径是 `/home/you/project`。WSL 可以通过 `/mnt/c/Users/you/project` 访问 Windows 盘，但频繁跨边界会带来性能和权限差异。AI 项目若最终运行在 Linux GPU server，建议把代码和环境主要放在 WSL/Linux 一侧。

## 最小对照表

| 意图 | PowerShell | Bash / Linux |
|---|---|---|
| 当前目录 | `Get-Location` | `pwd` |
| 列出文件 | `Get-ChildItem` | `ls` |
| 进入目录 | `Set-Location path` | `cd path` |
| 创建目录 | `New-Item -ItemType Directory demo` | `mkdir demo` |
| 复制文件 | `Copy-Item a b` | `cp a b` |
| 设置变量 | `$env:MODE="dev"` | `export MODE=dev` |

跨平台的 mental model 是目录、文件、标准输入输出；命令名和引号规则可能不同。

## 可观察实验

PowerShell：

```powershell
$env:COURSE="engineering"
Get-ChildItem
python -c "import os; print(os.environ['COURSE'])"
```

WSL/Linux：

```bash
export COURSE=engineering
find . -maxdepth 1 -type f | sort
python -c 'import os; print(os.environ["COURSE"])'
```

如果 Python 找不到，先记录 `Get-Command python` 或 `command -v python`，不要盲目重复安装。

## 故意制造路径错误

在一个含空格的目录中运行脚本，分别尝试未加引号和加引号的路径，观察 shell 如何分词。修复后把最终命令写入 README，而不是复制一条只适合你机器的绝对路径。

## 什么时候进入 WSL2

只做 Windows 原生文档或轻量脚本时 PowerShell 足够；需要 Linux 工具链、GPU 远程同构、Docker/Linux 权限模型或长时间 shell 工作时，进入 WSL2 会减少迁移摩擦。

## 练习

在 PowerShell 和 WSL 中各创建一个 `path-lab` 目录，写入同一个脚本并打印当前目录。故意把 Windows 路径直接粘贴到 Bash，记录错误，再改成 `/mnt/c/...` 或 WSL 内路径。最后在 README 写清哪一侧是你的主要项目目录。

<details class="lesson-answer"><summary>查看答案</summary>
<p>失败来自路径语法和运行环境边界，而不是 Python 代码本身。修复后应能说出文件实际位于哪套文件系统，以及为什么不把绝对路径硬编码进项目。</p>
</details>

## 延伸阅读

- [Microsoft: WSL overview](https://learn.microsoft.com/en-us/windows/wsl/about)
