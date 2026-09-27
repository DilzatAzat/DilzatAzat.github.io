---
title: Shell、环境变量与进程
permalink: /learn/engineering-agent-for-ai/shell-runtime-basics/
lesson_id: "04"
module: "1 - Local to Remote"
description: 用管道、重定向、环境变量和进程观察建立可靠的实验习惯。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/windows-wsl-linux/
previous_title: 03 Windows、PowerShell、WSL2 与 Linux
next_url: /learn/engineering-agent-for-ai/ssh-tmux-server/
next_title: 05 SSH、远程服务器与 tmux
---

## Shell 是连接器

程序通过标准输入、标准输出和标准错误通信。管道把一个程序的输出接到另一个程序；重定向把输出写入文件。PowerShell 的对象管道和 Bash 的文本管道不同，但“让每一步可观察”这个原则相同。

```bash
python train.py 2> errors.log | tee train.log
```

上面保存错误、显示并保存普通输出。PowerShell 可用 `2> errors.log` 和 `Tee-Object train.log`。

## 环境变量不是配置文件

环境变量适合运行时选择，例如 `DEVICE=cpu` 或 `DATA_DIR=/mnt/data`；长期配置应写成版本化模板，secret 应由安全存储注入。子进程会继承父进程的环境，所以先确认当前 shell：`env | sort` 或 `Get-ChildItem Env:`。

## 进程与权限的最低模型

一个训练命令是进程，有 PID、工作目录、环境和输出。Linux 用 `ps`, `top`, `kill PID`；Windows 用 `Get-Process` 和 `Stop-Process -Id PID`。权限决定进程能读写什么；不要为了绕过权限长期使用 root 或管理员账户。

## 可恢复实验

```bash
python -c 'import time; print("start", flush=True); time.sleep(30)'
```

另开终端观察 PID 和输出，再用正常信号终止。把长命令拆成“输入、输出、日志、退出码”四个问题。错误时先读最后一行，不要把所有输出吞掉。

## 练习

让一个脚本读取 `MODE`，默认值为 `dev`；把输出同时显示并写入日志；故意拼错变量名，使用 `set -u`（Bash）或显式检查（PowerShell）定位问题。

<details class="lesson-answer"><summary>参考答案</summary>
<p>环境变量缺失不应静默变成危险默认值。对训练任务，日志文件和退出码比“终端看起来没报错”更可靠。</p>
</details>
