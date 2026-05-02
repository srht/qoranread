function Medallion({ n }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: '52px', height: '52px' }}
    >
      <svg width="52" height="52" viewBox="0 0 56 56" className="absolute inset-0">
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
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#7a5a1f',
          letterSpacing: '0.05em',
        }}
      >
        {n}
      </span>
    </div>
  );
}

export default function VerseMeaning({ verse }) {
  return (
    <article
      className="relative mx-auto"
      style={{ maxWidth: '780px', marginBottom: '3.5rem' }}
    >
      <div className="flex justify-center mb-6">
        <Medallion n={verse.n} />
      </div>

      <div
        dir="rtl"
        className="text-center"
        style={{
          fontFamily: '"Amiri", serif',
          fontSize: '2rem',
          lineHeight: 2.1,
          color: '#3a2817',
          marginBottom: '1.4rem',
          letterSpacing: '0.01em',
        }}
      >
        {verse.ar}
      </div>

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

      <div
        className="text-center"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1.2rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: '#5a4a30',
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        {verse.tr}
      </div>
    </article>
  );
}
