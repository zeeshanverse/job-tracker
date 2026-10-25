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

## 6. Troubleshooting: "Failed to fetch" / "Cannot reach the server" on register or login

The browser sends a CORS preflight (`OPTIONS`) before every JSON request from `http://localhost:5173`
to `http://localhost:8080`. Check it directly:

```bash
curl -i -X OPTIONS http://localhost:8080/api/auth/login \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"
```

Expected: `HTTP 200` with an `Access-Control-Allow-Origin: http://localhost:5173` header.
`403 Invalid CORS request` means the CORS configuration is not being applied. In `SecurityConfig` the
`CorsConfigurationSource` bean **must be named `corsConfigurationSource`**; Spring Security ignores any other name.

If you open the frontend from a different origin (another port, a LAN IP, a deployed domain), add it to
`CORS_ALLOWED_ORIGINS` (comma-separated) before starting the backend.

A 401 on any request after login means the token expired or the database was reset. The UI returns you to the
sign-in screen automatically.
