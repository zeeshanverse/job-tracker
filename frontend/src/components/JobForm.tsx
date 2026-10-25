import { FormEvent, useState } from 'react'

const defaults = {
  company: '',
  position: '',
  location: '',
  workMode: 'FLEXIBLE',
  status: 'SAVED',
  priority: 'MEDIUM',
  source: '',
  jobUrl: '',
  salary: '',
  recruiterName: '',
  recruiterEmail: '',
  appliedDate: '',
  deadline: '',
  nextFollowUpDate: '',
  notes: '',
}

const WORK_MODES = ['REMOTE', 'HYBRID', 'ONSITE', 'FLEXIBLE']
const STATUSES = ['SAVED', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN', 'GHOSTED']
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH']

const label = (s: string) => s.charAt(0) + s.slice(1).toLowerCase()

export default function JobForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: any
  onSave: (x: any) => Promise<void>
  onCancel: () => void
}) {
  const [f, setF] = useState<any>({ ...defaults, ...initial })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k: string, v: string) => setF((x: any) => ({ ...x, [k]: v }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (busy) return
    setError('')
    setBusy(true)
    try {
      await onSave({
        company: f.company,
        position: f.position,
        location: f.location,
        workMode: f.workMode,
        status: f.status,
        priority: f.priority,
        source: f.source,
        jobUrl: f.jobUrl,
        salary: f.salary,
        recruiterName: f.recruiterName,
        recruiterEmail: f.recruiterEmail,
        appliedDate: f.appliedDate || null,
        deadline: f.deadline || null,
        nextFollowUpDate: f.nextFollowUpDate || null,
        notes: f.notes,
      })
    } catch (err: any) {
      setError(err?.message || 'Could not save this application.')
      setBusy(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="grid two">
        <label>
          Company
          <input required value={f.company} onChange={(e) => set('company', e.target.value)} />
        </label>
        <label>
          Position
          <input required value={f.position} onChange={(e) => set('position', e.target.value)} />
        </label>
        <label>
          Location
          <input value={f.location || ''} onChange={(e) => set('location', e.target.value)} />
        </label>
        <label>
          Work mode
          <select value={f.workMode} onChange={(e) => set('workMode', e.target.value)}>
            {WORK_MODES.map((x) => (
              <option key={x} value={x}>
                {label(x)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={f.status} onChange={(e) => set('status', e.target.value)}>
            {STATUSES.map((x) => (
              <option key={x} value={x}>
                {label(x)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select value={f.priority} onChange={(e) => set('priority', e.target.value)}>
            {PRIORITIES.map((x) => (
              <option key={x} value={x}>
                {label(x)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Source
          <input placeholder="LinkedIn, Naukri…" value={f.source || ''} onChange={(e) => set('source', e.target.value)} />
        </label>
        <label>
          Job URL
          <input type="url" placeholder="https://" value={f.jobUrl || ''} onChange={(e) => set('jobUrl', e.target.value)} />
        </label>
        <label>
          Salary
          <input placeholder="₹8–12 LPA" value={f.salary || ''} onChange={(e) => set('salary', e.target.value)} />
        </label>
        <label>
          Recruiter name
          <input value={f.recruiterName || ''} onChange={(e) => set('recruiterName', e.target.value)} />
        </label>
        <label>
          Recruiter email
          <input type="email" value={f.recruiterEmail || ''} onChange={(e) => set('recruiterEmail', e.target.value)} />
        </label>
        <label>
          Applied date
          <input type="date" value={f.appliedDate || ''} onChange={(e) => set('appliedDate', e.target.value)} />
        </label>
        <label>
          Deadline
          <input type="date" value={f.deadline || ''} onChange={(e) => set('deadline', e.target.value)} />
        </label>
        <label>
          Next follow-up
          <input type="date" value={f.nextFollowUpDate || ''} onChange={(e) => set('nextFollowUpDate', e.target.value)} />
        </label>
      </div>

      <label>
        Notes
        <textarea rows={5} value={f.notes || ''} onChange={(e) => set('notes', e.target.value)} />
      </label>

      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      <div className="actions">
        <button type="button" className="ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save application'}
        </button>
      </div>
    </form>
  )
}
