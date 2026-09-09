---
title: enumerate、zip、break 与 continue
permalink: /learn/python/loop-tools/
lesson_id: "09"
module: "2 - 控制流"
description: 在循环中同时获得索引和数据、配对序列，并有意识地跳过或停止迭代。
previous_url: /learn/python/loops/
previous_title: 08 for、while 与 range
next_url: /learn/python/comprehensions/
next_title: 10 推导式
---

## enumerate：索引和值一起取

```python
losses = [0.8, 0.6, 0.4]
for epoch, loss in enumerate(losses, start=1):
    print(epoch, loss)
```

相比 `range(len(losses))`，`enumerate` 更直接，也不容易把索引和值写错。

## zip：并行遍历

```python
names = ["cat", "dog"]
scores = [0.91, 0.83]
for name, score in zip(names, scores):
    print(f"{name}: {score:.2f}")
```

`zip` 会在最短序列结束时停止。需要严格检查长度时，使用 `zip(..., strict=True)`（Python 3.10+）。

## break 与 continue

```python
for score in [0.2, 0.4, 0.95, 0.3]:
    if score >= 0.9:
        break
    if score < 0.3:
        continue
    print(score)
```

`break` 结束整个循环，`continue` 跳过本轮剩余代码。使用它们前先写清楚停止或跳过的理由，避免隐藏流程。

## 练习

### ★ 基础

用 `enumerate` 给三条预测加上从 1 开始的编号。

### ★★ 应用

用 `zip` 把样本 ID 和标签组成字典。

### ★★★ 综合

遍历指标列表，跳过 `None`，遇到第一个低于零的值立即停止。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
values = [0.3, None, 0.2, -0.1, 0.4]
for value in values:
    if value is None:
        continue
    if value < 0:
        break
    print(value)
```

</details>

## D2L 衔接

数据集代码经常用 `zip` 配对输入和标签，训练循环用 `break` 响应早停条件。下一课把简单循环压缩成可读的推导式。
