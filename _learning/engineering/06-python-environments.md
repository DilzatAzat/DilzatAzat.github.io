---
title: Python 解释器与项目环境
permalink: /learn/engineering-agent-for-ai/python-environments/
lesson_id: "06"
module: "2 - Reproducible AI Environment"
description: 分清 system Python、project environment、package 和 interpreter，并知道 venv、uv、Conda 各自解决什么问题。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/ssh-tmux-server/
previous_title: 05 SSH、远程服务器与 tmux
next_url: /learn/engineering-agent-for-ai/cuda-pytorch-stack/
next_title: 07 CUDA、Driver 与 PyTorch
---

## 五个容易混淆的词

interpreter 是执行 Python 的程序；package 是可安装的代码；dependency 是项目依赖的 package 版本范围；environment 是 interpreter、site-packages 和配置的组合；system Python 是操作系统或用户共享的解释器。项目环境的目的，是让项目 A 的依赖不会污染项目 B 或系统工具。

## 推荐默认路径

普通 Python AI 项目先用项目级环境：标准库 `venv` 最少依赖，`uv` 提供快速的项目和依赖工作流。Conda 适合需要非 Python 二进制、现有 Conda 生态或团队已标准化的项目。不要为了“完整”同时维护三套环境；选择后把激活和重建步骤写进 README。

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -c "import sys; print(sys.executable)"
python -m pip --version
```

Bash/WSL 对应 `. .venv/bin/activate`。始终用 `python -m pip`，这样 pip 与当前 interpreter 对齐。使用 uv 时可采用 `uv venv` 和 `uv pip install -r requirements.txt`；Conda 则是 `conda create -n ai-project python`、`conda activate ai-project`。

## 故意使用错误 interpreter

在环境外运行 `python -m pip show requests`，再在环境内运行同一命令，比较 `sys.executable` 和安装位置。若出现 `ModuleNotFoundError`，先确认解释器和安装位置，再安装；不要直接修改系统 Python。

## AI 场景

训练脚本、notebook kernel 和 IDE 解释器必须指向同一个环境。把下面的诊断输出贴到 bug report，通常比“我已经安装了 torch”更有用：

```python
import sys
print(sys.executable)
print(sys.version)
```

## 依赖声明与重建

把直接依赖写进 `pyproject.toml` 或 `requirements.txt`，把解析后的精确版本交给 lock 文件或团队约定的锁定工作流。依赖声明回答“项目需要什么”，lock 回答“这次安装解析成什么”；两者都不应包含数据、checkpoint 或 secret。升级依赖时先在临时环境测试，再提交声明和验证结果。

## 练习

建立 `.venv`，安装一个轻量包，记录 `python -m pip --version`；退出环境后故意运行脚本并观察失败，重新激活修复。再写三行说明为什么不应向 system Python 安装项目依赖。

<details class="lesson-answer"><summary>查看答案</summary>
<p>环境隔离让解释器和 site-packages 成为项目的一部分；pip 路径若指向全局目录，安装成功也可能对当前脚本无效。</p>
</details>

## 官方延伸阅读

- [Python Packaging: virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [uv documentation](https://docs.astral.sh/uv/)
- [Conda documentation](https://docs.conda.io/)
