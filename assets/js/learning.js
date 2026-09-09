(function () {
  "use strict";

  var root = document.querySelector("[data-course]");
  if (!root) return;

  var storageKey = root.dataset.storageKey || "python-for-ai-progress-v1";
  var totalLessons = Number(root.dataset.totalLessons) || root.querySelectorAll("[data-lesson-row]").length;

  function validLessonIds() {
    var ids = new Set();
    document.querySelectorAll("[data-lesson-row]").forEach(function (row) {
      if (row.dataset.lessonRow) ids.add(String(row.dataset.lessonRow));
    });
    return ids;
  }

  function readProgress() {
    try {
      var value = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(value)) return [];
      var allowed = validLessonIds();
      return Array.from(new Set(value.map(String).filter(function (id) {
        return allowed.has(id);
      }))).slice(0, totalLessons);
    } catch (error) {
      return [];
    }
  }

  function writeProgress(lessonIds) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(lessonIds));
    } catch (error) {
      // The page remains usable when storage is blocked.
    }
  }

  function renderProgress() {
    var completed = readProgress();
    var completedSet = new Set(completed);
    var currentLesson = root.dataset.lessonId;

    document.querySelectorAll("[data-lesson-row]").forEach(function (row) {
      row.classList.toggle("is-complete", completedSet.has(row.dataset.lessonRow));
    });

    document.querySelectorAll("[data-course-progress-short]").forEach(function (label) {
      label.textContent = completed.length + " / " + totalLessons;
    });

    document.querySelectorAll("[data-course-progress-count]").forEach(function (label) {
      label.textContent = completed.length;
    });

    document.querySelectorAll("[data-course-progress-bar]").forEach(function (bar) {
      var percentage = totalLessons ? Math.min(100, Math.max(0, (completed.length / totalLessons) * 100)) : 0;
      bar.setAttribute("aria-valuenow", completed.length);
      bar.querySelector("span").style.width = percentage + "%";
    });

    var button = document.querySelector("[data-complete-lesson]");
    if (button && currentLesson) {
      var isComplete = completedSet.has(currentLesson);
      button.classList.toggle("is-complete", isComplete);
      button.setAttribute("aria-pressed", String(isComplete));
      var label = button.querySelector("span:last-child");
      if (label) label.textContent = isComplete ? "已完成" : "标记为已完成";
    }

    var startLink = document.querySelector("[data-course-start]");
    if (startLink) {
      var readyRows = Array.from(document.querySelectorAll("[data-lesson-row] a"));
      var next = readyRows.find(function (link) {
        return !completedSet.has(link.closest("[data-lesson-row]").dataset.lessonRow);
      });
      if (next) {
        startLink.href = next.href;
        startLink.firstChild.textContent = completed.length ? "继续课程 " : "开始课程 ";
      }
    }
  }

  function setupCompletion() {
    var button = document.querySelector("[data-complete-lesson]");
    var lessonId = root.dataset.lessonId;
    if (!button || !lessonId) return;

    button.addEventListener("click", function () {
      var completed = readProgress();
      var index = completed.indexOf(lessonId);
      if (index === -1) completed.push(lessonId);
      else completed.splice(index, 1);
      completed.sort();
      writeProgress(completed);
      renderProgress();
    });
  }

  function setupToc() {
    var toc = document.querySelector("[data-lesson-toc]");
    if (!toc) return;

    var headings = Array.from(document.querySelectorAll(".lesson__content h2, .lesson__content h3"));
    headings.forEach(function (heading, index) {
      if (!heading.id) heading.id = "section-" + (index + 1);
      var link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      link.dataset.level = heading.tagName.slice(1);
      toc.appendChild(link);
    });

    if (!("IntersectionObserver" in window) || headings.length === 0) return;
    var links = Array.from(toc.querySelectorAll("a"));
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("is-active", link.hash === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-15% 0px -75% 0px" });
    headings.forEach(function (heading) { observer.observe(heading); });
  }

  function setupCopyButtons() {
    document.querySelectorAll(".lesson__content div.highlighter-rouge").forEach(function (wrapper) {
      var code = wrapper.querySelector("pre code");
      if (!code || wrapper.querySelector(".code-copy")) return;

      var button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.title = "Copy code";
      button.setAttribute("aria-label", "Copy code");
      button.textContent = "Copy";
      button.addEventListener("click", function () {
        navigator.clipboard.writeText(code.textContent).then(function () {
          button.title = "Copied";
          button.setAttribute("aria-label", "Copied");
          button.textContent = "Copied";
          window.setTimeout(function () {
            button.title = "Copy code";
            button.setAttribute("aria-label", "Copy code");
            button.textContent = "Copy";
          }, 1400);
        });
      });
      wrapper.appendChild(button);
    });
  }

  renderProgress();
  setupCompletion();
  setupToc();
  setupCopyButtons();
})();
