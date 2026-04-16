# Fly Runner Notes

## Entry Point

- Application module: `runner_app:app`
- Local default port: `8081`
- Procfile-style command: `gunicorn runner_app:app --bind 0.0.0.0:$PORT --workers 1 --timeout 60`

## Environment

- `FLASK_CONFIG=production`
- `RUNNER_AUTH_TOKEN=<shared-secret>`
- `CORS_ALLOWED_ORIGINS=<frontend-or-bff-origins>` when browser access is ever allowed

## Current Behavior

- `GET /api/runner/health` and `GET /runner/health` return runner service health
- `POST /api/run` and `POST /runner/execute` preserve the current execution contract
- If `RUNNER_AUTH_TOKEN` is set, requests must include `x-runner-token`

## Migration Intent

- In the current monolith, runner traffic still shares the same process as Flask
- This entrypoint allows the runner to move to Fly.io without waiting for the rest of the backend split
