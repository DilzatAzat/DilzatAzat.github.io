---
title: 列表与元组（List & Tuple）
permalink: /learn/python/lists/
lesson_id: "04"
module: "1 - Python 基础"
description: 掌握有序容器、可变与不可变的差异，并理解它们在 AI 数据中的角色。
previous_url: /learn/python/strings/
previous_title: 03 字符串
next_url: /learn/python/dicts-sets/
next_title: 05 字典与集合
---

## 学习目标

- 创建列表和元组，并用索引/切片读取；
- 使用 `append`、赋值、`pop` 更新列表；
- 解释可变（mutable）和不可变（immutable）；
- 选择适合收集 loss、标签和 shape 的容器。

## 列表：有序且可变

```python
loss_history = [0.92, 0.71, 0.55]
predictions = []
layers = ["input", "hidden", "output"]
print(layers[0], layers[-1])
```

列表的索引从 0 开始，`-1` 表示最后一个元素。`append` 在末尾加入一个元素，索引赋值会替换已有元素，`pop` 删除并返回元素：

```python
pending_batches = [0, 1, 2]
current = pending_batches.pop()
pending_batches.append(3)
print(current, pending_batches)
```

## 元组：有序且不可变

```python
image_shape = (3, 32, 32)
name, score = ("cat", 0.91)
print(image_shape[0], name, score)
```

元组用逗号创建，括号常用于提高可读性。它支持索引和切片，但不能执行 `image_shape[0] = 1`。NumPy 的 `shape` 常用元组，因为形状应作为一个稳定的结构传递，不应被随意追加元素。

需要单元素元组时必须写逗号：`single = (42,)`；`(42)` 只是整数。

## 切片和长度

```python
loss_history = [0.92, 0.71, 0.55, 0.47, 0.41]
first_three = loss_history[:3]
recent_two = loss_history[-2:]
middle = loss_history[1:4]
print(len(loss_history), first_three, recent_two, middle)
```

停止索引不包含在结果中，切片不会改变原列表。列表和元组都遵循这个半开区间规则。

## AI 数据中的列表

下面的循环是 **Preview**：先看“逐项收集”的数据模式；正式的 `for` 语法会在 Module 2 讲解。

```python
loss_history = []
for loss in [0.92, 0.71, 0.55]:
    loss_history.append(loss)
print(min(loss_history), loss_history[-1])
```

列表适合保存 loss、预测标签和层对象；大规模规则数值运算应交给 NumPy 或 Tensor。

## 常见错误

- `values[3]` 在三元素列表上会产生 `IndexError`，合法索引是 0、1、2。
- `append` 修改原列表并返回 `None`，不要把它的返回值当列表。
- `backup = train_labels` 只是两个名称指向同一列表；需要独立副本时使用 `.copy()`。
- 试图修改元组会产生 `TypeError`；需要修改时创建新元组。

## 快速检查

预测输出：

```python
scores = [0.61, 0.74, 0.80]
scores.append(0.83)
removed = scores.pop(0)
print(removed, scores[-1], scores[:2])
```

<details class="lesson-answer"><summary>查看答案</summary><p>输出为 <code>0.61 0.83 [0.74, 0.8]</code>。追加后再弹出第一个元素，最后两个表达式分别读取最新值和前两个值。</p></details>

## 练习

### ★ 基础

创建一个 `predictions` 列表，追加三个类别；创建一个 `(batch, channels, height, width)` 元组并解包打印。

### ★★ 应用

创建六个 loss 值，打印长度、最小值和最后三个值；复制列表并验证修改副本不会改变原列表。

### ★★★ Challenge：数据集切分

从 100 到 109 的样本 ID 列表中，用切片创建 80% train 和 20% validation，保持原列表不变，并用 `assert` 验证长度之和。

<details class="lesson-answer"><summary>参考答案</summary>

```python
sample_ids = list(range(100, 110))
split_index = 8
train_ids = sample_ids[:split_index]
validation_ids = sample_ids[split_index:]
assert len(train_ids) + len(validation_ids) == len(sample_ids)
assert sample_ids == list(range(100, 110))
print(train_ids, validation_ids)
```

</details>

## 小结与速查表

列表 `[]` 有序且可变；元组 `()` 有序且不可变；`items[-1]` 读取末项；`items[start:stop]` 是停止位置不包含的切片；`append`/`pop` 改变列表；`.copy()` 创建独立外层列表。

## D2L 衔接

D2L 会用列表保存 loss、预测、标签和层对象，用元组表达稳定的 shape。理解容器的可变性和切片边界后，你能更可靠地追踪数据如何进入 NumPy 和 Tensor。
