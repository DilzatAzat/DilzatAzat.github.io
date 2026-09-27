---
title: Docker Compose 与项目选择边界
permalink: /learn/engineering-agent-for-ai/docker-compose/
lesson_id: "09"
module: "3 - Containers"
description: 用 Compose 描述多个服务、环境变量、卷和网络，并判断何时不该增加容器复杂度。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/docker-mental-model/
previous_title: 08 Docker mental model 与 Dockerfile
next_url: /learn/engineering-agent-for-ai/agent-engineering-model/
next_title: 10 Agent Engineering mental model
---

## Compose 解决什么

Compose 用一个 YAML 文件描述服务、网络、卷和环境变量，让开发者可以用同一组命令启动和停止一组相关容器。它不是 Kubernetes，也不替你设计生产集群。下面的例子与上一课的 `Dockerfile` 同目录，并使用一个标准库 HTTP 服务，因此可以直接运行。

```python
# app.py
from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            body = b"ok\n"
            self.send_response(200)
        else:
            body = b"compose demo\n"
            self.send_response(200)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

HTTPServer(("0.0.0.0", 8000), Handler).serve_forever()
```

```dockerfile
# Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

```yaml
services:
  app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ai-demo-data:/app/data
    environment:
      MODE: dev

volumes:
  ai-demo-data:
```

运行 `docker compose config` 检查展开后的配置，再 `docker compose up --build`，另开终端用 `docker compose logs -f` 观察，最后 `docker compose down`。若要保留 named volume，先确认 `down` 的参数和数据位置。

访问 `http://localhost:8000/health` 应得到 `ok`。这里的 `ai-demo-data` 是 named volume；开发时也可以改成 `./data:/app/data`，那是把宿主目录 bind mount 到容器，持久化位置和权限规则不同。

## AI 项目中的判断

一个训练脚本不一定需要 Compose；API + worker + 数据库或可重复的评测服务才可能值得。GPU 透传、数据卷权限和镜像大小都应在 README 明确，避免“为了看起来完整”增加服务。

## 故意失败

把 `8000:8000` 改成错误端口，检查服务日志和 host 访问地址；把 `app.py` 的监听地址改成 `127.0.0.1`，观察端口映射为什么不再可访问。修复 YAML 或服务后运行 `docker compose config`，再启动。

## 练习

为课程模板添加一个可选 Compose 文件：服务能读取 `data/`，启动后输出一条 health 信息。写出停止、重启、查看日志和保留数据的命令。

<details class="lesson-answer"><summary>参考答案</summary>
<p>Compose 文件应描述可重复的开发入口；数据是否持久由 volume 决定，端口是否可访问由服务监听地址和映射共同决定。</p>
</details>

## 官方延伸阅读

- [Docker Compose overview](https://docs.docker.com/compose/)
