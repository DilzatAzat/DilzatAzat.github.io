---
title: 面向 AI 代码的类（Classes）
permalink: /learn/python/classes/
lesson_id: "17"
module: "4 - 实用 Python"
description: 只学习读懂模型代码所需的 class、instance、attribute、method、self 和继承。
previous_url: /learn/python/exceptions-debugging/
previous_title: 16 异常与 Debugging
next_url: /learn/python/types-testing/
next_title: 18 Type Hint、Dataclass 与测试基础
---

## 类和实例

```python
class Counter:
    def __init__(self, start=0):
        self.value = start

    def add(self, amount=1):
        self.value += amount

counter = Counter()
counter.add(3)
print(counter.value)
```

`Counter` 是类，`counter` 是实例。`self` 指向当前实例；`__init__` 在创建实例时初始化属性；方法是属于类的函数。

实例化、调用方法、读取属性组成了最小的对象工作流：先 `Counter()`，再 `add(3)`，最后读取 `value`。每个实例都有自己的属性状态。

## 继承与 super

接着前面的 `Counter` 类代码运行；这里创建一个子类来复用父类方法。

```python
class NamedCounter(Counter):
    def __init__(self, name):
        super().__init__()
        self.name = name
```

```python
named = NamedCounter("train")
named.add(2)
print(named.name, named.value)
```

继承可以复用父类行为。理解到这里足以读懂 `class MyModel(nn.Module)` 的基本形状，不需要深入元类或描述符。

## 从 Python Class 到 PyTorch `nn.Module`

`nn.Module` 是 PyTorch 提供的模型基类。继承它，PyTorch 才能发现子模块和参数，并提供统一的模型调用、保存和 hooks 机制。通常在 `__init__()` 中定义层，在 `forward()` 中定义数据怎样流过这些层：

```python
import torch
import torch.nn as nn

class TinyModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, X):
        return self.linear(X)

model = TinyModel()
X = torch.tensor([[1.0], [2.0], [3.0]])
y_hat = model(X)

print(isinstance(model, TinyModel))
print(model.linear)
print(X.shape, y_hat.shape)
print([tuple(parameter.shape) for parameter in model.parameters()])
```

`super().__init__()` 初始化父类的 Module 状态；如果省略它，子模块注册和参数管理会失效。`self.linear` 放在 `__init__()` 中后成为一个 registered submodule，它的 weight 和 bias 会出现在 `model.parameters()` 中。

`forward(self, X)` 中的 `self` 是当前模型实例，`X` 是输入 batch。模型对象是 callable 的，因此 `model(X)` 会进入 Module 的调用路径，最终执行你定义的 `forward(X)`，同时保留 Module 自身的 hooks 等机制。课程只需要记住这条路径：

`model(X) → Module call path → forward(X) → prediction`

不要直接写 `model.forward(X)` 作为常规调用，因为那会绕过 Module 调用机制。上面的 `X` 是 `(3, 1)`，线性层把每个样本的 1 个特征映射为 1 个输出，所以 `y_hat` 是 `(3, 1)`；参数 shape 是 weight `(1, 1)` 和 bias `(1,)`。

## 练习

### ★ 基础

阅读上面的 `TinyModel`，指出 `model`、`linear`、`X`、`y_hat` 的类型或 shape。

### ★★ 应用

把 `nn.Linear(1, 1)` 改成 `nn.Linear(2, 1)`，创建 shape 为 `(4, 2)` 的 `X`，预测输出 shape。

### ★★★ 综合

创建一个带名称的 `RunningMetric` 子类并在初始化时调用 `super()`；再说明为什么 `TinyModel` 也需要 `super().__init__()`。PyTorch 模型把参数保存为属性，把前向计算写成方法，本课的对象 mental model 会在 Tensor 课程中复用。

<details class="lesson-answer"><summary>综合练习参考答案</summary>

```python
class Metric:
    def __init__(self, name):
        self.name = name
        self.value = 0.0

    def update(self, value):
        self.value = value

class RunningMetric(Metric):
    def __init__(self, name, count=0):
        super().__init__(name)
        self.count = count

    def update(self, value):
        super().update(value)
        self.count += 1

train = RunningMetric("train")
valid = RunningMetric("valid", count=2)
train.update(0.42)
valid.update(0.51)
assert train.name == "train" and train.count == 1
assert valid.name == "valid" and valid.count == 3
print(train.name, train.value, valid.name, valid.value)
```

</details>

<details class="lesson-answer"><summary>PyTorch 练习参考答案</summary>

### ★ 基础答案

`model` 是 `TinyModel` 的 instance，`model.linear` 是 `nn.Linear` 子模块，`X` 是 shape `(3, 1)` 的 Tensor，`y_hat` 是 shape `(3, 1)` 的 Tensor。每一行输入对应一行预测。

### ★★ 应用答案

```python
import torch
from torch import nn

model = nn.Linear(2, 1)
X = torch.zeros((4, 2))
assert model(X).shape == (4, 1)
```

`nn.Linear(2, 1)` 要求最后一维为 2，并把每个样本映射成 1 个输出；batch 维 4 保留。

### ★★★ 综合答案

```python
class Metric:
    def __init__(self, name):
        self.name = name
        self.value = 0.0

    def update(self, value):
        self.value = value

class RunningMetric(Metric):
    def __init__(self, name, count=0):
        super().__init__(name)
        self.count = count

metric = RunningMetric("train")
metric.update(0.4)
assert metric.name == "train" and metric.count == 0
```

`super()` 让子类复用父类初始化；`TinyModel` 调用 `super().__init__()` 是为了让 `nn.Module` 注册 `linear` 和管理它的参数。

</details>
