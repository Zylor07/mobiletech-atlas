# Roadmap

## Milestone 1 — Local foundation
- [x] FastAPI health endpoint and search API
- [x] SQLAlchemy starter models
- [x] Clearly marked demo topics
- [x] Next.js research dashboard
- [x] PostgreSQL/pgvector Docker service
- [x] API tests and hosted-LLM scaffold

## Milestone 2 — Real data ingestion
- [ ] CSV import with strict validation
- [ ] OpenAlex/Crossref paper adapters
- [ ] Patent data adapter selected after access-term review
- [ ] Deduplication and provenance tests
- [ ] Source audit screen

## Milestone 3 — Search and RAG
- [ ] PostgreSQL full-text search
- [ ] pgvector embedding storage and indexes
- [ ] Chunking and embedding pipeline
- [ ] Hybrid retrieval, reranking, stable citation IDs
- [ ] Evaluation for factuality, citation coverage, and abstention

## Milestone 4 — Production hardening
- [ ] Alembic migrations, auth, rate limits, audit logs
- [ ] Background ingestion queue, monitoring, backups, CI
- [ ] AWS deployment
- [ ] Optional Android client using the same API
