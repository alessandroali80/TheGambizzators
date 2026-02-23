# The Gambizzators - Specifiche Funzionali

App (PWA) per la gestione di una band: brani, prove, proposte e sale prove.

---

## Architettura Generale

- **Frontend**: React + TypeScript + Vite
- **PWA**: vite-plugin-pwa (offline support, installabile)
- **Persistenza MVP**: localStorage / IndexedDB (no backend)
- **Persistenza V1+**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: Vercel o Netlify

---

## Fasi di Sviluppo

### Fase 1 - MVP
- Home con navigazione
- Pezzi Provati (elenco + dettaglio con testo/accordi/BPM/appunti)
- Zoom testo configurabile
- Auto-scroll con velocita' regolabile
- Salette (elenco con contatti e appunti)
- Dati in localStorage, niente login

### Fase 2 - V1
- Nuove Proposte con embed YouTube, autore proposta e sistema poll
- Prossimi Appuntamenti con livello criticita'
- Backend Supabase per persistenza condivisa
- Traspositore accordi
- Stato brano (da imparare / in lavorazione / pronto)
- Tag e categorie brani

### Fase 3 - V2
- Registrazione audio associata ai brani
- Setlist (scalette ordinate per serate/prove)
- Metronomo integrato
- Note per strumento (tab separate per chitarra, basso, batteria, voce)

### Fase 4 - V3
- Sistema utenti e gruppi (registrazione, creazione gruppo, adesione)
- Setup personale per strumentista
- Notifiche push (nuove proposte, appuntamenti)
- Integrazione calendario (Google Calendar / iCal)
- Storico versioni appunti
- Export PDF scaletta con testi e accordi

---

## Pagine e Funzionalita'

### Home
Pagina principale con navigazione verso le sezioni:
- Pezzi Provati
- Nuove Proposte
- Prossimi Appuntamenti
- Salette

Design: card o bottoni grandi, pensati per uso mobile in sala prove.

---

### Pezzi Provati

**Elenco**
- Lista brani ricercabile per titolo o autore
- Filtro per tag/categoria (rock, blues, ballad, cover, originale...)
- Filtro per stato: da imparare / in lavorazione / pronto
- Indicatore visivo dello stato del brano

**Dettaglio Brano**
- Titolo, autore, BPM
- Testo con accordi in formato ChordPro (`[Am]testo sotto l'ac[G]cordo`)
  - Permette rendering pulito accordi sopra il testo
  - Abilita traspositore automatico (cambia tonalita' con un tap)
- Zoom testo: slider o bottoni +/- per regolare dimensione font
- Auto-scroll: velocita' regolabile con slider (indipendente dal BPM, approccio pragmatico)
  - Play/Pause/Reset dello scroll
- Box appunti generali (effetti, note sulla struttura, ecc.)
- Note per strumento (Fase 3): tab separate per chitarra, basso, batteria, voce
- Registrazione audio (Fase 3): registra e riascolta le prove associate al brano
  - Formato WebM/Opus per compressione
  - Limite durata: 15 minuti per registrazione
  - Salvataggio locale + sync quando online

---

### Nuove Proposte (da Fase 2)

- Elenco brani proposti
- Per ogni proposta:
  - Titolo e autore del brano
  - Chi l'ha proposto
  - Link YouTube con embed/anteprima
  - Sistema poll (si/no/forse) per votare
- Possibilita' di promuovere una proposta a "pezzo provato"

---

### Prossimi Appuntamenti (da Fase 2)

- Elenco cronologico di eventi
- Per ogni appuntamento:
  - Data e ora
  - Tipo: prova / serata / evento
  - Luogo
  - Livello criticita' (icone fiamma: 1-3 fiamme)
  - Note aggiuntive
- Integrazione calendario esterna (Fase 4)

---

### Salette

- Elenco sale prove
- Per ogni saletta:
  - Nome
  - Indirizzo (con link a Google Maps)
  - Contatti (telefono, email, sito)
  - Prezzo/ora (se noto)
  - Appunti (qualita' sala, attrezzatura disponibile, note varie)

---

### Setlist (da Fase 3)

- Creare scalette ordinate per serate o prove
- Drag & drop per riordinare i brani
- Navigazione swipe tra un brano e l'altro durante l'esecuzione
- Durata stimata (somma durate brani)

---

### Metronomo (da Fase 3)

- Metronomo integrato nell'app
- Si imposta automaticamente sul BPM del brano corrente
- Play/Stop, tap tempo per calibrare
- Suoni configurabili (click, rimshot, ecc.)

---

## Formato Testo e Accordi - ChordPro

Standard adottato per testi e accordi. Esempio:

```
{title: Come As You Are}
{artist: Nirvana}
{bpm: 120}

[Em]Come as you are, as you [G]were
As I [Em]want you to [G]be
```

Vantaggi:
- Parser JS disponibili (es. chordsheetjs)
- Traspositore automatico
- Rendering accordi sopra il testo
- Formato portabile e leggibile

---

## Vincoli Tecnici e Note

- **Offline first**: testi e accordi devono funzionare senza rete
- **Mobile first**: interfaccia ottimizzata per smartphone in sala prove
- **Audio recording**: MediaRecorder API (attenzione compatibilita' Safari iOS)
- **Storage audio**: compressione WebM/Opus, tetto storage per gruppo
- **PWA**: installabile su home screen, splash screen, icona personalizzata

---

## Miglioramenti Futuri (Backlog)

- Export PDF della scaletta con testi e accordi
- Storico versioni degli appunti
- Ricerca brani tramite API esterne (Spotify, MusicBrainz)
- Accordatore integrato (tuner)
- Condivisione rapida brano via link/QR code
