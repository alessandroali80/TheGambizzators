import { useState, useEffect, useRef, useCallback } from 'react'

interface MetronomeProps {
  initialBpm?: number
  onClose: () => void
}

export function Metronome({ initialBpm, onClose }: MetronomeProps) {
  const [bpm, setBpm] = useState(initialBpm ?? 120)
  const [isPlaying, setIsPlaying] = useState(false)
  const [beat, setBeat] = useState(0)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<number | null>(null)
  const tapTimesRef = useRef<number[]>([])

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    return audioCtxRef.current
  }, [])

  const playClick = useCallback((isAccent: boolean) => {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.value = isAccent ? 1000 : 800
    gain.gain.value = isAccent ? 0.5 : 0.3

    osc.start(ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    osc.stop(ctx.currentTime + 0.05)
  }, [getAudioContext])

  useEffect(() => {
    if (isPlaying) {
      setBeat(0)
      let currentBeat = 0
      const ms = 60000 / bpm

      // Play first click immediately
      playClick(true)

      intervalRef.current = window.setInterval(() => {
        currentBeat = (currentBeat + 1) % beatsPerMeasure
        setBeat(currentBeat)
        playClick(currentBeat === 0)
      }, ms)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPlaying, bpm, beatsPerMeasure, playClick])

  const handleTapTempo = () => {
    const now = Date.now()
    const taps = tapTimesRef.current

    // Reset if last tap was more than 2 seconds ago
    if (taps.length > 0 && now - taps[taps.length - 1] > 2000) {
      tapTimesRef.current = [now]
      return
    }

    taps.push(now)

    // Keep only last 8 taps
    if (taps.length > 8) taps.shift()

    if (taps.length >= 2) {
      const intervals = []
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1])
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
      const newBpm = Math.round(60000 / avgInterval)
      if (newBpm >= 30 && newBpm <= 300) {
        setBpm(newBpm)
      }
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--bg-secondary)',
      borderTop: '2px solid var(--accent)',
      padding: '16px 20px',
      zIndex: 200,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>Metronomo</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            color: 'var(--text-secondary)',
            fontSize: 18,
            padding: '0 4px',
          }}
        >
          &#10005;
        </button>
      </div>

      {/* Beat indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
        {Array.from({ length: beatsPerMeasure }, (_, i) => (
          <div
            key={i}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
              background: isPlaying && beat === i
                ? (i === 0 ? 'var(--accent)' : 'var(--warning)')
                : 'transparent',
              transition: 'background 0.05s',
            }}
          />
        ))}
      </div>

      {/* BPM display and controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
        <button
          onClick={() => setBpm((b) => Math.max(30, b - 1))}
          style={bpmBtnStyle}
        >
          -
        </button>
        <div style={{ textAlign: 'center', minWidth: 80 }}>
          <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{bpm}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>BPM</div>
        </div>
        <button
          onClick={() => setBpm((b) => Math.min(300, b + 1))}
          style={bpmBtnStyle}
        >
          +
        </button>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={30}
        max={300}
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--accent)', marginBottom: 12 }}
      />

      {/* Bottom controls */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: isPlaying ? 'var(--danger)' : 'var(--success)',
            color: 'white',
            padding: '10px 28px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>

        <button
          onClick={handleTapTempo}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            padding: '10px 20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Tap Tempo
        </button>

        {/* Time signature */}
        <select
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <option value={2}>2/4</option>
          <option value={3}>3/4</option>
          <option value={4}>4/4</option>
          <option value={6}>6/8</option>
        </select>
      </div>
    </div>
  )
}

const bpmBtnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'var(--bg-card)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
  fontSize: 20,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
