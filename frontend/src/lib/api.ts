export const API: string =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const TOKEN_KEY = 'jobtrack_token'
const USER_KEY = 'jobtrack_user'

/** Fired when the backend says our token is missing/expired, so the app can return to the login screen. */
export const UNAUTHORIZED_EVENT = 'jobtrack:unauthorized'

export type User = {
  id: string
  name: string
  email: string
}

export type AuthResult = {
  token: string
  user: User
}

export type Job = {
  id: string
  company: string
  position: string
  location?: string
  workMode: string
  status: string
  priority: string
  source?: string
  jobUrl?: string
  salary?: string
  recruiterName?: string
  recruiterEmail?: string
  appliedDate?: string
  deadline?: string
  nextFollowUpDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type Dashboard = {
  total: number
  saved: number
  applied: number
  screening: number
  interviews: number
  offers: number
  rejected: number
  active: number
}

export type JobPage = {
  content: Job[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

/* ---------- session helpers ---------- */

export function saveSession(result: AuthResult) {
  localStorage.setItem(TOKEN_KEY, result.token)
  localStorage.setItem(USER_KEY, JSON.stringify(result.user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

/* ---------- request helper ---------- */

function describeError(body: any, status: number): string {
  // Validation errors: { error, fields: { password: "size must be..." } }
  if (body && typeof body.fields === 'object' && body.fields) {
    const parts = Object.entries(body.fields as Record<string, string>).map(
      ([field, message]) => `${field.charAt(0).toUpperCase()}${field.slice(1)}: ${message}`
    )
    if (parts.length) return parts.join('. ')
  }
  if (body && typeof body.error === 'string' && body.error) return body.error
  if (body && typeof body.message === 'string' && body.message) return body.message
  return `Request failed (${status})`
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  // Login/register must never carry an old token.
  const isAuthCall = path.startsWith('/auth/')
  const token = isAuthCall ? null : localStorage.getItem(TOKEN_KEY)

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init.headers as Record<string, string>) || {}),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(API + path, { ...init, headers })
  } catch {
    // fetch() only throws when the request never got a usable response:
    // server down, wrong URL, or the browser blocked it (CORS).
    throw new Error(
      `Cannot reach the server at ${API}. Check that the backend is running and that CORS_ALLOWED_ORIGINS includes ${window.location.origin}.`
    )
  }

  if (!response.ok) {
    if (!isAuthCall && (response.status === 401 || response.status === 403)) {
      clearSession()
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
      throw new Error('Your session has expired. Please sign in again.')
    }

    let body: any = null
    try {
      body = await response.json()
    } catch {
      /* non-JSON error body */
    }
    throw new Error(describeError(body, response.status))
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T)
}

export const api = {
  register: (x: { name: string; email: string; password: string }) =>
    request<AuthResult>('/auth/register', { method: 'POST', body: JSON.stringify(x) }),

  login: (x: { email: string; password: string }) =>
    request<AuthResult>('/auth/login', { method: 'POST', body: JSON.stringify(x) }),

  dashboard: () => request<Dashboard>('/jobs/dashboard'),

  jobs: (page = 0, size = 50) => request<JobPage>(`/jobs?page=${page}&size=${size}`),

  create: (x: unknown) => request<Job>('/jobs', { method: 'POST', body: JSON.stringify(x) }),

  update: (id: string, x: unknown) =>
    request<Job>(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(x) }),

  remove: (id: string) => request<void>(`/jobs/${id}`, { method: 'DELETE' }),
}
