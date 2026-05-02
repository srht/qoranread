// Mücevher tonları — parşömen üzerinde okunaklı
const PALETTE = [
  '#8B2635', // burgundy
  '#1B4965', // safir
  '#2D6A4F', // zümrüt
  '#9C6644', // bakır
  '#6B2D5C', // erik
  '#1A535C', // turkuaz
  '#BC4B51', // pas
  '#344E41', // orman
  '#3D348B', // indigo
  '#A04668', // gül
];

// Ayette aynı kelime tekrar geçiyorsa ilk geçişin rengi kullanılır
function colorFor(arWords, idx) {
  const first = arWords.indexOf(arWords[idx]);
  return PALETTE[first % PALETTE.length];
}

export default function VerseDisplay({ verse, vIdx, hovered, setHovered }) {
  // Aynı Arapça metindeki tüm tekrarlar birlikte aktif sayılır
  const isArActive = (wi) => {
    if (!hovered || hovered.vIdx !== vIdx) return false;
    return verse.ar[hovered.wIdx] === verse.ar[wi];
  };

  const isTrActive = (ref) => {
    if (ref === null || !hovered || hovered.vIdx !== vIdx) return false;
    return verse.ar[hovered.wIdx] === verse.ar[ref];
  };

  const anyHoveredHere = hovered && hovered.vIdx === vIdx;

  return (
    <article
      className="relative mx-auto"
      style={{ maxWidth: '780px', marginBottom: '5rem' }}
    >
      {/* Ayet numarası madalyonu */}
      <div className="flex justify-center mb-6">
        <div
          className="relative flex items-center justify-center"
          style={{ width: '56px', height: '56px' }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" className="absolute inset-0">
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
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#7a5a1f',
              letterSpacing: '0.05em',
            }}
          >
            {verse.n}
          </span>
        </div>
      </div>

      {/* Arapça satır — sağdan sola */}
      <div
        dir="rtl"
        className="text-center"
        style={{
          fontFamily: '"Amiri", serif',
          fontSize: '2.6rem',
          lineHeight: 1.9,
          marginBottom: '1.4rem',
          letterSpacing: '0.01em',
        }}
      >
        {verse.ar.map((word, wi) => {
          const color = colorFor(verse.ar, wi);
          const active = isArActive(wi);
          return (
            <span
              key={wi}
              className="inline-block cursor-pointer"
              style={{
                color,
                margin: '0 0.35rem',
                padding: '0 0.15rem',
                transition: 'all 220ms ease',
                textShadow: active ? `0 0 24px ${color}66` : 'none',
                transform: active ? 'translateY(-3px)' : 'translateY(0)',
                opacity: anyHoveredHere && !active ? 0.35 : 1,
              }}
              onMouseEnter={() => setHovered({ vIdx, wIdx: wi })}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered({ vIdx, wIdx: wi })}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* İnce ayraç çizgisi */}
      <div
        className="mx-auto"
        style={{
          width: '70%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, #B8860B55 50%, transparent 100%)',
          marginBottom: '1.2rem',
        }}
      />

      {/* Türkçe satır — soldan sağa, Türkçe anlam sırasında */}
      <div
        className="text-center"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1.35rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          letterSpacing: '0.005em',
        }}
      >
        {verse.tr.map((tw, ti) => {
          const color = tw.ref !== null ? colorFor(verse.ar, tw.ref) : '#8a7355';
          const active = isTrActive(tw.ref);
          return (
            <span
              key={ti}
              className="inline-block"
              style={{
                color,
                margin: '0 0.2rem',
                fontWeight: active ? 600 : 400,
                opacity: tw.ref === null ? 0.55 : anyHoveredHere && !active ? 0.35 : 1,
                transition: 'all 220ms ease',
                textShadow: active ? `0 0 18px ${color}55` : 'none',
                cursor: tw.ref !== null ? 'pointer' : 'default',
              }}
              onMouseEnter={() => tw.ref !== null && setHovered({ vIdx, wIdx: tw.ref })}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => tw.ref !== null && setHovered({ vIdx, wIdx: tw.ref })}
            >
              {tw.text}
            </span>
          );
        })}
      </div>
    </article>
  );
}
