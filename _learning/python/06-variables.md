---
title: 变量、对象与基本类型
permalink: /learn/python/variables/
lesson_id: "02"
module: "1 - Python 基础"
description: 理解名称与对象的绑定，掌握 int、float、bool、None，以及 AI 配置中常见的变量写法。
previous_url: /learn/python/environment/
previous_title: 01 Python 环境与工作流
next_url: /learn/python/strings/
next_title: 03 字符串
---

## 学习目标

- 解释变量名如何绑定到对象；
- 使用 `int`、`float`、`bool` 和 `None`；
- 区分赋值 `=` 与相等比较 `==`；
- 写出清晰、稳定的实验配置变量。

## 名称绑定到对象

```python
learning_rate = 0.001
batch_size = 64
model_name = "baseline"
```

更准确的说法是：名称指向对象，而不是创建一个永久类型的盒子。名称可以重新绑定：

```python
batch_size = 64
batch_size = 128
print(batch_size)  # 128
```

Python 会使用最近一次绑定。灵活不等于随意；一个作用域中让一个名称保持一个含义，程序更容易读。

## 基本类型

```python
examples = 120       # int
learning_rate = 1e-3 # float
shuffle = True       # bool
checkpoint = None    # NoneType：当前没有值
```

`bool` 是真/假值；`None` 表示缺失或尚未产生的结果，不等于 `0`。需要区分缺失值时写 `checkpoint is None`。

## 命名与运算

名称可以含字母、数字和下划线，但不能以数字开头；Python 区分大小写。配置和数据处理代码优先使用能表达含义或单位的 snake_case：

```python
timeout_seconds = 30
image_width_pixels = 224
num_epochs = 10
```

表达式会先计算，再绑定结果：

```python
training_steps = 1_200
examples_seen = training_steps * batch_size
print(examples_seen)
```

## 重新赋值与累加

```python
epoch = 0
epoch = epoch + 1
total_loss = 0.0
total_loss += 0.42
total_loss += 0.31
print(epoch, total_loss)  # 1 0.73
```

`+=` 是“计算后重新绑定”的简写。训练循环常用它更新计数器或累积指标。

## 常见错误

### 在绑定前使用名称

```python
print(validation_loss)
validation_loss = 0.25
```

执行顺序是从上到下，因此会产生 `NameError`。

### 把赋值写成比较

```python
batch_size = 64  # 赋值
batch_size == 64 # 比较，结果为 True
```

### 意外改变含义

```python
num_epochs = 10
num_epochs = "ten"
```

Python 允许重新绑定为字符串，但后续算术会失败。保持名称语义稳定，比依赖隐式转换更安全。

## AI 配置示例

```python
learning_rate = 1e-3
batch_size = 64
num_epochs = 10
run_name = "first-baseline"
training_steps = 1_200
examples_seen = training_steps * batch_size

print(f"{run_name}: {examples_seen} examples")
```

这些变量以后会流入函数、字典、优化器和 DataLoader。先写清楚名称，改实验时才不会误改含义。

## 快速检查

预测下面代码的输出，并解释重新绑定发生在哪里：

```python
batch_size = 32
steps = 100
batch_size = batch_size * 2
examples = batch_size * steps
print(examples)
```

<details class="lesson-answer"><summary>查看答案</summary><p>输出是 <code>6400</code>。第三行把 <code>batch_size</code> 重新绑定为 64，下一行计算 64×100。</p></details>

## 练习

### ★ 基础

创建 `training_settings.py`，保存学习率、批大小、epoch 数和模型名，并带标签打印。

### ★★ 应用

增加 `batches_per_epoch`，计算单 epoch 和全部 epoch 处理的样本数；改变批大小并验证结果。

### ★★★ Challenge：内存估算

图像高 224、宽 224、3 个通道，每个值占 4 bytes。计算一个 batch 的 bytes 和 MiB，并用 `assert` 验证中间总元素数。

<details class="lesson-answer"><summary>参考答案</summary>

```python
image_height = 224
image_width = 224
channels = 3
bytes_per_value = 4
batch_size = 64
values_per_image = image_height * image_width * channels
assert values_per_image == 150528
batch_mib = values_per_image * bytes_per_value * batch_size / (1024 ** 2)
print(f"{batch_mib:.2f} MiB")
```

</details>

## 小结与速查表

`name = value` 绑定名称；`==` 比较相等；`int/float/bool/None` 是常见基本类型；`+=` 更新数值；`1e-3` 是科学计数法；`1_000` 只是更易读的整数写法。

## D2L 衔接

D2L 示例用变量暴露学习率、批大小、层宽、epoch 和 device 等实验决定。理解名称、对象和基本类型后，你可以有意识地修改这些配置，并追踪它们流向函数、集合和 Tensor。
