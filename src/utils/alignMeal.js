// Türkçe meali Arapça kelime indekslerine eşler.
// Türkçe cümlenin orijinal sırası bozulmadan, her token bir Arapça kelimeye atanır.
// Pozisyona dayalı hizalama: ar_idx ≈ token_idx * (ar_count / token_count).
// Bilinen Kuran sözcükleri için (Allah, Rab, Rahman vs.) sözcük tabanlı eşleme önceliklidir.

const LEXICON = {
  'allah': ['allah', 'allaah'],
  'rab': ['lord'],
  'rabbim': ['my lord'],
  'rabbi': ['lord'],
  'rabbin': ['your lord'],
  'rabbinin': ['your lord', 'of your lord'],
  'rahman': ['most gracious', 'rahman', 'merciful'],
  'rahim': ['most merciful', 'raheem', 'merciful'],
  'gün': ['day'],
  'günü': ['day'],
  'günün': ['day'],
  'din': ['religion', 'recompense', 'judgment'],
  'dininin': ['religion'],
  'biz': ['we'],
  'bize': ['us'],
  'bizi': ['us'],
  'sen': ['you'],
  'sana': ['you'],
  'seni': ['you'],
  'siz': ['you'],
  'sizi': ['you'],
  'size': ['you'],
  'onlar': ['they', 'them'],
  'onları': ['them'],
  'onlara': ['them', 'to them'],
  'kitap': ['book'],
  'kitabı': ['book'],
  'kitabın': ['book'],
  'iman': ['believe', 'faith', 'belief'],
  'inanan': ['believe'],
  'inanırlar': ['believe'],
  'inanan': ['believer'],
  'müminler': ['believers'],
  'kafirler': ['disbelievers'],
  'inkar': ['disbelieve'],
  'salat': ['prayer'],
  'namaz': ['prayer'],
  'namazı': ['prayer'],
  'zekat': ['zakah', 'zakat', 'charity'],
  'gayb': ['unseen'],
  'gaybe': ['unseen'],
  'görmedikleri': ['unseen'],
  'rızık': ['provision'],
  'rızk': ['provision'],
  'kıldık': ['given', 'made'],
  'verdik': ['given', 'provided'],
  'gönderdik': ['sent'],
  'cennet': ['paradise', 'garden'],
  'cehennem': ['hell', 'fire'],
  'ateş': ['fire'],
  'göz': ['eye'],
  'kalp': ['heart'],
  'kulak': ['ear'],
  'el': ['hand'],
  'ayak': ['foot'],
  'su': ['water'],
  'gök': ['heaven', 'sky'],
  'gökleri': ['heavens'],
  'göklerde': ['heavens'],
  'yer': ['earth'],
  'yerde': ['earth'],
  'yeri': ['earth'],
  'gece': ['night'],
  'gündüz': ['day'],
  'güneş': ['sun'],
  'ay': ['moon'],
  'yıldız': ['star'],
  'ölü': ['dead'],
  'diri': ['living', 'alive'],
  'hayat': ['life'],
  'ölüm': ['death'],
  'doğru': ['straight', 'right'],
  'eğri': ['crooked'],
  'yol': ['path', 'way'],
  'yolu': ['path', 'way'],
  'yoluna': ['path', 'way'],
  'lutfettiğin': ['favored', 'bestowed'],
  'gazaba': ['anger', 'wrath'],
  'sapkın': ['astray'],
  'sapan': ['astray'],
  'sapmış': ['astray'],
  'sapanların': ['astray'],
  'âlemler': ['worlds'],
  'âlemlerin': ['worlds'],
  'alemlerin': ['worlds'],
  'hamd': ['praise', 'thanks'],
  'şükür': ['thanks'],
  'medhüsenâ': ['praise'],
  'yalnız': ['only', 'alone'],
  'sadece': ['only'],
  'ancak': ['only'],
  'kulluk': ['worship'],
  'ibadet': ['worship'],
  'taparız': ['worship'],
  'ederiz': ['worship', 'do'],
  'yardım': ['help'],
  'isteriz': ['seek'],
  'hidayet': ['guidance', 'guide'],
  'bizi': ['us'],
  'doğru': ['right', 'straight'],
  'sırat': ['path'],
  'sıratı': ['path'],
  'yolu': ['path', 'way'],
  'müstakim': ['straight'],
  'amin': ['amen'],
};

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[.,;:!?'"„""''«»()\[\]{}…\-—–]/g, '')
    .replace(/[âàá]/g, 'a')
    .replace(/[éèê]/g, 'e')
    .replace(/[ıîi̇]/g, 'i')
    .replace(/[öô]/g, 'o')
    .replace(/[üû]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ş]/g, 's')
    .replace(/[ğ]/g, 'g')
    .trim();
}

function lexiconMatch(turkishToken, englishWord) {
  if (!turkishToken || !englishWord) return false;
  const tk = normalize(turkishToken);
  const en = normalize(englishWord);
  if (!tk || !en) return false;
  if (tk === en) return true;
  const candidates = LEXICON[tk];
  if (!candidates) return false;
  return candidates.some((c) => en.includes(normalize(c)));
}

// Tokens is the Turkish meal split on whitespace, words is array of {arabic, english}.
// Strategy:
//   1. Build positional baseline (her tokenin "doğal" arabic indeksi).
//   2. Lexicon eşleşmesi varsa o pencerede en yakın komşuyu seç.
//   3. Sonuçları monoton olmaya zorlamak için soldan sağa düzelt
//      (Türkçe cümle akışı bozulmasın diye atanan ar_idx çok geri sıçramasın).
export function alignMeal(meal, words) {
  if (!meal || !words || words.length === 0) return [];
  const tokens = meal.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const wordCount = words.length;
  const result = tokens.map((token, i) => {
    const baseIdx = Math.min(
      wordCount - 1,
      Math.floor((i / tokens.length) * wordCount),
    );

    // Lexicon ile yakın pencerede arama (±25%)
    const window = Math.max(2, Math.round(wordCount * 0.25));
    const lo = Math.max(0, baseIdx - window);
    const hi = Math.min(wordCount - 1, baseIdx + window);
    let bestIdx = baseIdx;
    let bestDist = Infinity;
    for (let j = lo; j <= hi; j++) {
      if (lexiconMatch(token, words[j].english)) {
        const d = Math.abs(j - baseIdx);
        if (d < bestDist) { bestDist = d; bestIdx = j; }
      }
    }
    return { token, arabicIdx: bestIdx };
  });

  // Hafif monotonluk: çok büyük geri sıçramaları yumuşat
  for (let i = 1; i < result.length; i++) {
    if (result[i].arabicIdx + 2 < result[i - 1].arabicIdx) {
      result[i].arabicIdx = Math.max(result[i].arabicIdx, result[i - 1].arabicIdx - 1);
    }
  }

  return result;
}
