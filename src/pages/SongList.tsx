import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { loadSongs, saveSongs } from '../utils/storage'
import { demoSongs } from '../data/demo'
import type { Song, SongStatus } from '../types'
import { STATUS_LABELS, STATUS_COLORS } from '../types'

export function SongList() {
  const navigate = useNavigate()
  const [songs, setSongs] = useState<Song[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<SongStatus | 'all'>('all')

  useEffect(() => {
    let stored = loadSongs()
    if (stored.length === 0) {
      stored = demoSongs
      saveSongs(stored)
    }
    setSongs(stored)
  }, [])

  const filtered = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || song.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PageHeader
        title="Pezzi Provati"
        backTo="/"
        actions={
          <button
            onClick={() => navigate('/songs/new')}
            style={{
              background: 'var(--accent)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            + Nuovo
          </button>
        }
      />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Cerca per titolo o artista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />

        {/* Status filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['all', 'da_imparare', 'in_lavorazione', 'pronto'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 500,
                background: statusFilter === status ? 'var(--accent)' : 'var(--bg-card)',
                color: statusFilter === status ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${statusFilter === status ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {status === 'all' ? 'Tutti' : STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      </div>

      {/* Song list */}
      <div style={{ padding: '0 20px 20px', flex: 1 }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: 40 }}>
            Nessun brano trovato
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((song) => (
              <button
                key={song.id}
                onClick={() => navigate(`/songs/${song.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{song.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>
                    {song.artist}
                    {song.bpm && <span> &middot; {song.bpm} BPM</span>}
                  </div>
                  {song.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                      {song.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: 'var(--accent-secondary)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 10,
                    background: STATUS_COLORS[song.status] + '20',
                    color: STATUS_COLORS[song.status],
                    whiteSpace: 'nowrap',
                    marginLeft: 12,
                  }}
                >
                  {STATUS_LABELS[song.status]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
