export default function SurahHeader({ surah }) {
  return (
    <header className="surah-header">
      <div className="surah-ornament">﷽</div>
      <div className="surah-name-arabic">{surah.arabicName}</div>
      <div className="surah-name-turkish">{surah.turkishName}</div>
      <div className="surah-meta">
        {surah.verseCount} Ayet &bull; {surah.revelation}
      </div>
    </header>
  );
}
