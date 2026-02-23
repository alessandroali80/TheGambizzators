import type { Song, RehearsalRoom, Proposal, Event, Setlist } from '../types'

const SONGS_KEY = 'gambizzators_songs'
const ROOMS_KEY = 'gambizzators_rooms'
const PROPOSALS_KEY = 'gambizzators_proposals'
const EVENTS_KEY = 'gambizzators_events'
const SETLISTS_KEY = 'gambizzators_setlists'

function load<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function loadSongs(): Song[] { return load<Song>(SONGS_KEY) }
export function saveSongs(songs: Song[]): void { save(SONGS_KEY, songs) }

export function loadRooms(): RehearsalRoom[] { return load<RehearsalRoom>(ROOMS_KEY) }
export function saveRooms(rooms: RehearsalRoom[]): void { save(ROOMS_KEY, rooms) }

export function loadProposals(): Proposal[] { return load<Proposal>(PROPOSALS_KEY) }
export function saveProposals(proposals: Proposal[]): void { save(PROPOSALS_KEY, proposals) }

export function loadEvents(): Event[] { return load<Event>(EVENTS_KEY) }
export function saveEvents(events: Event[]): void { save(EVENTS_KEY, events) }

export function loadSetlists(): Setlist[] { return load<Setlist>(SETLISTS_KEY) }
export function saveSetlists(setlists: Setlist[]): void { save(SETLISTS_KEY, setlists) }

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
