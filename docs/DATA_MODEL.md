# Initial data model

- `technologies`: topic taxonomy and summaries.
- `companies`: organization names and websites.
- `inventors`: inventor names plus disambiguation notes.
- `patents`: jurisdiction, publication number, dates, assignee, source URL, retrieval time, and legal-status check time.
- `research_papers`: DOI, authors, abstract, year, source URL, retrieval time.
- `evidence_sources`: source provenance linked to an entity.

## Integrity rules
1. Patent publication identifiers are unique within a jurisdiction.
2. Missing legal status is `unknown`, never silently treated as active.
3. Preserve retrieval timestamps because legal status can change.
4. Do not conflate application, publication, grant, and product launch.
5. Next migration should add many-to-many tables, legal-status event history, and document chunks with embedding model/version and provenance.
