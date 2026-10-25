# JobTrack API

Base URL: `http://localhost:8080/api`

## Public

- `POST /auth/register`
- `POST /auth/login`

## Authenticated

- `GET /jobs/dashboard`
- `GET /jobs?page=0&size=20&sort=newest`
- `GET /jobs/{id}`
- `POST /jobs`
- `PUT /jobs/{id}`
- `DELETE /jobs/{id}`
- `GET /jobs/meta/statuses`
- `GET /jobs/meta/work-modes`
- `GET /jobs/meta/priorities`

Use `Authorization: Bearer <JWT>` for authenticated requests.
