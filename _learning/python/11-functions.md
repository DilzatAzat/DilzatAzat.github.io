---
title: 函数、参数与返回值
permalink: /learn/python/functions/
lesson_id: "11"
module: "3 - 函数与 Pythonic 写法"
description: 把可重复的 AI 数据处理步骤封装成有输入、有输出、易测试的函数。
previous_url: /learn/python/comprehensions/
previous_title: 10 推导式
next_url: /learn/python/function-parameters/
next_title: 12 灵活的函数参数
---

## 学习目标

理解 `def`、参数、返回值和局部变量，并能把一个小型数据转换步骤写成函数。

## 从重复代码到函数

```python
def mean(values):
    return sum(values) / len(values)

losses = [0.8, 0.6, 0.4]
print(mean(losses))
```

函数体只有在调用时才执行。`return` 把结果交给调用者；没有显式 `return` 的函数返回 `None`。

## 参数与契约

参数是函数与调用者之间的契约。函数应明确输入含义，并尽早处理明显的非法输入：

```python
def accuracy(correct, total):
    """返回正确率；total 必须为正数。"""
    if total <= 0:  # Preview：异常处理会在 Module 4 正式讲解
        raise ValueError("total must be positive")
    return correct / total
```

不要依赖函数外部变量来传递关键数据，这会让测试和复用变困难。

## 多个返回值与函数组合

```python
def summarize(values):
    return min(values), max(values)

low, high = summarize([0.2, 0.7, 0.4])
print(f"range={low:.1f}..{high:.1f}")
```

多个返回值实际组成一个 tuple，可以直接解包。函数也可以组合：先用一个函数清洗数据，再把结果传给另一个函数。

## AI 场景

训练脚本通常把一个 epoch、指标计算或批次转换写成函数。函数边界让你可以单独打印输入输出，定位问题，而不必运行整个训练流程。

## 练习

### ★ 基础

写 `clip_score(score, low=0.0, high=1.0)`，把分数限制在区间内。

### ★★ 应用

写函数返回列表中的最大值和最小值，并添加一行 docstring。

### ★★★ 综合

写 `summarize_batch(labels)`，返回包含数量和唯一标签数的字典；组合它和 `clip_score`，打印一行批次摘要。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
def clip_score(score, low=0.0, high=1.0):
    return max(low, min(score, high))

def summarize_batch(labels):
    return {"count": len(labels), "unique": len(set(labels))}

labels = ["cat", "dog", "cat"]
scores = [1.2, 0.8, -0.1]
summary = summarize_batch(labels)
mean_score = clip_score(sum(scores) / len(scores))
print(f"count={summary['count']}, unique={summary['unique']}, mean={mean_score:.2f}")
```

</details>

## D2L 衔接

D2L 会把训练、评估和数据迭代拆成函数。读代码时先找函数输入输出，就能看出张量和指标怎样流过程序。
