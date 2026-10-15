# Dilzat Azat · Personal Website & Learn

[![Deploy Jekyll site to Pages](https://github.com/DilzatAzat/DilzatAzat.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/DilzatAzat/DilzatAzat.github.io/actions/workflows/pages.yml)
[![Website](https://img.shields.io/badge/website-dilzat.com-2563eb)](https://dilzat.com/)

这是 [Dilzat Azat](https://github.com/DilzatAzat) 的个人网站与长期学习平台，线上地址为 [dilzat.com](https://dilzat.com/)。网站记录个人经历、研究兴趣、项目、演讲与学习内容，也用于持续建设面向 AI 实践的中文课程。

## 网站内容

- **个人主页**：个人简介、研究兴趣、项目、发表内容、演讲和联系方式。
- **学习目录**：[`/learn/`](https://dilzat.com/learn/) 按主题组织课程和学习路径。
- **Python for AI**：[`/learn/python/`](https://dilzat.com/learn/python/)，面向深度学习的 Python 前置课程，共 25 节已发布课程。
- **Dive into Deep Learning**：[`/learn/d2l/`](https://dilzat.com/learn/d2l/)，原创中文深度学习课程，覆盖任务建模、数学、Tensor、自动微分、训练、计算机视觉、自然语言处理和项目实践，目前开放 96 节课程。
- **Engineering & Agent for AI**：[`/learn/engineering-agent-for-ai/`](https://dilzat.com/learn/engineering-agent-for-ai/)，面向 AI 项目的工程基础与 Agent Engineering 实践课程，目前开放 22 节课程。

课程页面提供代码、公式、实验、练习和答案。学习进度只保存在访问者自己的浏览器中，不需要账号、后端服务或个人数据收集；进度记录也不等同于能力认证。

## 技术与部署

- [Jekyll](https://jekyllrb.com/)、Liquid、Sass 和原生 JavaScript
- GitHub Actions 构建并部署到 GitHub Pages
- 自定义域名由仓库根目录的 [`CNAME`](CNAME) 管理：`dilzat.com`
- 课程目录和导航使用 `_data/` 中的 YAML 数据驱动
- 本地学习进度使用浏览器存储，网站没有课程账号系统

每次向 `master` 或 `main` 分支推送时，`.github/workflows/pages.yml` 会构建 `_site` 并发布到 GitHub Pages。也可以在 Actions 页面手动触发部署。

## 仓库结构

```text
_pages/                 页面与课程入口
_learning/              课程正文与课程集合
_data/                  课程目录、导航和站点数据
_layouts/               Jekyll 页面布局
_includes/              可复用的 Liquid 组件
_sass/                  站点样式与学习区域样式
assets/                 JavaScript、图片和其他前端资源
.github/workflows/      GitHub Pages 部署工作流
files/                  可下载的课程和项目文件
scripts/d2l/            课程检查与验证工具
docs/agent/             项目路线、决策和验证记录
CNAME                   自定义域名配置
```

## 本地运行

需要 Ruby、Bundler；如果要修改或压缩前端脚本，再安装 Node.js。Windows、macOS 和 Linux 都可以使用下面的命令：

```bash
bundle install
bundle exec jekyll serve --livereload --host 127.0.0.1
```

启动后访问 <http://127.0.0.1:4000/>。只想验证构建时可以运行：

```bash
bundle exec jekyll build
```

前端脚本检查和构建：

```bash
node --check assets/js/learning.js
npm install
npm run build:js
```

如果需要运行 D2L 课程的结构检查，先构建网站，再执行：

```bash
python scripts/d2l/check_course.py --site _site
```

仓库也提供 Docker 配置；已安装 Docker 时可以运行：

```bash
docker compose up
```

## 内容与开发约定

- 新页面应沿用现有 Jekyll collection、layout、permalink 和数据文件约定。
- 课程只有在正文、示例、练习、答案和必要验证准备好后才加入可见目录；规划中的课程不会伪装成已完成内容。
- 学习材料使用原创讲解和示例，不复制受版权保护的教材正文。
- 修改部署配置、路由或课程计数前，先运行构建和相关检查，并确认现有页面链接没有回归。
- 项目状态、路线和验证证据保存在 [`docs/agent/`](docs/agent/) 中。

## 许可

网站的课程正文、项目说明和定制页面由 Dilzat Azat 持续维护。仓库中的开源代码、第三方库和历史组件按 [`LICENSE`](LICENSE) 及各自依赖声明的许可使用；复用前请阅读对应许可文件。

## 联系

网站：<https://dilzat.com/><br>
GitHub：<https://github.com/DilzatAzat>
