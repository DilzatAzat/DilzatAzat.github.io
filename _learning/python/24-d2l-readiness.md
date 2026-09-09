---
title: 阅读 D2L 代码与准备度检查
permalink: /learn/python/d2l-readiness/
lesson_id: "24"
module: "6 - 通往深度学习"
description: 用一组可验证的能力测试判断自己是否可以停止 Python 前置学习并开始 D2L。
previous_url: /learn/python/tensor-bridge/
previous_title: 23 Broadcasting、Autograd 与 DataLoader
---

## 这不是“读完即通过”

READY 需要你能读、能预测、能运行、能解释。每题先写答案，再运行代码。建议把结果记录在一个独立的 `readiness_check.py` 或 notebook 中。

## 能力测试

### 1. Python code reading

解释下面代码的输出顺序，并指出 `records` 的类型：

```python
records = [{"name": "a", "score": 0.8}, {"name": "b", "score": 0.9}]
best = max(records, key=lambda record: record["score"])
print(best["name"], best["score"])
```

### 2. 容器、函数与类

完成以下检查：

```python
def summarize(values):
    return min(values), max(values)

low, high = summarize([0.2, 0.7, 0.4])
assert (low, high) == (0.2, 0.7)

class Meter:
    def __init__(self):
        self.total = 0

    def add(self, value):
        self.total += value

meter = Meter()
meter.add(3)
assert meter.total == 3
```

你应该能解释列表/字典、tuple unpacking、函数参数/返回值、instance、attribute、method、`self` 和 `__init__`。

### 3. NumPy shape、axis 与广播

预测后运行：

```python
import numpy as np

x = np.arange(24).reshape(4, 3, 2)
assert x[:, 1, :].shape == (4, 2)
assert x.mean(axis=2).shape == (4, 3)
assert (x + np.ones((1, 3, 2))).shape == (4, 3, 2)
```

说明为什么 `(4, 3, 2)` 与 `(1, 3, 2)` 兼容，以及为什么 `x.mean(axis=2)` 会移除最后一个轴。

### 4. Tensor indexing、reshape 与乘法

```python
import torch

a = torch.arange(12).reshape(3, 4)
assert a[:, 1:3].shape == (3, 2)
assert a.reshape(2, 6).shape == (2, 6)

left = torch.ones((2, 3))
right = torch.ones((3, 4))
assert (left @ right).shape == (2, 4)
```

另外解释 `left * right` 为什么不是这里的矩阵乘法：逐元素乘法要求可广播的 shape，而 `@` 遵循内维相等的矩阵规则。

### 5. Autograd 与 batch shape

```python
import torch
from torch.utils.data import DataLoader, Dataset

w = torch.tensor(0.5, requires_grad=True)
features = torch.tensor([2.0, 4.0])
targets = torch.tensor([1.0, 3.0])
loss = ((w * features - targets) ** 2).mean()
loss.backward()
assert w.grad is not None
assert w.grad.item() != 0

class Tiny(Dataset):
    def __init__(self):
        self.x = torch.arange(6, dtype=torch.float32).reshape(6, 1)
        self.y = 2 * self.x.squeeze(1)

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        return self.x[index], self.y[index]

loader = DataLoader(Tiny(), batch_size=2, shuffle=False)
batch_x, batch_y = next(iter(loader))
assert batch_x.shape == (2, 1)
assert batch_y.shape == (2,)
```

你应该能说出 `requires_grad`、计算图、标量 loss、`backward()`、`.grad`、`Dataset` 的 `__len__`/`__getitem__` 和 DataLoader 的 `batch_size` 分别做什么。

## D2L 风格代码阅读（D2L-style code reading）

```python
def train_epoch(model, data_iter, learning_rate):
    losses = []
    for X, y in data_iter:
        pred = model(X)
        loss = ((pred - y) ** 2).mean()
        loss.backward()
        losses.append(loss.item())
    return sum(losses) / len(losses)
```

回答四个问题：`X` 和 `y` 从哪里来？为什么 `losses` 是列表而不是 Tensor？为什么 `loss.backward()` 放在循环中？如果 `data_iter` 没有 batch，哪些 shape 信息会改变？能用前面课程的知识回答这些问题，才算完成代码阅读部分。

## Before D2L Mini Challenge

下面是一段最小但完整的训练流。先不运行，逐项回答问题，再复制运行：

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

data_loader = DataLoader(LineDataset(), batch_size=2, shuffle=False)
model = LinearModel()
loss_fn = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)

for X, y in data_loader:
    prediction = model(X)
    loss = loss_fn(prediction, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    break
```

请回答：

1. Dataset 的一个 sample 是什么？
2. DataLoader 的一个 batch 是什么？
3. `X` 的 shape 是什么？
4. `y` 的 shape 是什么？
5. `model` 是什么对象？
6. `model(X)` 为什么可以执行？
7. 实际调用的是哪个 `forward()`？
8. `prediction` 的 shape 是什么？
9. 为什么 `loss` 最好是 scalar？
10. `backward()` 产生什么？
11. gradients 保存在哪里？
12. `zero_grad()` 为什么存在？
13. `optimizer.step()` 做什么？
14. 下一轮 batch 又会发生什么？

## 评分与 gate

总共 14 个检查点：Python 代码阅读 2 个、容器/函数/类 2 个、NumPy 3 个、Tensor 3 个、Autograd 2 个、Dataset/DataLoader 2 个。每个能运行且能解释的检查点得 1 分。

- **BEGINNER（0–8）**：继续学习本课程中得分最低的模块，并重新运行对应练习。
- **READY（9–11，且第 4、5 组各至少 2 分）**：可以停止 Python prerequisite 学习，正式开始 Dive into Deep Learning；遇到细节再查阅。
- 另外，Before D2L Mini Challenge 至少答对 12/14 题；否则先回到 Lesson 17 或 23 的训练流练习。
- **STRONG（12–14）**：可以开始 D2L，并能独立调试一个小型 notebook 或 batch 迭代。

READY 不是永久证书，而是一个行动门槛：你已经具备阅读 D2L 基础代码的最低能力，不需要把 Python 学成百科全书。

## 逐 checkpoint 参考答案

1. 输出是 `b 0.9`；`max(..., key=...)` 比较每条字典的 `score`，所以最后留下分数更高的记录。
2. `records` 的类型是 `list[dict]`；列表保留顺序，字典用 `name` 和 `score` 键保存字段。
3. `summarize` 返回 `(0.2, 0.7)`；两个名称按顺序解包 tuple。
4. `meter` 是 `Meter` instance，`total` 是它的 attribute；`add(3)` 通过 method 把状态改为 3。
5. `x[:, 1, :]` 的 shape 是 `(4, 2)`；索引掉中间轴，保留 batch 和最后一轴。
6. `x.mean(axis=2)` 的 shape 是 `(4, 3)`；聚合最后一轴后该轴被移除。
7. `(4, 3, 2)` 与 `(1, 3, 2)` 从末轴比较时分别为 `2=2`、`3=3`、`4` 与 `1`，所以广播结果为 `(4, 3, 2)`。
8. `a[:, 1:3]` 的 shape 是 `(3, 2)`；`a.reshape(2, 6)` 的 shape 是 `(2, 6)`，元素总数仍为 12。
9. `left @ right` 的 shape 是 `(2, 4)`，因为内维 `3` 相等；`left * right` 是逐元素运算，要求可广播 shape，不能替代矩阵乘法。
10. `requires_grad=True` 让运算记录计算图；`backward()` 从 scalar loss 反向计算每个参数的导数。
11. `.grad` 保存当前梯度；这个例子中 `w.grad` 非空且非零，因为预测误差会随 `w` 改变。
12. Dataset 的 `__len__` 返回样本数，`__getitem__` 返回一个 `(x, y)` sample；DataLoader 通过它们组织索引。
13. `batch_size=2` 每次取两条 sample；第一批 `batch_x.shape == (2, 1)`、`batch_y.shape == (2,)`。
14. `train_epoch` 每轮从 `data_iter` 取一个 batch，计算 prediction 和 loss，收集 `loss.item()` 这个 Python 标量，最后返回平均值；没有 batch 时，`X`/`y` 会失去首个 batch 维度，代码中的 shape 契约也会改变。

## Mini Challenge 参考答案

1. 一个 sample 是 `LineDataset.__getitem__` 返回的 `(self.X[index], self.y[index])`，各自 shape 为 `(1,)`。
2. 一个 batch 是 DataLoader 把两个 sample 沿首轴堆叠后的 `(X, y)`，不是单个 sample。
3. `X.shape == (2, 1)`：batch 中有 2 条样本，每条 1 个特征。
4. `y.shape == (2, 1)`：每条样本有 1 个回归目标，和 prediction 对齐。
5. `model` 是 `LinearModel` instance，也是 `nn.Module` instance。
6. `nn.Module` 对象是 callable；`model(X)` 进入 Module call path，而不是普通属性读取。
7. 调用的是这个实例的 `LinearModel.forward(X)`，其中再调用 `self.linear(X)`。
8. `prediction.shape == (2, 1)`，因为线性层把 1 个输入特征映射成 1 个输出。
9. scalar loss 只有一个数，`backward()` 才能直接从它沿计算图聚合出参数梯度。
10. `backward()` 计算 loss 对 model parameters 的梯度。
11. 梯度保存在每个 registered parameter 的 `.grad` 属性中，例如 `model.linear.weight.grad`。
12. 梯度默认会累积；`zero_grad()` 在当前 batch 反向传播前清掉上一轮残留值。
13. `optimizer.step()` 读取 `.grad`，按学习率更新 optimizer 管理的 parameters。
14. 下一批再次经过 DataLoader → `model(X)` → loss → `zero_grad()` → `backward()` → `step()`；参数已经是上一批更新后的值。

把你的得分、一个失败的断言和修复过程保存下来。如果达到 READY，现在就可以打开 D2L 的第一章；如果没有达到，回到对应 lesson 完成 ★★★ 综合练习后再测一次。
