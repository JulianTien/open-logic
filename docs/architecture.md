# Architecture

Open Logic is a single Flask backend that renders server-side pages and exposes API endpoints.

## Main subsystems

- `backend/routes/` Flask blueprints
- `backend/models/` SQLAlchemy models
- `backend/services/` AI and code execution integrations
- `backend/templates/` Jinja templates
- `backend/static/` frontend assets
- `backend/data/` bundled learning content

## Runtime flow

1. Flask starts from `backend/app.py`.
2. Extensions and configuration are loaded from `backend/extensions.py` and `backend/config.py`.
3. Routes render templates and serve API responses.
4. Tests run from the repository root with `PYTHONPATH=backend`.
