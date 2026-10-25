# JobTrack

> A production-oriented full-stack job application tracking platform built with Java, Spring Boot, React, and PostgreSQL.

JobTrack is a full-stack application designed to help developers manage their job search from application to offer.

Instead of maintaining applications across spreadsheets, browser tabs, notes, and emails, JobTrack provides a centralized workspace for tracking applications, monitoring progress, recording interviews, managing follow-ups, and understanding job-search performance.

---

## Why JobTrack?

Job searching creates a surprisingly large amount of information:

- Which companies have I applied to?
- What position did I apply for?
- When did I apply?
- Which applications are still active?
- When should I follow up?
- Which applications reached the interview stage?
- Which sources produce the most responses?
- What is my interview conversion rate?

JobTrack is designed to answer these questions from one dashboard.

---

## Core Features

### Authentication & Security

- User registration and login
- JWT-based authentication
- BCrypt password hashing
- Protected REST endpoints
- User-specific application data
- Stateless authentication
- Role-ready security architecture

### Application Management

Create and manage job applications with information such as:

- Company
- Job title
- Location
- Work mode
- Employment type
- Application status
- Priority
- Salary range
- Job posting URL
- Application source
- Recruiter information
- Applied date
- Follow-up date
- Deadline
- Notes

### Application Pipeline

Applications can move through a structured workflow:

```text
SAVED
  ↓
APPLIED
  ↓
SCREENING
  ↓
INTERVIEW
  ↓
OFFER
```

Applications can also transition to:

```text
REJECTED
WITHDRAWN
GHOSTED
```

### Dashboard

The dashboard provides an overview of the job search including:

- Total applications
- Active applications
- Interviews
- Offers
- Rejections
- Applications by status
- Recent applications
- Follow-up opportunities

### Search & Filtering

Applications can be searched and filtered by:

- Company
- Position
- Status
- Priority
- Work mode
- Application source

---

# Architecture

JobTrack follows a separated full-stack architecture.

```text
                    ┌─────────────────────┐
                    │       Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + TypeScript  │
                    │       Frontend      │
                    └──────────┬──────────┘
                               │ REST / JSON
                               ▼
                    ┌─────────────────────┐
                    │    Spring Boot      │
                    │      Backend       │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ Spring Data JPA │         │ Spring Security │
        └────────┬────────┘         └─────────────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   PostgreSQL    │
        └─────────────────┘
```

The frontend communicates with the backend exclusively through REST APIs. Database access remains inside the backend layer.

---

# Technology Stack

## Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Bean Validation
- Flyway
- Maven
- PostgreSQL
- H2 for local development/testing

## Frontend

- React
- TypeScript
- Vite
- React Router
- Modern CSS

## Infrastructure

- Docker
- Docker Compose
- PostgreSQL
- Vercel
- Render

---

# Project Structure

```text
JobTrack/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   │
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docs/
│
├── docker-compose.yml
└── README.md
```

---

# Running Locally

## Requirements

Install:

- Java 21+
- Maven 3.9+
- Node.js 20+
- npm
- Docker Desktop (optional)

---

## Start the Backend

```bash
cd backend
mvn spring-boot:run
```

The API will be available at:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/actuator/health
```

---

## Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Docker

The project can also be started using Docker Compose:

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

To remove the database volume as well:

```bash
docker compose down -v
```

---

# API

The backend exposes REST endpoints for authentication, applications, and dashboard data.

Example:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/applications
POST   /api/applications
GET    /api/applications/{id}
PUT    /api/applications/{id}
DELETE /api/applications/{id}

GET    /api/dashboard
```

Authentication-protected endpoints require a valid JWT.

---

# Security

Security is treated as a core part of the application rather than an afterthought.

JobTrack implements:

- Password hashing with BCrypt
- JWT authentication
- Protected API endpoints
- User-level data isolation
- Stateless authentication
- Validation of incoming requests
- Database constraints
- Environment-based configuration

A user can only access applications belonging to that authenticated account.

---

# Development Roadmap

JobTrack is being developed incrementally.

### Phase 1 — Core Platform

- [x] Authentication
- [x] Application CRUD
- [x] Status management
- [x] Dashboard
- [x] Search
- [x] Filtering
- [x] Database persistence
- [x] Docker support

### Phase 2 — Advanced Tracking

- [ ] Kanban pipeline
- [ ] Application timeline
- [ ] Interview management
- [ ] Follow-up reminders
- [ ] Activity history
- [ ] Pagination and advanced sorting
- [ ] CSV import/export

### Phase 3 — Analytics

- [ ] Application conversion rate
- [ ] Interview conversion rate
- [ ] Offer conversion rate
- [ ] Application-source analytics
- [ ] Monthly job-search analytics

### Phase 4 — AI Features

- [ ] Job description analysis
- [ ] Resume-to-job matching
- [ ] Skill-gap analysis
- [ ] AI-generated application insights
- [ ] Job-specific interview preparation

### Phase 5 — Production Deployment

- [ ] Production PostgreSQL
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Production CORS configuration
- [ ] Environment secrets
- [ ] HTTPS
- [ ] Production monitoring
- [ ] CI/CD

---

# Engineering Goals

The goal of JobTrack is not simply to demonstrate CRUD operations.

The project is being developed to demonstrate practical software-engineering concepts including:

- Layered backend architecture
- REST API design
- Authentication and authorization
- Database modelling
- Transaction management
- Validation
- Exception handling
- Secure configuration
- Containerization
- Production deployment
- Scalable frontend/backend separation

---

# Future Architecture

The long-term architecture is designed to support deployment using a separate frontend and backend:

```text
                 Vercel
                   │
                   │ HTTPS
                   ▼
             React Frontend
                   │
                   │ REST API
                   ▼
              Render
          Spring Boot Backend
                   │
                   ▼
             PostgreSQL
```

This keeps the application portable between local development and production environments.

---

## Status

**Active development**

JobTrack is currently being developed as a portfolio-grade full-stack Java application.