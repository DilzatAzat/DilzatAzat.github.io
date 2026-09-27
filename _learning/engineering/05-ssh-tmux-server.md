---
title: SSH、远程服务器与 tmux
permalink: /learn/engineering-agent-for-ai/ssh-tmux-server/
lesson_id: "05"
module: "1 - Local to Remote"
description: 安全登录 Linux server，让长时间训练在断线后仍可恢复。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/shell-runtime-basics/
previous_title: 04 Shell、环境变量与进程
next_url: /learn/engineering-agent-for-ai/python-environments/
next_title: 06 Python 解释器与环境选择
---

## SSH mental model

SSH 是本地客户端与远端服务之间的加密会话。密码或私钥用于证明身份；私钥只留在本机，服务器保存公钥。不要把私钥复制到项目、聊天记录或远端共享目录。第一次连接时核对 host key，避免忽略未知主机警告。

```bash
ssh -i ~/.ssh/id_ed25519 user@gpu.example.org
```

真实主机名、用户名和路径用占位符替换。Windows OpenSSH 通常也支持同一命令，PowerShell 路径写法可能不同。

## 远程工作流

1. `ssh` 登录并确认 `hostname`, `pwd`, `nvidia-smi`（若有 GPU）。
2. `git clone` 或 `git pull` 获取代码，创建项目环境。
3. 在 tmux 中启动可记录日志的任务。
4. 断开、重连、`tmux attach`，检查日志和进程。

## tmux 实验

```bash
tmux new -s train
mkdir -p logs
python train.py 2>&1 | tee logs/train.log
# 按 Ctrl-b，再按 d，离开但不结束会话
tmux ls
tmux attach -t train
```

关闭窗口不会自动保存 Python 状态，所以仍需 checkpoint 和幂等的启动命令。tmux 只解决会话持久性，不解决磁盘满、进程崩溃或数据损坏。

## 诊断清单

- `ssh -v` 只用于诊断连接问题，输出可能包含敏感路径。
- `echo $SSH_CONNECTION` 确认当前确实在远端。
- `df -h` 检查磁盘，`ps`/`nvidia-smi` 检查进程和 GPU。
- 示例中的 `logs/` 便于练习；正式训练应把日志写到有备份策略的安全目录，checkpoint 写到明确的持久卷。

## 练习

在本机用 tmux（或等价终端会话工具）运行一个 60 秒脚本，断开再恢复；写一段 README 说明启动、查看、停止和恢复命令。不要在没有授权的服务器上测试 SSH。

<details class="lesson-answer"><summary>参考答案</summary>
<p>恢复步骤必须包括会话名、日志位置、进程检查和 checkpoint 位置；只记住“重新运行命令”可能造成重复训练或覆盖结果。</p>
</details>
