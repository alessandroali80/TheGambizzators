import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { loadSongs, saveSongs, generateId } from '../utils/storage'
import type { Song, SongStatus } from '../types'
import { STATUS_LABELS, EMPTY_INSTRUMENT_NOTES } from '../types'

export function SongEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [bpm, setBpm] = useState('')
  const [duration, setDuration] = useState('')
  const [status, setStatus] = useState<SongStatus>('da_imparare')
  const [tags, setTags] = useState('')
  const [chordpro, setChordpro] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (id) {
      const songs = loadSongs()
      const found = songs.find((s) => s.id === id)
      if (found) {
        setTitle(found.title)
        setArtist(found.artist)
        setBpm(found.bpm?.toString() ?? '')
        setDuration(found.duration ? `${Math.floor(found.duration / 60)}:${(found.duration % 60).toString().padStart(2, '0')}` : '')
        setStatus(found.status)
        setTags(found.tags.join(', '))
        setChordpro(found.chordpro)
        setNotes(found.notes)
      }
    }
  }, [id])

  const handleSave = () => {
    if (!title.trim()) return

    const songs = loadSongs()
    const now = new Date().toISOString().slice(0, 10)

    // Parse duration from "m:ss" format
    let durationSecs: number | null = null
    if (duration.trim()) {
      const parts = duration.trim().split(':')
      if (parts.length === 2) {
        durationSecs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
      } else if (parts.length === 1) {
        durationSecs = parseInt(parts[0], 10) * 60
      }
    }

    const existing = songs.find((s) => s.id === id)

    const song: Song = {
      id: id ?? generateId(),
      title: title.trim(),
      artist: artist.trim(),
      bpm: bpm ? parseInt(bpm, 10) : null,
      duration: durationSecs,
      status,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      chordpro: chordpro,
      notes,
      instrumentNotes: existing?.instrumentNotes ?? { ...EMPTY_INSTRUMENT_NOTES },
      createdAt: isNew ? now : (existing?.createdAt ?? now),
      updatedAt: now,
    }

    if (isNew) {
      songs.push(song)
    } else {
      const idx = songs.findIndex((s) => s.id === id)
      if (idx !== -1) songs[idx] = song
    }

    saveSongs(songs)
    navigate(isNew ? '/songs' : `/songs/${song.id}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PageHeader
        title={isNew ? 'Nuovo Brano' : 'Modifica Brano'}
        backTo={isNew ? '/songs' : `/songs/${id}`}
        actions={
          <button
            onClick={handleSave}
            style={{
              background: 'var(--success)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Salva
          </button>
        }
      />

      <div style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        flex: 1,
        overflowY: 'auto',
      }}>
        <Field label="Titolo *">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Es: Come As You Are"
            style={inputStyle}
          />
        </Field>

        <Field label="Artista">
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Es: Nirvana"
            style={inputStyle}
          />
        </Field>

        <div style={{ display: 'flex', gap: 16 }}>
          <Field label="BPM" style={{ flex: 1 }}>
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              placeholder="120"
              style={inputStyle}
            />
          </Field>

          <Field label="Durata (m:ss)" style={{ flex: 1 }}>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="3:45"
              style={inputStyle}
            />
          </Field>

          <Field label="Stato" style={{ flex: 1 }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as SongStatus)}
              style={inputStyle}
            >
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Tag (separati da virgola)">
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="rock, cover, ballad"
            style={inputStyle}
          />
        </Field>

        <Field label="Testo e Accordi (formato ChordPro)">
          <textarea
            value={chordpro}
            onChange={(e) => setChordpro(e.target.value)}
            placeholder={`[Am]Testo con ac[G]cordi tra parentesi quadre\n[C]Nuova riga qui\n\n{comment: Assolo}\n{soc}\n[Am] [G] [C] [Em]\n{eoc}`}
            rows={15}
            style={{ ...inputStyle, fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.6 }}
          />
        </Field>

        <Field label="Appunti">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Effetti, setup, note..."
            rows={4}
            style={inputStyle}
          />
        </Field>
      </div>
    </div>
  )
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label style={{
        display: 'block',
        fontSize: 12,
        color: 'var(--text-secondary)',
        marginBottom: 6,
        fontWeight: 600,
      }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg-input)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--text-primary)',
  outline: 'none',
  resize: 'vertical',
}
