import type { Song, RehearsalRoom, Proposal, Event, Setlist } from '../types'
import { EMPTY_INSTRUMENT_NOTES } from '../types'

export const demoSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Glory Box',
    artist: 'Portishead',
    bpm: 68,
    duration: 305,
    status: 'pronto',
    tags: ['trip-hop', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Riff principale: loop su Dm - Gm7 - A7\nClean con riverbero, suono caldo',
      basso: 'Linea groovy che segue il loop, staccato',
    },
    chordpro: `{title: Glory Box}
{artist: Portishead}
{bpm: 68}

{comment: Il brano e' un loop continuo su 3 accordi}

{comment: Intro - stessa progressione}
[Dm]  [Gm7]  [A7]  [A7]

{comment: Strofa}
[Dm]  [Gm7]  [A7]  [A7]
[Dm]  [Gm7]  [A7]  [A7]
[Dm]  [Gm7]  [A7]  [A7]
[Dm]  [Gm7]  [A7]  [A7]

{soc}
{comment: Ritornello - stessa progressione, piu' intenso}
[Dm]  [Gm7]  [A7]  [A7]
[Dm]  [Gm7]  [A7]  [A7]
{eoc}

{comment: Strofa 2 - stessa progressione}
[Dm]  [Gm7]  [A7]  [A7]
[Dm]  [Gm7]  [A7]  [A7]

{soc}
[Dm]  [Gm7]  [A7]  [A7]
[Dm]  [Gm7]  [A7]  [A7]
{eoc}

{comment: Outro - sfuma}
[Dm]  [Gm7]  [A7]  [A7]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-2',
    title: 'Teardrop',
    artist: 'Massive Attack',
    bpm: 76,
    duration: 327,
    status: 'pronto',
    tags: ['trip-hop', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Arpeggio delicato, clean con chorus leggero',
      voce: 'Molto eterea, quasi sussurrata nelle strofe',
      tastiera: 'Pad atmosferico in sottofondo, harpsichord nel riff',
    },
    chordpro: `{title: Teardrop}
{artist: Massive Attack}
{bpm: 76}

{comment: Intro - riff clavicembalo}
[Am]  [G]  [Fmaj7]  [G]
[Am]  [G]  [Fmaj7]  [G]

{comment: Strofa 1}
[Am]  [G]  [Fmaj7]  [G]
[Am]  [G]  [Fmaj7]  [G]
[Am]  [G]  [Fmaj7]  [G]
[Am]  [G]  [Fmaj7]  [G]

{soc}
{comment: Ritornello}
[Am]  [G]  [Fmaj7]  [G]
[Am]  [G]  [Fmaj7]  [G]
{eoc}

{comment: Strofa 2}
[Am]  [G]  [Fmaj7]  [G]
[Am]  [G]  [Fmaj7]  [G]

{soc}
[Am]  [G]  [Fmaj7]  [G]
[Am]  [G]  [Fmaj7]  [G]
{eoc}

{comment: Outro}
[Am]  [G]  [Fmaj7]  [G]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-3',
    title: 'Black Velvet',
    artist: 'Alannah Myles',
    bpm: 96,
    duration: 275,
    status: 'pronto',
    tags: ['rock', 'blues', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Riff blues-rock in Em\nVerse: palm mute, chorus: aperto con overdrive',
      batteria: 'Groove pesante, hi-hat chiuso nelle strofe',
    },
    chordpro: `{title: Black Velvet}
{artist: Alannah Myles}
{bpm: 96}

{comment: Intro}
[Em]  [Em]  [A]  [A]

{comment: Strofa}
[Em]  [Em]  [A]  [A]
[Em]  [Em]  [A]  [A]
[Em]  [Em]  [A]  [A]
[Em]  [Em]  [A]  [A]

{comment: Pre-ritornello}
[C]  [B7]  [Em]  [Em]

{soc}
{comment: Ritornello}
[B]  [A]  [Em]  [Em]
[B]  [A]  [Em]  [Em]
{eoc}

{comment: Strofa 2}
[Em]  [Em]  [A]  [A]
[Em]  [Em]  [A]  [A]

{comment: Pre-ritornello}
[C]  [B7]  [Em]  [Em]

{soc}
[B]  [A]  [Em]  [Em]
[B]  [A]  [Em]  [Em]
{eoc}

{comment: Assolo su giro strofa}
[Em]  [Em]  [A]  [A]
[Em]  [Em]  [A]  [A]

{soc}
{comment: Ritornello finale}
[B]  [A]  [Em]  [Em]
[B]  [A]  [Em]  [Em]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-4',
    title: 'Wicked Game',
    artist: 'Chris Isaak',
    bpm: 57,
    duration: 282,
    status: 'pronto',
    tags: ['rock', 'ballad', 'cover'],
    notes: 'Tempo lento, feel half-time. Contare in 6/8.',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Clean con molto riverbero e tremolo\nArpeggio: Bm - A - E loop\nVolume swell per atmosfera',
      voce: 'Molto espressiva, falsetto nel ritornello',
    },
    chordpro: `{title: Wicked Game}
{artist: Chris Isaak}
{bpm: 57}

{comment: Intro - arpeggio}
[Bm]  [A]  [E]  [E]
[Bm]  [A]  [E]  [E]

{comment: Strofa 1}
[Bm]  [A]  [E]  [E]
[Bm]  [A]  [E]  [E]
[Bm]  [A]  [E]  [E]
[Bm]  [A]  [E]  [E]

{soc}
{comment: Ritornello}
[Bm]  [A]  [E]  [E]
[Bm]  [A]  [E]  [E]
{eoc}

{comment: Strofa 2}
[Bm]  [A]  [E]  [E]
[Bm]  [A]  [E]  [E]

{soc}
[Bm]  [A]  [E]  [E]
[Bm]  [A]  [E]  [E]
{eoc}

{comment: Outro - sfuma}
[Bm]  [A]  [E]  [E]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-5',
    title: 'You Oughta Know',
    artist: 'Alanis Morissette',
    bpm: 105,
    duration: 249,
    status: 'in_lavorazione',
    tags: ['rock', 'alternative', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Strofa: F#m - B, palm mute aggressivo\nRitornello: aperto, distorto\nWah nel bridge',
      basso: 'Linea driving nelle strofe, Flea-style nel ritornello',
      batteria: 'Groove serrato, crash sul ritornello',
    },
    chordpro: `{title: You Oughta Know}
{artist: Alanis Morissette}
{bpm: 105}

{comment: Intro}
[F#m]  [B]  [F#m]  [B]

{comment: Strofa 1}
[F#m]  [B]  [F#m]  [B]
[F#m]  [B]  [F#m]  [B]
[F#m]  [B]  [F#m]  [B]
[F#m]  [B]  [F#m]  [B]

{comment: Pre-ritornello}
[A]  [B]  [A]  [B]

{soc}
{comment: Ritornello}
[E]  [A]  [B]  [B]
[E]  [A]  [B]  [B]
{eoc}

{comment: Strofa 2}
[F#m]  [B]  [F#m]  [B]
[F#m]  [B]  [F#m]  [B]

{comment: Pre-ritornello}
[A]  [B]  [A]  [B]

{soc}
[E]  [A]  [B]  [B]
[E]  [A]  [B]  [B]
{eoc}

{comment: Bridge}
[D]  [A]  [E]  [B]
[D]  [A]  [E]  [B]

{soc}
{comment: Ritornello finale}
[E]  [A]  [B]  [B]
[E]  [A]  [B]  [B]
[E]  [A]  [B]  [B]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-6',
    title: 'Kashmir',
    artist: 'Led Zeppelin',
    bpm: 80,
    duration: 510,
    status: 'in_lavorazione',
    tags: ['rock', 'cover'],
    notes: 'Accordatura DADGAD per la chitarra (originale).\nSi puo suonare in standard con voicing adattati.',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Accordatura originale DADGAD\nRiff principale in Dm, potenza sul palm mute\nSezione orchestrale: arpeggio Gm - A',
      batteria: 'Pattern Bonham: kick pesante, feel tribale\nFill di toms nelle transizioni',
      basso: 'Segue il riff di chitarra all\'unisono\nNote lunghe nella sezione orchestrale',
    },
    chordpro: `{title: Kashmir}
{artist: Led Zeppelin}
{bpm: 80}

{comment: Riff principale - Dm modale}
[Dm]  [Dm]  [Dm]  [Dm]
[Dm]  [Dm]  [Dm]  [Dm]

{comment: Strofa - sul riff}
[Dm]  [Dm]  [Dm]  [Dm]
[Dm]  [Dm]  [Dm]  [Dm]
[Dm]  [Dm]  [Dm]  [Dm]
[Dm]  [Dm]  [Dm]  [Dm]

{soc}
{comment: Sezione orchestrale}
[Gm]  [A]  [Gm]  [A]
[Gm]  [A]  [Gm]  [A]
{eoc}

{comment: Riff - Strofa 2}
[Dm]  [Dm]  [Dm]  [Dm]
[Dm]  [Dm]  [Dm]  [Dm]

{soc}
{comment: Sezione orchestrale}
[Gm]  [A]  [Gm]  [A]
[Gm]  [A]  [Gm]  [A]
{eoc}

{comment: Build-up finale}
[Dm]  [Dm]  [Dm]  [Dm]
[Gm]  [A]  [Dm]  [Dm]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-7',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    bpm: 105,
    duration: 228,
    status: 'pronto',
    tags: ['pop', 'soul', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Strofa: Am - Em, ritmica secca\nRitornello: accordi aperti con piu volume',
      voce: 'Potenza vocale nel ritornello, dinamica fondamentale\nStrofa contenuta, ritornello pieno',
      batteria: 'Stomp/clap feel nella strofa, piena nel ritornello',
    },
    chordpro: `{title: Rolling in the Deep}
{artist: Adele}
{bpm: 105}

{comment: Intro}
[Am]  [Am]  [Em]  [Em]

{comment: Strofa}
[Am]  [Am]  [Em]  [Em]
[Am]  [Am]  [Em]  [Em]
[Am]  [Am]  [Em]  [Em]
[Am]  [Am]  [Em]  [Em]

{comment: Pre-ritornello}
[Am]  [F]  [G]  [G]
[Am]  [F]  [G]  [G]

{soc}
{comment: Ritornello}
[Am]  [G]  [F]  [F]
[Am]  [G]  [F]  [F]
{eoc}

{comment: Strofa 2}
[Am]  [Am]  [Em]  [Em]
[Am]  [Am]  [Em]  [Em]

{comment: Pre-ritornello}
[Am]  [F]  [G]  [G]
[Am]  [F]  [G]  [G]

{soc}
[Am]  [G]  [F]  [F]
[Am]  [G]  [F]  [F]
{eoc}

{comment: Bridge}
[Em]  [F]  [Em]  [F]
[Em]  [F]  [G]  [G]

{soc}
{comment: Ritornello finale}
[Am]  [G]  [F]  [F]
[Am]  [G]  [F]  [F]
[Am]  [G]  [F]  [F]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-8',
    title: 'Hedonism',
    artist: 'Skunk Anansie',
    bpm: 76,
    duration: 234,
    status: 'pronto',
    tags: ['rock', 'ballad', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Arpeggio nelle strofe, accordi aperti nel ritornello\nClean tutto il pezzo, leggero chorus',
      voce: 'Skin ha un range enorme, adattare la tonalita se serve',
    },
    chordpro: `{title: Hedonism}
{artist: Skunk Anansie}
{bpm: 76}

{comment: Intro}
[C]  [Em]  [Am]  [F]

{comment: Strofa 1}
[C]  [Em]  [Am]  [F]
[C]  [Em]  [Am]  [F]
[C]  [Em]  [Am]  [F]
[C]  [Em]  [Am]  [F]

{soc}
{comment: Ritornello}
[C]  [G]  [Am]  [F]
[C]  [G]  [Am]  [F]
{eoc}

{comment: Strofa 2}
[C]  [Em]  [Am]  [F]
[C]  [Em]  [Am]  [F]

{soc}
[C]  [G]  [Am]  [F]
[C]  [G]  [Am]  [F]
{eoc}

{comment: Bridge}
[Dm]  [Am]  [G]  [G]
[Dm]  [Am]  [G]  [G]

{soc}
{comment: Ritornello finale}
[C]  [G]  [Am]  [F]
[C]  [G]  [Am]  [F]
[C]  [G]  [Am]  [F]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-9',
    title: 'All Along the Watchtower',
    artist: 'Jimi Hendrix',
    bpm: 114,
    duration: 240,
    status: 'pronto',
    tags: ['rock', 'blues', 'cover'],
    notes: 'Versione Hendrix. Tutto il brano e sullo stesso giro.',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Giro: C#m - B - A - B (o Am - G - F - G trasposto)\nIntro: slide e feedback\nAssoli: pentatonica minore, wah',
      basso: 'Segue la fondamentale, driving',
      batteria: 'Rock straight, fill di rullante nelle transizioni',
    },
    chordpro: `{title: All Along the Watchtower}
{artist: Jimi Hendrix}
{bpm: 114}

{comment: Tutto il brano e sullo stesso giro di 4 accordi}

{comment: Intro}
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]

{comment: Strofa 1}
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]

{comment: Assolo 1}
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]

{comment: Strofa 2}
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]

{comment: Assolo 2 - principale}
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]

{comment: Strofa 3}
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]

{comment: Outro - assolo finale e fade}
[C#m]  [B]  [A]  [B]
[C#m]  [B]  [A]  [B]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-10',
    title: 'Lovesong',
    artist: 'The Cure',
    bpm: 100,
    duration: 209,
    status: 'pronto',
    tags: ['new wave', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Clean con chorus e delay\nArpeggio nella strofa, accordi nel ritornello',
      basso: 'Linea melodica molto importante, segue il canto',
      tastiera: 'Pad di synth in sottofondo, strings',
    },
    chordpro: `{title: Lovesong}
{artist: The Cure}
{bpm: 100}

{comment: Intro}
[Bm]  [A]  [E]  [F#]

{comment: Strofa 1}
[Bm]  [A]  [E]  [F#]
[Bm]  [A]  [E]  [F#]
[Bm]  [A]  [E]  [F#]
[Bm]  [A]  [E]  [F#]

{soc}
{comment: Ritornello}
[A]  [E]  [Bm]  [D]
[A]  [E]  [Bm]  [D]
{eoc}

{comment: Strofa 2}
[Bm]  [A]  [E]  [F#]
[Bm]  [A]  [E]  [F#]

{soc}
[A]  [E]  [Bm]  [D]
[A]  [E]  [Bm]  [D]
{eoc}

{comment: Strofa 3}
[Bm]  [A]  [E]  [F#]
[Bm]  [A]  [E]  [F#]

{soc}
{comment: Ritornello finale - ripetuto}
[A]  [E]  [Bm]  [D]
[A]  [E]  [Bm]  [D]
[A]  [E]  [Bm]  [D]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-11',
    title: 'Universo',
    artist: 'Cristina Dona',
    bpm: 74,
    duration: 270,
    status: 'in_lavorazione',
    tags: ['italiano', 'alternative'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Arpeggio delicato, posizioni aperte\nF e G con barre',
    },
    chordpro: `{title: Universo}
{artist: Cristina Dona}
{bpm: 74}

{comment: Intro}
[F]  [G]  [Fmaj7]  [Em]

{comment: Strofa 1}
[C]  [Am]  [Em]  [G]
[C]  [Am]  [Em]  [G]
[C]  [Am]  [Em]  [G]
[C]  [Am]  [Em]  [G]

{soc}
{comment: Ritornello}
[F]  [G]  [Fmaj7]  [Em]
[F]  [G]  [C]  [C]
{eoc}

{comment: Strofa 2}
[C]  [Am]  [Em]  [G]
[C]  [Am]  [Em]  [G]

{soc}
[F]  [G]  [Fmaj7]  [Em]
[F]  [G]  [C]  [C]
{eoc}

{comment: Ponte}
[Fm]  [D]  [Dsus4]  [D]

{soc}
{comment: Ritornello finale}
[F]  [G]  [Fmaj7]  [Em]
[F]  [G]  [C]  [C]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-12',
    title: 'Dentro Marilyn',
    artist: 'Afterhours',
    bpm: 137,
    duration: 285,
    status: 'da_imparare',
    tags: ['italiano', 'alternative', 'rock'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Voicing con estensioni: Em7, C6/9, C5\nRitmata costante, dinamica nel ritornello',
      basso: 'Linea in Em, driving negli 8vi',
    },
    chordpro: `{title: Dentro Marilyn}
{artist: Afterhours}
{bpm: 137}

{comment: Intro}
[C5]  [Em7]  [C5]  [Em7]  [C]

{comment: Strofa 1}
[Em7]  [C]  [Em7]  [C]
[Em7]  [C]  [Em7]  [C]
[Em7]  [C]  [Em7]  [C]

{soc}
{comment: Ritornello}
[A7sus4]  [A7]  [C5]  [Em7]
[A7sus4]  [A7]  [C5]  [Em7]
{eoc}

{comment: Strofa 2}
[Em7]  [C]  [Em7]  [C]
[Em7]  [C]  [Em7]  [C]

{soc}
[A7sus4]  [A7]  [C5]  [Em7]
[A7sus4]  [A7]  [C5]  [Em7]
{eoc}

{comment: Strumentale}
[Em7]  [C]  [Em]  [C5]
[Em7]  [C]  [Em]  [C5]

{soc}
{comment: Ritornello finale}
[A7sus4]  [A7]  [C5]  [Em7]
[A7sus4]  [A7]  [C5]  [Em7]
[A7sus4]  [A7]  [C5]  [Em7]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-13',
    title: 'Miss You',
    artist: 'Etta James',
    bpm: 78,
    duration: 258,
    status: 'in_lavorazione',
    tags: ['blues', 'soul', 'cover'],
    notes: 'Cover Etta James della versione Rolling Stones, molto piu lenta e blues.',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Blues feel, clean con crunch leggero\nRitmica funky-blues',
      basso: 'Groove blues, fondamentali con ghost notes',
      voce: 'Interpretazione blues intensa, vibrato',
    },
    chordpro: `{title: Miss You}
{artist: Etta James}
{bpm: 78}

{comment: Intro}
[Dm]  [Am]  [F]  [C]

{comment: Strofa 1}
[Dm]  [Am]  [Dm]  [Am]
[Dm]  [Am]  [Dm]  [Am]
[Dm]  [Am]  [Dm]  [Am]

{soc}
{comment: Ritornello}
[F]  [C]  [Dm]  [A]
[F]  [C]  [Dm]  [A]
{eoc}

{comment: Strofa 2}
[Dm]  [Am]  [Dm]  [Am]
[Dm]  [Am]  [Dm]  [Am]

{soc}
[F]  [C]  [Dm]  [A]
[F]  [C]  [Dm]  [A]
{eoc}

{comment: Outro}
[Dm]  [Am]  [F]  [C]
[Dm]  [Am]  [F]  [C]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-14',
    title: 'Colors',
    artist: 'Black Pumas',
    bpm: 78,
    duration: 285,
    status: 'pronto',
    tags: ['soul', 'psychedelic', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Riff soul-psych in D, clean con riverbero\nAccenti ritmici importanti',
      basso: 'Groove profondo, poche note ma giuste',
      batteria: 'Groove soul rilassato, rim shot nelle strofe',
    },
    chordpro: `{title: Colors}
{artist: Black Pumas}
{bpm: 78}

{comment: Intro}
[D]  [G]  [Bm]  [A]

{comment: Strofa 1}
[D]  [G]  [Bm]  [A]
[D]  [G]  [Bm]  [A]
[D]  [G]  [Bm]  [A]
[D]  [G]  [Bm]  [A]

{soc}
{comment: Ritornello}
[G]  [A]  [D]  [Bm]
[G]  [A]  [D]  [D]
{eoc}

{comment: Strofa 2}
[D]  [G]  [Bm]  [A]
[D]  [G]  [Bm]  [A]

{soc}
[G]  [A]  [D]  [Bm]
[G]  [A]  [D]  [D]
{eoc}

{comment: Bridge}
[Em]  [G]  [D]  [A]
[Em]  [G]  [D]  [A]

{soc}
{comment: Ritornello finale}
[G]  [A]  [D]  [Bm]
[G]  [A]  [D]  [Bm]
[G]  [A]  [D]  [D]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-15',
    title: 'I Put a Spell on You',
    artist: 'Screamin\' Jay Hawkins',
    bpm: 66,
    duration: 210,
    status: 'pronto',
    tags: ['blues', 'soul', 'cover'],
    notes: 'Si puo fare nella versione Nina Simone (piu lenta e drammatica) o nella versione rock originale.',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Blues in Em, crunch\nAccordi con tensioni: Em9, Am9',
      voce: 'Teatrale, crescendo drammatico',
      tastiera: 'Organo Hammond se disponibile',
    },
    chordpro: `{title: I Put a Spell on You}
{artist: Screamin' Jay Hawkins}
{bpm: 66}

{comment: Intro}
[Em]  [Am]  [Em]  [B7]

{comment: Strofa 1}
[Em]  [Em]  [Am]  [Am]
[Em]  [Em]  [B7]  [B7]
[Em]  [Em]  [Am]  [Am]
[Em]  [B7]  [Em]  [Em]

{soc}
{comment: Ritornello}
[Am]  [Am]  [Em]  [Em]
[Am]  [B7]  [Em]  [Em]
{eoc}

{comment: Strofa 2}
[Em]  [Em]  [Am]  [Am]
[Em]  [Em]  [B7]  [B7]
[Em]  [Em]  [Am]  [Am]
[Em]  [B7]  [Em]  [Em]

{soc}
[Am]  [Am]  [Em]  [Em]
[Am]  [B7]  [Em]  [Em]
{eoc}

{comment: Outro - drammatico}
[Am]  [B7]  [Em]  [Em]
[Am]  [B7]  [Em]  [Em]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-16',
    title: 'Crosseyed and Painless',
    artist: 'Talking Heads',
    bpm: 132,
    duration: 280,
    status: 'da_imparare',
    tags: ['funk', 'new wave', 'cover'],
    notes: 'Pezzo molto ritmico, il groove e tutto. Ascoltare la versione Stop Making Sense.',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Funk scratching in Em, ritmica costante 16mi\nSuono secco, no riverbero',
      basso: 'Linea funky ripetitiva, fondamentale\nGroove ipnotico, non variare troppo',
      batteria: 'Pattern funk serrato, hi-hat in 16mi\nGroove costante, pochi fill',
    },
    chordpro: `{title: Crosseyed and Painless}
{artist: Talking Heads}
{bpm: 132}

{comment: Basato su riff funk in Em}

{comment: Intro - groove si costruisce}
[Em]  [Em]  [Em]  [Em]
[Em]  [Em]  [Em]  [Em]

{comment: Strofa 1}
[Em]  [Em]  [Em]  [Em]
[Em]  [Em]  [Em]  [Em]
[Em]  [Em]  [Em]  [Em]
[Em]  [Em]  [Em]  [Em]

{soc}
{comment: Ritornello}
[A]  [A]  [Em]  [Em]
[A]  [A]  [Em]  [Em]
{eoc}

{comment: Strofa 2}
[Em]  [Em]  [Em]  [Em]
[Em]  [Em]  [Em]  [Em]

{soc}
[A]  [A]  [Em]  [Em]
[A]  [A]  [Em]  [Em]
{eoc}

{comment: Breakdown}
[Em]  [Em]  [Em]  [Em]
[D]  [D]  [Em]  [Em]

{comment: Build-up}
[Em]  [Em]  [Em]  [Em]
[Em]  [Em]  [Em]  [Em]

{soc}
{comment: Ritornello finale}
[A]  [A]  [Em]  [Em]
[A]  [A]  [Em]  [Em]
{eoc}`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'song-17',
    title: 'Running Up That Hill',
    artist: 'Kate Bush',
    bpm: 108,
    duration: 300,
    status: 'in_lavorazione',
    tags: ['synth-pop', 'alternative', 'cover'],
    notes: '',
    instrumentNotes: {
      ...EMPTY_INSTRUMENT_NOTES,
      chitarra: 'Puo coprire la parte synth con arpeggio\nAm - C - G - F con riverbero',
      tastiera: 'Synth pad principale, il cuore del brano\nDrum machine pattern da replicare o adattare',
      voce: 'Range alto, intensita nel ritornello',
      batteria: 'Pattern elettronico: kick in 4, snare sul 2 e 4\nPuoi farlo acustico ma mantenere il feel meccanico',
    },
    chordpro: `{title: Running Up That Hill}
{artist: Kate Bush}
{bpm: 108}

{comment: Versione in Am (trasposta per facilita)}

{comment: Intro}
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]

{comment: Strofa 1}
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]

{soc}
{comment: Ritornello}
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
{eoc}

{comment: Strofa 2}
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]

{soc}
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
{eoc}

{comment: Bridge}
[Dm]  [F]  [Am]  [G]
[Dm]  [F]  [Am]  [G]

{soc}
{comment: Ritornello finale}
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]
{eoc}

{comment: Outro}
[Am]  [C]  [G]  [F]
[Am]  [C]  [G]  [F]`,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
]

export const demoRooms: RehearsalRoom[] = [
  {
    id: 'room-1',
    name: 'DoubleStroke',
    address: 'Via Pisino 63, 00177 Roma',
    mapsUrl: 'https://maps.google.com/?q=Via+Pisino+63+Roma',
    phone: '320 921 2857',
    email: '',
    website: 'https://www.doublestroke.it',
    pricePerHour: 'Duo 10 EUR/h - Band su richiesta',
    notes: '3 sale: Blue Cheese (40mq), Drag, Flam\nParcheggio convenzionato al civico 67\nVicino stazione Serenissima',
  },
  {
    id: 'room-2',
    name: 'SoundsGood',
    address: 'Via Dancalia 9, 00199 Roma',
    mapsUrl: 'https://maps.google.com/?q=Via+Dancalia+9+Roma',
    phone: '345 582 7645',
    email: 'info@soundsgoodroma.com',
    website: 'https://soundsgoodroma.com',
    pricePerHour: 'Su richiesta',
    notes: '4 sale, la piu grande 48mq\nVicino Metro Libia (B1)\nWi-Fi, climatizzazione, assistenza mixer',
  },
  {
    id: 'room-3',
    name: 'Boiler Studio',
    address: 'Via Urbano Cioccetti 34, 00155 Roma',
    mapsUrl: 'https://maps.google.com/?q=Via+Urbano+Cioccetti+34+Roma',
    phone: '338 191 9711',
    email: 'boilerstudio@gmail.com',
    website: 'https://www.boilerstudio.it',
    pricePerHour: 'Su richiesta',
    notes: 'Sala prove + studio registrazione\nParcheggio facile davanti allo studio',
  },
]

export const demoProposals: Proposal[] = [
  {
    id: 'prop-1',
    title: 'Zombie',
    artist: 'The Cranberries',
    youtubeUrl: 'https://www.youtube.com/watch?v=6Ejga4kJUts',
    proposedBy: 'Marco',
    votes: { Marco: 'si', Luca: 'si', Andrea: 'forse' },
    createdAt: '2024-03-01',
  },
  {
    id: 'prop-2',
    title: 'Black Hole Sun',
    artist: 'Soundgarden',
    youtubeUrl: 'https://www.youtube.com/watch?v=3mbBbFH9fAg',
    proposedBy: 'Luca',
    votes: { Luca: 'si', Marco: 'no' },
    createdAt: '2024-03-05',
  },
]

export const demoEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Prova settimanale',
    date: '2026-02-26',
    time: '21:00',
    type: 'prova',
    location: 'DoubleStroke - Sala Blue Cheese',
    criticality: 1,
    notes: 'Concentrarsi sui nuovi pezzi',
  },
  {
    id: 'evt-2',
    title: 'Serata al Barrio',
    date: '2026-03-08',
    time: '22:00',
    type: 'serata',
    location: 'Barrio Pub, Via Torino 15',
    criticality: 3,
    notes: 'Soundcheck alle 20:00\nPortare cavi di riserva\nScaletta da 90 minuti',
  },
  {
    id: 'evt-3',
    title: 'Prova generale pre-serata',
    date: '2026-03-06',
    time: '20:30',
    type: 'prova',
    location: 'DoubleStroke - Sala Blue Cheese',
    criticality: 2,
    notes: 'Ultima prova prima della serata, provare tutta la scaletta',
  },
]

export const demoSetlists: Setlist[] = [
  {
    id: 'setlist-1',
    name: 'Serata al Barrio',
    date: '2026-03-08',
    songIds: ['song-1', 'song-7', 'song-14', 'song-3', 'song-9', 'song-8', 'song-4'],
    notes: 'Aprire con Glory Box, chiudere con Wicked Game come ballad finale',
    createdAt: '2024-03-01',
  },
]
