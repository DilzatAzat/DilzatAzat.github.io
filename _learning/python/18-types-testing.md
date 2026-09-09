---
title: Type Hint、Dataclass 与测试基础
permalink: /learn/python/types-testing/
lesson_id: "18"
module: "4 - 实用 Python"
description: 用类型提示、dataclass 和小型断言提高实验代码的可读性与可信度。
previous_url: /learn/python/classes/
previous_title: 17 面向 AI 代码的类
next_url: /learn/python/numpy-basics/
next_title: 19 NumPy 基础
---

## 类型提示是文档

```python
def mean(values: list[float]) -> float:
    return sum(values) / len(values)
```

Python 默认不会强制执行提示，但编辑器和静态工具可以据此发现错误。提示应表达真实契约，不要为了消除警告而胡乱使用 `Any`。

## dataclass 表达数据记录

```python
from dataclasses import dataclass

@dataclass
class RunConfig:
    learning_rate: float = 1e-3
    batch_size: int = 64
```

`dataclass` 自动生成初始化和表示方法，适合配置或指标记录，不是替代所有类的魔法工具。

## 最小测试

```python
def clip(value: float) -> float:
    return max(0.0, min(value, 1.0))

assert clip(1.2) == 1.0
assert clip(-0.1) == 0.0
```

pytest 可以把这些断言组织成测试函数。创建 `test_metrics.py`：

```python
def clip(value: float) -> float:
    return max(0.0, min(value, 1.0))

def test_clip_bounds():
    assert clip(1.2) == 1.0
    assert clip(-0.1) == 0.0
```

在项目目录运行 `pytest`，pytest 会发现并执行 `test_` 开头的函数。本课只需理解“给定输入，检查预期输出”；不深入 fixture 或插件。为 `mean()` 写两个正常测试和一个空列表异常测试，能尽早发现数据处理问题。

## 分级练习

### ★ 基础

给 `clip()` 增加一个边界值测试。

### ★★ 应用

为 dataclass 配置写一个测试，确认默认 batch size 正确。

### ★★★ 综合

写一个 `mean()` 和三个 pytest 测试，覆盖正常值、单元素和空列表；为异常情况写出明确的 `pytest.raises` 断言。

<details class="lesson-answer"><summary>综合练习参考答案</summary>

```python
import pytest

def mean(values: list[float]) -> float:
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)

def test_mean_normal():
    assert mean([1.0, 3.0]) == 2.0

def test_mean_single():
    assert mean([0.5]) == 0.5

def test_mean_empty():
    with pytest.raises(ValueError, match="must not be empty"):
        mean([])
```

运行 `pytest` 后，三个测试都应通过。

</details>
