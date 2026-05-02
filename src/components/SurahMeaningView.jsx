import React, { useEffect, useState } from 'react';
import { fetchSurah } from '../api/quran';
import { getSurahMeta } from '../data/surahList';
import VerseMeaning from './VerseMeaning';
import Ornament from './Ornament';
import BackBar from './BackBar';

const BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

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

function Header({ meta, info }) {
  // info: API'den gelen — yedek olarak meta kullan
  const arabicName = info?.arabicName || `سُورَةُ ${meta?.arabicName || ''}`;
  const turkishName = meta?.turkishName || info?.englishName || '';
  const ayahCount = info?.numberOfAyahs || meta?.numberOfAyahs;
  const revelation = info?.revelationType || meta?.revelationType;

  return (
    <header
      className="text-center relative z-10"
      style={{ maxWidth: '780px', margin: '0 auto 3rem' }}
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
        {arabicName}
      </h1>

      <h2
        style={{
          fontFamily: '"Cormorant SC", serif',
          fontSize: '1.3rem',
          color: '#7a5a1f',
          letterSpacing: '0.3em',
          fontWeight: 500,
          marginBottom: '0.4rem',
        }}
      >
        SÛRE-İ {turkishName.toUpperCase()}
      </h2>

      {ayahCount && (
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: '#8a7355',
            letterSpacing: '0.05em',
          }}
        >
          {revelation} · {ayahCount} âyet
        </p>
      )}

      <div className="flex justify-center mt-6">
        <HeaderOrnament />
      </div>
    </header>
  );
}

function Bismillah() {
  return (
    <div
      dir="rtl"
      className="text-center relative z-10"
      style={{
        fontFamily: '"Amiri", serif',
        fontSize: '1.8rem',
        color: '#7a5a1f',
        marginBottom: '3rem',
        letterSpacing: '0.02em',
      }}
    >
      {BISMILLAH}
    </div>
  );
}

function LoadingState() {
  return (
    <div
      className="text-center relative z-10"
      style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontStyle: 'italic',
        color: '#8a7355',
        padding: '3rem 0',
      }}
    >
      <p>Sûre yükleniyor…</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div
      className="text-center relative z-10"
      style={{
        fontFamily: '"Cormorant Garamond", serif',
        color: '#8B2635',
        padding: '3rem 1rem',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
        Sûre yüklenemedi: {message}
      </p>
      <button
        onClick={onRetry}
        style={{
          background: 'transparent',
          border: '1px solid #B8860B66',
          color: '#7a5a1f',
          padding: '0.5rem 1.25rem',
          borderRadius: '6px',
          fontFamily: '"Cormorant SC", serif',
          letterSpacing: '0.1em',
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}
      >
        TEKRAR DENE
      </button>
    </div>
  );
}

// Bazı sûrelerde API'nin 1. ayetinin başına Besmele eklenmiş olabilir.
// Tekrarı önlemek için sadece o ayetin başındaysa kırpıyoruz.
function stripLeadingBismillah(verses, surahNumber) {
  if (surahNumber === 1 || surahNumber === 9) return verses;
  if (!verses?.length) return verses;
  const first = verses[0];
  // Besmele yaklaşık 39 karakter; harekeler değişebilir, içerik kontrolü yapıyoruz
  if (
    first.ar &&
    first.ar.length > 50 &&
    /^بِسْمِ\s*ٱ?للَّهِ/.test(first.ar)
  ) {
    const stripped = first.ar.replace(/^بِسْمِ\s*ٱ?للَّهِ\s*ٱ?لرَّحْمَ?ٰنِ\s*ٱ?لرَّحِيمِ\s*/, '');
    return [{ ...first, ar: stripped.trim() }, ...verses.slice(1)];
  }
  return verses;
}

export default function SurahMeaningView({ number, onBack }) {
  const meta = getSurahMeta(number);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    fetchSurah(number)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || 'Bilinmeyen hata');
      });
    return () => {
      cancelled = true;
    };
  }, [number, retryKey]);

  const showBismillah = number !== 1 && number !== 9;
  const verses = data ? stripLeadingBismillah(data.verses, number) : [];

  return (
    <>
      <BackBar onBack={onBack} />
      <Header meta={meta} info={data} />

      {showBismillah && <Bismillah />}

      <main className="relative z-10">
        {!data && !error && <LoadingState />}
        {error && (
          <ErrorState
            message={error}
            onRetry={() => setRetryKey((k) => k + 1)}
          />
        )}
        {verses.map((verse, vi) => (
          <React.Fragment key={vi}>
            <VerseMeaning verse={verse} />
            {vi < verses.length - 1 && <Ornament />}
          </React.Fragment>
        ))}
      </main>
    </>
  );
}
