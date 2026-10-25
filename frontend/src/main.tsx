import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { UNAUTHORIZED_EVENT, User, clearSession, loadUser } from './lib/api'

function App() {
  const [user, setUser] = useState<User | null>(loadUser)
  const [notice, setNotice] = useState('')

  // If the backend rejects our token (expired, or the database was reset), go back to login.
  useEffect(() => {
    const onUnauthorized = () => {
      setUser(null)
      setNotice('Your session expired. Please sign in again.')
    }
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const logout = () => {
    clearSession()
    setNotice('')
    setUser(null)
  }

  if (!user) {
    return (
      <Login
        notice={notice}
        onAuth={(u) => {
          setNotice('')
          setUser(u)
        }}
      />
    )
  }

  return <Dashboard user={user} onLogout={logout} />
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
