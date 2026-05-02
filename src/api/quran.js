// alquran.cloud API üzerinden Uthmani Arapça + Diyanet Türkçe meali çeker.
// Cevap localStorage'a cache'lenir; sonraki ziyaretlerde anlık yüklenir.

const BASE = 'https://api.alquran.cloud/v1';
const CACHE_PREFIX = 'qoran:surah:v1:';

export async function fetchSurah(number) {
  const cacheKey = CACHE_PREFIX + number;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {
    // localStorage erişilemiyor olabilir — yoksay
  }

  const url = `${BASE}/surah/${number}/editions/quran-uthmani,tr.diyanet`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);

  const json = await res.json();
  if (json.code !== 200 || !Array.isArray(json.data) || json.data.length < 2) {
    throw new Error('Geçersiz cevap formatı');
  }

  const [arabic, turkish] = json.data;

  const result = {
    number: arabic.number,
    arabicName: arabic.name,
    englishName: arabic.englishName,
    englishMeaning: arabic.englishNameTranslation,
    revelationType: arabic.revelationType === 'Meccan' ? 'Mekkî' : 'Medenî',
    numberOfAyahs: arabic.numberOfAyahs,
    verses: arabic.ayahs.map((a, i) => ({
      n: a.numberInSurah,
      ar: a.text,
      tr: turkish.ayahs[i]?.text ?? '',
    })),
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(result));
  } catch {
    // quota dolu olabilir — sessizce geç
  }

  return result;
}
