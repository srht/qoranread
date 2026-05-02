// Her kelimede:
//   arabic      → Arapça kelime (mushaf imlası)
//   turkish     → Türkçe karşılık (kelime kelime)
//   turkishOrder → Türkçe cümledeki sıra numarası (1 = ilk)
//   color       → Renk (Arapça ve Türkçe eşleşmesi için aynı)

const C = [
  '#ff6b6b', // kırmızı
  '#4ecdc4', // deniz mavisi
  '#ffd93d', // sarı
  '#6bcb77', // yeşil
  '#a78bfa', // mor
  '#fb923c', // turuncu
  '#60a5fa', // mavi
  '#f472b6', // pembe
  '#34d399', // zümrüt
  '#fbbf24', // altın
  '#c4b5fd', // lila
  '#86efac', // açık yeşil
];

export const fatiha = {
  number: 1,
  arabicName: 'الْفَاتِحَة',
  turkishName: 'Fâtiha Sûresi',
  verseCount: 7,
  revelation: 'Mekkî',
  verses: [
    {
      number: 1,
      // "Allah'ın Rahman'ın Rahim'in adıyla"
      words: [
        { arabic: 'بِسْمِ',        turkish: 'adıyla',      turkishOrder: 4, color: C[0] },
        { arabic: 'ٱللَّهِ',       turkish: "Allah'ın",    turkishOrder: 1, color: C[1] },
        { arabic: 'ٱلرَّحْمَٰنِ', turkish: "Rahman'ın",   turkishOrder: 2, color: C[2] },
        { arabic: 'ٱلرَّحِيمِ',   turkish: "Rahim'in",    turkishOrder: 3, color: C[3] },
      ],
    },
    {
      number: 2,
      // "Hamd, âlemlerin Rabbi Allah'a"
      words: [
        { arabic: 'ٱلْحَمْدُ',     turkish: 'Hamd',         turkishOrder: 1, color: C[0] },
        { arabic: 'لِلَّهِ',       turkish: "Allah'a",       turkishOrder: 4, color: C[1] },
        { arabic: 'رَبِّ',         turkish: "Rabb'i",        turkishOrder: 3, color: C[2] },
        { arabic: 'ٱلْعَٰلَمِينَ', turkish: 'âlemlerin',    turkishOrder: 2, color: C[3] },
      ],
    },
    {
      number: 3,
      // "Rahman, Rahim"  (aynı sıra)
      words: [
        { arabic: 'ٱلرَّحْمَٰنِ', turkish: 'Rahman', turkishOrder: 1, color: C[0] },
        { arabic: 'ٱلرَّحِيمِ',   turkish: 'Rahim',   turkishOrder: 2, color: C[1] },
      ],
    },
    {
      number: 4,
      // "din gününün sahibi"
      words: [
        { arabic: 'مَٰلِكِ',    turkish: 'sahibi',   turkishOrder: 3, color: C[0] },
        { arabic: 'يَوْمِ',     turkish: 'gününün',  turkishOrder: 2, color: C[1] },
        { arabic: 'ٱلدِّينِ',   turkish: 'din',      turkishOrder: 1, color: C[2] },
      ],
    },
    {
      number: 5,
      // "Yalnız sana ibadet eder, ve yalnız senden yardım dileriz"  (aynı sıra)
      words: [
        { arabic: 'إِيَّاكَ',    turkish: 'Yalnız sana',        turkishOrder: 1, color: C[0] },
        { arabic: 'نَعْبُدُ',    turkish: 'ibadet ederiz',      turkishOrder: 2, color: C[1] },
        { arabic: 'وَإِيَّاكَ',  turkish: 've yalnız senden',   turkishOrder: 3, color: C[2] },
        { arabic: 'نَسْتَعِينُ', turkish: 'yardım isteriz',     turkishOrder: 4, color: C[3] },
      ],
    },
    {
      number: 6,
      // "Bizi doğru yola ilet"
      words: [
        { arabic: 'ٱهْدِنَا',      turkish: 'Bizi ilet',  turkishOrder: 1, color: C[0] },
        { arabic: 'ٱلصِّرَٰطَ',    turkish: 'yola',       turkishOrder: 3, color: C[1] },
        { arabic: 'ٱلْمُسْتَقِيمَ', turkish: 'doğru',      turkishOrder: 2, color: C[2] },
      ],
    },
    {
      number: 7,
      // "nimetlendirdiğin kimselerin yoluna onlara;
      //  gazaba uğrayanların onlara ve sapıtanların değil"
      words: [
        { arabic: 'صِرَٰطَ',        turkish: 'yoluna',               turkishOrder: 3, color: C[0] },
        { arabic: 'ٱلَّذِينَ',      turkish: 'kimselerin',            turkishOrder: 2, color: C[1] },
        { arabic: 'أَنْعَمْتَ',     turkish: 'nimetlendirdiğin',      turkishOrder: 1, color: C[2] },
        { arabic: 'عَلَيْهِمْ',     turkish: 'onlara',                turkishOrder: 4, color: C[3] },
        { arabic: 'غَيْرِ',         turkish: 'değil',                 turkishOrder: 9, color: C[4] },
        { arabic: 'ٱلْمَغْضُوبِ',   turkish: 'gazaba uğrayanların',   turkishOrder: 5, color: C[5] },
        { arabic: 'عَلَيْهِمْ',     turkish: 'onlara',                turkishOrder: 6, color: C[6] },
        { arabic: 'وَلَا',          turkish: 've',                    turkishOrder: 7, color: C[7] },
        { arabic: 'ٱلضَّآلِّينَ',   turkish: 'sapıtanların',          turkishOrder: 8, color: C[8] },
      ],
    },
  ],
};
