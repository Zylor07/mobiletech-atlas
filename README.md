# MobileTech Atlas

Research-focused mobile technology and patent intelligence platform. This local-first MVP includes a Next.js dashboard, FastAPI API, SQLAlchemy models, a PostgreSQL/pgvector-ready Docker service, demo topic records, tests, and a hosted-LLM scaffold.

## Prerequisites
- Python 3.11+
- Node.js 20+ and npm
- Docker Desktop (optional, for PostgreSQL)
- A hosted LLM API key only when testing the AI endpoint

## Start the backend

```bash
cd backend
python -m venv .venv
# macOS/Linux
source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

API docs: http://127.0.0.1:8000/docs  
Health: http://127.0.0.1:8000/health  
Technologies: http://127.0.0.1:8000/api/v1/technologies

SQLite is the default so you can start without Docker. It is for development only.

## Use PostgreSQL

From the repository root:

```bash
docker compose up -d db
```

Set `DATABASE_URL` in `backend/.env`:

```env
DATABASE_URL=postgresql+psycopg://atlas:atlas_dev_password@localhost:5432/mobiletech_atlas
```

The container image includes pgvector, but this first milestone does not yet persist embeddings. That is planned for the RAG milestone.

## Start the frontend

In another terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000.

## Run backend tests

```bash
cd backend
source .venv/bin/activate
pytest
```

## Important research-integrity note
Seeded topics are illustrative demo records, not verified patent claims. They contain no fabricated patent numbers, inventors, dates, or legal status. Import real records with source URL and retrieval timestamp. Verify current legal status against the relevant official patent register. Check source API terms, rate limits, and reuse policies before ingestion.

## Roadmap
1. Local foundation (this release)
2. CSV validation and real source ingestion
3. PostgreSQL full-text + pgvector hybrid search
4. Evidence-grounded RAG and citation evaluation
5. Authentication, background ingestion, monitoring, AWS deployment
6. Optional Android client using the same API
