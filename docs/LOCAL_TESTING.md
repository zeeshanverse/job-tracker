# Local testing checklist

## 1. Backend

```bash
cd backend
mvn clean test
mvn spring-boot:run
```

Expected: Spring Boot starts on port 8080 and `/actuator/health` reports UP.

## 2. Frontend

```bash
cd frontend
npm install
npm run build
npm run dev
```

Expected: Vite serves the app on port 5173.

## 3. Browser acceptance

- Register
- Login
- Add job
- Change status
- Edit job
- Search/filter
- Delete job
- Logout

## 4. Isolation test

Register user A and add two jobs. Register user B in a separate browser/incognito session. User B must see zero jobs.

## 5. Persistence test

Create a job, stop/restart the backend, log in again and verify the job remains.
