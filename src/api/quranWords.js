// quran.com v4 API — kelime kelime veri (İngilizce word translation, hizalama yardımcısı)
// char_type_name === 'word' olan tokenler tutulur, ayet sonu işaretleri filtrelenir.
// Tek sayfa çeker (varsayılan 50 ayet). Sayfalama çağıran tarafta yapılır.

const BASE = 'https://api.quran.com/api/v4';
const CACHE_PREFIX = 'qoran:words-page:v1:';

export async function fetchSurahWordsPage(number, page = 1, perPage = 50) {
  const cacheKey = `${CACHE_PREFIX}${number}:${page}:${perPage}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {
    // localStorage erişilemiyor — yoksay
  }

  const params = new URLSearchParams({
    words: 'true',
    word_fields: 'text_uthmani',
    word_translation_language: 'en',
    per_page: perPage,
    page,
  });
  const res = await fetch(`${BASE}/verses/by_chapter/${number}?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  const verses = (json.verses ?? []).map((v) => ({
    n: v.verse_number,
    words: (v.words ?? [])
      .filter((w) => w.char_type_name === 'word')
      .map((w) => ({
        arabic: w.text_uthmani ?? '',
        english: w.translation?.text ?? '',
      })),
  }));

  const result = {
    verses,
    page,
    perPage,
    hasMore: !!json.pagination?.next_page,
    total: json.pagination?.total_records ?? verses.length,
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(result));
  } catch {
    // quota dolu — sessizce geç
  }

  return result;
}
