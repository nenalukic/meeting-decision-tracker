# Meeting Decision Tracker
> **Live Demo:** [https://meeting-decision-tracker-frontend.onrender.com](https://meeting-decision-tracker-frontend.onrender.com)

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

---

## Quick Start

### Prerequisites
- **Python 3.11+**
- **Node.js 20+**
- **Docker & Docker Compose** (for containerized deployment)

### Option 1: Local Development (Fastest)

```bash
# Clone the repository
git clone <repo-url>
cd meeting-decision-tracker

# Run the start script (sets up venv, installs dependencies, starts both services)
./run_local.sh
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **OpenAPI Docs**: http://localhost:8000/docs

### Option 2: Docker Compose (Recommended for Testing)

```bash
# Start all services (backend, frontend, PostgreSQL)
docker-compose up --build

# In another terminal, initialize the database (first run only)
docker-compose exec backend alembic upgrade head
```

The application will be available at:
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000

### Option 3: Manual Setup (For Development)

#### Backend Setup:
```bash
# Create and activate virtual environment
python3 -m venv backend/venv
source backend/venv/bin/activate  # macOS/Linux
# or: backend\venv\Scripts\activate  # Windows

# Install dependencies
pip install -r backend/requirements.txt

# Set up database (PostgreSQL or SQLite for local dev)
# For local dev with SQLite, no setup needed (auto-created)
# For PostgreSQL, set DATABASE_URL environment variable

# Start backend server
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Frontend Setup (in another terminal):
```bash
cd frontend

# Install dependencies
npm ci

# Start development server
npm run dev
```

---

## Environment Configuration

### Local Development
The application uses **SQLite by default** for local development. No environment variables needed.

### Docker / Production (PostgreSQL)
Set the `DATABASE_URL` environment variable:
```bash
export DATABASE_URL=postgresql://user:password@db:5432/meeting_tracker
```

### Frontend API URL
The frontend needs to know the backend API location:
- **Local dev**: `http://localhost:8000` (default)
- **Docker**: `http://backend:8000`
- **Production (Render)**: `https://meeting-tracker-api.onrender.com`

---

## Deployment to Render

### Prerequisites
- Render account (https://render.com)
- GitHub repository with this code

### Deployment Steps

1. **Connect Repository**
   - Log in to Render.com
   - Click "New +" → "Blueprint"
   - Select this repository
   - Choose main branch

2. **Render Configuration**
   - The `render.yaml` file automatically configures:
     - **Backend**: Python service with uvicorn
     - **Frontend**: Node.js service with Nginx
     - **Database**: PostgreSQL database
   - Render will provision everything from the blueprint

3. **Deploy**
   - Click "Deploy"
   - Render will build and start all services
   - Access your application at:
     - **Frontend**: https://meeting-tracker.onrender.com
     - **Backend API**: https://meeting-tracker-api.onrender.com

4. **First-Time Database Setup**
   ```bash
   # Run migrations (if using Alembic)
   render run alembic upgrade head
   ```

### Post-Deployment
- Monitor logs in Render dashboard
- Database credentials are automatically created
- Static frontend assets are served via Nginx
- API endpoint is CORS-enabled for frontend

---

## API Documentation

The backend automatically generates OpenAPI documentation from code.

**Interactive API Docs**: Visit `/docs` on the backend
- Local: http://localhost:8000/docs
- Production: https://meeting-tracker-api.onrender.com/docs

**OpenAPI Specification**: See [api/openapi.yaml](api/openapi.yaml)

### Key Endpoints
- `POST /meetings` - Create a new meeting
- `GET /meetings` - List all meetings
- `GET /meetings/{id}` - Get meeting details
- `POST /meetings/{id}/decisions` - Add decision to meeting
- `POST /meetings/{id}/action-items` - Add action item to meeting
- `PATCH /action-items/{id}` - Update action item status

---

## Testing

### Backend Tests
```bash
cd backend
pytest                   # Run all tests
pytest -v              # Verbose output
pytest tests/test_api.py  # Run specific test file
```

### Frontend Tests
```bash
cd frontend
npm run test           # Run tests
npm run test -- --ui   # Run with UI
```

---

## Development Guide

### Making Changes
1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes to backend/frontend
3. Run tests locally before committing
4. Commit with descriptive messages
5. Push and create a Pull Request

### Adding Dependencies
- **Backend**: `pip install package-name` then `pip freeze > requirements.txt`
- **Frontend**: `npm install package-name`

### Generating API Client
Frontend API client is auto-generated from OpenAPI spec. To regenerate:
```bash
# Use openapi-generator or similar tool
openapi-generator-cli generate -i api/openapi.yaml -g typescript-fetch -o frontend/src/client/
```

---

## Troubleshooting

### Backend won't start
- Check Python version: `python3 --version` (needs 3.11+)
- Ensure venv is activated
- Check PostgreSQL is running (if using PG)

### Frontend can't reach backend
- Verify backend is running on `localhost:8000`
- Check `VITE_API_URL` environment variable
- Clear browser cache and cookies

### Database errors
- For local dev: Delete `app.db` to reset SQLite
- For Docker: `docker-compose down -v` to remove volumes
- For Render: Check database status in dashboard

### Port conflicts
- Backend (8000): `lsof -i :8000 | grep LISTEN`
- Frontend (80): Requires sudo or higher port number
- PostgreSQL (5432): `lsof -i :5432 | grep LISTEN`

---

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation as needed
4. Keep commits atomic and descriptive

---

## License

[Add your license here]
