import { useState, useEffect } from 'react'
import { PageHeader } from '../components/PageHeader'
import { loadProposals, saveProposals, loadSongs, saveSongs, generateId } from '../utils/storage'
import { demoProposals } from '../data/demo'
import type { Proposal } from '../types'
import { EMPTY_INSTRUMENT_NOTES } from '../types'

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [proposedBy, setProposedBy] = useState('')
  const [voterName, setVoterName] = useState(() =>
    localStorage.getItem('gambizzators_voter') ?? ''
  )

  useEffect(() => {
    let stored = loadProposals()
    if (stored.length === 0) {
      stored = demoProposals
      saveProposals(stored)
    }
    setProposals(stored)
  }, [])

  const handleAdd = () => {
    if (!title.trim() || !proposedBy.trim()) return
    const proposal: Proposal = {
      id: generateId(),
      title: title.trim(),
      artist: artist.trim(),
      youtubeUrl: youtubeUrl.trim(),
      proposedBy: proposedBy.trim(),
      votes: { [proposedBy.trim()]: 'si' },
      createdAt: new Date().toISOString().slice(0, 10),
    }
    const updated = [proposal, ...proposals]
    saveProposals(updated)
    setProposals(updated)
    setTitle('')
    setArtist('')
    setYoutubeUrl('')
    setShowForm(false)
  }

  const handleVote = (proposalId: string, vote: 'si' | 'no' | 'forse') => {
    if (!voterName.trim()) return
    localStorage.setItem('gambizzators_voter', voterName)
    const updated = proposals.map((p) =>
      p.id === proposalId
        ? { ...p, votes: { ...p.votes, [voterName.trim()]: vote } }
        : p
    )
    saveProposals(updated)
    setProposals(updated)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('Eliminare questa proposta?')) return
    const updated = proposals.filter((p) => p.id !== id)
    saveProposals(updated)
    setProposals(updated)
  }

  const handlePromote = (proposal: Proposal) => {
    if (!window.confirm(`Promuovere "${proposal.title}" a pezzo provato?`)) return
    const songs = loadSongs()
    songs.push({
      id: generateId(),
      title: proposal.title,
      artist: proposal.artist,
      bpm: null,
      duration: null,
      chordpro: `{title: ${proposal.title}}\n{artist: ${proposal.artist}}\n\n`,
      notes: '',
      instrumentNotes: { ...EMPTY_INSTRUMENT_NOTES },
      status: 'da_imparare',
      tags: [],
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    })
    saveSongs(songs)
    const updated = proposals.filter((p) => p.id !== proposal.id)
    saveProposals(updated)
    setProposals(updated)
  }

  const countVotes = (votes: Proposal['votes']) => {
    const counts = { si: 0, no: 0, forse: 0 }
    Object.values(votes).forEach((v) => counts[v]++)
    return counts
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PageHeader
        title="Nuove Proposte"
        backTo="/"
        actions={
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: 'var(--accent)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {showForm ? 'Chiudi' : '+ Proponi'}
          </button>
        }
      />

      {/* Voter name */}
      <div style={{
        padding: '10px 20px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>Il tuo nome:</span>
        <input
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          onBlur={() => localStorage.setItem('gambizzators_voter', voterName)}
          placeholder="Es: Marco"
          style={{
            padding: '6px 10px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            outline: 'none',
            fontSize: 13,
            flex: 1,
            maxWidth: 200,
          }}
        />
      </div>

      {/* New proposal form */}
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
            placeholder="Titolo brano *"
            style={inputStyle}
          />
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artista"
            style={inputStyle}
          />
          <input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Link YouTube"
            style={inputStyle}
          />
          <input
            value={proposedBy}
            onChange={(e) => setProposedBy(e.target.value)}
            placeholder="Proposto da *"
            style={inputStyle}
          />
          <button
            onClick={handleAdd}
            disabled={!title.trim() || !proposedBy.trim()}
            style={{
              background: !title.trim() || !proposedBy.trim() ? 'var(--border)' : 'var(--success)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 14,
              alignSelf: 'flex-end',
            }}
          >
            Aggiungi proposta
          </button>
        </div>
      )}

      {/* Proposals list */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {proposals.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: 40 }}>
            Nessuna proposta ancora. Proponi un brano!
          </p>
        ) : (
          proposals.map((proposal) => {
            const ytId = getYoutubeId(proposal.youtubeUrl)
            const votes = countVotes(proposal.votes)
            const myVote = voterName ? proposal.votes[voterName] : undefined

            return (
              <div
                key={proposal.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                }}
              >
                {/* YouTube embed */}
                {ytId && (
                  <div style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    background: '#000',
                  }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={proposal.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                    />
                  </div>
                )}

                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{proposal.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                        {proposal.artist}
                      </p>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      da {proposal.proposedBy}
                    </span>
                  </div>

                  {/* Votes */}
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 14,
                    alignItems: 'center',
                  }}>
                    {(['si', 'no', 'forse'] as const).map((vote) => (
                      <button
                        key={vote}
                        onClick={() => handleVote(proposal.id, vote)}
                        disabled={!voterName.trim()}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 20,
                          fontSize: 13,
                          fontWeight: 600,
                          border: `2px solid ${
                            vote === 'si' ? 'var(--success)' : vote === 'no' ? 'var(--danger)' : 'var(--warning)'
                          }`,
                          background: myVote === vote
                            ? (vote === 'si' ? 'var(--success)' : vote === 'no' ? 'var(--danger)' : 'var(--warning)')
                            : 'transparent',
                          color: myVote === vote ? 'white' : 'var(--text-primary)',
                          opacity: !voterName.trim() ? 0.4 : 1,
                        }}
                      >
                        {vote === 'si' ? '\u{1F44D}' : vote === 'no' ? '\u{1F44E}' : '\u{1F914}'}{' '}
                        {votes[vote]}
                      </button>
                    ))}

                    <div style={{ flex: 1 }} />

                    {/* Voters list */}
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      {Object.keys(proposal.votes).join(', ')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    gap: 12,
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <button
                      onClick={() => handlePromote(proposal)}
                      style={{
                        background: 'none',
                        color: 'var(--success)',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: 0,
                      }}
                    >
                      Promuovi a pezzo provato
                    </button>
                    <button
                      onClick={() => handleDelete(proposal.id)}
                      style={{
                        background: 'none',
                        color: 'var(--danger)',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: 0,
                      }}
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            )
          })
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
