from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_seeded_technologies_are_available():
    response = client.get("/api/v1/technologies")
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] >= 3
    assert any(item["slug"] == "foldable-display-hinges" for item in payload["items"])

def test_search_filters_technologies():
    response = client.get("/api/v1/technologies", params={"q": "satellite"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] >= 1

def test_unknown_technology_returns_404():
    assert client.get("/api/v1/technologies/not-a-real-slug").status_code == 404

def test_research_endpoint_explains_demo_limitations():
    response = client.post("/api/v1/research/ask", json={"question": "What is a periscope camera?"})
    assert response.status_code == 200
    assert "disclaimer" in response.json()
