---
title: CUDA、Driver 与 PyTorch 环境层次
permalink: /learn/engineering-agent-for-ai/cuda-pytorch-stack/
lesson_id: "07"
module: "2 - Reproducible AI Environment"
description: 不背易过时的版本号，而是按层定位“GPU 看不见”问题。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/python-environments/
previous_title: 06 Python 解释器与项目环境
next_url: /learn/engineering-agent-for-ai/docker-mental-model/
next_title: 08 Docker mental model 与 Dockerfile
---

## 六层模型

```text
GPU hardware → NVIDIA driver → CUDA runtime/toolkit → PyTorch build
→ Python environment → application
```

上层能否使用下层，取决于兼容性和路径；“安装了 CUDA Toolkit”不等于当前 PyTorch wheel 就能用 GPU。预编译 PyTorch 包通常带有它需要的 CUDA runtime 组件；本地 toolkit 主要在编译自定义 CUDA 扩展时使用。版本相关选择应以 [PyTorch 安装页](https://pytorch.org/get-started/locally/)和 NVIDIA 当前文档为准。

## 两个最小探针

```bash
nvidia-smi
python -c "import torch; print(torch.__version__); print(torch.cuda.is_available()); print(torch.version.cuda)"
```

`nvidia-smi` 主要观察 driver 和 GPU；PyTorch 探针观察当前 Python 环境中的 build 和 runtime。安装了 CPU-only PyTorch 的机器也应能运行第二条并打印 `False`；只有没有安装 `torch` 或安装损坏时才会 import 失败。重点是记录层次，而不是伪造 GPU 结果。

## 诊断矩阵

| 现象 | 优先检查 |
|---|---|
| `nvidia-smi` 不存在 | 机器/驱动层，或你不在目标 server |
| 有 GPU，PyTorch 为 false | 当前 interpreter、PyTorch build、驱动兼容性 |
| import torch 失败 | 环境依赖或安装损坏 |
| 远程与本地结果不同 | 两台机器的 driver、环境和启动命令 |

不要在没有证据时“再装一次 CUDA”。先收集命令、解释器路径、PyTorch 版本和错误全文。

## 练习

在 CPU 机器生成一份诊断报告，明确哪些层不可观测；在有授权的 GPU server 上再运行同一报告，比较差异。把报告加入模板的 `docs/diagnostics/`，不要提交私有路径或 token。

<details class="lesson-answer"><summary>查看答案</summary>
<p>探针把问题分层：硬件/driver、PyTorch build、Python interpreter。只看到“CUDA 版本”无法证明应用真的拿到了 GPU。</p>
</details>

## 官方延伸阅读

- [PyTorch: Start locally](https://pytorch.org/get-started/locally/)
- [NVIDIA: CUDA Compatibility](https://docs.nvidia.com/deploy/cuda-compatibility/)
