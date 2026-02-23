const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

interface ChordProLine {
  type: 'lyrics' | 'directive' | 'empty'
  segments?: { chord: string; text: string }[]
  directive?: { key: string; value: string }
}

export function parseChordPro(input: string): ChordProLine[] {
  const lines = input.split('\n')
  const result: ChordProLine[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      result.push({ type: 'empty' })
      continue
    }

    // Directive: {key: value}
    const directiveMatch = trimmed.match(/^\{(\w+):\s*(.+)\}$/)
    if (directiveMatch) {
      result.push({
        type: 'directive',
        directive: { key: directiveMatch[1], value: directiveMatch[2] },
      })
      continue
    }

    // Simple directive: {key}
    const simpleDirectiveMatch = trimmed.match(/^\{(\w+)\}$/)
    if (simpleDirectiveMatch) {
      result.push({
        type: 'directive',
        directive: { key: simpleDirectiveMatch[1], value: '' },
      })
      continue
    }

    // Lyrics line with optional chords
    const segments: { chord: string; text: string }[] = []
    const regex = /\[([^\]]*)\]([^[]*)/g
    let match: RegExpExecArray | null
    let lastIndex = 0

    // Text before first chord
    const beforeFirst = trimmed.match(/^([^[]+)/)
    if (beforeFirst) {
      segments.push({ chord: '', text: beforeFirst[1] })
      lastIndex = beforeFirst[1].length
    }

    regex.lastIndex = lastIndex
    while ((match = regex.exec(trimmed)) !== null) {
      segments.push({ chord: match[1], text: match[2] })
    }

    // Line with no chords at all
    if (segments.length === 0) {
      segments.push({ chord: '', text: trimmed })
    }

    result.push({ type: 'lyrics', segments })
  }

  return result
}

function getNoteIndex(note: string): number {
  const idx = NOTES.indexOf(note)
  if (idx !== -1) return idx
  return NOTES_FLAT.indexOf(note)
}

export function transposeChord(chord: string, semitones: number): string {
  if (semitones === 0) return chord

  return chord.replace(/([A-G][#b]?)/g, (match) => {
    const idx = getNoteIndex(match)
    if (idx === -1) return match
    const newIdx = (idx + semitones + 12) % 12
    // Use sharps if original had sharp, flats if original had flat
    if (match.includes('b')) return NOTES_FLAT[newIdx]
    return NOTES[newIdx]
  })
}

export type { ChordProLine }
