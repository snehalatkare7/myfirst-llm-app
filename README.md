# Sentiment Analysis App

A full-stack sentiment analysis app: **FastAPI** backend classifies text as positive, negative, or neutral, and a **Next.js** frontend provides the UI.

---

## Prerequisites

- **uv** (Python package manager) and **Python 3.8+** (for the backend)
- **Node.js 18+** and **npm** (for the frontend)

---

## Project structure

```
myfirst-llm-app/
├── app.py                    # FastAPI backend (API)
├── pyproject.toml            # Python dependencies (uv)
├── frontend/
│   └── sentiment-analysis-app/   # Next.js frontend
│       ├── app/                  # Pages and layout
│       ├── components/
│       └── package.json
└── README.md
```

---

## How to launch the app

You need to run **two** processes: the API and the frontend.

### 1. Start the backend (FastAPI)

From the **project root** (`myfirst-llm-app`):

```bash
# Install dependencies (creates/updates venv and syncs from pyproject.toml)
uv sync

# Run the API server
uv run uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- **API root:** http://localhost:8000  
- **Interactive docs:** http://localhost:8000/docs  
- **Health check:** http://localhost:8000/health  

Leave this terminal running.

---

### 2. Start the frontend (Next.js)

Open a **second terminal**. Go to the Next.js app and start the dev server:

```bash
cd frontend/sentiment-analysis-app

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

The app will be at **http://localhost:3000** (or the next free port, e.g. 3001, if 3000 is in use).

---

## Using the app

1. Keep both the backend and frontend running.
2. Open **http://localhost:3000** in your browser.
3. Enter or paste text and click **Analyze Sentiment**.
4. The result will show **positive**, **negative**, or **neutral**.

If you see “Failed to connect to the sentiment API”, make sure the backend is running on port 8000 and that nothing is blocking it.

---

## API overview

| Method | Endpoint      | Description                          |
|--------|---------------|--------------------------------------|
| GET    | `/`           | API info and list of endpoints       |
| GET    | `/health`     | Health check                          |
| GET    | `/docs`       | Swagger UI documentation              |
| POST   | `/sentiment`  | Analyze sentiment (body: `{ "text": "your text" }`) |

---

## Optional: production build (frontend)

From `frontend/sentiment-analysis-app`:

```bash
npm run build
npm start
```

This serves the frontend in production mode (still requires the backend to be running for sentiment analysis).
