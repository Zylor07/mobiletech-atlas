from datetime import datetime
from pydantic import BaseModel, ConfigDict

class TechnologyOut(BaseModel):
    id: int
    slug: str
    name: str
    category: str
    summary: str
    description: str
    is_demo: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class TechnologyListOut(BaseModel):
    items: list[TechnologyOut]
    total: int

class EvidenceOut(BaseModel):
    id: int
    entity_type: str
    entity_id: int
    source_type: str
    title: str
    url: str
    publisher: str | None
    retrieved_at: datetime
    notes: str
    model_config = ConfigDict(from_attributes=True)

class ResearchQuestionIn(BaseModel):
    question: str
    technology_slug: str | None = None

class ResearchAnswerOut(BaseModel):
    answer: str
    citations: list[dict[str, str]]
    mode: str
    disclaimer: str
