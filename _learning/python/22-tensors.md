---
title: PyTorch Tensor 基础
permalink: /learn/python/tensors/
lesson_id: "22"
module: "6 - 通往深度学习"
description: 从创建、shape 和 device 到索引、reshape 与矩阵乘法，建立 Tensor 基础。
previous_url: /learn/python/numpy-tools/
previous_title: 21 NumPy Random、Matplotlib 与 Jupyter 实战
next_url: /learn/python/tensor-bridge/
next_title: 23 Broadcasting、Autograd 与 DataLoader 预览
---

## 学习目标

- 使用 `tensor`、`zeros`、`ones`、`randn` 创建 Tensor；
- 检查 `shape`、`ndim`、`dtype` 和 `device`；
- 使用索引、切片、`reshape`/`view`；
- 区分逐元素乘法 `*` 与矩阵乘法 `@`/`matmul`。

## 创建与检查 Tensor

```python
import torch

explicit = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)
zeros = torch.zeros((2, 3))
ones = torch.ones((2, 3))
random = torch.randn((2, 3), generator=torch.Generator().manual_seed(7))

print(explicit.shape, explicit.ndim, explicit.dtype, explicit.device)
print(zeros.shape, ones.shape, random.shape)
```

默认 Tensor 在 CPU 上。`device` 表示数据所在的计算设备；有 CUDA 时可以写 `device = torch.device("cuda")`，否则使用 CPU。`.to(device)` 返回放到目标设备上的 Tensor：

接着上一段 `explicit` 代码运行；如果单独复制，请先保留上一段的 `import torch` 和 `explicit` 定义。

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
data = explicit.to(device)
print(data.device)
```

## 索引、切片与 reshape

```python
import torch

x = torch.arange(12).reshape(3, 4)
print(x[0].shape)       # (4,)
print(x[:, 1:3].shape)  # (3, 2)
flat = x.reshape(2, 6)
print(flat.shape)
```

`reshape` 需要元素总数不变。`view` 也能改变形状，但要求底层存储连续；初学时优先用 `reshape`，把 `view` 理解为更严格的同类操作。

## 逐元素乘法 vs 矩阵乘法

```python
import torch

a = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
b = torch.tensor([[10.0, 20.0], [30.0, 40.0]])
print((a * b))
print(a @ b)
print(torch.matmul(a, b).shape)
```

`a * b` 在对应位置相乘，输出仍是 `(2, 2)`；`a @ b` 做线性代数中的矩阵乘法，输出 shape 为 `(2, 2)`，数值也完全不同。不要根据“都有两个星号/两个矩阵”猜含义，要看运算符。

## Shape prediction

```python
import torch

features = torch.zeros((4, 3, 8))
print(features[:, 0].shape)
print(features.reshape(4, -1).shape)
```

<details class="lesson-answer"><summary>完整答案</summary><p>第一个 shape 是 <code>(4, 8)</code>，因为索引掉了通道轴；第二个是 <code>(4, 24)</code>，因为每个样本的 3×8 个元素被展平。</p></details>

## 练习

### ★ 基础

创建 `(5, 2)` 的 `float32` Tensor，打印 `shape`、`ndim`、`dtype` 和 `device`。

### ★★ 应用

预测并验证 `(2, 3, 4)` Tensor 的 `[:, 1, :]`、`[0]` 和 `reshape(6, 4)` 的 shape。

### ★★★ 综合

给定两个 `(2, 2)` Tensor，分别计算逐元素乘法和矩阵乘法，打印结果并写一句解释；再用 `assert` 检查二者 shape 相同但数值不同。

<details class="lesson-answer"><summary>参考答案</summary>

```python
import torch

a = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
b = torch.tensor([[2.0, 1.0], [0.0, 2.0]])
elementwise = a * b
matrix = a @ b
assert elementwise.shape == matrix.shape == (2, 2)
assert not torch.equal(elementwise, matrix)
print(elementwise)
print(matrix)
```

</details>

## 小结与 D2L 衔接

Tensor 的 shape/dtype/device 决定它能否参与后续运算；索引和 reshape 遵循 NumPy 的许多规则；`*` 是逐元素乘法，`@` 是矩阵乘法。D2L 的模型参数、输入批次和标签都建立在这些基础上。
