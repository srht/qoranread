import { useState } from 'react';

export default function VerseDisplay({ verse }) {
  const [activeIdx, setActiveIdx] = useState(null);

  // Türkçe kelimeleri Türkçe kelime sırasına göre sırala,
  // ama orijinal indeksi sakla (renk eşleşmesi için)
  const turkishSorted = verse.words
    .map((word, idx) => ({ ...word, originalIdx: idx }))
    .sort((a, b) => a.turkishOrder - b.turkishOrder);

  const handleEnter = (idx) => setActiveIdx(idx);
  const handleLeave = () => setActiveIdx(null);

  return (
    <div className="verse">
      <div className="verse-num">
        <span>{verse.number}</span>
      </div>

      <div className="verse-body">
        {/* Arapça satır — sağdan sola */}
        <div className="arabic-line" dir="rtl">
          {verse.words.map((word, idx) => (
            <span
              key={idx}
              className="arabic-word"
              style={{
                color: word.color,
                opacity: activeIdx !== null && activeIdx !== idx ? 0.2 : 1,
                textShadow:
                  activeIdx === idx ? `0 0 24px ${word.color}99` : 'none',
              }}
              onMouseEnter={() => handleEnter(idx)}
              onMouseLeave={handleLeave}
            >
              {word.arabic}
            </span>
          ))}
        </div>

        {/* Türkçe satır — soldan sağa, Türkçe kelime sırası */}
        <div className="turkish-line">
          {turkishSorted.map((word, i) => (
            <span
              key={i}
              className="turkish-word"
              style={{
                color: word.color,
                opacity:
                  activeIdx !== null && activeIdx !== word.originalIdx
                    ? 0.2
                    : 1,
                background:
                  activeIdx === word.originalIdx
                    ? `${word.color}22`
                    : 'rgba(255,255,255,0.04)',
                borderColor:
                  activeIdx === word.originalIdx
                    ? `${word.color}55`
                    : 'transparent',
              }}
              onMouseEnter={() => handleEnter(word.originalIdx)}
              onMouseLeave={handleLeave}
            >
              {word.turkish}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
