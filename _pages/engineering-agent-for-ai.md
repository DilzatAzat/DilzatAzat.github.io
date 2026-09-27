---
layout: learning-home
permalink: /learn/engineering-agent-for-ai/
title: Engineering & Agent for AI
eyebrow: 课程 EA-01
description: 面向 AI 项目的工程基础与 Agent Engineering 实践课程。
course_data: engineering_course
course_id: engineering-agent-for-ai
course_home: /learn/engineering-agent-for-ai/
course_title: Engineering & Agent for AI
author_profile: false
---
{% assign course = site.data[page.course_data] %}
{% assign first_module = course.modules | first %}
{% assign first_lesson = first_module.lessons | first %}

<div class="course-overview">
  <section aria-labelledby="course-goals">
    <h2 id="course-goals">你将学会什么</h2>
    <ul class="check-list">
      <li>为 AI 项目建立清晰、可恢复的 Git 与 GitHub 工作流。</li>
      <li>从 Windows、PowerShell 和 WSL2 迁移到远程 Linux 环境。</li>
      <li>管理可复现的 Python、CUDA、PyTorch 与 Docker 环境。</li>
      <li>用 AGENTS.md、Skills、MCP 与 Harness 组织 Agent 工程协作。</li>
    </ul>
  </section>
  <section aria-labelledby="prerequisites">
    <h2 id="prerequisites">学习前提</h2>
    <p>不要求已有 DevOps 或 Agent 平台经验。具备基本 Python 使用经验，并准备一个可安全练习的本地项目目录即可。</p>
  </section>
</div>

<section class="course-progress" aria-labelledby="progress-title">
  <div>
    <p class="section-kicker">学习进度</p>
    <h2 id="progress-title"><span data-course-progress-count>0</span> / {{ course.total_lessons }} 节已完成</h2>
  </div>
  <div class="course-progress__track" role="progressbar" aria-valuemin="0" aria-valuemax="{{ course.total_lessons }}" aria-valuenow="0" data-course-progress-bar><span></span></div>
  <a class="learn-action" data-course-start href="{{ first_lesson.url | relative_url }}">开始课程 <span aria-hidden="true">&rarr;</span></a>
</section>

<section class="course-catalog" aria-labelledby="catalog-title">
  <div class="section-heading">
    <div>
      <p class="section-kicker">课程目录</p>
      <h2 id="catalog-title">六个模块，一条可执行的工程路径</h2>
    </div>
    <span>{{ course.total_lessons }} 节课程</span>
  </div>
  {% for module in course.modules %}
    <section class="catalog-module">
      <header><span>模块 {{ module.number }}</span><h3>{{ module.title }}</h3></header>
      <ol>
        {% for lesson in module.lessons %}
          <li data-lesson-row="{{ lesson.id }}">
            {% if lesson.url %}
              <a href="{{ lesson.url | relative_url }}"><span class="lesson-number">{{ lesson.id }}</span><span>{{ lesson.title }}</span><span class="completion-check" aria-hidden="true">&#10003;</span><small>已发布</small></a>
            {% else %}
              <span class="is-planned"><span class="lesson-number">{{ lesson.id }}</span><span>{{ lesson.title }}</span><small>计划中</small></span>
            {% endif %}
          </li>
        {% endfor %}
      </ol>
    </section>
  {% endfor %}
</section>
