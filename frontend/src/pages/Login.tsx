import { FormEvent, useState } from 'react'
import { api, saveSession, User } from '../lib/api'

const STAGES = ['Saved', 'Applied', 'Screening', 'Interview', 'Offer']

export default function Login({
  onAuth,
  notice = '',
}: {
  onAuth: (user: User) => void
  notice?: string
}) {
  const [register, setRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (busy) return
    setError('')
    setBusy(true)
    try {
      const cleanEmail = email.trim().toLowerCase()
      const result = register
        ? await api.register({ name: name.trim(), email: cleanEmail, password })
        : await api.login({ email: cleanEmail, password })
      saveSession(result)
      onAuth(result.user)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const switchMode = () => {
    setRegister((r) => !r)
    setError('')
  }

  return (
    <main className="auth">
      <aside className="auth-brand">
        <div className="logo">
          <span className="logo-mark">J</span>
          JobTrack
        </div>

        <div className="auth-pitch">
          <h1>Know where every application stands.</h1>
          <p>
            Save roles, log applications, and keep your interviews and follow-ups in one place, so
            nothing slips while you wait to hear back.
          </p>
        </div>

        <div className="steps" aria-hidden="true">
          {STAGES.map((stage, i) => (
            <div className="step" key={stage} style={{ ['--h' as any]: `${28 + i * 18}%` }}>
              {stage}
            </div>
          ))}
        </div>
      </aside>

      <section className="auth-panel">
        <form className="auth-form" onSubmit={submit} noValidate={false}>
          <h2>{register ? 'Create your account' : 'Sign in'}</h2>
          <p className="muted">
            {register ? 'It takes a few seconds.' : 'Welcome back. Pick up where you left off.'}
          </p>

          {notice && !error && <div className="notice">{notice}</div>}

          {register && (
            <label>
              Name
              <input
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}

          <label>
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              required
              minLength={register ? 8 : undefined}
              type="password"
              autoComplete={register ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {register && <small className="hint">Use at least 8 characters.</small>}
          </label>

          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={busy}>
            {busy ? (register ? 'Creating account…' : 'Signing in…') : register ? 'Create account' : 'Sign in'}
          </button>

          <button type="button" className="link switch" onClick={switchMode}>
            {register ? 'Already have an account? Sign in' : 'New here? Create an account'}
          </button>
        </form>
      </section>
    </main>
  )
}
