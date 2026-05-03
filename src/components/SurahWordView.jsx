import React, { useEffect, useState } from 'react';
import { fetchSurahWordsPage } from '../api/quranWords';
import { fetchSurah } from '../api/quran';
import { getSurahMeta } from '../data/surahList';
import VerseWordByWord from './VerseWordByWord';
import Ornament from './Ornament';
import BackBar from './BackBar';

const BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
const PAGE_SIZE = 50;

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

function SurahHeader({ meta }) {
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
        {meta.arabicName}
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
        SÛRE-İ {meta.turkishName.toUpperCase()}
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
        {meta.revelationType} · {meta.numberOfAyahs} âyet
      </p>
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
        fontSize: '1.9rem',
        color: '#7a5a1f',
        marginBottom: '3rem',
        letterSpacing: '0.02em',
      }}
    >
      {BISMILLAH}
    </div>
  );
}

function Loading({ text = 'Sûre yükleniyor…' }) {
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
      <p>{text}</p>
    </div>
  );
}

function ErrorMsg({ message, onRetry }) {
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
      <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
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

function LoadMoreButton({ onClick, loading, loadedCount, totalCount }) {
  return (
    <div
      className="text-center relative z-10"
      style={{ padding: '2.5rem 0 1rem' }}
    >
      <p
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          color: '#8a7355',
          fontSize: '0.9rem',
          marginBottom: '1rem',
        }}
      >
        {loadedCount} / {totalCount} âyet gösteriliyor
      </p>
      <button
        onClick={onClick}
        disabled={loading}
        style={{
          background: loading ? '#F5EBD3' : 'transparent',
          border: '1px solid #B8860B88',
          color: '#7a5a1f',
          padding: '0.7rem 1.75rem',
          borderRadius: '6px',
          fontFamily: '"Cormorant SC", serif',
          letterSpacing: '0.18em',
          fontSize: '0.9rem',
          cursor: loading ? 'wait' : 'pointer',
          transition: 'all 200ms ease',
        }}
      >
        {loading ? 'YÜKLENİYOR…' : 'DAHA FAZLA ÂYET'}
      </button>
    </div>
  );
}

export default function SurahWordView({ number, onBack }) {
  const meta = getSurahMeta(number);
  const [verses, setVerses] = useState([]);
  const [meal, setMeal] = useState(null);
  const [loadedPage, setLoadedPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(meta?.numberOfAyahs ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  // İlk yükleme: 1. sayfa kelimeler + tam meal paralel
  useEffect(() => {
    let cancelled = false;
    setVerses([]);
    setMeal(null);
    setLoadedPage(0);
    setHasMore(true);
    setError(null);
    setLoading(true);

    Promise.all([fetchSurahWordsPage(number, 1, PAGE_SIZE), fetchSurah(number)])
      .then(([page, mealData]) => {
        if (cancelled) return;
        setVerses(page.verses);
        setMeal(mealData);
        setLoadedPage(1);
        setHasMore(page.hasMore);
        setTotal(page.total || mealData.numberOfAyahs || page.verses.length);
      })
      .catch((e) => { if (!cancelled) setError(e.message || 'Bağlantı hatası'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [number, retryKey]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const next = loadedPage + 1;
      const page = await fetchSurahWordsPage(number, next, PAGE_SIZE);
      setVerses((prev) => [...prev, ...page.verses]);
      setLoadedPage(next);
      setHasMore(page.hasMore);
    } catch (e) {
      setError(e.message || 'Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  const showBismillah = number !== 1 && number !== 9;
  const isInitial = verses.length === 0 && !error;

  return (
    <>
      <BackBar onBack={onBack} />
      {meta && <SurahHeader meta={meta} />}
      {showBismillah && <Bismillah />}

      <main className="relative z-10">
        {isInitial && loading && <Loading />}
        {error && verses.length === 0 && (
          <ErrorMsg
            message={error}
            onRetry={() => setRetryKey((k) => k + 1)}
          />
        )}

        {verses.map((verse, vi) => {
          const mealText = meal?.verses[verse.n - 1]?.tr || '';
          return (
            <React.Fragment key={`${verse.n}-${vi}`}>
              <VerseWordByWord
                verse={{ ...verse, meal: mealText }}
              />
              {vi < verses.length - 1 && <Ornament />}
            </React.Fragment>
          );
        })}

        {verses.length > 0 && hasMore && (
          <LoadMoreButton
            onClick={loadMore}
            loading={loading}
            loadedCount={verses.length}
            totalCount={total}
          />
        )}

        {verses.length > 0 && !hasMore && (
          <div
            className="text-center relative z-10"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              color: '#8a7355',
              padding: '2.5rem 0 1rem',
              fontSize: '0.95rem',
            }}
          >
            ﴾ Sûre tamamlandı ﴿
          </div>
        )}

        {verses.length > 0 && error && (
          <div
            className="text-center relative z-10"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              color: '#8B2635',
              padding: '1.5rem 0',
              fontStyle: 'italic',
              fontSize: '0.9rem',
            }}
          >
            Sayfa yüklenemedi: {error}
          </div>
        )}
      </main>
    </>
  );
}
