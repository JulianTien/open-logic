# Open Logic

Open Logic is a Python and web application for a youth-focused AI learning community. The repository is organized around a single backend runtime, static web assets, and product documentation.

## Repository Layout

- `backend/` Flask application, templates, static assets, services, and runtime entrypoints
- `tests/` unit and integration tests for the backend
- `docs/` architecture notes, API summary, setup docs, and archived delivery materials
- `archive/` non-runtime source archives kept for reference only

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

The app listens on `http://127.0.0.1:8080` by default.

### Tests

From the repository root:

```bash
python -m pip install -r backend/requirements.txt
python -m pytest tests
```

## Documentation

- [Architecture](docs/architecture.md)
- [API Summary](docs/api.md)
- [Backend Setup](docs/backend-setup.md)

## Release and CI

- Backend CI runs only for backend, test, and workflow changes.
- Release workflow packages a backend artifact for tagged builds.
- Dependabot monitors Python dependencies in `backend/`.

## Contributing

Review [CONTRIBUTING.md](CONTRIBUTING.md) and keep backend behavior aligned with the docs before opening a pull request.
