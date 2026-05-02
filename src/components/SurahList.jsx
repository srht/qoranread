import { surahList } from '../data/surahList';
import Ornament from './Ornament';

function HeaderOrnament() {
  return (
    <svg width="200" height="40" viewBox="0 0 200 40">
      <g stroke="#B8860B" strokeWidth="0.9" fill="none" opacity="0.7">
        <path d="M 10 20 L 70 20" />
        <path d="M 130 20 L 190 20" />
        <circle cx="100" cy="20" r="10" />
        <circle cx="100" cy="20" r="5" />
        <circle cx="100" cy="20" r="1.5" fill="#B8860B" />
        <path d="M 78 20 L 90 20 M 110 20 L 122 20" />
        <path d="M 100 5 L 100 12 M 100 28 L 100 35" />
      </g>
    </svg>
  );
}

function SurahCard({ surah, onSelect }) {
  return (
    <button
      onClick={() => onSelect(surah.number)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.85rem 1rem',
        background: 'rgba(248, 241, 221, 0.55)',
        border: '1px solid #B8860B44',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 200ms ease',
        font: 'inherit',
        color: 'inherit',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(248, 241, 221, 0.95)';
        e.currentTarget.style.borderColor = '#B8860B88';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(248, 241, 221, 0.55)';
        e.currentTarget.style.borderColor = '#B8860B44';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: '40px', height: '40px', flexShrink: 0 }}
      >
        <svg width="40" height="40" viewBox="0 0 56 56" className="absolute inset-0">
          <g transform="translate(28 28)">
            <polygon
              points="0,-26 7,-7 26,0 7,7 0,26 -7,7 -26,0 -7,-7"
              fill="none"
              stroke="#B8860B"
              strokeWidth="1"
              opacity="0.6"
            />
            <circle r="20" fill="#F8F1DD" stroke="#B8860B" strokeWidth="0.8" />
          </g>
        </svg>
        <span
          className="relative z-10"
          style={{
            fontFamily: '"Cormorant SC", serif',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#7a5a1f',
          }}
        >
          {surah.number}
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '0.5rem',
          }}
        >
          <div
            style={{
              fontFamily: '"Cormorant SC", serif',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#3a2817',
              letterSpacing: '0.06em',
            }}
          >
            {surah.turkishName}
          </div>
          <div
            dir="rtl"
            style={{
              fontFamily: '"Amiri", serif',
              fontSize: '1.2rem',
              color: '#7a5a1f',
              flexShrink: 0,
            }}
          >
            {surah.arabicName}
          </div>
        </div>
        <div
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            color: '#8a7355',
            marginTop: '2px',
          }}
        >
          {surah.numberOfAyahs} âyet · {surah.revelationType}
        </div>
      </div>
    </button>
  );
}

export default function SurahList({ onSelect }) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header
        className="text-center relative z-10"
        style={{ marginBottom: '3rem' }}
      >
        <div className="flex justify-center mb-6">
          <HeaderOrnament />
        </div>
        <h1
          dir="rtl"
          style={{
            fontFamily: '"Amiri", serif',
            fontSize: '3rem',
            color: '#3a2817',
            fontWeight: 700,
            marginBottom: '0.6rem',
            letterSpacing: '0.02em',
          }}
        >
          ٱلْقُرْآنُ ٱلْكَرِيمُ
        </h1>
        <h2
          style={{
            fontFamily: '"Cormorant SC", serif',
            fontSize: '1.25rem',
            color: '#7a5a1f',
            letterSpacing: '0.3em',
            fontWeight: 500,
            marginBottom: '0.4rem',
          }}
        >
          KUR'ÂN-I KERÎM
        </h2>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: '#8a7355',
            letterSpacing: '0.05em',
          }}
        >
          114 sûre · bir sûre seçin
        </p>
        <div className="flex justify-center mt-6">
          <HeaderOrnament />
        </div>
      </header>

      <main
        className="relative z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {surahList.map((s) => (
          <SurahCard key={s.number} surah={s} onSelect={onSelect} />
        ))}
      </main>

      <div className="relative z-10" style={{ marginTop: '3rem' }}>
        <Ornament />
      </div>
    </div>
  );
}
