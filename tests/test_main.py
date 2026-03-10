from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, world!"}


def test_echo():
    response = client.post("/echo", json={"message": "hi"})
    assert response.status_code == 200
    assert response.json() == {"echo": "hi"}
