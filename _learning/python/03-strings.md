---
title: 字符串（String）
permalink: /learn/python/strings/
lesson_id: "03"
module: "1 - Python 基础"
description: 用字符串表示文本、格式化实验信息，并处理常见的清洗操作。
previous_url: /learn/python/variables/
previous_title: 02 变量、对象与基本类型
next_url: /learn/python/lists/
next_title: 04 列表与元组
---

## 学习目标

- 创建字符串并理解引号与转义；
- 使用索引、切片和常用方法读取或清洗文本；
- 用 f-string 生成可读的日志和配置摘要。

## 字符串是不可变的文本序列

```python
model_name = "baseline"
message = 'training started'
print(model_name, message)
```

单引号和双引号都可以。字符串本身不可变，`replace()` 等操作会返回新字符串，而不会修改原值：

```python
raw_label = " Cat "
label = raw_label.strip().lower()
print(label)      # cat
print(repr(raw_label))  # ' Cat '
```

## 索引、切片与长度

字符串也是有顺序的序列，索引从 `0` 开始，负数从末尾计算：

```python
run_id = "exp-042"
print(run_id[0])
print(run_id[-1])
print(run_id[:3])
print(len(run_id))
```

索引越界会抛出 `IndexError`。切片的停止位置不包含在结果中，这个规则也适用于列表和 NumPy 数组。

## f-string：把数据写进文本

```python
epoch = 3
loss = 0.41726
print(f"epoch={epoch}, loss={loss:.3f}")
```

花括号里的表达式会被计算，`: .3f`（无空格写成 `:.3f`）表示保留三位小数。日志中使用明确的字段名，比只打印一个数字更容易排查实验。

## 常用方法

```python
line = "image_001.PNG"
print(line.lower().endswith(".png"))
print(line.removesuffix(".PNG"))
print("a,b,c".split(","))
print(" | ".join(["train", "valid"]))
```

`split()` 把字符串拆成列表，`join()` 则把多个字符串连接起来。`join()` 的调用者是分隔符，而不是列表。

## AI 场景

数据集元数据经常来自 CSV、JSON 或文件名。先把原始文本清洗成稳定的标签，再交给后续代码：

```python
filename = "  dog_0007.jpg  "
stem = filename.strip().removesuffix(".jpg")
label, sample_id = stem.split("_")
print(f"label={label}, id={sample_id}")
```

这里的 `split()` 假设文件名格式稳定；真实项目中应对异常格式做检查。

## 常见错误

- `text[0] = "A"` 会失败，因为字符串不可变；使用拼接或 `replace()` 得到新字符串。
- `"-".join(1, 2)` 传入了两个参数而不是一个可迭代对象；应使用 `"-".join(["1", "2"])`。
- `strip()` 只删除首尾空白，不会删除中间空格。

## 快速检查

字符串 `tag = "  CNN-v2  "` 清洗后怎样得到 `cnn-v2`？`tag[2:5]` 取出哪些字符？

<details class="lesson-answer"><summary>查看答案</summary><p>使用 <code>tag.strip().lower()</code>；切片从索引 2 开始到索引 4，结果是 <code>CNN</code>（原字符串索引 2 到 4）。</p></details>

## 练习

1. 创建一个模型名称和版本号，用 f-string 输出 `name=v..., version=...`。
2. 把一个包含多余空格的逗号分隔标签字符串拆开，并分别调用 `strip()`。
3. Challenge：解析 `"valid:0.812"`，得到阶段名和浮点分数，并打印三位小数。

<details class="lesson-answer"><summary>一种可能的实现</summary>

```python
record = "valid:0.812"
stage, score_text = record.split(":")
score = float(score_text)
print(f"{stage}={score:.3f}")
```

</details>

## 小结与 D2L 衔接

字符串是不可变的文本序列；索引和切片遵循统一的半开区间规则；f-string 让训练日志更可读。D2L 代码中的文件名、设备名、日志和配置键都依赖这些基础操作。下一课把多个值组织成列表和元组。
