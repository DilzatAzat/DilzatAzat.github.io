---
title: Python 环境与工作流
permalink: /learn/python/environment/
lesson_id: "01"
module: "0 - 入门与工作流"
description: 用 VS Code、终端、虚拟环境和 Jupyter 建立可重复的 Python 学习工作流。
previous_url: /learn/python/course-guide/
previous_title: 00 课程说明
next_url: /learn/python/variables/
next_title: 02 变量、对象与基本类型
---

## 学习目标

完成本课后，你可以：

- 在终端进入项目目录并运行 `.py` 文件；
- 创建、激活和退出虚拟环境（virtual environment）；
- 用 `pip` 安装项目依赖，并理解为什么不应把依赖随意装进系统 Python；
- 知道 VS Code 与 Jupyter Notebook 在课程中的分工。

## 为什么环境值得先学

AI 项目通常包含多个实验、数据文件和第三方库。代码本身正确，并不代表环境一定正确：可能调用了错误的 Python，或者缺少项目所需的版本。把“项目目录、解释器、依赖、运行命令”固定下来，调试时才有可靠的起点。

本课程的普通 Python 练习采用 `.py` 文件；需要观察数组或图表时，再使用 Jupyter Notebook。两者都运行 Python，只是交互方式不同。

## 认识终端和项目目录

先创建一个工作目录，并进入它：

```bash
mkdir python-for-ai
cd python-for-ai
```

在 Windows PowerShell 中也可以使用同样的命令。确认当前目录：

```bash
pwd
```

macOS/Linux 会显示当前路径；PowerShell 也支持 `pwd` 别名。接着创建 `hello.py`：

```python
print("Python 环境已经可以运行")
```

运行文件：

```bash
python hello.py
```

如果系统把 `python` 指向别的程序，可以尝试 `python3 hello.py`。关键不是命令的拼写，而是确认它使用了你准备好的 Python 解释器。

## 用虚拟环境隔离依赖

在项目根目录创建虚拟环境：

```bash
python -m venv .venv
```

激活命令按终端不同而变化：

```bash
# Windows PowerShell
.venv\Scripts\Activate.ps1

# macOS/Linux
source .venv/bin/activate
```

激活后，终端提示符通常会出现 `.venv`。此时执行 `python` 和 `pip`，默认都指向这个项目的环境。确认解释器位置：

```bash
python -c "import sys; print(sys.executable)"
```

离开环境：

```bash
deactivate
```

`.venv` 是可重建的本地目录，通常应加入 `.gitignore`，不要提交到仓库。真正需要记录的是依赖清单，例如：

```bash
python -m pip install numpy
python -m pip freeze > requirements.txt
```

使用 `python -m pip` 可以明确指定“由当前 Python 解释器运行 pip”，比直接输入 `pip` 更不容易装错环境。

## VS Code 与 Jupyter 的分工

VS Code 适合编辑多个 `.py` 文件、浏览项目目录、搜索代码和使用调试器。打开项目文件夹后，使用命令面板选择 `.venv` 里的 Python 解释器；这样运行和分析代码会使用同一环境。

Jupyter Notebook 适合短实验：一个 cell 可以立即运行并显示结果，特别适合 NumPy 数组和 Matplotlib 图表。它也有状态：前面运行过的变量会留在内核中。因此遇到“单独运行这段代码却失败”的情况，先重启内核，再按顺序运行，避免隐藏状态。

## AI 工作流中的环境信息

训练脚本开始时，记录解释器和关键库版本很有帮助：

```python
import sys

print(sys.executable)
print(sys.version.split()[0])
```

当同一份代码在本机、服务器和 notebook 中出现不同结果时，先比较这些信息，再检查输入数据和随机种子。环境排查是实验可复现性的一部分，不是额外负担。

## 常见错误

### 激活了环境却仍然装错包

不要只看终端提示符。运行 `python -c "import sys; print(sys.executable)"`，确认路径确实包含项目的 `.venv`。

### 把命令写进 Python 文件

`python hello.py` 是终端命令，不是合法的 Python 语句。命令放在终端，`print(...)` 等代码放在 `.py` 文件。

### Notebook 依赖旧状态

Notebook 里某个变量可能来自很久以前运行的 cell。重启内核并按从上到下的顺序运行，可以暴露真正缺失的导入或初始化。

## 快速检查

1. 为什么推荐用 `python -m pip` 而不是直接用 `pip`？
2. `.venv` 与 `requirements.txt` 分别保存什么？
3. Notebook 中变量“明明存在”，但按顺序重启后却不存在，这说明了什么？

<details class="lesson-answer"><summary>查看答案</summary>
<p><code>python -m pip</code> 会使用当前 Python 解释器对应的 pip；<code>.venv</code> 保存隔离环境本身，<code>requirements.txt</code> 记录可重建的依赖；Notebook 依赖了隐藏的执行顺序或旧内核状态。</p>
</details>

## 练习

### 1. 检查解释器

在激活 `.venv` 后运行一条命令，打印 `sys.executable` 和 Python 版本。把输出保存到自己的学习记录中。

### 2. 重建一次环境

安装一个小依赖并生成 `requirements.txt`，然后退出虚拟环境，再重新激活并确认该依赖仍可导入。不要删除系统中的其他 Python 环境。

### Challenge：可重复的启动检查

创建 `environment_check.py`，打印解释器路径、Python 主版本，并尝试导入 `json`。如果导入失败，输出一条清晰的错误提示；不要使用第三方库。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
import json
import sys

print(f"Python: {sys.version.split()[0]}")
print(f"Interpreter: {sys.executable}")
print(f"json available: {json.__name__}")
```

</details>

## 小结与速查表

| 任务 | 命令或做法 |
|---|---|
| 创建环境 | `python -m venv .venv` |
| 激活（PowerShell） | `.venv\Scripts\Activate.ps1` |
| 激活（macOS/Linux） | `source .venv/bin/activate` |
| 运行文件 | `python filename.py` |
| 安装依赖 | `python -m pip install package` |
| 退出环境 | `deactivate` |

## D2L 衔接

D2L 的代码通常在 notebook 或可复现的项目环境中运行。你不需要现在配置完整的 GPU 工具链，但应该能判断：当前 cell 使用哪个解释器、依赖从哪里来、一个 `.py` 文件怎样独立运行。下一课开始学习变量和对象，这些概念会直接出现在训练配置与数据处理代码中。
