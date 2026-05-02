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

export default function SurahHeader({ surah }) {
  return (
    <header
      className="text-center relative z-10"
      style={{ maxWidth: '780px', margin: '0 auto 4rem' }}
    >
      <div className="flex justify-center mb-6">
        <HeaderOrnament />
      </div>

      <h1
        dir="rtl"
        style={{
          fontFamily: '"Amiri", serif',
          fontSize: '3.4rem',
          color: '#3a2817',
          fontWeight: 700,
          marginBottom: '0.6rem',
          letterSpacing: '0.02em',
        }}
      >
        {surah.arabicName}
      </h1>

      <h2
        style={{
          fontFamily: '"Cormorant SC", serif',
          fontSize: '1.4rem',
          color: '#7a5a1f',
          letterSpacing: '0.3em',
          fontWeight: 500,
          marginBottom: '0.4rem',
        }}
      >
        SÛRE-İ {surah.name.toUpperCase()}
      </h2>

      <p
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1.05rem',
          fontStyle: 'italic',
          color: '#8a7355',
          letterSpacing: '0.05em',
        }}
      >
        {surah.meaning} · 7 âyet
      </p>

      <div className="flex justify-center mt-6">
        <HeaderOrnament />
      </div>
    </header>
  );
}
