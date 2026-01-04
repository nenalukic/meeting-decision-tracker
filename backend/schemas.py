from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime, date
from .models import ActionItemStatus

class DecisionBase(BaseModel):
    content: str

class DecisionCreate(DecisionBase):
    pass

class Decision(DecisionBase):
    id: int
    meeting_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ActionItemBase(BaseModel):
    content: str
    assignee: Optional[str] = None
    due_date: Optional[date] = None

class ActionItemCreate(ActionItemBase):
    pass

class ActionItemUpdate(BaseModel):
    status: Optional[ActionItemStatus] = None
    assignee: Optional[str] = None

class ActionItem(ActionItemBase):
    id: int
    meeting_id: int
    status: ActionItemStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class MeetingBase(BaseModel):
    title: str
    date: datetime
    attendees: List[str] = []

class MeetingCreate(MeetingBase):
    pass

class Meeting(MeetingBase):
    id: int
    created_at: datetime
    # We could include decisions/action_items here but the API spec has separate endpoints for listing them.
    # However, for 'get_meeting', we might want them? The spec said 'The meeting details'.
    # I'll stick to the base Meeting model for now as per the spec for /meetings list.

    model_config = ConfigDict(from_attributes=True)
