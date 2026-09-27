---
title: Capstone：故意破坏、调试与发布门
permalink: /learn/engineering-agent-for-ai/capstone-debug-release/
lesson_id: "15"
module: "5 - Integrated Project"
description: 在干净副本中验证模板，修复解释器、依赖、Docker 和指令边界问题。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/integrated-project/
previous_title: 14 综合项目：构建可复用的 AI Project Template
---

## 先像新用户一样运行

复制 `docs/engineering-agent-template/` 或 clone 你的模板到新目录，不依赖原目录的已激活环境。按 README 创建 `.venv`，运行 `python -m unittest discover -s tests` 和 `python scripts/check_project.py .`，再尝试 Docker 路径。记录解释器、依赖解析、测试和镜像结果；CPU 路径必须可用。

## 四次可恢复故障

1. 让 `python` 指向环境外的 interpreter，比较 `sys.executable`，修复启动说明。
2. 暂时删除一个直接依赖声明，观察安装/测试失败，恢复后重新验证。
3. 让 Dockerfile 复制不存在的文件，阅读 build context 错误并重建。
4. 在 `AGENTS.md` 中加入一条可验证规则，故意跳过它，让 Reviewer 报告缺口。

每次只改一个变量，保留失败输出，再写“症状 → 层次 → 修复 → 证据”。不要用 `reset --hard`、force push 或删除数据来清理实验。

## 发布门

```text
[ ] Git history 只包含解释得清的改动
[ ] .env、数据、checkpoint 和 build output 不在提交中
[ ] 新环境和 CPU smoke test 通过
[ ] Docker 行为、volume、port 在 README 中可复现
[ ] AGENTS.md 和 Skill 的边界清晰
[ ] Harness 有计划、验证、review、repair 证据
[ ] `logs/smoke.log` 和 `docs/diagnostics/smoke-report.md` 记录成功运行与未测试边界
[ ] Linux server 迁移步骤没有硬编码私密路径
```

## 最终交付

提交模板仓库、README、一次成功运行的日志摘要和一份诊断报告。你不需要搭建完整 Agent 平台；只要能解释谁负责什么、何时使用工具、如何发现错误、如何安全恢复，这个模板就已经成为下一次 AI 实验的起点。

## 练习

让一位同学或未来的自己只看 README，在新目录完成一次 smoke run。不要口头补充步骤；把对方卡住的地方改成更清晰的命令、前置条件或诊断说明。

<details class="lesson-answer"><summary>参考答案</summary>
<p>最终标准不是作者本人能运行，而是干净目录中的新使用者能按文档复现并理解失败。无法复现的隐含状态应被写进环境、脚本或 README。</p>
</details>

## 延伸阅读

- [GitHub: About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)
- [Docker: Get started](https://docs.docker.com/get-started/)
- [Model Context Protocol specification](https://modelcontextprotocol.io/specification)
