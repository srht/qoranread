import React, { useState } from 'react';
import { surah } from '../data/fatiha';
import SurahHeader from './SurahHeader';
import VerseDisplay from './VerseDisplay';
import Ornament from './Ornament';
import BackBar from './BackBar';

export default function FatihaWordView({ onBack }) {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <BackBar onBack={onBack} />
      <SurahHeader surah={surah} />

      <main className="relative z-10">
        {surah.verses.map((verse, vi) => (
          <React.Fragment key={vi}>
            <VerseDisplay
              verse={verse}
              vIdx={vi}
              hovered={hovered}
              setHovered={setHovered}
            />
            {vi < surah.verses.length - 1 && <Ornament />}
          </React.Fragment>
        ))}
      </main>

      <footer
        className="text-center relative z-10"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          color: '#8a7355',
          marginTop: '4rem',
          letterSpacing: '0.05em',
        }}
      >
        <div className="flex justify-center mb-3">
          <svg width="80" height="14" viewBox="0 0 80 14">
            <g stroke="#B8860B" strokeWidth="0.6" fill="none" opacity="0.5">
              <line x1="0" y1="7" x2="30" y2="7" />
              <line x1="50" y1="7" x2="80" y2="7" />
              <circle cx="40" cy="7" r="2" fill="#B8860B" />
            </g>
          </svg>
        </div>
        <p>Bir kelimeye dokunun · aynı renkteki Türkçe karşılığı belirir</p>
      </footer>
    </>
  );
}
