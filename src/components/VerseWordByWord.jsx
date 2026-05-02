import { useState } from 'react';

const PALETTE = [
  '#8B2635', '#1B4965', '#2D6A4F', '#9C6644',
  '#6B2D5C', '#1A535C', '#BC4B51', '#344E41',
  '#3D348B', '#A04668', '#5C6D2E', '#7B3F00',
];

function Medallion({ n }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: '48px', height: '48px' }}
    >
      <svg width="48" height="48" viewBox="0 0 56 56" className="absolute inset-0">
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
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#7a5a1f',
        }}
      >
        {n}
      </span>
    </div>
  );
}

export default function VerseWordByWord({ verse }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <article
      className="relative mx-auto"
      style={{ maxWidth: '780px', marginBottom: '3.5rem' }}
    >
      <div className="flex justify-center mb-6">
        <Medallion n={verse.n} />
      </div>

      {/* RTL yönünde akan kelime çiftleri: Arapça üstte, Türkçe altta */}
      <div
        dir="rtl"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.25rem',
          padding: '0 0.5rem',
        }}
      >
        {verse.words.map((word, i) => {
          const color = PALETTE[i % PALETTE.length];
          const active = hoveredIdx === i;
          const dimmed = hoveredIdx !== null && !active;
          return (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.55rem 0.5rem',
                borderRadius: '7px',
                cursor: 'default',
                background: active ? `${color}18` : 'transparent',
                border: `1px solid ${active ? `${color}55` : 'transparent'}`,
                transition: 'all 180ms ease',
                opacity: dimmed ? 0.28 : 1,
                gap: '0.25rem',
                minWidth: '48px',
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onTouchStart={() => setHoveredIdx(i)}
            >
              {/* Arapça kelime */}
              <span
                style={{
                  fontFamily: '"Amiri", serif',
                  fontSize: '1.85rem',
                  lineHeight: 1.4,
                  color,
                  direction: 'rtl',
                  textShadow: active ? `0 0 22px ${color}66` : 'none',
                  transition: 'text-shadow 180ms ease',
                }}
              >
                {word.arabic}
              </span>

              {/* Ince ayraç */}
              <span
                style={{
                  display: 'block',
                  width: '80%',
                  height: '1px',
                  background: `${color}55`,
                }}
              />

              {/* Türkçe karşılık */}
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.76rem',
                  fontStyle: 'italic',
                  color,
                  textAlign: 'center',
                  direction: 'ltr',
                  maxWidth: '80px',
                  lineHeight: 1.3,
                  fontWeight: active ? 600 : 400,
                  transition: 'font-weight 180ms ease',
                }}
              >
                {word.turkish || '—'}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}
