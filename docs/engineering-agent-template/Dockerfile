FROM python:3.12-slim
WORKDIR /app
COPY src ./src
COPY scripts ./scripts
COPY tests ./tests
ENV PYTHONPATH=/app/src
CMD ["python", "-m", "ai_project.cli"]
