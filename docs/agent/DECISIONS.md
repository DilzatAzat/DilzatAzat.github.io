# Architecture Decisions

## 2026-09-08

- **Retain Jekyll:** The site remains on its existing Jekyll/Academic Pages architecture. A migration requires explicit approval.
- **Learn as a collection:** Learning content uses the existing `_learning` collection and `/learn/:path/` permalink convention, with layouts and data kept separate from unrelated collections.
- **Data-driven course navigation:** Course/module ordering belongs in `_data/python_course.yml`; lesson pages remain independently reviewable.
- **Local progress only:** Any lesson progress feature must be browser-local and must not introduce accounts, analytics requirements, or secrets.
- **Deployment boundary:** Autonomous work may build and review locally, but must not publish, push, or deploy.
- **Content originality:** Learning material must be concise, technically accurate, and original; copyrighted textbook prose is out of scope.
