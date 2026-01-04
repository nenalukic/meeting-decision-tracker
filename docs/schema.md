# Database Schema

## Tables

### 1. meetings
Stores information about each meeting.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY` | Auto-incrementing ID |
| `title` | `VARCHAR` | `NOT NULL` | Title of the meeting |
| `date` | `TIMESTAMP` | `NOT NULL` | When the meeting occurred |
| `attendees` | `JSONB` | | List of attendee names/emails |
| `created_at` | `TIMESTAMP` | `DEFAULT NOW()` | Record creation time |

### 2. decisions
Records decisions made during a meeting.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY` | Auto-incrementing ID |
| `meeting_id` | `INTEGER` | `FOREIGN KEY` | Links to `meetings.id` |
| `content` | `TEXT` | `NOT NULL` | The decision text |
| `created_at` | `TIMESTAMP` | `DEFAULT NOW()` | Record creation time |

### 3. action_items
Tracks tasks assigned during meetings.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY` | Auto-incrementing ID |
| `meeting_id` | `INTEGER` | `FOREIGN KEY` | Links to `meetings.id` |
| `content` | `TEXT` | `NOT NULL` | The task description |
| `assignee` | `VARCHAR` | | Person responsible |
| `due_date` | `DATE` | | Due date |
| `status` | `VARCHAR` | `DEFAULT 'Pending'` | Status: Pending, In Progress, Done |
| `created_at` | `TIMESTAMP` | `DEFAULT NOW()` | Record creation time |

## Relationships
- One **Meeting** has many **Decisions**.
- One **Meeting** has many **Action Items**.
