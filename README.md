# JobTrack — Full-Stack Job Application Tracker

JobTrack is a production-oriented evolution of the referenced Java Swing job tracker. The reference application provides login/register, add/view/edit/remove job records and file persistence; JobTrack keeps that core idea but moves persistence to a relational database and adds a web UI, REST API, JWT authentication, dashboard metrics, filtering/search, follow-up/deadline fields, recruiter information, priorities, work modes, Docker support and a clean path to Vercel + Render deployment.

Reference: https://github.com/SudiptoDEV90/JOB-Tracker-Application-System

## Architecture

- `backend/`: Java 21 + Spring Boot 3.5 + Spring Security + JWT + Spring Data JPA + Flyway + PostgreSQL/H2
- `frontend/`: React + TypeScript + Vite
- `docker-compose.yml`: PostgreSQL + backend + frontend
- `docs/`: local testing and deployment notes

## Features

### Authentication
- Register and login
- BCrypt password hashing
- Stateless JWT authentication
- Per-user data isolation

### Job tracking
- Company, position, location
- Remote/hybrid/onsite/flexible
- Saved/applied/screening/interview/offer/rejected/withdrawn/ghosted
- Low/medium/high priority
- Source, URL, salary
- Recruiter name/email
- Applied date, deadline, next follow-up
- Notes
- Create, read, update, delete
- Search and status filtering

### Dashboard
- Total applications
- Saved, applied, screening, interview, offers, rejected and active counts

## Local development — recommended first path

### Option A: easiest backend path (H2, no database installation)

Prerequisites:
- JDK 21
- Maven 3.9+
- Node 20+

Backend:

```bash
cd backend
mvn spring-boot:run
```

The backend uses the `local` profile by default and stores H2 data in `backend/data/`.

Frontend in another terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173.

### Option B: full local PostgreSQL stack

Install Docker Desktop, then from the repository root:

```bash
docker compose up --build
```

Open http://localhost:5173.

## API smoke tests

Health:

```bash
curl http://localhost:8080/actuator/health
```

Register:

```bash
curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"name":"Zeeshan","email":"zeeshan@example.com","password":"Password123!"}'
```

Login and copy the returned token:

```bash
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"email":"zeeshan@example.com","password":"Password123!"}'
```

Then call dashboard:

```bash
curl http://localhost:8080/api/jobs/dashboard -H "Authorization: Bearer YOUR_TOKEN"
```

## Manual acceptance test

1. Register a new account.
2. Log in.
3. Add an application in each important status.
4. Confirm dashboard counters change.
5. Search by company/role/location.
6. Filter by status.
7. Edit a record and verify the table updates.
8. Delete a record and verify it disappears.
9. Log out and confirm the login screen returns.
10. Create a second account and confirm it cannot see the first account's jobs.
11. Restart the backend and confirm H2 data persists.

## Deployment strategy

Do **not** change the architecture for hosting before the local baseline works.

Recommended production topology:

- Frontend: Vercel
- Backend: Render Web Service
- Database: Render PostgreSQL or another managed PostgreSQL provider
- Frontend environment: `VITE_API_URL=https://YOUR-BACKEND.onrender.com/api`
- Backend environment: `SPRING_PROFILES_ACTIVE=postgres`, database credentials/URL, strong `JWT_SECRET`, and `CORS_ALLOWED_ORIGINS=https://YOUR-VERCEL-DOMAIN.vercel.app`

The frontend is deliberately separated from the backend so this transition is configuration-driven rather than a rewrite.

## Important production hardening before launch

- Replace the demo JWT secret.
- Use a managed PostgreSQL database.
- Restrict CORS to the exact Vercel domain.
- Disable H2 console in production.
- Add HTTPS-only cookie/session strategy if moving away from localStorage JWT.
- Add rate limiting and login brute-force protection.
- Add email verification/password reset if public users will use the service.
- Add structured logging and error tracking.
- Add automated backend tests and frontend E2E tests before calling the hosted version production-ready.

## Roadmap for the next iteration

1. Local baseline validation.
2. Add richer dashboard charts and weekly application analytics.
3. Add interviews/events as a first-class entity.
4. Add reminders/notifications.
5. Add resume/version tracking.
6. Add CSV import/export.
7. Add application activity timeline.
8. Add optional AI-assisted job description parsing using Spring AI.
9. Add production observability and CI/CD.
10. Deploy Vercel + Render only after all local acceptance tests pass.
