---
title: 解包、lambda 与常见 Pythonic 写法
permalink: /learn/python/pythonic/
lesson_id: "14"
module: "3 - 函数与 Pythonic 写法"
description: 读懂解包、短小 lambda 和常见的 Pythonic 表达，但保持代码可读。
previous_url: /learn/python/modules-scope/
previous_title: 13 作用域、模块与 import
next_url: /learn/python/files-json/
next_title: 15 文件、Path 与 JSON
---

## 解包：把结构对应到名称

```python
name, score = ("cat", 0.91)
first, *middle, last = [1, 2, 3, 4]
```

解包让数据结构与变量一一对应。数量不匹配会抛出 `ValueError`；带星号的变量收集剩余项。

普通写法需要逐个索引，Pythonic 写法直接表达“这三个值分别是什么”：

```python
record = ("cat", 0.91, 12)
name = record[0]
score = record[1]
count = record[2]

name2, score2, count2 = record
assert (name, score, count) == (name2, score2, count2)
```

## `enumerate`、`zip` 与排序键

```python
records = [("cat", 0.91), ("dog", 0.83)]
ordered = sorted(records, key=lambda record: record[1], reverse=True)
for index, (name, score) in enumerate(ordered, start=1):
    print(index, name, score)
```

`enumerate` 等价于手动维护计数器，但不会把索引和数据写乱；`zip` 等价于同时取两个序列的同一位置。`lambda` 适合 `sorted(key=...)` 这样的简单表达式，逻辑超过一行时，定义有名字的函数通常更清楚。

```python
names = ["cat", "dog"]
scores = [0.91, 0.83]
paired = []
for name, score in zip(names, scores):
    paired.append((name, score))

paired_pythonic = list(zip(names, scores))
assert paired == paired_pythonic
```

## 读懂而不是炫技

## 推导式、`any` 与 `all`

普通循环和推导式应表达同一个数据流：

```python
losses = [0.9, 0.4, 0.7]
positive = []
for loss in losses:
    if loss > 0.5:
        positive.append(loss)

positive_pythonic = [loss for loss in losses if loss > 0.5]
assert positive == positive_pythonic
```

`any()`、`all()`、`sum()` 和 `sorted()` 也可以表达常见意图：

```python
ready = all(value is not None for value in [0.8, 0.7])
```

不要把多个副作用塞进一行。Pythonic 的目标是让读者快速确认数据流，而不是减少字符数。

## 练习

### ★ 阅读代码

解释 `enumerate(zip(names, scores), start=1)` 每轮产生的值，并写出 `ordered` 的类型。

### ★★ 改写代码

把一个收集大于阈值 loss 的普通 `for` 循环改成列表推导式，再说明两种写法的输入和输出类型相同。

### ★★★ AI 数据流

写 `normalize_scores()`、`summarize_batch()` 两个小函数：先把分数限制到 `[0, 1]`，再返回数量、平均分和是否全部有效；用函数组合处理一个 batch。

<details class="lesson-answer"><summary>分级参考答案</summary>

### ★ 阅读答案

`zip(names, scores)` 产生成对的 `(name, score)`，`enumerate(..., start=1)` 再为每一对添加从 1 开始的编号，所以每轮是 `(index, (name, score))`。`ordered` 是由 tuple 组成的 list。

### ★★ 改写答案

```python
losses = [0.9, 0.4, 0.7]
selected = []
for loss in losses:
    if loss > 0.5:
        selected.append(loss)

selected_pythonic = [loss for loss in losses if loss > 0.5]
assert selected == selected_pythonic == [0.9, 0.7]
```

两种写法都读取 `list[float]`，输出 `list[float]`；推导式只是把“遍历—条件—追加”压缩成一个表达式。

### ★★★ AI 数据流答案

```python
def normalize_scores(scores):
    return [max(0.0, min(score, 1.0)) for score in scores]

def summarize_batch(scores):
    normalized = normalize_scores(scores)
    return {
        "count": len(normalized),
        "mean": sum(normalized) / len(normalized),
        "all_valid": all(0.0 <= score <= 1.0 for score in scores),
    }

summary = summarize_batch([1.2, 0.8, -0.1])
assert summary == {"count": 3, "mean": 0.6, "all_valid": False}
print(summary)
```

先由 `normalize_scores` 产生新列表，再把它交给 `summarize_batch`；`all_valid` 检查原始输入，因此能提示裁剪前存在越界值。

```python
def valid_scores(scores):
    return all(0 <= score <= 1 for score in scores)
```

</details>

## 小结与 D2L 衔接

解包、排序键函数和聚合内置函数会大量出现在数据管道中。读 D2L 时先展开这些短表达式，再追踪输入和输出；下一模块处理文件、异常和面向 AI 代码的类。
