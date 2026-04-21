# Repository Guidelines

## Project Structure & Module Organization
The Flask app now lives under `backend/`: `backend/app.py` is the main entry point, `backend/routes/` holds blueprints, `backend/models/` contains SQLAlchemy models, `backend/services/` contains AI and sandbox integrations, `backend/templates/` stores Jinja pages, and `backend/static/` stores CSS, images, and browser-side JavaScript. Repository-level docs live under `docs/`, archived non-runtime materials live under `docs/archive/` and `archive/`, and automated tests live under `tests/`.

## Build, Test, and Development Commands
Backend runtime:

- `cd backend && python3 -m venv .venv && source .venv/bin/activate`
- `cd backend && pip install -r requirements.txt`: install backend dependencies.
- `cd backend && python3 app.py`: start the Flask server on `127.0.0.1:8080`.
- `PYTHONPATH=backend pytest tests`: run tests from the repository root.

## Coding Style & Naming Conventions
Use 4-space indentation in Python and keep modules/functions in `snake_case`. Keep Flask route handlers grouped by feature in `backend/routes/`, and match template names to pages, for example `post_detail.html`.

For the Flask frontend on port `8080`, keep page styling in shared design-token CSS plus page-level stylesheets under `backend/static/css/views/`; do not add large inline `<style>` blocks or hard-coded brand colors in templates. Reuse shared shell, button, form, and section patterns from `backend/templates/base.html`, use stable class or `data-*` hooks for JS behaviors, and preserve responsive behavior for both desktop and mobile.

## Testing Guidelines
Tests live under `tests/`, with unit tests in `tests/unit/` and integration tests in `tests/integration/`. New backend behavior should ship with tests when practical, and tests should assume `PYTHONPATH=backend`.

## Commit & Pull Request Guidelines
Keep commits focused and concise, for example `runner: handle sandbox timeout`. PRs should include a clear summary, affected areas, manual test steps, linked issues when available, and screenshots for UI changes touching `backend/templates/`.

## Security & Configuration Tips
Keep secrets in `backend/.env`; do not commit API keys. The backend reads `OPENAI_API_KEY`, optional `OPENAI_BASE_URL`, `PORT`, and `FLASK_CONFIG`. Avoid committing generated content from `.venv/`, runtime databases, or archives generated outside the documented release flow.
