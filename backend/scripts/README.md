# Ingestion scripts — next milestone

Keep source adapters separate from API request handlers. Each importer should preserve source URL, retrieval timestamp, publisher, source type, jurisdiction, raw metadata, and a stable source identifier. Deduplicate patents by jurisdiction + publication number and papers by DOI where available. Never infer current legal status from a stale search snippet. Review API terms, rate limits, and reuse policies before ingestion.
