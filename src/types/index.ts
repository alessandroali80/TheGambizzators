export interface Song {
  id: string
  title: string
  artist: string
  bpm: number | null
  duration: number | null // durata in secondi (per calcolo setlist)
  chordpro: string
  notes: string
  instrumentNotes: InstrumentNotes
  status: 'da_imparare' | 'in_lavorazione' | 'pronto'
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface InstrumentNotes {
  chitarra: string
  basso: string
  batteria: string
  voce: string
  tastiera: string
  altro: string
}

export const INSTRUMENTS: { key: keyof InstrumentNotes; label: string; icon: string }[] = [
  { key: 'chitarra', label: 'Chitarra', icon: '\u{1F3B8}' },
  { key: 'basso', label: 'Basso', icon: '\u{1F3B5}' },
  { key: 'batteria', label: 'Batteria', icon: '\u{1F941}' },
  { key: 'voce', label: 'Voce', icon: '\u{1F3A4}' },
  { key: 'tastiera', label: 'Tastiera', icon: '\u{1F3B9}' },
  { key: 'altro', label: 'Altro', icon: '\u{1F4DD}' },
]

export const EMPTY_INSTRUMENT_NOTES: InstrumentNotes = {
  chitarra: '',
  basso: '',
  batteria: '',
  voce: '',
  tastiera: '',
  altro: '',
}

export interface RehearsalRoom {
  id: string
  name: string
  address: string
  mapsUrl: string
  phone: string
  email: string
  website: string
  pricePerHour: string
  notes: string
}

export interface Proposal {
  id: string
  title: string
  artist: string
  youtubeUrl: string
  proposedBy: string
  votes: Record<string, 'si' | 'no' | 'forse'>
  createdAt: string
}

export interface Event {
  id: string
  title: string
  date: string // ISO date string
  time: string
  type: 'prova' | 'serata' | 'evento'
  location: string
  criticality: 1 | 2 | 3
  notes: string
}

export interface Setlist {
  id: string
  name: string
  date: string
  songIds: string[]
  notes: string
  createdAt: string
}

export type SongStatus = Song['status']

export const STATUS_LABELS: Record<SongStatus, string> = {
  da_imparare: 'Da imparare',
  in_lavorazione: 'In lavorazione',
  pronto: 'Pronto',
}

export const STATUS_COLORS: Record<SongStatus, string> = {
  da_imparare: '#e94560',
  in_lavorazione: '#f5a623',
  pronto: '#27ae60',
}

export const EVENT_TYPE_LABELS: Record<Event['type'], string> = {
  prova: 'Prova',
  serata: 'Serata',
  evento: 'Evento',
}

export const EVENT_TYPE_COLORS: Record<Event['type'], string> = {
  prova: '#3498db',
  serata: '#e94560',
  evento: '#f5a623',
}
