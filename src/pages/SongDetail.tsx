import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Metronome } from '../components/Metronome'
import { loadSongs, saveSongs } from '../utils/storage'
import { parseChordPro, transposeChord } from '../utils/chordpro'
import type { Song, InstrumentNotes } from '../types'
import { STATUS_LABELS, STATUS_COLORS, INSTRUMENTS, EMPTY_INSTRUMENT_NOTES } from '../types'

type NotesTab = 'generale' | keyof InstrumentNotes

export function SongDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [song, setSong] = useState<Song | null>(null)
  const [transpose, setTranspose] = useState(0)
  const [fontSize, setFontSize] = useState(16)
  const [scrollSpeed, setScrollSpeed] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [notes, setNotes] = useState('')
  const [instrumentNotes, setInstrumentNotes] = useState<InstrumentNotes>({ ...EMPTY_INSTRUMENT_NOTES })
  const [activeTab, setActiveTab] = useState<NotesTab>('generale')
  const [showMetronome, setShowMetronome] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    const songs = loadSongs()
    const found = songs.find((s) => s.id === id)
    if (found) {
      setSong(found)
      setNotes(found.notes)
      setInstrumentNotes(found.instrumentNotes ?? { ...EMPTY_INSTRUMENT_NOTES })
    }
  }, [id])

  const saveAllNotes = useCallback(() => {
    if (!song) return
    const songs = loadSongs()
    const idx = songs.findIndex((s) => s.id === song.id)
    if (idx !== -1) {
      songs[idx] = {
        ...songs[idx],
        notes,
        instrumentNotes,
        updatedAt: new Date().toISOString().slice(0, 10),
      }
      saveSongs(songs)
    }
  }, [song, notes, instrumentNotes])

  // Auto-scroll
  useEffect(() => {
    if (isScrolling && scrollSpeed > 0 && scrollRef.current) {
      scrollIntervalRef.current = window.setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 1
        }
      }, Math.max(10, 100 - scrollSpeed * 9))
    }
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
  }, [isScrolling, scrollSpeed])

  const handleDelete = () => {
    if (!song) return
    if (!window.confirm(`Eliminare "${song.title}"?`)) return
    const songs = loadSongs().filter((s) => s.id !== song.id)
    saveSongs(songs)
    navigate('/songs')
  }

  if (!song) {
    return (
      <div>
        <PageHeader title="Brano non trovato" backTo="/songs" />
        <p style={{ padding: 20, color: 'var(--text-secondary)' }}>
          Il brano richiesto non esiste.
        </p>
      </div>
    )
  }

  const parsed = parseChordPro(song.chordpro)

  const allTabs: { key: NotesTab; label: string }[] = [
    { key: 'generale', label: 'Generale' },
    ...INSTRUMENTS.map((i) => ({ key: i.key as NotesTab, label: `${i.icon} ${i.label}` })),
  ]

  const currentNoteValue = activeTab === 'generale'
    ? notes
    : instrumentNotes[activeTab as keyof InstrumentNotes]

  const handleNoteChange = (value: string) => {
    if (activeTab === 'generale') {
      setNotes(value)
    } else {
      setInstrumentNotes((prev) => ({
        ...prev,
        [activeTab]: value,
      }))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <PageHeader
        title={song.title}
        backTo="/songs"
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowMetronome(!showMetronome)}
              style={{
                background: showMetronome ? 'var(--accent)' : 'var(--accent-secondary)',
                color: showMetronome ? 'white' : 'var(--text-primary)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 16,
              }}
              title="Metronomo"
            >
              {'\u{1F941}'}
            </button>
            <button
              onClick={() => navigate(`/songs/${song.id}/edit`)}
              style={{
                background: 'var(--accent-secondary)',
                color: 'var(--text-primary)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Modifica
            </button>
            <button
              onClick={handleDelete}
              style={{
                background: 'var(--danger)',
                color: 'white',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Elimina
            </button>
          </div>
        }
      />

      {/* Song info bar */}
      <div style={{
        padding: '10px 20px',
        background: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
        fontSize: 13,
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>{song.artist}</span>
        {song.bpm && <span style={{ color: 'var(--text-secondary)' }}>{song.bpm} BPM</span>}
        <span style={{
          padding: '2px 10px',
          borderRadius: 10,
          background: STATUS_COLORS[song.status] + '20',
          color: STATUS_COLORS[song.status],
          fontWeight: 600,
          fontSize: 11,
        }}>
          {STATUS_LABELS[song.status]}
        </span>
      </div>

      {/* Controls bar */}
      <div style={{
        padding: '10px 20px',
        background: 'var(--bg-card)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--border)',
        fontSize: 13,
      }}>
        {/* Transpose */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--text-secondary)' }}>Trasporto:</span>
          <button onClick={() => setTranspose((t) => t - 1)} style={controlBtnStyle}>-</button>
          <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>
            {transpose > 0 ? `+${transpose}` : transpose}
          </span>
          <button onClick={() => setTranspose((t) => t + 1)} style={controlBtnStyle}>+</button>
        </div>

        {/* Font size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--text-secondary)' }}>Zoom:</span>
          <button onClick={() => setFontSize((s) => Math.max(10, s - 2))} style={controlBtnStyle}>A-</button>
          <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 600 }}>{fontSize}</span>
          <button onClick={() => setFontSize((s) => Math.min(32, s + 2))} style={controlBtnStyle}>A+</button>
        </div>

        {/* Auto-scroll */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => setIsScrolling(!isScrolling)}
            style={{
              ...controlBtnStyle,
              background: isScrolling ? 'var(--accent)' : 'var(--bg-input)',
              color: isScrolling ? 'white' : 'var(--text-primary)',
              minWidth: 32,
            }}
          >
            {isScrolling ? '||' : '\u25B6'}
          </button>
          <input
            type="range"
            min={1}
            max={10}
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(Number(e.target.value))}
            style={{ width: 80, accentColor: 'var(--accent)' }}
          />
        </div>
      </div>

      {/* ChordPro content */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize,
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          paddingBottom: showMetronome ? 200 : 20,
        }}
      >
        {parsed.map((line, i) => {
          if (line.type === 'empty') return <div key={i} style={{ height: fontSize * 0.8 }} />

          if (line.type === 'directive') {
            const { key, value } = line.directive!
            if (key === 'title' || key === 'artist' || key === 'bpm') return null
            if (key === 'comment' || key === 'c') {
              return (
                <div key={i} style={{
                  color: 'var(--warning)',
                  fontStyle: 'italic',
                  fontFamily: 'inherit',
                  fontSize: fontSize * 0.85,
                  margin: '8px 0',
                }}>
                  {value}
                </div>
              )
            }
            if (key === 'soc' || key === 'start_of_chorus') {
              return <div key={i} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 12, marginTop: 8 }} />
            }
            if (key === 'eoc' || key === 'end_of_chorus') {
              return <div key={i} style={{ marginBottom: 8 }} />
            }
            return null
          }

          return (
            <div key={i} style={{ position: 'relative', marginBottom: 4 }}>
              <div style={{
                color: 'var(--accent)',
                fontWeight: 700,
                fontSize: fontSize * 0.85,
                height: line.segments?.some(s => s.chord) ? undefined : 0,
                whiteSpace: 'pre',
              }}>
                {line.segments?.map((seg, j) => (
                  <span key={j}>
                    {seg.chord ? (
                      <span style={{ display: 'inline-block', minWidth: `${seg.text.length}ch` }}>
                        {transposeChord(seg.chord, transpose)}
                      </span>
                    ) : (
                      <span style={{ display: 'inline-block', minWidth: `${seg.text.length}ch` }} />
                    )}
                  </span>
                ))}
              </div>
              <div>
                {line.segments?.map((seg, j) => (
                  <span key={j}>{seg.text}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Notes section with instrument tabs */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          borderBottom: '1px solid var(--border)',
          WebkitOverflowScrolling: 'touch',
        }}>
          {allTabs.map((tab) => {
            const hasContent = tab.key === 'generale'
              ? !!notes
              : !!instrumentNotes[tab.key as keyof InstrumentNotes]
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '8px 14px',
                  fontSize: 12,
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-secondary)',
                  background: activeTab === tab.key ? 'var(--bg-card)' : 'transparent',
                  borderBottom: activeTab === tab.key ? '2px solid var(--accent)' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                }}
              >
                {tab.label}
                {hasContent && activeTab !== tab.key && (
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    position: 'absolute',
                    top: 6,
                    right: 4,
                  }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Note textarea */}
        <div style={{ padding: '10px 20px 12px' }}>
          <textarea
            value={currentNoteValue}
            onChange={(e) => handleNoteChange(e.target.value)}
            onBlur={saveAllNotes}
            placeholder={
              activeTab === 'generale'
                ? 'Appunti generali...'
                : `Note per ${INSTRUMENTS.find((i) => i.key === activeTab)?.label ?? activeTab}...`
            }
            rows={3}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              outline: 'none',
              fontSize: 13,
            }}
          />
        </div>
      </div>

      {/* Metronome */}
      {showMetronome && (
        <Metronome
          initialBpm={song.bpm ?? 120}
          onClose={() => setShowMetronome(false)}
        />
      )}
    </div>
  )
}

const controlBtnStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: '4px 10px',
  fontSize: 13,
  fontWeight: 600,
  minWidth: 32,
}
