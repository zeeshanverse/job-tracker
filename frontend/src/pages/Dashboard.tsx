import { useCallback, useEffect, useMemo, useState } from 'react'
import { ExternalLink, LogOut, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import { api, Job, Dashboard, User } from '../lib/api'
import JobForm from '../components/JobForm'

const FILTERS = ['ALL', 'SAVED', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN', 'GHOSTED']

const label = (s: string) => (s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase())

export default function DashboardPage({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [data, setData] = useState<Dashboard | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('ALL')
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState<Job | null>(null)
  const [err, setErr] = useState('')

  const load = useCallback(async () => {
    try {
      const [d, p] = await Promise.all([api.dashboard(), api.jobs()])
      setData(d)
      setJobs(p.content)
      setErr('')
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const closeForm = useCallback(() => {
    setShow(false)
    setEdit(null)
  }, [])

  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeForm()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show, closeForm])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return jobs.filter(
      (j) =>
        (status === 'ALL' || j.status === status) &&
        `${j.company} ${j.position} ${j.location || ''}`.toLowerCase().includes(needle)
    )
  }, [jobs, status, q])

  const save = async (payload: any) => {
    if (edit) await api.update(edit.id, payload)
    else await api.create(payload)
    closeForm()
    await load()
  }

  const remove = async (job: Job) => {
    if (!confirm(`Delete your application to ${job.company}?`)) return
    try {
      await api.remove(job.id)
      await load()
    } catch (e: any) {
      setErr(e.message)
    }
  }

  const openNew = () => {
    setEdit(null)
    setShow(true)
  }

  const small: [string, number | undefined][] = [
    ['Saved', data?.saved],
    ['Applied', data?.applied],
    ['Screening', data?.screening],
    ['Interview', data?.interviews],
    ['Offers', data?.offers],
    ['Rejected', data?.rejected],
  ]

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">
          <span className="logo-mark">J</span>
          JobTrack
        </div>
        <div className="topbar-right">
          <span className="muted who">{user.name}</span>
          <button className="ghost" onClick={onLogout}>
            <LogOut size={16} aria-hidden="true" /> Log out
          </button>
        </div>
      </header>

      <main className="container">
        <div className="hero">
          <div>
            <h1>Your applications</h1>
            <p className="muted">
              {data
                ? data.total === 0
                  ? 'Nothing tracked yet. Add your first application to start your pipeline.'
                  : `You are tracking ${data.total} application${data.total === 1 ? '' : 's'}, and ${data.active} ${data.active === 1 ? 'is' : 'are'} still active.`
                : 'Loading your pipeline…'}
            </p>
          </div>
          <button onClick={openNew}>
            <Plus size={18} aria-hidden="true" /> Add application
          </button>
        </div>

        {err && (
          <div className="error" role="alert">
            {err}
          </div>
        )}

        <section className="stats" aria-label="Pipeline summary">
          <div className="stat stat-main">
            <span>Active</span>
            <b>{data?.active ?? '–'}</b>
            <small>of {data?.total ?? '–'} total, not rejected or withdrawn</small>
          </div>
          {small.map(([k, v]) => (
            <div className="stat" key={k}>
              <span>{k}</span>
              <b>{v ?? '–'}</b>
            </div>
          ))}
        </section>

        <section className="toolbar">
          <label className="search">
            <Search size={16} aria-hidden="true" />
            <input
              aria-label="Search applications"
              placeholder="Search company, role or location"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <div className="chips" role="group" aria-label="Filter by status">
            {FILTERS.map((x) => (
              <button
                key={x}
                type="button"
                className={'chip' + (status === x ? ' on' : '')}
                aria-pressed={status === x}
                onClick={() => setStatus(x)}
              >
                {label(x)}
              </button>
            ))}
          </div>
        </section>

        <section className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Mode</th>
                <th>Applied</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((j) => (
                <tr key={j.id}>
                  <td>
                    <strong>{j.company}</strong>
                    <small>{j.location || 'No location'}</small>
                  </td>
                  <td>{j.position}</td>
                  <td>
                    <span className={'badge ' + j.status.toLowerCase()}>{label(j.status)}</span>
                  </td>
                  <td>{label(j.priority)}</td>
                  <td>{label(j.workMode)}</td>
                  <td>{j.appliedDate || '–'}</td>
                  <td className="row-actions">
                    <button
                      className="icon"
                      title="Edit"
                      aria-label={`Edit ${j.company}`}
                      onClick={() => {
                        setEdit(j)
                        setShow(true)
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button className="icon danger" title="Delete" aria-label={`Delete ${j.company}`} onClick={() => remove(j)}>
                      <Trash2 size={16} />
                    </button>
                    {j.jobUrl && (
                      <a className="icon" href={j.jobUrl} target="_blank" rel="noreferrer" title="Open job posting" aria-label={`Open ${j.company} posting`}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={7} className="empty">
                    {loading
                      ? 'Loading applications…'
                      : jobs.length === 0
                        ? 'No applications yet. Use “Add application” to track your first one.'
                        : 'No applications match your search or filter.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      {show && (
        <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && closeForm()}>
          <div className="modal-card" role="dialog" aria-modal="true" aria-label={edit ? 'Edit application' : 'New application'}>
            <div className="modal-head">
              <h2>{edit ? 'Edit application' : 'New application'}</h2>
              <button className="icon" onClick={closeForm} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <JobForm initial={edit || undefined} onSave={save} onCancel={closeForm} />
          </div>
        </div>
      )}
    </div>
  )
}
