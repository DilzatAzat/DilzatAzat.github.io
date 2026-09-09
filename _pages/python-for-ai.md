---
layout: learning-home
permalink: /learn/python/
title: Python for AI
eyebrow: 课程 PY-01
description: 面向深度学习的实用 Python 前置课程。
author_profile: false
---

<div class="course-overview">
  <section aria-labelledby="course-goals">
    <h2 id="course-goals">你将学会什么</h2>
    <ul class="check-list">
      <li>阅读和编写清晰、符合习惯的 Python。</li>
      <li>使用 NumPy、Matplotlib 和 Jupyter 完成小型实验。</li>
      <li>识别机器学习项目中常见的数据处理模式。</li>
      <li>带着正确的 mental model 进入 PyTorch 和 D2L。</li>
    </ul>
  </section>
  <section aria-labelledby="prerequisites">
    <h2 id="prerequisites">学习前提</h2>
    <p>不要求已有 Python 经验；有 C 或 C++ 等语言基础会有帮助。你需要一台可以创建并运行 Python 文件的电脑。</p>
  </section>
</div>

<section class="course-progress" aria-labelledby="progress-title">
  <div>
    <p class="section-kicker">学习进度</p>
    <h2 id="progress-title"><span data-course-progress-count>0</span> / {{ site.data.python_course.total_lessons }} 节已完成</h2>
  </div>
  <div class="course-progress__track" role="progressbar" aria-valuemin="0" aria-valuemax="{{ site.data.python_course.total_lessons }}" aria-valuenow="0" data-course-progress-bar><span></span></div>
  <a class="learn-action" data-course-start href="{{ '/learn/python/course-guide/' | relative_url }}">开始课程 <span aria-hidden="true">&rarr;</span></a>
</section>

<section class="course-catalog" aria-labelledby="catalog-title">
  <div class="section-heading">
    <div>
      <p class="section-kicker">课程目录</p>
      <h2 id="catalog-title">七个模块，一条连续路径</h2>
    </div>
    <span>{{ site.data.python_course.total_lessons }} 节课程</span>
  </div>
  {% for module in site.data.python_course.modules %}
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
