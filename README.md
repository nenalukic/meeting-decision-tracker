# Meeting Decision Tracker

## Problem Statement
In many organizations, meetings are frequent but their outcomes are often lost. Decisions are made verbally, but without a centralized record, they are forgotten, leading to lack of accountability, confusion, and redundant discussions. "What did we decide about X?" is a common question that wastes time and resources.

## Solution
**Meeting Decision Tracker** is a web application designed to capture meeting details, explicitly record decisions, and track follow-up action items. It serves as a single source of truth for organizational consensus.

## Target Users
1.  **Project Managers**: To ensure team alignment and track action item completion.
2.  **Product Owners**: To document feature scope and requirements agreed upon in meetings.
3.  **Engineering Leads**: To record architectural decisions and technical constraints.
4.  **Team Members**: To review what was decided in meetings they missed or need a refresher on.

## Core Features
1.  **Meeting Management**: detailed logs of meetings including date, attendees, and agenda.
2.  **Decision Registry**: Distinct section for recording final decisions, untangled from general notes.
3.  **Action Item Tracking**: Assign tasks to users with status (Pending, In Progress, Done).
4.  **Search & Filter**: Quickly find "all decisions regarding Database" or "all actions assigned to Bob".
5.  **Audit Trail**: History of updates to decisions.

## Technology Stack
-   **Backend**: Python (FastAPI) - for high performance and automatic OpenAPI generation.
-   **Frontend**: TypeScript (React + Vite) - for a responsive and type-safe UI.
-   **Database**: PostgreSQL - for reliable relational data storage.
-   **Infrastructure**: Docker & Docker Compose - for containerization and easy deployment.
-   **Testing**: Pytest (Backend), Vitest (Frontend).
