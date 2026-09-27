---
title: Docker mental model 与 Dockerfile
permalink: /learn/engineering-agent-for-ai/docker-mental-model/
lesson_id: "08"
module: "3 - Containers"
description: 理解 host、image、container、volume 和 port，再容器化一个小型 AI 命令。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
previous_url: /learn/engineering-agent-for-ai/cuda-pytorch-stack/
previous_title: 07 CUDA、Driver 与 PyTorch
next_url: /learn/engineering-agent-for-ai/docker-compose/
next_title: 09 Docker Compose 与选择边界
---

## 四个对象

Image 是不可变的构建产物；container 是 image 的运行实例；volume 是独立于 container 生命周期的持久存储；port mapping 把 host 端口转发到 container 端口。删除 container 会删除其可写层，但不会自动删除 named volume。

## 最小 Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

```bash
docker build -t ai-template-demo .
docker run --rm ai-template-demo
docker image ls ai-template-demo
```

每条 Dockerfile 指令大致形成一层；先复制依赖声明、再安装、最后复制频繁变化的代码，通常更利于缓存。不要把 secret 写进 image layer。

## Volume 与 port 实验

```bash
docker volume create ai-demo-data
docker run --rm -v ai-demo-data:/data python:3.12-slim sh -c 'echo saved >/data/result.txt'
docker run --rm -v ai-demo-data:/data python:3.12-slim cat /data/result.txt
```

若容器提供 HTTP 服务，再用 `-p 8000:8000`；左侧是 host，右侧是 container。先确认服务确实监听 `0.0.0.0`，否则端口映射仍不可访问。

## 故意失败

把 `COPY app.py .` 改成不存在的文件重新 build，阅读错误中的上下文；再把运行时依赖漏掉，观察 `docker logs`。修复 Dockerfile 并重建，不要在运行中的 container 内手工修改后当作最终方案。

## 什么时候值得 Docker 化

需要稳定系统依赖、团队统一启动方式或隔离服务时有价值；只做一次性 CPU notebook、需要直接访问宿主 GPU 或正在快速探索时，本地环境可能更快。Docker 不是自动获得 GPU 的开关。

## 练习

为 `app.py` 增加一个输入参数，重新 build image 后运行；把结果写入 named volume，删除 container，再启动新 container 读取结果。记录哪些内容随 container 消失、哪些内容留在 volume。

<details class="lesson-answer"><summary>查看答案</summary>
<p>镜像和容器的可写层不是持久数据存储；挂载的 named volume 跨容器保留。参数或代码变化需要重新构建镜像，不能把一次 `docker exec` 的手工改动当成模板。</p>
</details>

## 官方延伸阅读

- [Docker: Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Docker: Volumes](https://docs.docker.com/engine/storage/volumes/)
