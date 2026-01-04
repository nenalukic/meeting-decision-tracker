from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas
from .database import engine, get_db

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Meeting Decision Tracker API", version="1.0.0")

# --- Meetings ---

@app.post("/meetings", response_model=schemas.Meeting, status_code=status.HTTP_201_CREATED)
def create_meeting(meeting: schemas.MeetingCreate, db: Session = Depends(get_db)):
    db_meeting = models.Meeting(**meeting.model_dump())
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    return db_meeting

@app.get("/meetings", response_model=List[schemas.Meeting])
def list_meetings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    meetings = db.query(models.Meeting).offset(skip).limit(limit).all()
    return meetings

@app.get("/meetings/{meeting_id}", response_model=schemas.Meeting)
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if meeting is None:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting

# --- Decisions ---

@app.post("/meetings/{meeting_id}/decisions", response_model=schemas.Decision, status_code=status.HTTP_201_CREATED)
def create_decision(meeting_id: int, decision: schemas.DecisionCreate, db: Session = Depends(get_db)):
    # Verify meeting exists
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    db_decision = models.Decision(**decision.model_dump(), meeting_id=meeting_id)
    db.add(db_decision)
    db.commit()
    db.refresh(db_decision)
    return db_decision

@app.get("/meetings/{meeting_id}/decisions", response_model=List[schemas.Decision])
def list_meeting_decisions(meeting_id: int, db: Session = Depends(get_db)):
    # Verify meeting exists
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    return db.query(models.Decision).filter(models.Decision.meeting_id == meeting_id).all()

# --- Action Items ---

@app.post("/meetings/{meeting_id}/action-items", response_model=schemas.ActionItem, status_code=status.HTTP_201_CREATED)
def create_action_item(meeting_id: int, item: schemas.ActionItemCreate, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    db_item = models.ActionItem(**item.model_dump(), meeting_id=meeting_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/meetings/{meeting_id}/action-items", response_model=List[schemas.ActionItem])
def list_meeting_action_items(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    return db.query(models.ActionItem).filter(models.ActionItem.meeting_id == meeting_id).all()

@app.patch("/action-items/{action_item_id}", response_model=schemas.ActionItem)
def update_action_item(action_item_id: int, update_data: schemas.ActionItemUpdate, db: Session = Depends(get_db)):
    item = db.query(models.ActionItem).filter(models.ActionItem.id == action_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Action item not found")
    
    # Update only provided fields
    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    
    db.commit()
    db.refresh(item)
    return item
