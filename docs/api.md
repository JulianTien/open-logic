# API Summary

The backend serves a mix of page routes and JSON endpoints.

## Key route groups

- authentication
- posts and comments
- code runner
- course content
- health check at `/api/health`

## Contract notes

- `api_app.py` and `runner_app.py` remain supported entrypoints.
- Production configuration requires explicit secret and database values.
