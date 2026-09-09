---
title: Broadcasting、Autograd 与 DataLoader
permalink: /learn/python/tensor-bridge/
lesson_id: "23"
module: "6 - 通往深度学习"
description: 通过非零梯度和极小数据集，读懂 D2L 中最基本的训练数据流。
previous_url: /learn/python/tensors/
previous_title: 22 PyTorch Tensor 基础
next_url: /learn/python/d2l-readiness/
next_title: 24 阅读 D2L 代码与准备度检查
---

## 学习目标

- 解释 `requires_grad`、计算图（computational graph）、标量 loss 和 `backward()`；
- 从 `.grad` 读取一个非零梯度并解释其方向；
- 写出极小的 `Dataset`，用 `DataLoader` 迭代 batch；
- 预测一个 batch 的 shape。

## 广播先检查 shape

```python
import torch

predictions = torch.tensor([[0.2], [0.8], [0.4]])
target = torch.tensor([0.5])
error = predictions - target
print(predictions.shape, target.shape, error.shape)
```

`(3, 1)` 与 `(1,)` 可以广播成 `(3, 1)`。广播不会改变 batch 轴的含义；如果两个 shape 从末轴比较时既不相等也没有 1，就会报错。

## Autograd：从预测到非零梯度

```python
import torch

weight = torch.tensor(0.5, requires_grad=True)
features = torch.tensor([2.0, 4.0])
targets = torch.tensor([1.0, 3.0])
predictions = weight * features
loss = ((predictions - targets) ** 2).mean()
loss.backward()

print(f"loss={loss.item():.3f}")
print(f"gradient={weight.grad.item():.3f}")
```

`requires_grad=True` 让 PyTorch 记录依赖 `weight` 的运算，形成计算图。`loss` 是标量，`backward()` 沿图计算导数并把结果放入 `weight.grad`。这里梯度为非零值，表示稍微改变权重会改变 loss；训练器会利用这个方向更新参数。重复反向传播前通常要清零旧梯度。

## Dataset：定义一条样本

```python
import torch
from torch.utils.data import Dataset

class TinyDataset(Dataset):
    def __init__(self):
        self.features = [[1.0], [2.0], [3.0], [4.0], [5.0]]
        self.labels = [2.0, 4.0, 6.0, 8.0, 10.0]

    def __len__(self):
        return len(self.features)

    def __getitem__(self, index):
        x = torch.tensor(self.features[index])
        y = torch.tensor(self.labels[index])
        return x, y

dataset = TinyDataset()
print(len(dataset), dataset[0])
```

`__len__` 告诉工具数据集大小，`__getitem__` 定义如何取第 `index` 条样本。真实项目中这里可以读取文件名、图像或文本，但接口保持相同。

## DataLoader：按 batch 迭代

接着上一段 `TinyDataset` 代码运行；这里补充 DataLoader 的导入。

```python
from torch.utils.data import DataLoader

loader = DataLoader(dataset, batch_size=2, shuffle=False)
for batch_x, batch_y in loader:
    print(batch_x.shape, batch_y.shape)
    break
```

第一批的 shape 是 `batch_x=(2, 1)`、`batch_y=(2,)`。`batch_size` 决定一次取几条，`shuffle=True` 会在每轮开始前打乱索引。`DataLoader` 不负责模型计算；它只把 Dataset 组织成可迭代的 batch。

## 最小训练 step：把各部分串起来

下面是一个可运行的线性回归训练 step。它把 Dataset、DataLoader、`nn.Module`、`forward`、loss 和参数更新放在同一条数据流中：

```python
import torch
from torch import nn
from torch.utils.data import DataLoader, Dataset

class LineDataset(Dataset):
    def __init__(self):
        self.X = torch.tensor([[1.0], [2.0], [3.0], [4.0]])
        self.y = torch.tensor([[2.0], [4.0], [6.0], [8.0]])

    def __len__(self):
        return len(self.X)

    def __getitem__(self, index):
        return self.X[index], self.y[index]

class LinearModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, X):
        return self.linear(X)

torch.manual_seed(0)
data_loader = DataLoader(LineDataset(), batch_size=2, shuffle=False)
model = LinearModel()
loss_fn = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)

before = [parameter.detach().clone() for parameter in model.parameters()]
X, y = next(iter(data_loader))
predictions = model(X)
loss = loss_fn(predictions, y)
optimizer.zero_grad()
loss.backward()
optimizer.step()
after = list(model.parameters())

assert X.shape == (2, 1) and y.shape == (2, 1)
assert loss.item() > 0
assert all(parameter.grad is not None for parameter in model.parameters())
assert any(not torch.equal(old, new.detach()) for old, new in zip(before, after))
print(X.shape, y.shape, predictions.shape, f"loss={loss.item():.3f}")
```

执行顺序和职责如下：DataLoader 返回一个 batch 的 `X`/`y`；`model(X)` 通过 Module 调用路径进入 `forward` 得到预测；loss 把预测与标签压缩成一个 scalar；`zero_grad()` 清除上一轮残留梯度；`backward()` 沿计算图计算当前梯度并写入每个参数的 `.grad`；`optimizer.step()` 根据这些梯度更新参数。下一轮 batch 会重复同样流程。这里让 `y` 保持 `(batch, 1)`，避免和预测 `(batch, 1)` 发生意外广播。

## 练习

### ★ 基础

修改 autograd 示例中的 `targets`，预测 loss 和梯度的变化方向，再运行验证。

### ★★ 应用

把 `TinyDataset` 改成 6 条样本，设置 `batch_size=3`，写出第一批和总批次数的 shape。

### ★★★ 综合与答案

写一个 batch 统计循环，计算所有标签的均值，并用 `assert` 确认每批输入第一维不超过 2。

<details class="lesson-answer"><summary>参考答案</summary>

```python
import torch
from torch.utils.data import DataLoader, Dataset

class TinyDataset(Dataset):
    def __init__(self):
        self.x = torch.arange(5, dtype=torch.float32).reshape(5, 1)
        self.y = 2 * self.x.squeeze(1)

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        return self.x[index], self.y[index]

loader = DataLoader(TinyDataset(), batch_size=2, shuffle=False)
labels = []
for batch_x, batch_y in loader:
    assert batch_x.shape[0] <= 2
    labels.append(batch_y)
print(torch.cat(labels).mean().item())
```

</details>

## 小结与 D2L 衔接

广播解决兼容 shape 的批量运算；Autograd 从标量 loss 沿计算图得到非零梯度；Dataset 定义单样本，DataLoader 定义 batch 迭代。看到 D2L 的 `loss.backward()` 和 `for X, y in data_iter` 时，你已经能追踪它们的职责和 shape。
