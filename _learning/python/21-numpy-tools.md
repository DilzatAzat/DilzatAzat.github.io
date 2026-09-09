---
title: NumPy Random、Matplotlib 与 Jupyter 实战
permalink: /learn/python/numpy-tools/
lesson_id: "21"
module: "5 - NumPy 与科学 Python"
description: 从数据生成到统计和绘图，完成一个可重复的 scientific Python mini-project。
previous_url: /learn/python/numpy-operations/
previous_title: 20 NumPy 数据操作
next_url: /learn/python/tensors/
next_title: 22 PyTorch Tensor 基础
---

## 学习目标

- 用显式随机数生成器创建可重复数据；
- 使用 NumPy 完成统计汇总；
- 用 Matplotlib 绘制并解释一条实验曲线；
- 理解 Jupyter 的 cell、内核状态和重启流程。

## 科学 Python 工作流（Scientific Python workflow）

这一课把工具串成一个小项目：生成每个 epoch 的训练损失，计算统计量，再绘图。每一步都先有一个普通 Python/NumPy 对象，最后才交给可视化工具。

```python
import numpy as np

rng = np.random.default_rng(7)
epochs = np.arange(1, 11)
loss = 1.2 * np.exp(-0.25 * (epochs - 1)) + rng.normal(0, 0.02, size=epochs.size)
print(epochs.shape, loss.shape)
print(f"best={loss.min():.3f}, final={loss[-1]:.3f}")
```

`default_rng(7)` 固定随机序列，便于复现实验。这里 `epochs` 和 `loss` 都是 `(10,)`；噪声也必须有相同长度，才能逐元素相加。

## 从数据到图表

接着上一段代码运行；`epochs` 和 `loss` 已在上一个完整示例中定义。

```python
import matplotlib.pyplot as plt

plt.plot(epochs, loss, marker="o", label="train loss")
plt.xlabel("epoch")
plt.ylabel("loss")
plt.title("Training curve")
plt.legend()
plt.tight_layout()
plt.show()
```

图表不是装饰：观察曲线可以发现没有下降、震荡或异常尖峰。保存图像时使用 `plt.savefig("loss.png", dpi=150)`；在 notebook 中显示时，最后一行或 `plt.show()` 都可以触发渲染。

## Jupyter 的工作方式

Notebook 由 Markdown cell 和代码 cell 组成，代码由一个内核（kernel）按执行顺序保存状态。你可以逐个运行 cell，立即查看数组和图表；但“曾经运行过”不等于“从头能运行”。

遇到变量凭空存在或结果异常时：重启内核，选择“Run All”，确认每个导入和初始化都在上方。把最终版本同步保存为 `.py` 文件，可以减少隐藏状态。

## 常见错误

- 没有固定随机种子，导致每次曲线不同，难以比较修改前后结果。
- `epochs` 长度与 `loss` 长度不一致，绘图会报错；先打印 shape。
- 在 notebook 里只运行中间 cell，依赖了旧变量或旧图形。

## 练习

### ★ 基础

固定种子生成 100 个正态随机数，打印均值、标准差、最小值和最大值。

### ★★ 应用

生成两条不同衰减率的 loss 曲线，在同一张图中绘制并加图例。先预测每条曲线的 shape。

### ★★★ Mini-project

模拟 20 个 epoch 的训练与验证损失，计算最后 5 个 epoch 的平均值，绘制两条曲线，并用 `assert` 检查数据长度。

<details class="lesson-answer"><summary>完整参考答案</summary>

```python
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(3)
epochs = np.arange(1, 21)
train = np.exp(-0.15 * epochs) + rng.normal(0, 0.01, 20)
valid = np.exp(-0.12 * epochs) + rng.normal(0, 0.015, 20)
assert epochs.shape == train.shape == valid.shape == (20,)
print(train[-5:].mean(), valid[-5:].mean())
plt.plot(epochs, train, label="train")
plt.plot(epochs, valid, label="valid")
plt.legend()
plt.show()
```

</details>

## 小结与速查表

| 步骤 | 工具 |
|---|---|
| 生成数据 | `np.random.default_rng(seed)` |
| 统计 | `mean`、`std`、`min`、`max` |
| 绘图 | `plt.plot`、`xlabel`、`legend` |
| 可重复 notebook | 重启内核后 Run All |

## D2L 衔接

D2L notebook 会反复执行“读取/生成数据 → 检查 shape → 统计 → 绘图”。掌握这个闭环后，你可以把同一流程迁移到训练损失、验证指标和 Tensor 转 NumPy 的结果上。
