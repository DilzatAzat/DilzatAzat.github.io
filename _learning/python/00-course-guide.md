---
title: 课程说明（Course Guide）
permalink: /learn/python/course-guide/
lesson_id: "00"
module: "0 - 入门与工作流"
description: 了解课程范围、练习方法，以及从 Python 基础走向深度学习代码的学习路径。
next_url: /learn/python/environment/
next_title: 01 Python 环境与工作流
---

## 学习目标

完成本课后，你可以：

- 解释七个模块如何连接到深度学习；
- 使用“阅读—运行—修改—解释”的练习循环；
- 创建并运行一个 Python 文件；
- 用可观察的标准判断自己是否完成一课。

## 从 Python 走向 D2L

深度学习代码仍然是 Python：你会用变量保存训练配置，用列表收集 loss，用函数组织步骤，用 Tensor 表示数值数据，再通过异常和 shape 检查定位问题。本课程按这个顺序推进，目标是让你尽快阅读 D2L，而不是学完所有 Python 机制。

课程路径是：先掌握 AI 代码高频的语言结构，再用 NumPy 处理和可视化数据，最后把相同思路迁移到 PyTorch Tensor 和 D2L 风格代码。

## 每课的练习循环

1. **阅读**概念，先预测最小示例的输出或 shape。
2. **运行**自己的 `.py` 文件或 notebook cell。
3. **修改**一个输入或操作，再预测变化。
4. **解释**结果，说明哪条规则导致了变化。

如果只能复制代码而不能解释结果，就回到预测步骤。预测和实际输出之间的差异，是最有价值的反馈。

## 运行第一个文件

创建 `lesson_00.py`：

```python
course = "Python for AI"
current_lesson = 0

print(f"Starting {course}, lesson {current_lesson:02d}")
```

在终端运行：

```bash
python lesson_00.py
```

如果系统使用 `python3`，运行 `python3 lesson_00.py`。预期输出：

```text
Starting Python for AI, lesson 00
```

这个文件从上到下执行：先绑定两个值，再用 f-string 生成文本。

> **实践规则：**短代码尽量亲手输入。输入过程会暴露引号、括号和缩进错误，运行结果则检验你的 mental model。
{: .lesson-note }

## 错误也是反馈

看到 traceback 时先读最后一行，它通常包含异常类型和最直接的线索：

```text
NameError: name 'current_lesson' is not defined
```

然后向上找到自己的代码行，检查拼写、大小写、引号、括号和缩进。一次只改一个假设，保留能重现问题的最小示例。

## AI 场景

训练脚本常从普通 Python 配置开始：

```python
learning_rate = 1e-3
batch_size = 64
num_epochs = 10
```

这些只是绑定到数字的名称，之后才会传给优化器、DataLoader 和训练循环。基础语法越清楚，后面的数学代码越容易读。

## 快速检查

1. 为什么要在运行前预测输出？
2. traceback 的哪一行最值得先读？
3. “读过示例”和“完成练习循环”有什么区别？

<details class="lesson-answer"><summary>查看答案</summary>
<p>预测会暴露当前 mental model，实际输出可以检验它；先读最后一行 traceback；完整循环还包括运行、修改和解释，而不只是阅读。</p>
</details>

## 练习

### ★ 基础：课程标记

创建 `course_marker.py`，用三个变量保存你的名字、课程名和总 lesson 数，用 f-string 输出一句话。

### ★★ 应用：预测进度

增加 `completed_lessons = 0`，打印剩余 lesson 数。每次只修改完成数，先写下预期输出再运行。

### ★★★ Challenge：修复 traceback

写一个三行学习计划。故意拼错一个变量名，运行文件，根据 traceback 修复它，并说明错误发生在哪一行。

<details class="lesson-answer"><summary>参考答案</summary>

```python
course = "Python for AI"
completed_lessons = 0
total_lessons = 25

print(f"Course: {course}")
print(f"Completed: {completed_lessons}")
print(f"Remaining: {total_lessons - completed_lessons}")
```

</details>

## 小结与速查表

| 任务 | 做法 |
|---|---|
| 运行文件 | `python filename.py` |
| 学习错误 | 先读 traceback 最后一行，再定位自己的代码 |
| 验证理解 | 预测、运行、修改、解释 |
| 保存进度 | 每课末使用“标记为已完成” |

## D2L 衔接

D2L notebook 把说明、公式和可执行代码放在一起。你将继续使用同一个循环：读 cell、预测值或 shape、运行、修改一个输入并解释结果。完成第 24 课的能力测试后，再决定是否开始 D2L。
