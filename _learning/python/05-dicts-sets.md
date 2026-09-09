---
title: 字典与集合（Dict & Set）
permalink: /learn/python/dicts-sets/
lesson_id: "05"
module: "1 - Python 基础"
description: 用字典表达带名称的数据，用集合去重并进行成员关系判断。
previous_url: /learn/python/lists/
previous_title: 04 列表与元组
next_url: /learn/python/indexing-slicing/
next_title: 06 索引、切片与容器操作
---

## 学习目标

- 使用字典存储键值对并安全读取；
- 使用集合去重和检查成员关系；
- 选择列表、字典或集合来表达 AI 配置与标签数据。

## 字典：用键查找值

```python
config = {"learning_rate": 1e-3, "batch_size": 64, "epochs": 10}
print(config["batch_size"])
config["epochs"] = 12
config["device"] = "cpu"
```

键必须是可哈希对象，常见的是字符串或数字。访问不存在的键会抛出 `KeyError`；不确定键是否存在时使用 `get()`：

```python
seed = config.get("seed", 0)
```

`get()` 的第二个参数是缺省值，不会把缺省键写入字典。

## 遍历和嵌套数据

下面的 `for` 是 **Preview**：这里关注字典键值结构；循环语法会在 Module 2 正式讲解。

```python
metrics = {"train_loss": 0.42, "valid_loss": 0.51}
for name, value in metrics.items():
    print(f"{name}={value:.2f}")
```

AI 项目中常见的批次记录可以是字典嵌套列表：

```python
batch = {"images": ["a.png", "b.png"], "labels": [0, 1]}
print(len(batch["images"]))
```

先明确每个键的含义，再决定是否需要更严格的 dataclass 或数组类型。

## 集合：去重与成员关系

```python
labels = ["cat", "dog", "cat", "bird"]
unique_labels = set(labels)
print(len(unique_labels))
print("dog" in unique_labels)
```

集合没有稳定的索引顺序。需要展示时可以 `sorted(unique_labels)`，但不要把集合当作列表使用。

## 常见错误与选择

- `config["missing"]` 会抛出 `KeyError`，不确定时用 `get()`。
- `set([1, 2, [3]])` 会失败，因为列表不可哈希；可改用元组 `(3,)`。
- 需要保留顺序时用列表，需要按名称查找时用字典，需要去重时用集合。

## 快速检查

给定 `scores = {"a": 0.8, "b": 0.9}`，如何读取 `b` 并在没有 `c` 时返回 `None`？创建一个含重复类别的列表，输出排序后的唯一类别。

<details class="lesson-answer"><summary>查看答案</summary><p>使用 <code>scores["b"]</code> 和 <code>scores.get("c")</code>；使用 <code>sorted(set(labels))</code> 得到排序后的唯一值。</p></details>

## 练习

### ★ 基础

创建一个 `config` 字典，包含学习率、批大小和设备。

### ★★ 应用

当设备键缺失时默认使用 `"cpu"`，并打印一行配置摘要。

### ★★★ 综合

统计一组批次字典中的唯一标签，并保留每个标签第一次出现的顺序。

<details class="lesson-answer"><summary>综合练习参考答案</summary>

```python
batches = [{"labels": ["cat", "dog"]}, {"labels": ["dog", "bird"]}]
seen = set()
ordered = []
for batch in batches:
    for label in batch["labels"]:
        if label not in seen:
            seen.add(label)
            ordered.append(label)
assert ordered == ["cat", "dog", "bird"]
print(ordered)
```

这里的 `for` 仍是前置预览；正式学习循环后，应能逐行解释两个嵌套循环。

</details>

## D2L 衔接

D2L 示例常用字典保存超参数、指标和批次信息，集合则适合检查标签集合或去重索引。下一课会把这些容器的索引、切片和成员操作放在一起比较。
