---
title: 灵活的函数参数
permalink: /learn/python/function-parameters/
lesson_id: "12"
module: "3 - 函数与 Pythonic 写法"
description: 掌握默认参数、关键字参数、*args 和 **kwargs，读懂常见工具函数接口。
previous_url: /learn/python/functions/
previous_title: 11 函数、参数与返回值
next_url: /learn/python/modules-scope/
next_title: 13 作用域、模块与 import
---

## 定义和调用如何对应

```python
def train(learning_rate, batch_size=64, device="cpu"):
    return {"lr": learning_rate, "batch": batch_size, "device": device}

positional = train(1e-3, 32)
keyword = train(learning_rate=2e-3, batch_size=16, device="cuda")
print(positional)
print(keyword)
```

定义中的参数按位置接收值：`train(1e-3, 32)` 把两个实参依次绑定到 `learning_rate` 和 `batch_size`。关键字调用显式写出名称，顺序可以不同。`device` 没有传入时使用默认值 `"cpu"`。默认值应是稳定、简单的值；不要把可变列表作为默认参数。

## `*args` 与 `**kwargs`

```python
def average(*values):
    return sum(values) / len(values)

def show_config(**config):
    for key, value in config.items():
        print(key, value)

print(average(0.8, 0.6, 0.4))
show_config(seed=7, workers=2)
```

`*args` 收集额外的位置参数为元组，`**kwargs` 收集额外的关键字参数为字典。它们适合包装器和配置转发，但不应掩盖函数真正需要的参数。

## 解包调用（Preview）

```python
settings = {"learning_rate": 1e-3, "batch_size": 32}
print(train(**settings))  # Preview：字典解包会在 Lesson 14 正式讲解
```

字典键必须与参数名匹配。列表或元组可以用 `*values` 解包为位置参数。

## 练习

### ★ 基础：位置、关键字和默认参数

调用 `train(1e-3)`、`train(learning_rate=1e-3, device="cuda")`，预测两个字典的内容。说明第二次调用为什么仍得到默认 `batch_size`。

### ★★ 应用：可变数量的指标

使用 `average(*scores)` 计算三次验证分数，并用 `show_config(**settings)` 打印一个配置字典。

### ★★★ 综合：训练配置转发

写一个函数接收显式 `name`、默认 `device` 和任意 `**metadata`，返回一份可记录实验的字典；调用时同时使用位置参数、关键字参数和字典解包。

<details class="lesson-answer"><summary>分级参考答案</summary>

### ★ 基础答案

```python
def train(learning_rate, batch_size=64, device="cpu"):
    return {"lr": learning_rate, "batch": batch_size, "device": device}

assert train(1e-3) == {"lr": 1e-3, "batch": 64, "device": "cpu"}
assert train(learning_rate=1e-3, device="cuda")["batch"] == 64
```

第一次只提供必需参数，后两个参数使用默认值；第二次按名称传参，仍未覆盖 `batch_size`。

### ★★ 应用答案

```python
def average(*scores):
    return sum(scores) / len(scores)

def show_config(**config):
    return ", ".join(f"{key}={value}" for key, value in sorted(config.items()))

assert average(0.8, 0.6, 0.4) == 0.6
settings = {"seed": 7, "workers": 2}
assert show_config(**settings) == "seed=7, workers=2"
```

`*scores` 在定义处收集位置参数为 tuple；`**settings` 在调用处把字典键映射回关键字参数。

### ★★★ 综合答案

```python
def record(name, device="cpu", **metadata):
    return {"name": name, "device": device, **metadata}

settings = {"seed": 7, "batch_size": 32}
run = record("baseline", **settings)
assert run == {"name": "baseline", "device": "cpu", "seed": 7, "batch_size": 32}
print(run)
```

`name` 是位置参数，`device` 使用默认值，`**settings` 把剩余键收集到 `metadata`；这样配置可以沿函数链显式流动。

</details>

## D2L 衔接

PyTorch 和 D2L 的 API 经常使用默认参数和关键字参数。理解参数如何绑定，才能安全地修改优化器、批大小或设备配置。
