import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { loadRooms, saveRooms, generateId } from '../utils/storage'

export function RoomEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [mapsUrl, setMapsUrl] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [pricePerHour, setPricePerHour] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (id) {
      const rooms = loadRooms()
      const found = rooms.find((r) => r.id === id)
      if (found) {
        setName(found.name)
        setAddress(found.address)
        setMapsUrl(found.mapsUrl)
        setPhone(found.phone)
        setEmail(found.email)
        setWebsite(found.website)
        setPricePerHour(found.pricePerHour)
        setNotes(found.notes)
      }
    }
  }, [id])

  const handleSave = () => {
    if (!name.trim()) return

    const rooms = loadRooms()

    const room = {
      id: id ?? generateId(),
      name: name.trim(),
      address: address.trim(),
      mapsUrl: mapsUrl.trim(),
      phone: phone.trim(),
      email: email.trim(),
      website: website.trim(),
      pricePerHour: pricePerHour.trim(),
      notes: notes.trim(),
    }

    if (isNew) {
      rooms.push(room)
    } else {
      const idx = rooms.findIndex((r) => r.id === id)
      if (idx !== -1) rooms[idx] = room
    }

    saveRooms(rooms)
    navigate('/rooms')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PageHeader
        title={isNew ? 'Nuova Saletta' : 'Modifica Saletta'}
        backTo="/rooms"
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
        <Field label="Nome *">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es: Rock Factory"
            style={inputStyle}
          />
        </Field>

        <Field label="Indirizzo">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Es: Via Roma 42, Milano"
            style={inputStyle}
          />
        </Field>

        <Field label="Link Google Maps">
          <input
            value={mapsUrl}
            onChange={(e) => setMapsUrl(e.target.value)}
            placeholder="https://maps.google.com/..."
            style={inputStyle}
          />
        </Field>

        <div style={{ display: 'flex', gap: 16 }}>
          <Field label="Telefono" style={{ flex: 1 }}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+39 02..."
              style={inputStyle}
            />
          </Field>

          <Field label="Email" style={{ flex: 1 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@..."
              style={inputStyle}
            />
          </Field>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <Field label="Sito web" style={{ flex: 1 }}>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </Field>

          <Field label="Prezzo/ora" style={{ flex: 1 }}>
            <input
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              placeholder="15 EUR"
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="Appunti">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Attrezzatura, qualita sala, note..."
            rows={5}
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
