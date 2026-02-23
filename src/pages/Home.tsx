import { useNavigate } from 'react-router-dom'

const sections = [
  {
    label: 'Pezzi Provati',
    icon: '\u{1F3B8}',
    path: '/songs',
    description: 'Brani con testi, accordi e appunti',
    color: '#e94560',
  },
  {
    label: 'Nuove Proposte',
    icon: '\u{1F4A1}',
    path: '/proposals',
    description: 'Proponi brani e vota',
    color: '#f5a623',
  },
  {
    label: 'Appuntamenti',
    icon: '\u{1F4C5}',
    path: '/events',
    description: 'Prove, serate ed eventi',
    color: '#3498db',
  },
  {
    label: 'Setlist',
    icon: '\u{1F4CB}',
    path: '/setlists',
    description: 'Scalette per serate e prove',
    color: '#9b59b6',
  },
  {
    label: 'Salette',
    icon: '\u{1F3A4}',
    path: '/rooms',
    description: 'Sale prove con contatti e info',
    color: '#27ae60',
  },
]

export function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      padding: 20,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #e94560, #0f3460)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 8,
        }}>
          The Gambizzators
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Band Management App
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
        width: '100%',
        maxWidth: 400,
      }}>
        {sections.map((section) => (
          <button
            key={section.path}
            onClick={() => navigate(section.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px',
              background: 'var(--bg-card)',
              border: `1px solid ${section.color}40`,
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 8px 24px ${section.color}20`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <span style={{ fontSize: 36, marginBottom: 8 }}>{section.icon}</span>
            <span style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
              {section.label}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center' }}>
              {section.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
