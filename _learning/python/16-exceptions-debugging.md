---
title: 异常与 Debugging
permalink: /learn/python/exceptions-debugging/
lesson_id: "16"
module: "4 - 实用 Python"
description: 读懂 traceback，用 try/except 处理可预期输入问题，并用最小实验定位错误。
previous_url: /learn/python/files-json/
previous_title: 15 文件、Path 与 JSON
next_url: /learn/python/classes/
next_title: 17 面向 AI 代码的类
---

## 学习目标

- 区分 `SyntaxError`、`NameError`、`TypeError`、`ValueError` 和 `KeyError` 等常见异常；
- 从 traceback 找到异常类型、文件和行号；
- 只捕获能够处理的异常；
- 用最小可复现示例（minimal reproducible example）调试数据处理代码。

## 先读 traceback 的最后一行

```python
values = [1, 2]
print(values[5])
```

最后一行会指出 `IndexError`；向上查找到自己的代码行，再检查索引、类型和输入。一次只改一个假设，保留能重现问题的最小示例。

## 异常类型提供线索

```python
print(missing_name)       # NameError
int("3.5")                # ValueError
{"a": 1}["b"]            # KeyError
```

`SyntaxError` 通常在代码运行前发现；`TypeError` 表示操作数类型不适合；`ValueError` 表示类型对了但值不合法。错误名称不是噪声，而是排查方向。

## 处理可预期输入

```python
def parse_batch_size(text):
    try:
        value = int(text)
    except ValueError:
        return None
    return value if value > 0 else None

print(parse_batch_size("64"))
print(parse_batch_size("unknown"))
```

这里只捕获 `ValueError`，因为我们知道转换失败是可以处理的情况。不要使用空的 `except:` 把真正的程序错误吞掉；必要时用 `raise` 重新抛出并保留上下文。条件表达式只是这里的简短写法，读不懂时可以展开成 `if/else`。

## 调试 JSON 配置

```python
import json
from pathlib import Path

def load_batch_size(path: Path) -> int:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        value = int(data["batch_size"])
    except FileNotFoundError as error:
        raise RuntimeError(f"配置文件不存在：{path}") from error
    except (KeyError, ValueError, json.JSONDecodeError) as error:
        raise RuntimeError("配置缺少有效的 batch_size") from error
    if value <= 0:
        raise ValueError("batch_size must be positive")
    return value
```

这是一个可独立复制的函数示例。它把底层异常转换为更接近业务含义的错误，但没有隐藏原因：`from error` 保留了原始 traceback。

## AI 调试顺序

遇到训练异常时，按顺序检查：输入文件和配置、batch 的 `shape`、Tensor 的 `dtype`/`device`、再检查模型计算。打印少量样本和中间 shape，通常比一次添加大量日志更有效。

## 练习

### ★ 基础

为 `parse_batch_size` 增加空字符串、`"0"` 和 `"32"` 的测试，写出预期结果。

### ★★ 应用

写一个函数从字典读取 `learning_rate`，捕获缺失键和非法数值，并返回可读的错误信息。

### ★★★ Debugging challenge

下面的函数有两个问题。先预测异常，再修复并用 `assert` 验证：

```python
def mean_loss(values):
    return sum(values) / len(value)
```

<details class="lesson-answer"><summary>完整参考答案</summary>

```python
def mean_loss(values):
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)

assert mean_loss([1.0, 3.0]) == 2.0
try:
    mean_loss([])
except ValueError:
    pass
else:
    raise AssertionError("empty input should fail")
```

原代码把参数名 `values` 错写成 `value`，会产生 `NameError`；空列表还会产生除零错误，因此函数需要输入边界检查。

</details>

## 小结与速查表

先读 traceback 最后一行，再定位代码行；用异常类型判断排查方向；只捕获可处理的异常；用 `assert` 固定预期；用最小示例隔离 shape、dtype、路径和配置问题。

## D2L 衔接

D2L 调试不只是修语法：你还要判断数据 batch 是否为空、shape 是否兼容、dtype/device 是否一致。掌握 traceback 和最小示例后，遇到训练错误时能更快找到真正的边界。
