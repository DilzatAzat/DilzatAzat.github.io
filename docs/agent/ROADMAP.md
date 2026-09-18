# Project Roadmap

Ordered backlog for the personal site and Learn area. Work on one bounded task at a time.

Status values: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## P0 - Architecture

### P0-1 Audit existing site architecture
- **Status:** DONE
- **Goal:** Document the current Jekyll collections, layouts, navigation, build path, and route constraints.
- **Acceptance criteria:** Audit is recorded in the review log or relevant implementation notes; existing routes and deployment workflow are identified; no content is changed.
- **Dependencies:** None

### P0-2 Establish Learn information architecture
- **Status:** DONE
- **Goal:** Define the Learn landing page, course hierarchy, lesson metadata, and navigation conventions.
- **Acceptance criteria:** IA supports bounded course and lesson tasks; URLs and collection conventions are explicit; no bulk lesson generation.
- **Dependencies:** P0-1

### P0-3 Integrate Learn into existing navigation
- **Status:** DONE
- **Goal:** Make the approved Learn entry point discoverable without disrupting existing navigation.
- **Acceptance criteria:** Learn link appears in the established navigation pattern; existing navigation links remain unchanged and build successfully.
- **Dependencies:** P0-2

### P0-4 Separate Home and Learn information architecture
- **Status:** DONE
- **Goal:** Keep the homepage identity-focused and make `/learn/` a data-driven catalog for published learning content.
- **Acceptance criteria:** Homepage has no course or learning-path section; `/learn/` renders only visible catalog items; `/learn/python/` and its lesson experience remain unchanged.
- **Dependencies:** P0-3

## P1 - Course Framework

### P1-1 Python for AI course landing page
- **Status:** DONE
- **Goal:** Create the course overview and module list.
- **Acceptance criteria:** Landing page renders from site data, has stable route, and links only to available lessons.
- **Dependencies:** P0-3

### P1-2 Lesson layout and sidebar
- **Status:** DONE
- **Goal:** Implement a reusable lesson shell with course sidebar.
- **Acceptance criteria:** Responsive, accessible layout renders existing Jekyll/Liquid content without changing unrelated layouts.
- **Dependencies:** P1-1

### P1-3 Page TOC and previous/next navigation
- **Status:** DONE
- **Goal:** Add in-page headings navigation and lesson sequencing.
- **Acceptance criteria:** Navigation handles first/last lessons and missing optional metadata without broken links.
- **Dependencies:** P1-2

### P1-4 Code/math rendering validation
- **Status:** DONE
- **Goal:** Validate syntax highlighting, code examples, and math rendering choices.
- **Acceptance criteria:** Representative lesson fixtures build and render correctly; dependencies remain GitHub Pages compatible.
- **Dependencies:** P1-2

### P1-5 Progress tracking
- **Status:** DONE
- **Goal:** Add bounded, local-only lesson progress behavior.
- **Acceptance criteria:** Progress is understandable, resilient when storage is unavailable, and does not require accounts or secrets.
- **Dependencies:** P1-3

## P2 - First Lessons

### P2-1 Course Guide lesson
- **Status:** DONE
- **Goal:** Explain course scope, prerequisites, and study path.
- **Acceptance criteria:** Concise original content, working links, and clear completion criteria.
- **Dependencies:** P1-5

### P2-2 Variables lesson
- **Status:** DONE
- **Goal:** Teach Python variables with original examples.
- **Acceptance criteria:** Accurate examples, accessible headings, and build validation.
- **Dependencies:** P2-1

### P2-3 List lesson
- **Status:** DONE
- **Goal:** Teach Python lists with original examples.
- **Acceptance criteria:** Accurate examples, accessible headings, and build validation.
- **Dependencies:** P2-2

### P2-4 Visual/readability review
- **Status:** DONE
- **Goal:** Review the first lessons across desktop and mobile widths.
- **Acceptance criteria:** Findings recorded; regressions fixed before broader content work.
- **Dependencies:** P2-3

## P3 - Core Modules

### P3-1 Module 0 lessons
- **Status:** DONE
- **Goal:** Add the remaining Getting Started lessons.
- **Acceptance criteria:** Each lesson is independently reviewable and linked.
- **Dependencies:** P2-4

### P3-2 Module 1 lessons
- **Status:** DONE
- **Goal:** Add the remaining Python Fundamentals lessons.
- **Acceptance criteria:** Each lesson is independently reviewable and linked.
- **Dependencies:** P3-1

### P3-3 Module 2 lessons
- **Status:** DONE
- **Goal:** Add Control Flow lessons.
- **Acceptance criteria:** Each lesson is independently reviewable and linked.
- **Dependencies:** P3-2

## P4 - Advanced Python

### P4-1 Module 3
- **Status:** DONE
- **Goal:** Add Functions and Pythonic Programming lessons.
- **Acceptance criteria:** Lessons are original, accurate, and independently validated.
- **Dependencies:** P3-3

### P4-2 Module 4
- **Status:** DONE
- **Goal:** Add Practical Python lessons.
- **Acceptance criteria:** Lessons are original, accurate, and independently validated.
- **Dependencies:** P4-1

## P5 - Scientific and D2L Readiness

### P5-1 NumPy and scientific Python
- **Status:** DONE
- **Goal:** Add the scientific Python foundation.
- **Acceptance criteria:** Scope and dependencies are GitHub Pages safe; examples are runnable or clearly labeled.
- **Dependencies:** P4-2

### P5-2 PyTorch bridge
- **Status:** DONE
- **Goal:** Connect Python and NumPy concepts to tensors and PyTorch.
- **Acceptance criteria:** Concepts are accurate and prerequisites are explicit.
- **Dependencies:** P5-1

### P5-3 D2L readiness checkpoint
- **Status:** DONE
- **Goal:** Assess readiness for reading D2L code without reproducing copyrighted text.
- **Acceptance criteria:** Original checklist and exercises; no copied textbook content.
- **Dependencies:** P5-2

## Quality Repair Phase

### QR-1 Scientific and PyTorch depth
- **Status:** DONE
- **Goal:** Expand Lessons 19-24 into practice-ready NumPy, scientific workflow, Tensor, autograd/DataLoader, and readiness materials.
- **Acceptance criteria:** Shape/axis/broadcasting/matrix multiplication/autograd/DataLoader are taught with runnable examples, prediction exercises, and complete answers; readiness is a real capability gate.
- **Dependencies:** P5-3

### QR-2 Python backbone depth and prerequisite order
- **Status:** DONE
- **Goal:** Repair shallow Lessons 00, 02, 04, 09-18 and remove or label prerequisite violations.
- **Acceptance criteria:** Functions, classes, tuples, tests, and major exercises are genuinely learnable; every standalone code block is runnable or explicitly marked as a continuation/preview.
- **Dependencies:** QR-1

### QR-3 Navigation and stale metadata
- **Status:** DONE
- **Goal:** Repair the complete 00-24 previous/next chain and stale Learn landing-page status.
- **Acceptance criteria:** All 25 lessons form one continuous chain; `/learn/` and `/learn/python/` derive current counts/status without stale 3-lesson or 64-lesson copy.
- **Dependencies:** QR-2

### QR-4 Progress safety, language, and final review
- **Status:** DONE
- **Goal:** Harden local progress against unknown/duplicate IDs, improve Simplified Chinese consistency, and perform final desktop/mobile/build review.
- **Acceptance criteria:** Progress is bounded and deduplicated; substantive lessons have graded exercises and answers; final state is `READY FOR INDEPENDENT RE-AUDIT`, never COMPLETE/READY.
- **Dependencies:** QR-3

### QR-5 Final D2L bridge targeted repair
- **Status:** DONE
- **Goal:** Close the remaining D2L-reading gaps in function calls, modules, Pythonic data flow, `nn.Module`/`forward`, integrated training steps, and readiness answers.
- **Acceptance criteria:** Lessons 12, 13, 14, 17, 23, and 24 contain runnable examples, graded exercises with complete explanations, and a connected Dataset → DataLoader → model → loss → backward → optimizer flow; build, routes, and navigation remain green.
- **Dependencies:** QR-4
