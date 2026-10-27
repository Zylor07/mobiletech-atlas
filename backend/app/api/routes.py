from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_, select
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import EvidenceSource, Technology
from app.schemas import EvidenceOut, ResearchAnswerOut, ResearchQuestionIn, TechnologyListOut, TechnologyOut
from app.services.research import answer_research_question

router = APIRouter(prefix="/api/v1")

@router.get("/technologies", response_model=TechnologyListOut)
def list_technologies(q: str | None = Query(default=None), category: str | None = None, db: Session = Depends(get_db)):
    stmt = select(Technology)
    if q:
        pattern = f"%{q.strip()}%"
        stmt = stmt.where(or_(Technology.name.ilike(pattern), Technology.summary.ilike(pattern),
                              Technology.category.ilike(pattern), Technology.description.ilike(pattern)))
    if category:
        stmt = stmt.where(Technology.category.ilike(f"%{category.strip()}%"))
    items = list(db.scalars(stmt.order_by(Technology.name)).all())
    return {"items": items, "total": len(items)}

@router.get("/technologies/{slug}", response_model=TechnologyOut)
def get_technology(slug: str, db: Session = Depends(get_db)):
    item = db.scalar(select(Technology).where(Technology.slug == slug))
    if item is None:
        raise HTTPException(status_code=404, detail="Technology not found")
    return item

@router.get("/evidence", response_model=list[EvidenceOut])
def list_evidence(entity_type: str | None = None, entity_id: int | None = None, db: Session = Depends(get_db)):
    stmt = select(EvidenceSource)
    if entity_type:
        stmt = stmt.where(EvidenceSource.entity_type == entity_type)
    if entity_id is not None:
        stmt = stmt.where(EvidenceSource.entity_id == entity_id)
    return list(db.scalars(stmt.order_by(EvidenceSource.retrieved_at.desc())).all())

@router.post("/research/ask", response_model=ResearchAnswerOut)
def ask_research_question(payload: ResearchQuestionIn, db: Session = Depends(get_db)):
    return answer_research_question(payload, db)
