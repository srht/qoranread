export default function BackBar({ onBack }) {
  return (
    <div
      className="relative z-10"
      style={{
        maxWidth: '900px',
        margin: '0 auto 1.5rem',
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'transparent',
          border: '1px solid #B8860B66',
          borderRadius: '6px',
          padding: '0.4rem 0.85rem',
          cursor: 'pointer',
          fontFamily: '"Cormorant SC", serif',
          fontSize: '0.85rem',
          color: '#7a5a1f',
          letterSpacing: '0.1em',
          transition: 'all 180ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#B8860B22';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>‹</span>
        <span>SÛRELER</span>
      </button>
    </div>
  );
}
