import { useState, useEffect, useRef } from 'react'
import { PageHeader } from '../components/PageHeader'
import { loadSetlists, saveSetlists, loadSongs, generateId } from '../utils/storage'
import { demoSetlists } from '../data/demo'
import type { Setlist, Song } from '../types'

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function Setlists() {
  const [setlists, setSetlists] = useState<Setlist[]>([])
  const [songs, setSongs] = useState<Song[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedSongIds, setSelectedSongIds] = useState<string[]>([])
  const [performView, setPerformView] = useState<Setlist | null>(null)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  useEffect(() => {
    let stored = loadSetlists()
    if (stored.length === 0) {
      stored = demoSetlists
      saveSetlists(stored)
    }
    setSetlists(stored)
    setSongs(loadSongs())
  }, [])

  const getSong = (id: string) => songs.find((s) => s.id === id)

  const totalDuration = (songIds: string[]) =>
    songIds.reduce((acc, id) => acc + (getSong(id)?.duration ?? 0), 0)

  const resetForm = () => {
    setName('')
    setDate('')
    setNotes('')
    setSelectedSongIds([])
    setEditId(null)
  }

  const handleSave = () => {
    if (!name.trim()) return
    const setlist: Setlist = {
      id: editId ?? generateId(),
      name: name.trim(),
      date,
      songIds: selectedSongIds,
      notes: notes.trim(),
      createdAt: editId
        ? (setlists.find((s) => s.id === editId)?.createdAt ?? new Date().toISOString().slice(0, 10))
        : new Date().toISOString().slice(0, 10),
    }

    let updated: Setlist[]
    if (editId) {
      updated = setlists.map((s) => (s.id === editId ? setlist : s))
    } else {
      updated = [...setlists, setlist]
    }

    saveSetlists(updated)
    setSetlists(updated)
    resetForm()
    setShowForm(false)
  }

  const handleEdit = (setlist: Setlist) => {
    setEditId(setlist.id)
    setName(setlist.name)
    setDate(setlist.date)
    setNotes(setlist.notes)
    setSelectedSongIds([...setlist.songIds])
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('Eliminare questa scaletta?')) return
    const updated = setlists.filter((s) => s.id !== id)
    saveSetlists(updated)
    setSetlists(updated)
  }

  const toggleSong = (songId: string) => {
    setSelectedSongIds((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    )
  }

  const handleDragStart = (index: number) => {
    dragItem.current = index
  }

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index
  }

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return
    const items = [...selectedSongIds]
    const draggedItem = items[dragItem.current]
    items.splice(dragItem.current, 1)
    items.splice(dragOverItem.current, 0, draggedItem)
    setSelectedSongIds(items)
    dragItem.current = null
    dragOverItem.current = null
  }

  // Performance view (swipe between songs)
  if (performView) {
    const performSongs = performView.songIds.map(getSong).filter(Boolean) as Song[]
    const currentSong = performSongs[currentSongIndex]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
        <PageHeader
          title={performView.name}
          backTo=""
          actions={
            <button
              onClick={() => { setPerformView(null); setCurrentSongIndex(0) }}
              style={{
                background: 'var(--accent-secondary)',
                color: 'var(--text-primary)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Esci
            </button>
          }
        />

        {/* Song navigation */}
        <div style={{
          padding: '8px 20px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 13,
        }}>
          <button
            onClick={() => setCurrentSongIndex((i) => Math.max(0, i - 1))}
            disabled={currentSongIndex === 0}
            style={{
              background: 'var(--bg-input)',
              color: currentSongIndex === 0 ? 'var(--border)' : 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '6px 14px',
              fontWeight: 600,
            }}
          >
            &#8592; Prec
          </button>
          <span style={{ color: 'var(--text-secondary)' }}>
            {currentSongIndex + 1} / {performSongs.length}
          </span>
          <button
            onClick={() => setCurrentSongIndex((i) => Math.min(performSongs.length - 1, i + 1))}
            disabled={currentSongIndex === performSongs.length - 1}
            style={{
              background: 'var(--bg-input)',
              color: currentSongIndex === performSongs.length - 1 ? 'var(--border)' : 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '6px 14px',
              fontWeight: 600,
            }}
          >
            Succ &#8594;
          </button>
        </div>

        {/* Current song info */}
        {currentSong && (
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{currentSong.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 4 }}>
              {currentSong.artist}
              {currentSong.bpm && <span> &middot; {currentSong.bpm} BPM</span>}
            </p>
            {currentSong.notes && (
              <div style={{
                marginTop: 12,
                padding: '10px 14px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
              }}>
                {currentSong.notes}
              </div>
            )}
            {/* Song list mini-nav */}
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {performSongs.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSongIndex(i)}
                  style={{
                    background: i === currentSongIndex ? 'var(--accent)' + '20' : 'transparent',
                    border: `1px solid ${i === currentSongIndex ? 'var(--accent)' : 'transparent'}`,
                    borderRadius: 6,
                    padding: '8px 12px',
                    textAlign: 'left',
                    color: i === currentSongIndex ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: 13,
                    fontWeight: i === currentSongIndex ? 600 : 400,
                  }}
                >
                  {i + 1}. {s.title} - {s.artist}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PageHeader
        title="Setlist"
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
            {showForm ? 'Chiudi' : '+ Nuova'}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome scaletta *"
            style={inputStyle}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Note..."
            rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          {/* Song selector */}
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, marginTop: 4 }}>
            Brani disponibili (clicca per aggiungere):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {songs.map((song) => (
              <button
                key={song.id}
                onClick={() => toggleSong(song.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 16,
                  fontSize: 12,
                  fontWeight: 500,
                  border: `1px solid ${selectedSongIds.includes(song.id) ? 'var(--accent)' : 'var(--border)'}`,
                  background: selectedSongIds.includes(song.id) ? 'var(--accent)' + '20' : 'var(--bg-input)',
                  color: selectedSongIds.includes(song.id) ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {song.title}
              </button>
            ))}
          </div>

          {/* Selected songs order (drag & drop) */}
          {selectedSongIds.length > 0 && (
            <>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, marginTop: 4 }}>
                Ordine (trascina per riordinare):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {selectedSongIds.map((songId, index) => {
                  const song = getSong(songId)
                  if (!song) return null
                  return (
                    <div
                      key={songId}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        background: 'var(--bg-input)',
                        borderRadius: 6,
                        cursor: 'grab',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)', fontSize: 12, cursor: 'grab' }}>
                        &#9776;
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>
                        {index + 1}. {song.title}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {song.artist}
                      </span>
                      {song.duration && (
                        <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 'auto' }}>
                          {formatDuration(song.duration)}
                        </span>
                      )}
                      <button
                        onClick={() => toggleSong(songId)}
                        style={{
                          background: 'none',
                          color: 'var(--danger)',
                          fontSize: 14,
                          padding: '0 4px',
                          fontWeight: 700,
                        }}
                      >
                        &#10005;
                      </button>
                    </div>
                  )
                })}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Durata totale: {formatDuration(totalDuration(selectedSongIds))}
              </div>
            </>
          )}

          <button
            onClick={handleSave}
            disabled={!name.trim()}
            style={{
              background: !name.trim() ? 'var(--border)' : 'var(--success)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
              alignSelf: 'flex-end',
            }}
          >
            {editId ? 'Aggiorna' : 'Crea scaletta'}
          </button>
        </div>
      )}

      {/* Setlists list */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {setlists.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: 40 }}>
            Nessuna scaletta. Creane una!
          </p>
        ) : (
          setlists.map((setlist) => (
            <div
              key={setlist.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{setlist.name}</h3>
                  {setlist.date && (
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                      {new Date(setlist.date + 'T00:00:00').toLocaleDateString('it-IT', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => { setPerformView(setlist); setCurrentSongIndex(0) }}
                    style={{
                      background: 'var(--accent)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    &#9654; Esegui
                  </button>
                  <button onClick={() => handleEdit(setlist)} style={actionBtn}>Modifica</button>
                  <button onClick={() => handleDelete(setlist.id)} style={{ ...actionBtn, color: 'var(--danger)' }}>
                    Elimina
                  </button>
                </div>
              </div>

              {/* Songs in setlist */}
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {setlist.songIds.map((songId, i) => {
                  const song = getSong(songId)
                  return song ? (
                    <div key={songId} style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '2px 0' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {i + 1}. {song.title}
                      </span>
                      {' - '}{song.artist}
                      {song.duration ? ` (${formatDuration(song.duration)})` : ''}
                    </div>
                  ) : null
                })}
              </div>

              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                {setlist.songIds.length} brani &middot; {formatDuration(totalDuration(setlist.songIds))}
              </div>

              {setlist.notes && (
                <div style={{
                  marginTop: 8,
                  padding: '8px 12px',
                  background: 'var(--bg-input)',
                  borderRadius: 6,
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {setlist.notes}
                </div>
              )}
            </div>
          ))
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
