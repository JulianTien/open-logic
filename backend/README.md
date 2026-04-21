# Open Logic Backend

This directory contains the Flask runtime, templates, static assets, and service integrations for Open Logic.

## Main entrypoints

- `app.py` full web app
- `api_app.py` API-focused entrypoint
- `runner_app.py` code runner entrypoint

## Local run

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```
