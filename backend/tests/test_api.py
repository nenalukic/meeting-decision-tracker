from fastapi import status

def test_create_meeting(client):
    response = client.post(
        "/meetings",
        json={"title": "Team Sync", "date": "2023-10-27T10:00:00", "attendees": ["Alice", "Bob"]}
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["title"] == "Team Sync"
    assert "id" in data

def test_get_meetings(client):
    # Create one first
    client.post(
        "/meetings",
        json={"title": "Team Sync", "date": "2023-10-27T10:00:00", "attendees": []}
    )
    response = client.get("/meetings")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

def test_add_decision(client):
    # 1. Create meeting
    m_resp = client.post(
        "/meetings",
        json={"title": "Decision Mtg", "date": "2023-10-27T12:00:00"}
    )
    m_id = m_resp.json()["id"]

    # 2. Add decision
    response = client.post(
        f"/meetings/{m_id}/decisions",
        json={"content": "We will use FastAPI"}
    )
    assert response.status_code == 201
    assert response.json()["content"] == "We will use FastAPI"

def test_action_item_lifecycle(client):
    # 1. Create meeting
    m_resp = client.post(
        "/meetings",
        json={"title": "Action Mtg", "date": "2023-10-27T13:00:00"}
    )
    m_id = m_resp.json()["id"]

    # 2. Add action item
    ai_resp = client.post(
        f"/meetings/{m_id}/action-items",
        json={"content": "Setup DB", "assignee": "Dave"}
    )
    assert ai_resp.status_code == 201
    ai_id = ai_resp.json()["id"]
    assert ai_resp.json()["status"] == "Pending"

    # 3. Update status
    update_resp = client.patch(
        f"/action-items/{ai_id}",
        json={"status": "In Progress"}
    )
    assert update_resp.status_code == 200
    assert update_resp.json()["status"] == "In Progress"
