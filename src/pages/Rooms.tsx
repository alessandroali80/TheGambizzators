import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { loadRooms, saveRooms } from '../utils/storage'
import { demoRooms } from '../data/demo'
import type { RehearsalRoom } from '../types'

export function Rooms() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<RehearsalRoom[]>([])

  useEffect(() => {
    let stored = loadRooms()
    if (stored.length === 0) {
      stored = demoRooms
      saveRooms(stored)
    }
    setRooms(stored)
  }, [])

  const handleDelete = (room: RehearsalRoom) => {
    if (!window.confirm(`Eliminare "${room.name}"?`)) return
    const updated = rooms.filter((r) => r.id !== room.id)
    saveRooms(updated)
    setRooms(updated)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PageHeader
        title="Salette"
        backTo="/"
        actions={
          <button
            onClick={() => navigate('/rooms/new')}
            style={{
              background: 'var(--accent)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            + Nuova
          </button>
        }
      />

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rooms.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: 40 }}>
            Nessuna sala prove aggiunta
          </p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 16,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 10,
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 700 }}>{room.name}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => navigate(`/rooms/${room.id}/edit`)}
                    style={actionBtnStyle}
                  >
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(room)}
                    style={{ ...actionBtnStyle, color: 'var(--danger)' }}
                  >
                    Elimina
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                {room.address && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--text-secondary)', minWidth: 20 }}>&#128205;</span>
                    {room.mapsUrl ? (
                      <a
                        href={room.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {room.address}
                      </a>
                    ) : (
                      <span>{room.address}</span>
                    )}
                  </div>
                )}

                {room.phone && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--text-secondary)', minWidth: 20 }}>&#128222;</span>
                    <a href={`tel:${room.phone}`}>{room.phone}</a>
                  </div>
                )}

                {room.email && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--text-secondary)', minWidth: 20 }}>&#9993;</span>
                    <a href={`mailto:${room.email}`}>{room.email}</a>
                  </div>
                )}

                {room.website && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--text-secondary)', minWidth: 20 }}>&#127760;</span>
                    <a href={room.website} target="_blank" rel="noopener noreferrer">{room.website}</a>
                  </div>
                )}

                {room.pricePerHour && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--text-secondary)', minWidth: 20 }}>&#128176;</span>
                    <span>{room.pricePerHour}/ora</span>
                  </div>
                )}

                {room.notes && (
                  <div style={{
                    marginTop: 8,
                    padding: '10px 12px',
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius-sm)',
                    whiteSpace: 'pre-wrap',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}>
                    {room.notes}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const actionBtnStyle: React.CSSProperties = {
  background: 'none',
  color: 'var(--text-secondary)',
  fontSize: 12,
  padding: '4px 8px',
  fontWeight: 500,
}
