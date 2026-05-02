import { fatiha } from './data/fatiha';
import SurahHeader from './components/SurahHeader';
import VerseDisplay from './components/VerseDisplay';

export default function App() {
  return (
    <div className="app">
      <SurahHeader surah={fatiha} />

      <div className="verses">
        {fatiha.verses.map((verse) => (
          <VerseDisplay key={verse.number} verse={verse} />
        ))}
      </div>

      <footer className="legend">
        <p>
          <strong>Renk kodu:</strong> Her Arapça kelime ile Türkçe karşılığı
          aynı renktedir. Türkçe kelimeler Türkçe cümle sırasında dizilmiştir.
          Bir kelimenin üzerine gelin — karşılıklı eşleşme vurgulanır.
        </p>
      </footer>
    </div>
  );
}
