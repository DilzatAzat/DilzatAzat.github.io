---
title: for、while 与 range
permalink: /learn/python/loops/
lesson_id: "08"
module: "2 - 控制流"
description: 用 for 处理序列，用 while 表达重复直到条件改变，并用 range 生成整数序列。
previous_url: /learn/python/if-logic/
previous_title: 07 比较、布尔逻辑与 if
next_url: /learn/python/loop-tools/
next_title: 09 enumerate、zip、break 与 continue
---

## for：逐项处理

```python
losses = [0.9, 0.7, 0.5]
total = 0.0
for loss in losses:
    total += loss
print(total / len(losses))
```

`for` 不需要手动维护索引，它会依次取出可迭代对象中的元素。循环体必须缩进。

## range：生成计数

```python
for epoch in range(3):
    print(f"epoch {epoch}")
```

`range(3)` 产生 0、1、2，停止值不包含在内。也可以写 `range(start, stop, step)`。

## while：条件驱动的重复

```python
attempts = 0
while attempts < 3:
    attempts += 1
print(attempts)
```

循环体必须最终改变条件，否则会无限循环。处理未知长度的输入时，`while` 很有用；处理已知序列时通常优先 `for`。

## AI 场景

训练循环常用 `range(num_epochs)`，每一轮更新模型并记录 loss。不要在循环中忘记更新计数或清空本轮累积值，否则指标会悄悄错误。

## 练习

### ★ 基础

用 `range` 打印 1 到 5 的平方。

### ★★ 应用

遍历 loss 列表，统计小于 `0.5` 的次数。

### ★★★ 综合

用 `while` 模拟 loss 每轮乘以 `0.8`，直到小于 `0.1`，并打印轮数。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
loss = 1.0
epoch = 0
while loss >= 0.1:
    loss *= 0.8
    epoch += 1
print(epoch, loss)
```

</details>

## D2L 衔接

D2L 的训练代码会把 epoch、batch 和评估步骤组织成嵌套循环。先掌握每个循环的边界和累积变量，再学习下一课的循环工具。
