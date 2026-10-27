from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Technology

DEMO_TECHNOLOGIES = [
    {
        "slug": "foldable-display-hinges",
        "name": "Foldable display hinges",
        "category": "mechanical design",
        "summary": "Mechanical systems that let a device open and close while supporting a flexible display.",
        "description": "Research topic covering hinge geometry, bend-radius management, dust mitigation, crease reduction, durability testing, and the interaction between mechanical design and flexible display stacks. This is a topic overview, not a claim about a specific patent.",
    },
    {
        "slug": "periscope-camera-optics",
        "name": "Periscope camera optics",
        "category": "camera systems",
        "summary": "Folded optical paths used to fit longer focal lengths into thin mobile devices.",
        "description": "Research topic covering prism or mirror arrangements, optical stabilization, lens groups, sensor packaging, and trade-offs between zoom range, aperture, thickness, and image quality.",
    },
    {
        "slug": "satellite-mobile-connectivity",
        "name": "Satellite connectivity in mobile devices",
        "category": "connectivity",
        "summary": "Mobile-device communication with satellite networks for selected messaging or data services.",
        "description": "Research topic covering antenna design, link budgets, spectrum and standards, device power, emergency messaging, and service availability. Commercial capabilities vary by device, region, carrier, and provider.",
    },
]

def seed_demo_data(db: Session) -> None:
    for item in DEMO_TECHNOLOGIES:
        if db.scalar(select(Technology).where(Technology.slug == item["slug"])) is None:
            db.add(Technology(**item, is_demo=True))
    db.commit()
