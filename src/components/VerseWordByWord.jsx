import { useState } from 'react';

const PALETTE = [
  '#8B2635', '#1B4965', '#2D6A4F', '#9C6644',
  '#6B2D5C', '#1A535C', '#BC4B51', '#344E41',
  '#3D348B', '#A04668', '#5C6D2E', '#7B3F00',
];

const colorFor = (idx) => PALETTE[idx % PALETTE.length];

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
  const [mealActive, setMealActive] = useState(false);

  return (
    <article
      className="relative mx-auto"
      style={{ maxWidth: '780px', marginBottom: '3.5rem' }}
    >
      <div className="flex justify-center mb-6">
        <Medallion n={verse.n} />
      </div>

      {/* Kelime çiftleri: Arapça + İngilizce */}
      <div
        dir="rtl"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.3rem 0.5rem',
          padding: '0 0.5rem',
          marginBottom: '1.6rem',
        }}
      >
        {verse.words.map((word, i) => {
          const color = colorFor(i);
          const active = hoveredIdx === i || mealActive;
          const dimmed = hoveredIdx !== null && hoveredIdx !== i && !mealActive;
          return (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.45rem 0.5rem 0.4rem',
                borderRadius: '8px',
                cursor: 'default',
                background: active && !mealActive ? `${color}16` : 'transparent',
                border: `1px solid ${active && !mealActive ? `${color}44` : 'transparent'}`,
                opacity: dimmed ? 0.25 : 1,
                transition: 'all 180ms ease',
                gap: '0.2rem',
                minWidth: '44px',
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onTouchStart={() => setHoveredIdx(i)}
            >
              {/* Arapça */}
              <span
                style={{
                  fontFamily: '"Amiri", serif',
                  fontSize: '1.9rem',
                  lineHeight: 1.5,
                  color,
                  direction: 'rtl',
                  textShadow: active && !mealActive ? `0 0 20px ${color}55` : 'none',
                  transition: 'text-shadow 180ms ease',
                }}
              >
                {word.arabic}
              </span>

              {/* İnce ayraç */}
              <span
                style={{
                  display: 'block',
                  width: '75%',
                  height: '1px',
                  background: `${color}44`,
                }}
              />

              {/* İngilizce karşılık */}
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.72rem',
                  fontStyle: 'italic',
                  color,
                  textAlign: 'center',
                  direction: 'ltr',
                  maxWidth: '88px',
                  lineHeight: 1.25,
                  fontWeight: active && !mealActive ? 600 : 400,
                  transition: 'font-weight 180ms ease',
                  opacity: 0.85,
                }}
              >
                {word.english || '—'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Türkçe meal */}
      {verse.meal && (
        <>
          <div
            style={{
              width: '55%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #B8860B55, transparent)',
              margin: '0 auto 1.1rem',
            }}
          />
          <p
            dir="ltr"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              color: mealActive ? '#5a3a10' : '#7a5a1f',
              textAlign: 'center',
              lineHeight: 1.85,
              maxWidth: '640px',
              margin: '0 auto',
              padding: '0.4rem 1.2rem',
              borderRadius: '8px',
              background: mealActive ? '#B8860B0d' : 'transparent',
              border: `1px solid ${mealActive ? '#B8860B33' : 'transparent'}`,
              transition: 'all 200ms ease',
              cursor: 'default',
            }}
            onMouseEnter={() => setMealActive(true)}
            onMouseLeave={() => setMealActive(false)}
          >
            {verse.meal}
          </p>
        </>
      )}
    </article>
  );
}
