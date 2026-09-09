---
title: NumPy 基础：ndarray、shape、ndim、dtype 与 axis
permalink: /learn/python/numpy-basics/
lesson_id: "19"
module: "5 - NumPy 与科学 Python"
description: 从数组创建到形状推理，建立进入科学 Python 和 D2L 所需的 NumPy 基础。
previous_url: /learn/python/types-testing/
previous_title: 18 Type Hint、Dataclass 与测试基础
next_url: /learn/python/numpy-operations/
next_title: 20 NumPy 数据操作
---

## 学习目标

完成本课后，你可以：

- 创建一维、二维和三维 `ndarray`；
- 解释 `shape`、`ndim`、`dtype` 和 `axis`；
- 根据元素总数判断 `reshape` 是否可行；
- 在执行代码前预测常见数组的输出形状。

## ndarray 是规则的数值容器

```python
import numpy as np

vector = np.array([10, 20, 30], dtype=np.int64)
matrix = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.float32)
images = np.zeros((4, 3, 32, 32), dtype=np.float32)

print(vector.shape, vector.ndim, vector.dtype)
print(matrix.shape, matrix.ndim, matrix.dtype)
print(images.shape, images.ndim, images.dtype)
```

输出的形状分别是 `(3,)`、`(2, 3)` 和 `(4, 3, 32, 32)`。最后一个常见解释是：4 个样本、3 个颜色通道、每个通道高 32、宽 32。`shape` 是一个 tuple；`ndim` 是轴的数量；`dtype` 决定每个元素怎样存储和计算。

## 逐维理解 shape

不要只把 `(2, 3, 4)` 读成“三维”。把每个数字和领域含义对应起来：

```python
import numpy as np

batch = np.zeros((2, 3, 4))
samples, features, measurements = batch.shape
print(samples, features, measurements)
```

`batch[0]` 的形状是 `(3, 4)`，`batch[:, 0]` 的形状是 `(2, 4)`。索引一个轴上的一个位置，会移除那个轴；切片会保留该轴。

## reshape 与元素总数

`reshape` 只能重新组织元素，不能凭空增加或删除元素：

```python
import numpy as np

values = np.arange(12)
matrix = values.reshape(3, 4)
cube = values.reshape(2, 2, 3)
print(values.size, matrix.shape, cube.shape)
```

12 个元素可以变成 `(3, 4)` 或 `(2, 2, 3)`，因为各维乘积都是 12。`reshape(5, 3)` 会抛出 `ValueError`。`-1` 可以让 NumPy 自动推断一个维度，例如 `values.reshape(3, -1)` 得到 `(3, 4)`。

## axis：数据沿哪个方向聚合

```python
import numpy as np

scores = np.array([[0.8, 0.9, 0.7], [0.6, 0.5, 0.4]])
print(scores.sum(axis=0))
print(scores.sum(axis=1))
```

`axis=0` 合并第一维，结果保留列，形状从 `(2, 3)` 变为 `(3,)`；`axis=1` 合并第二维，结果形状变为 `(2,)`。先写出输入 shape，再决定 axis，能避免把样本轴和特征轴弄反。

## 常见错误

- 把 `(3,)` 和 `(3, 1)` 当成同一个形状；前者是一维数组，后者是二维列向量。
- `reshape` 的目标元素总数不匹配，得到 `ValueError`。
- 默认整数数组与浮点数组混用时，结果 dtype 可能发生提升；需要稳定类型时显式指定 `dtype`。

## Shape prediction

先写答案，再运行：

```python
data = np.zeros((4, 3, 32, 32))
print(data[0].shape)
print(data[:, 1].shape)
print(data.reshape(4, -1).shape)
```

<details class="lesson-answer"><summary>完整答案</summary>
<p>三个形状依次是 <code>(3, 32, 32)</code>、<code>(4, 32, 32)</code> 和 <code>(4, 3072)</code>。最后一维把 3×32×32 个特征展平为 3072。</p>
</details>

## 练习

### ★ 基础：数组身份证

创建 `(5,)`、`(2, 3)` 和 `(4, 3, 32, 32)` 三个数组，打印每个数组的 `shape`、`ndim`、`dtype` 和 `size`。

### ★★ 应用：批次重排

一个数组有 24 个元素。写出两种不同的三维 shape，并用 `reshape` 验证。再解释哪个维度可以作为 batch 维。

### ★★★ 综合：shape 审查

给定 `features = np.arange(48).reshape(4, 3, 4)`，预测 `features[:, :, 0].shape`、`features.mean(axis=2).shape` 和 `features.reshape(4, -1).shape`，然后用 `assert` 验证答案。

<details class="lesson-answer"><summary>综合练习参考答案</summary>

```python
import numpy as np

features = np.arange(48).reshape(4, 3, 4)
assert features[:, :, 0].shape == (4, 3)
assert features.mean(axis=2).shape == (4, 3)
assert features.reshape(4, -1).shape == (4, 12)
print("shape checks passed")
```

</details>

## 小结与速查表

| 属性/操作 | 作用 |
|---|---|
| `array.shape` | 每个轴的长度 |
| `array.ndim` | 轴的数量 |
| `array.dtype` | 元素数据类型 |
| `array.size` | 元素总数 |
| `reshape(...)` | 在元素总数不变时重排形状 |
| `sum(axis=0)` | 合并第一个轴，保留后续轴 |

## D2L 衔接

D2L 中的图像批次、特征矩阵和标签都依赖 shape 语义。你能解释 `(4, 3, 32, 32)`、预测 reshape 后的结果，并区分 `axis=0` 与 `axis=1` 后，才适合进入向量化和 Tensor 代码。
