# Deployment Guide

## Prerequisites
- Docker & Docker Compose
- A cloud provider account (AWS, DigitalOcean, Render, or Railway)

## Local Deployment (Production-like)
1. **Build and Run**:
   ```bash
   docker compose up --build -d
   ```
2. **Access**:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:8000
   - Database: localhost:5432

## Cloud Deployment (Docker)

### Option 1: Render / Railway (PaaS)
These platforms support `docker-compose.yml` or Dockerfile deployment directly.

1. **Connect Repository**: Link your GitHub repo.
2. **Backend Service**:
   - Point to `backend/Dockerfile`.
   - Set Environment Variables: `DATABASE_URL` (Internal Postgres connection).
3. **Frontend Service**:
   - Point to `frontend/Dockerfile`.
   - Set Environment Variable: `VITE_API_URL` to the Backend Service URL (e.g., `https://api.myapp.com`).
4. **Database**:
   - Provision a PostgreSQL service.

### Option 2: VPS (DigitalOcean/AWS EC2)
1. **Provision Server**: Ubuntu LTS.
2. **Install Docker**:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```
3. **Clone Repo**:
   ```bash
   git clone <repo-url>
   cd meeting-decision-tracker
   ```
4. **Configure Env**:
   - Update `docker-compose.yaml` or `.env` with secure passwords.
5. **Run**:
   ```bash
   docker compose up -d
   ```
6. **Reverse Proxy (Nginx/Traefik)**:
   - Setup a reverse proxy on the host to handle HTTPS (Let's Encrypt) and route domains.

## CI/CD integration
The provided `.github/workflows/ci.yml` ensures tests pass on every push.
To automate deployment:
1. Add a `deploy` job to the workflow.
2. Use SSH actions to pull and restart on VPS, or webhook triggers for PaaS.
