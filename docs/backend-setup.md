# Backend Setup

## Local development

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

## Tests

From the repository root:

```bash
python -m pip install -r backend/requirements.txt
PYTHONPATH=backend python -m pytest tests
```

On Windows PowerShell:

```powershell
$env:PYTHONPATH = "backend"
python -m pytest tests
```
