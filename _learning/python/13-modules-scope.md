---
title: 作用域、模块与 import
permalink: /learn/python/modules-scope/
lesson_id: "13"
module: "3 - 函数与 Pythonic 写法"
description: 理解名称查找、文件模块和导入方式，组织可复用的实验代码。
previous_url: /learn/python/function-parameters/
previous_title: 12 灵活的函数参数
next_url: /learn/python/pythonic/
next_title: 14 解包、lambda 与常见 Pythonic 写法
---

## 局部与全局作用域

```python
learning_rate = 1e-3

def show_rate():
    local_name = "demo"
    print(learning_rate, local_name)

show_rate()
```

函数调用时会创建局部作用域。函数可以读取外部名称（global lookup），但函数内创建的 `local_name` 只在函数执行期间存在；调用结束后，直接访问它会得到 `NameError`。优先通过参数传值、通过返回值传出，少用 `global` 修改外部状态：

```python
learning_rate = 1e-3

def scaled_rate(factor):
    temporary = learning_rate * factor
    return temporary

assert scaled_rate(10) == 0.01
```

这里 `learning_rate` 是查找到的全局名称，`factor` 和 `temporary` 是局部名称；返回值把结果带回调用者。

## 模块就是可导入的文件

模块就是一个 Python 文件。把函数放在 `metrics.py` 后，另一个文件可以写。下面假设两个文件与终端当前目录相同。

```python
# metrics.py
def accuracy(predictions, labels):
    correct = sum(prediction == label for prediction, label in zip(predictions, labels))
    return correct / len(labels)
```

示例假设 `predictions` 和 `labels` 长度一致；长度校验会在后面的异常课程中处理。

```python
# train.py，与 metrics.py 同目录
from metrics import accuracy

predictions = [1, 0, 1]
labels = [1, 1, 1]
print(accuracy(predictions, labels))
```

在该目录运行 `python train.py`，预期输出 `0.6666666666666666`。`from metrics import accuracy` 只导入函数；也可以写 `import metrics` 后使用 `metrics.accuracy(...)`，后者更清楚地显示名称来自哪个模块。

## `__name__` 入口保护

可执行模块常写：

```python
def main():
    print("run experiment")

if __name__ == "__main__":
    main()
```

直接运行文件时会调用 `main()`；被其他文件导入时不会自动运行。这能避免导入工具函数时意外启动实验。

## 练习

### ★ 基础：作用域阅读

预测 `show_rate()` 打印什么，并说明 `local_name` 为什么不能在函数外直接读取。

### ★★ 应用：模块边界

按上面的 `metrics.py` 和 `train.py` 文件边界运行一次，确认导入函数后能得到准确率。再把 `import` 改为 `import metrics`，保持输出不变。

### ★★★ 综合：入口保护

在 `metrics.py` 增加 `main()`，分别测试直接运行和被导入两种行为。D2L 项目通常把数据、模型和训练工具拆在不同模块中；清晰的 import 是阅读大型代码的入口。

<details class="lesson-answer"><summary>Challenge 参考答案</summary>

先保存为同一目录下的 `metrics.py`：

```python
def accuracy(predictions, labels):
    return sum(prediction == label for prediction, label in zip(predictions, labels)) / len(labels)

def main():
    print(accuracy([1, 0, 1], [1, 1, 1]))

if __name__ == "__main__":
    main()
```

再保存为 `run_metrics.py` 并运行 `python run_metrics.py`：

```python
from metrics import accuracy

print(accuracy([1, 1], [1, 0]))
```

直接运行 `metrics.py` 会打印 `0.6666666666666666`；导入它时不会自动执行 `main()`，`run_metrics.py` 只打印 `0.5`。`if __name__ == "__main__"` 是“只有把此文件作为脚本运行时才执行”的条件。

</details>
