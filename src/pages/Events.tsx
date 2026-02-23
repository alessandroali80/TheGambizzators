import { useState, useEffect } from 'react'
import { PageHeader } from '../components/PageHeader'
import { loadEvents, saveEvents, generateId } from '../utils/storage'
import { demoEvents } from '../data/demo'
import type { Event } from '../types'
import { EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '../types'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function isUpcoming(dateStr: string): boolean {
  return dateStr >= new Date().toISOString().slice(0, 10)
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showPast, setShowPast] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('21:00')
  const [type, setType] = useState<Event['type']>('prova')
  const [location, setLocation] = useState('')
  const [criticality, setCriticality] = useState<1 | 2 | 3>(1)
  const [notes, setNotes] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  useEffect(() => {
    let stored = loadEvents()
    if (stored.length === 0) {
      stored = demoEvents
      saveEvents(stored)
    }
    setEvents(stored)
  }, [])

  const upcoming = events.filter((e) => isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date))
  const past = events.filter((e) => !isUpcoming(e.date)).sort((a, b) => b.date.localeCompare(a.date))

  const resetForm = () => {
    setTitle('')
    setDate('')
    setTime('21:00')
    setType('prova')
    setLocation('')
    setCriticality(1)
    setNotes('')
    setEditId(null)
  }

  const handleSave = () => {
    if (!title.trim() || !date) return
    const event: Event = {
      id: editId ?? generateId(),
      title: title.trim(),
      date,
      time,
      type,
      location: location.trim(),
      criticality,
      notes: notes.trim(),
    }

    let updated: Event[]
    if (editId) {
      updated = events.map((e) => (e.id === editId ? event : e))
    } else {
      updated = [...events, event]
    }

    saveEvents(updated)
    setEvents(updated)
    resetForm()
    setShowForm(false)
  }

  const handleEdit = (event: Event) => {
    setEditId(event.id)
    setTitle(event.title)
    setDate(event.date)
    setTime(event.time)
    setType(event.type)
    setLocation(event.location)
    setCriticality(event.criticality)
    setNotes(event.notes)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('Eliminare questo appuntamento?')) return
    const updated = events.filter((e) => e.id !== id)
    saveEvents(updated)
    setEvents(updated)
  }

  const flames = (n: number) => '\u{1F525}'.repeat(n)

  const renderEvent = (event: Event) => (
    <div
      key={event.id}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${EVENT_TYPE_COLORS[event.type]}40`,
        borderLeft: `4px solid ${EVENT_TYPE_COLORS[event.type]}`,
        borderRadius: 'var(--radius-sm)',
        padding: 16,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>{event.title}</h3>
            {event.criticality > 1 && (
              <span title={`Criticita': ${event.criticality}/3`}>
                {flames(event.criticality)}
              </span>
            )}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span>{formatDate(event.date)} - {event.time}</span>
            <span style={{
              padding: '1px 8px',
              borderRadius: 10,
              background: EVENT_TYPE_COLORS[event.type] + '20',
              color: EVENT_TYPE_COLORS[event.type],
              fontWeight: 600,
              fontSize: 11,
            }}>
              {EVENT_TYPE_LABELS[event.type]}
            </span>
          </div>
          {event.location && (
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              {'\u{1F4CD}'} {event.location}
            </div>
          )}
          {event.notes && (
            <div style={{
              marginTop: 8,
              padding: '8px 12px',
              background: 'var(--bg-input)',
              borderRadius: 6,
              fontSize: 13,
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5,
            }}>
              {event.notes}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
          <button onClick={() => handleEdit(event)} style={actionBtn}>Modifica</button>
          <button onClick={() => handleDelete(event.id)} style={{ ...actionBtn, color: 'var(--danger)' }}>
            Elimina
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PageHeader
        title="Appuntamenti"
        backTo="/"
        actions={
          <button
            onClick={() => { setShowForm(!showForm); if (showForm) resetForm() }}
            style={{
              background: 'var(--accent)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {showForm ? 'Chiudi' : '+ Nuovo'}
          </button>
        }
      />

      {/* Form */}
      {showForm && (
        <div style={{
          padding: 20,
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo *"
            style={inputStyle}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Event['type'])}
              style={{ ...inputStyle, flex: 1 }}
            >
              <option value="prova">Prova</option>
              <option value="serata">Serata</option>
              <option value="evento">Evento</option>
            </select>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Criticita':</span>
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setCriticality(n)}
                  style={{
                    background: criticality >= n ? '#e9456040' : 'var(--bg-input)',
                    border: `1px solid ${criticality >= n ? 'var(--danger)' : 'var(--border)'}`,
                    borderRadius: 6,
                    padding: '4px 8px',
                    fontSize: 16,
                  }}
                >
                  {'\u{1F525}'}
                </button>
              ))}
            </div>
          </div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Luogo"
            style={inputStyle}
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Note..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <button
            onClick={handleSave}
            disabled={!title.trim() || !date}
            style={{
              background: !title.trim() || !date ? 'var(--border)' : 'var(--success)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
              alignSelf: 'flex-end',
            }}
          >
            {editId ? 'Aggiorna' : 'Aggiungi'}
          </button>
        </div>
      )}

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {upcoming.length === 0 && past.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: 40 }}>
            Nessun appuntamento. Aggiungine uno!
          </p>
        ) : (
          <>
            {upcoming.length > 0 && (
              <>
                <h2 style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Prossimi
                </h2>
                {upcoming.map(renderEvent)}
              </>
            )}

            {past.length > 0 && (
              <>
                <button
                  onClick={() => setShowPast(!showPast)}
                  style={{
                    background: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: 13,
                    padding: '8px 0',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}
                >
                  {showPast ? '\u25BC' : '\u25B6'} Passati ({past.length})
                </button>
                {showPast && past.map(renderEvent)}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'var(--bg-input)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: 14,
}

const actionBtn: React.CSSProperties = {
  background: 'none',
  color: 'var(--text-secondary)',
  fontSize: 12,
  padding: '4px 8px',
  fontWeight: 500,
}
