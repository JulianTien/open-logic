# Contributing

## Workflow

1. Keep changes scoped to one concern where possible.
2. Run relevant tests before submitting a pull request.
3. Update docs when API behavior, setup steps, or deployment assumptions change.

## Validation

- `python -m pytest tests`
- Start the backend locally from `backend/` for route or template changes.

## Secrets

- Never commit `.env`.
- Keep production credentials out of test fixtures and example files.
