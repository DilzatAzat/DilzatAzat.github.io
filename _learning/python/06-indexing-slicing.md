---
title: 索引、切片与容器操作
permalink: /learn/python/indexing-slicing/
lesson_id: "06"
module: "1 - Python 基础"
description: 统一理解序列索引、半开区间切片、成员测试和可变容器操作。
previous_url: /learn/python/dicts-sets/
previous_title: 05 字典与集合
next_url: /learn/python/if-logic/
next_title: 07 比较、布尔逻辑与 if
---

## 学习目标

- 在字符串、列表和元组上使用索引与切片；
- 理解 `start:stop:step` 的半开区间规则；
- 区分修改原容器的方法和返回新值的操作。

## 统一的序列规则

```python
values = [10, 20, 30, 40, 50]
print(values[0])
print(values[-1])
print(values[1:4])
print(values[::2])
```

`values[1:4]` 取索引 1、2、3；停止位置 4 不包含在结果中。步长默认为 1，`::2` 表示每隔一个元素取一个。

字符串和元组也遵循同一规则，但它们不可变：

```python
shape = (32, 3, 224, 224)
channels = shape[1]
spatial = shape[2:]
```

## 成员测试与安全边界

```python
allowed = {"cpu", "cuda"}
device = "cpu"
if device in allowed:
    print("device accepted")
```

用 `in` 表达成员关系比手写多个 `or` 更清楚。访问序列前先确认长度，或使用切片，因为空切片不会抛出越界错误。

## 原地修改与新容器

```python
items = ["train", "valid"]
items.append("test")
recent = items[-2:]
print(items)
print(recent)
```

`append()` 修改原列表并返回 `None`；切片创建一个新的列表。需要独立副本时使用 `items.copy()`，避免两个名字意外指向同一个列表。

## AI 场景：批次切片

下面使用 `range` 生成示例 ID，是 **Preview**；`range` 的完整规则会在 Module 2 讲解。

```python
sample_ids = list(range(100, 110))
train_ids = sample_ids[:8]
valid_ids = sample_ids[8:]
print(len(train_ids), len(valid_ids))
```

切片适合表达简单的连续分割。真实数据集还需要随机打乱和防止泄漏，这些会在 NumPy 与数据加载部分再次出现。

## 练习

### ★ 基础

从一个十元素列表取出前四个、最后三个和倒序列表。

### ★★ 应用

用 `in` 检查一个模型配置是否包含 `"dropout"` 键。

### ★★★ 综合

不修改原列表，把样本 ID 按 70%/30% 切成训练与验证两部分，并验证长度之和正确。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
sample_ids = list(range(10))  # Preview：range 会在 Module 2 正式讲解
split = int(len(sample_ids) * 0.7)
train = sample_ids[:split]
valid = sample_ids[split:]
assert len(train) + len(valid) == len(sample_ids)
```

</details>

## 小结与 D2L 衔接

索引定位一个元素，切片选择一个半开区间，`in` 检查成员关系；列表可原地修改，字符串和元组不可变。理解这些边界后，阅读批次、标签和张量切片会容易很多。下一模块将把容器操作放进 `if`、`for` 和函数中。
