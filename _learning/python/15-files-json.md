---
title: 文件、Path 与 JSON
permalink: /learn/python/files-json/
lesson_id: "15"
module: "4 - 实用 Python"
description: 使用 pathlib 和 JSON 读写实验配置、指标和可重建的结果文件。
previous_url: /learn/python/pythonic/
previous_title: 14 解包、lambda 与常见 Pythonic 写法
next_url: /learn/python/exceptions-debugging/
next_title: 16 异常与 Debugging
---

## 学习目标

- 用 `Path` 组合路径、创建目录和检查文件；
- 读写 UTF-8 文本；
- 用 JSON 保存只包含基本数据类型的配置和指标；
- 为缺失文件和无效 JSON 留出可诊断的处理路径。

## Path 比字符串拼路径更可靠

```python
from pathlib import Path

root = Path("runs")
config_path = root / "config.json"
root.mkdir(exist_ok=True)
print(config_path, config_path.parent)
```

`/` 运算符会按当前平台组合路径。`exists()`、`is_file()` 和 `glob("*.json")` 可用于检查输入。相对路径从当前工作目录开始，因此运行脚本前要确认终端位置。

## 读写文本与 JSON

下面是一个完整、可独立运行的配置 round-trip 示例：

```python
import json
from pathlib import Path

root = Path("runs")
root.mkdir(exist_ok=True)
config_path = root / "config.json"
config = {"learning_rate": 1e-3, "batch_size": 64, "tags": ["baseline"]}
config_path.write_text(json.dumps(config, indent=2), encoding="utf-8")
loaded = json.loads(config_path.read_text(encoding="utf-8"))
print(loaded["batch_size"], loaded["tags"])
```

JSON 支持字符串、数字、布尔值、`null`、列表和对象（Python 中对应 `None` 与字典）。它不保存 Python 类实例或函数。`indent=2` 只影响可读性，不改变数据。

## 用配置驱动一次实验

```python
import json
from pathlib import Path

config = {"model": "linear", "epochs": 3}
metrics = {"final_loss": 0.42, "config": config}
output_path = Path("runs") / "metrics.json"
output_path.parent.mkdir(exist_ok=True)
output_path.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
print(json.loads(output_path.read_text(encoding="utf-8"))["final_loss"])
```

把配置和结果一起保存，之后才能知道某个指标来自哪组超参数。真实项目中还应记录代码版本、随机种子和环境版本。

## 常见错误

- 直接拼接 `"runs/" + filename` 在 Windows 上容易混用分隔符；用 `Path / filename`。
- 忘记 `encoding="utf-8"` 会让跨平台文本读写更难诊断。
- JSON 文件损坏或字段缺失时，不要默默使用错误默认值；在下一课用异常处理给出明确提示。

## 练习

### ★ 基础

创建 `outputs` 目录，写入包含模型名和指标的 JSON，再读回并打印指标。

### ★★ 应用

用 `Path.glob("*.json")` 列出目录中的配置文件，按文件名排序后打印。

### ★★★ 综合

写一个函数 `load_config(path)`：文件存在时读取 JSON，不存在时返回 `{"device": "cpu"}`；调用者应能区分真实配置和默认配置。

<details class="lesson-answer"><summary>参考答案</summary>

```python
import json
from pathlib import Path

def load_config(path: Path) -> dict:
    if not path.is_file():
        return {"device": "cpu"}
    return json.loads(path.read_text(encoding="utf-8"))

print(load_config(Path("missing.json")))
```

</details>

## 小结与速查表

`Path / name` 组合路径；`mkdir(exist_ok=True)` 创建目录；`write_text`/`read_text` 处理文本；`json.dumps`/`json.loads` 在 Python 数据和 JSON 文本间转换；配置和结果应一起保存以便复现。

## D2L 衔接

D2L 实验常把超参数、指标和数据路径写入配置文件。掌握 Path 和 JSON 后，你能独立检查“读的是哪个文件、配置是什么、结果保存在哪里”，再把问题交给模型或 Tensor 代码排查。
