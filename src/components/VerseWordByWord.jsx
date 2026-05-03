import { useMemo, useState } from 'react';
import { alignMeal } from '../utils/alignMeal';

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
  const aligned = useMemo(
    () => alignMeal(verse.meal, verse.words),
    [verse.meal, verse.words],
  );

  return (
    <article
      className="relative mx-auto"
      style={{ maxWidth: '780px', marginBottom: '3.5rem' }}
    >
      <div className="flex justify-center mb-6">
        <Medallion n={verse.n} />
      </div>

      {/* Arapça kelimeler — her biri renkli, hover'da diğerleri soluklaşır */}
      <div
        dir="rtl"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.35rem 0.45rem',
          padding: '0 0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {verse.words.map((word, i) => {
          const color = colorFor(i);
          const active = hoveredIdx === i;
          const dimmed = hoveredIdx !== null && !active;
          return (
            <span
              key={i}
              style={{
                fontFamily: '"Amiri", serif',
                fontSize: '1.95rem',
                lineHeight: 1.6,
                color,
                padding: '0.15rem 0.4rem',
                borderRadius: '6px',
                background: active ? `${color}1a` : 'transparent',
                opacity: dimmed ? 0.3 : 1,
                textShadow: active ? `0 0 22px ${color}55` : 'none',
                transition: 'all 180ms ease',
                cursor: 'default',
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onTouchStart={() => setHoveredIdx(i)}
            >
              {word.arabic}
            </span>
          );
        })}
      </div>

      {/* Altın hairline ayraç */}
      {verse.meal && (
        <div
          style={{
            width: '60%',
            height: '1px',
            background:
              'linear-gradient(to right, transparent, #B8860B55, transparent)',
            margin: '0.5rem auto 1rem',
          }}
        />
      )}

      {/* Türkçe meal — cümle sırası korunarak, her token Arapça karşılığının renginde */}
      {verse.meal && (
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.05rem',
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: 1.85,
            maxWidth: '640px',
            margin: '0 auto',
            padding: '0 1rem',
            direction: 'ltr',
          }}
        >
          {aligned.map((seg, i) => {
            const color = colorFor(seg.arabicIdx);
            const active = hoveredIdx === seg.arabicIdx;
            const dimmed = hoveredIdx !== null && !active;
            return (
              <span
                key={i}
                style={{
                  color,
                  opacity: dimmed ? 0.3 : 1,
                  fontWeight: active ? 600 : 400,
                  background: active ? `${color}14` : 'transparent',
                  borderRadius: '4px',
                  padding: '0 0.12em',
                  marginRight: '0.18em',
                  transition: 'all 180ms ease',
                  cursor: 'default',
                }}
                onMouseEnter={() => setHoveredIdx(seg.arabicIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onTouchStart={() => setHoveredIdx(seg.arabicIdx)}
              >
                {seg.token}
              </span>
            );
          })}
        </p>
      )}
    </article>
  );
}
