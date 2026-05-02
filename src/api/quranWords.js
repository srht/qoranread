// quran.com v4 API — kelime kelime veri (Türkçe word translation)
// char_type_name === 'end' olan ayet numarası karakterleri filtrelenir.
// Sayfalama otomatik yapılır; sonuç localStorage'a cache'lenir.

const BASE = 'https://api.quran.com/api/v4';
const CACHE_PREFIX = 'qoran:words:v2:';

export async function fetchSurahWords(number) {
  const cacheKey = CACHE_PREFIX + number;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {
    // localStorage erişilemiyor — yoksay
  }

  let allVerses = [];
  let page = 1;
  const perPage = 50;

  while (true) {
    const params = new URLSearchParams({
      words: 'true',
      word_fields: 'text_uthmani',
      word_translation_language: 'tr',
      per_page: perPage,
      page,
    });
    const res = await fetch(`${BASE}/verses/by_chapter/${number}?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    const verses = json.verses ?? [];
    allVerses = allVerses.concat(verses);

    if (verses.length < perPage || !json.pagination?.next_page) break;
    page++;
  }

  const result = {
    number,
    verses: allVerses.map((v) => ({
      n: v.verse_number,
      words: (v.words ?? [])
        .filter((w) => w.char_type_name === 'word')
        .map((w) => ({
          arabic: w.text_uthmani ?? '',
          turkish: w.translation?.text ?? '',
        })),
    })),
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(result));
  } catch {
    // quota dolu — sessizce geç
  }

  return result;
}
