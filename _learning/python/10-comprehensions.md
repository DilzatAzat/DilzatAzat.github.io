---
title: 推导式（Comprehensions）
permalink: /learn/python/comprehensions/
lesson_id: "10"
module: "2 - 控制流"
description: 用列表、字典和集合推导式表达短小明确的数据转换。
previous_url: /learn/python/loop-tools/
previous_title: 09 enumerate、zip、break 与 continue
next_url: /learn/python/functions/
next_title: 11 函数、参数与返回值
---

## 从循环到推导式

```python
squares = [x * x for x in range(5)]
positive = [loss for loss in [-1, 0.2, 0.4] if loss > 0]
```

基本形式是 `[表达式 for 变量 in 可迭代对象]`，条件放在末尾。先写普通循环验证逻辑，再压缩成推导式，通常更容易调试。

## 字典与集合推导式

```python
names = ["cat", "dog"]
lengths = {name: len(name) for name in names}
unique_lengths = {len(name) for name in names}
```

字典推导式写成 `{键: 值 for ...}`；集合推导式没有冒号。不要为了“看起来 Pythonic”把多层嵌套循环挤进一行。

## AI 场景

推导式适合转换配置键、筛选有效样本和建立小型查找表。大规模数值运算应交给 NumPy 或 PyTorch 的向量化操作，而不是在 Python 中堆叠复杂推导式。

## 练习

### ★ 基础

创建 0 到 9 的偶数平方列表。

### ★★ 应用

从指标字典中筛选值大于 `0.8` 的键。

### ★★★ 综合

把一组文件名转换为去掉 `.png` 后缀的集合，并忽略不以 `.png` 结尾的文件。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
files = ["a.png", "b.txt", "c.png"]
stems = {name.removesuffix(".png") for name in files if name.endswith(".png")}
print(stems)
```

</details>

## 小结与 D2L 衔接

推导式是循环、转换和筛选的紧凑表达。读 D2L 代码时，先把推导式展开成普通循环，就能检查每一步数据如何变化。下一模块将把这些流程封装进函数。
