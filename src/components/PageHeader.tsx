import { useNavigate } from 'react-router-dom'

interface PageHeaderProps {
  title: string
  backTo?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, backTo, actions }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {backTo && (
          <button
            onClick={() => navigate(backTo)}
            style={{
              background: 'none',
              color: 'var(--text-secondary)',
              fontSize: 20,
              padding: '4px 8px',
            }}
            aria-label="Indietro"
          >
            &#8592;
          </button>
        )}
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h1>
      </div>
      {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
    </header>
  )
}
