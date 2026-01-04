✅ Meeting Decision Tracker – Project Checklist

Rule: After every checked item → run, test, commit

🧩 Project Setup

 Create base folders docs, backend, frontend, tests

 Add .gitignore

 Initialize root package.json

 Create initial README.md

 Run project setup successfully

 Commit: chore: initialize project structure

📝 Problem Description (README)

 Describe the problem clearly

 Explain what the system does

 List expected functionality

 Define non-goals

 Add feature overview

 Proofread README

 Commit: docs: add clear problem description and goals

🤖 AI-Assisted Development & MCP

 Document use of ChatGPT

 Document use of Antigravity

 Describe step-by-step AI workflow

 Explain MCP-style shared contracts (OpenAPI, schemas)

 Place documentation in README or docs/AI.md

 Commit: docs: document AI-assisted development and MCP workflow

📐 OpenAPI Specification

 Create docs/openapi.yaml

 Define Meetings CRUD endpoints

 Define Decisions CRUD endpoints

 Define decision status updates

 Define request/response schemas

 Validate OpenAPI syntax

 Ensure spec matches frontend needs

 Commit: spec: add OpenAPI contract

🖥 Backend Skeleton

 Setup Express server

 Create routes/controllers/services structure

 Add health check endpoint

 No business logic yet

 Run backend successfully

 Test /health endpoint

 Commit: feat: add backend skeleton

🗄 Database Integration

 Add PostgreSQL configuration

 Add SQLite configuration for tests

 Create database schema

 Implement migrations or schema scripts

 Verify tables are created

 Document DB setup

 Commit: feat: integrate database with postgres and sqlite

🔌 Backend Business Logic

 Implement all OpenAPI endpoints

 Validate input data

 Persist data in database

 Match OpenAPI contract exactly

 Run backend with real DB

 Manual or scripted endpoint tests

 Commit: feat: implement backend endpoints

🧪 Backend Integration Tests

 Create tests/integration/ folder

 Test meeting creation

 Test decision creation

 Test decision status update

 Use real database (SQLite)

 Clearly separate integration tests

 Document test commands

 Commit: test: add backend integration tests

🎨 Frontend Setup

 Initialize React + Vite

 Configure Tailwind

 Create base pages (Meetings, Details)

 Establish folder structure

 Run frontend locally

 Verify UI loads

 Commit: feat: initialize frontend

🔗 Frontend API Integration 

 Create centralized API client

 Implement API calls per OpenAPI

 Connect UI to backend

 Ensure no scattered fetch calls

 Run full system locally

 Verify end-to-end flow

 Commit: feat: connect frontend to backend

🧪 Frontend Tests (Optional)

 Add frontend test framework

 Test API client logic

 Test key UI behavior

 Run frontend tests

 Commit: test: add frontend tests

📦 Containerization

 Create Dockerfile(s)

 Create docker-compose.yml

 Include frontend, backend, DB

 Run entire system with Docker

 No manual setup steps

 Document Docker usage

 Commit: chore: containerize application

🚀 CI/CD Pipeline

 Add GitHub Actions workflow

 Run tests on push

 Block deploy if tests fail

 Deploy automatically on success

 Verify pipeline runs

 Commit: ci: add ci/cd pipeline

🌍 Deployment

 Deploy to cloud (Render)

 Verify live URL works

 Document deployment steps

 Explain free-tier sleep behavior

 Add URL to README

 Commit: deploy: deploy application

🔁 Reproducibility

 Clear setup instructions

 Clear run instructions

 Clear test instructions

 Clear deployment instructions

 Fresh clone test passes

 Commit: docs: finalize reproducibility

🏁 Final Verification

 All criteria met

 README complete

 OpenAPI up to date

 Tests passing

 App deployed

 Commits clean and logical