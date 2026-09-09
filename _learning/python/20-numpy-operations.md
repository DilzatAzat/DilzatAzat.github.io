---
title: NumPy 数据操作：索引、向量化、广播与聚合
permalink: /learn/python/numpy-operations/
lesson_id: "20"
module: "5 - NumPy 与科学 Python"
description: 采用 shape-first 方法预测 NumPy 运算的输出，并处理广播与视图边界。
previous_url: /learn/python/numpy-basics/
previous_title: 19 NumPy 基础
next_url: /learn/python/numpy-tools/
next_title: 21 NumPy Random、Matplotlib 与 Jupyter 实战
---

## 学习目标

- 使用索引、切片和布尔索引选择数据；
- 区分逐元素运算和矩阵运算的输入/输出 shape；
- 根据广播规则判断运算是否兼容；
- 用 `sum`、`mean`、`max` 按指定轴聚合；
- 理解 view 与 copy 的基础差异。

## Shape-first：先写输入，再算输出

```python
import numpy as np

batch = np.arange(12).reshape(3, 4)
print(batch.shape)
print(batch[:, 1:3].shape)
print(batch[batch % 2 == 0].shape)
```

二维切片 `[:, 1:3]` 保留行轴并选择两列，结果是 `(3, 2)`。布尔索引会把选中的元素压成一维，元素数量取决于条件，因此这里是 `(6,)`。

## 向量化与逐元素运算

```python
values = np.array([1.0, 2.0, 3.0])
scaled = values * 2.0
shifted = values + np.array([0.5, 0.5, 0.5])
print(scaled.shape, shifted.shape)
```

`*` 和 `+` 在同形状数组上逐元素计算，输入 `(3,)` 产生输出 `(3,)`。这种向量化通常比 Python 循环更简洁，也更容易交给底层数值库优化。

## 广播兼容规则

NumPy 从最后一个轴向前比较两个 shape。每一对维度必须相等，或其中一个为 1；缺失的前导维度按 1 处理。

```python
import numpy as np

matrix = np.zeros((2, 3))
row_bias = np.array([1.0, 2.0, 3.0])
result = matrix + row_bias
print(result.shape)
```

`(2, 3)` 与 `(3,)` 兼容，结果为 `(2, 3)`。`(2, 3)` 与 `(2,)` 不兼容，因为从末轴比较时 3 与 2 不相等：

```python
import numpy as np

try:
    np.zeros((2, 3)) + np.ones((2,))
except ValueError as error:
    print(type(error).__name__)
```

需要按行加偏置时，把偏置写成 `(2, 1)`；需要按列加偏置时，写成 `(1, 3)`。

## 聚合与 axis

```python
import numpy as np

scores = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
print(scores.sum(axis=0).shape)
print(scores.mean(axis=1).shape)
print(scores.max())
```

`axis=0` 的结果是 `(3,)`，`axis=1` 的结果是 `(2,)`，不指定 axis 则聚合全部元素并返回标量。`keepdims=True` 可以保留长度为 1 的轴，方便后续广播。

## view 与 copy

```python
import numpy as np

original = np.array([1, 2, 3, 4])
view = original[:2]
view[0] = 99
copy = original[:2].copy()
copy[0] = 7
print(original, copy)
```

切片常常是 view，修改它会影响 `original`；`.copy()` 创建独立数组。处理训练/验证数据时，明确是否允许原地修改，避免数据泄漏。

## 练习

### ★ 基础

预测 `x = np.ones((4, 3))` 经过 `x[:, :2]`、`x + 2` 和 `x.mean(axis=0)` 后的 shape。

### ★★ 应用

创建 `(3, 2)` 的批次和 `(2,)` 的列偏置，完成广播相加；再尝试 `(3,)`，记录 `ValueError` 的原因。

### ★★★ 综合与答案

对 `scores = np.arange(24).reshape(4, 3, 2)`：取每个样本的第二列、沿最后一轴求均值、按样本中心化，并用断言验证最终 shape。

<details class="lesson-answer"><summary>完整参考答案</summary>

```python
import numpy as np

scores = np.arange(24).reshape(4, 3, 2)
second_column = scores[:, 1, :]
means = scores.mean(axis=2)
sample_means = scores.mean(axis=(1, 2), keepdims=True)
centered = scores - sample_means
assert second_column.shape == (4, 2)
assert means.shape == (4, 3)
assert centered.shape == (4, 3, 2)
print("shape checks passed")
```

</details>

## 小结与速查表

索引/切片决定选择后的 shape；逐元素运算通常保留兼容输入的 shape；广播从末轴比较“相等或为 1”；聚合会移除被聚合的轴；切片可能是 view，`.copy()` 才是独立数据。

## D2L 衔接

D2L 的标准化、批量损失和特征变换都要求你先预测 shape，再选择 axis 和广播方向。看到 `ValueError` 时，打印每个操作数的 shape 通常比盲目修改代码更快。
