---
title: 比较、布尔逻辑与 if
permalink: /learn/python/if-logic/
lesson_id: "07"
module: "2 - 控制流"
description: 用条件表达式让数据处理和训练代码根据状态做出不同选择。
previous_url: /learn/python/indexing-slicing/
previous_title: 06 索引、切片与容器操作
next_url: /learn/python/loops/
next_title: 08 for、while 与 range
---

## 学习目标

掌握比较运算符、`and`/`or`/`not`，并用 `if`、`elif`、`else` 写出清晰的分支。

## 比较得到布尔值

```python
loss = 0.42
target = 0.5
print(loss < target)
print(loss == target)
```

常见运算符有 `==`、`!=`、`<`、`<=`、`>`、`>=`。`=` 是赋值，不是比较。

## 组合条件

```python
score = 0.81
has_labels = True
ready = score >= 0.8 and has_labels
if ready:
    print("可以评估")
else:
    print("先检查数据")
```

`and` 要求两边都为真，`or` 只需一边为真，`not` 反转布尔值。使用括号明确复杂条件的意图。

## 多分支和真值

```python
accuracy = 0.73
if accuracy >= 0.9:
    level = "strong"
elif accuracy >= 0.7:
    level = "usable"
else:
    level = "needs work"
```

空字符串、空列表、`0` 和 `None` 在条件中会被视为假；非空容器通常为真。需要区分“没有值”和“数值为零”时，用 `is None` 检查 `None`。

## AI 场景与错误

验证指标低于阈值时可以发出提示，但阈值应是明确的配置，而不是散落在代码中的魔法数字。不要写 `if value = 1`；这会产生语法错误。不要用 `is` 比较两个普通数字，数值相等应使用 `==`。

## 练习

### ★ 基础

根据 `batch_size` 是否为正数打印有效性提示。

### ★★ 应用

用三个分支把 loss 分为低、中、高。

### ★★★ 综合

只有当配置包含 `"cuda"` 且 GPU 可用标志为真时才选择 CUDA，否则选择 CPU。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
requested = "cuda"
cuda_available = False
if requested == "cuda" and cuda_available:
    device = "cuda"
else:
    device = "cpu"
print(device)
```

</details>

## 小结与 D2L 衔接

条件让训练脚本可以处理设备、指标和数据状态。D2L 代码中你会频繁看到阈值判断和 `None` 检查；下一课把条件放进循环。
