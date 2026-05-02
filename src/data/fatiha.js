// Veri yapısı:
// ar:  Arapça kelimeler (Arapça okuma sırasında, sağdan sola)
// tr:  Türkçe kelimeler (Türkçe cümle sırasında, soldan sağa)
//      ref → ar dizisindeki karşılık gelen kelime indeksi
//      ref = null → bağlaç/yardımcı kelime (renksiz)

export const surah = {
  name: 'Fâtiha',
  arabicName: 'ٱلْفَاتِحَة',
  meaning: 'Açılış Sûresi',
  verses: [
    {
      n: 1,
      ar: ['بِسْمِ', 'ٱللَّهِ', 'ٱلرَّحْمَٰنِ', 'ٱلرَّحِيمِ'],
      tr: [
        { ref: 2,    text: 'Rahmân' },
        { ref: null, text: 've' },
        { ref: 3,    text: 'Rahîm' },
        { ref: null, text: 'olan' },
        { ref: 1,    text: "Allah'ın" },
        { ref: 0,    text: 'adıyla' },
      ],
    },
    {
      n: 2,
      ar: ['ٱلْحَمْدُ', 'لِلَّهِ', 'رَبِّ', 'ٱلْعَٰلَمِينَ'],
      tr: [
        { ref: 0,    text: 'Hamd' },
        { ref: null, text: ',' },
        { ref: 3,    text: 'âlemlerin' },
        { ref: 2,    text: 'Rabbi' },
        { ref: 1,    text: "Allah'a mahsustur" },
      ],
    },
    {
      n: 3,
      ar: ['ٱلرَّحْمَٰنِ', 'ٱلرَّحِيمِ'],
      tr: [
        { ref: null, text: '(O)' },
        { ref: 0,    text: 'Rahmân' },
        { ref: null, text: 've' },
        { ref: 1,    text: "Rahîm'dir" },
      ],
    },
    {
      n: 4,
      ar: ['مَٰلِكِ', 'يَوْمِ', 'ٱلدِّينِ'],
      tr: [
        { ref: 2, text: 'Din' },
        { ref: 1, text: 'gününün' },
        { ref: 0, text: 'sâhibidir' },
      ],
    },
    {
      n: 5,
      ar: ['إِيَّاكَ', 'نَعْبُدُ', 'وَإِيَّاكَ', 'نَسْتَعِينُ'],
      tr: [
        { ref: 0,    text: 'Yalnız sana' },
        { ref: 1,    text: 'ibadet ederiz' },
        { ref: null, text: ',' },
        { ref: 2,    text: 've yalnız senden' },
        { ref: 3,    text: 'yardım dileriz' },
      ],
    },
    {
      n: 6,
      ar: ['ٱهْدِنَا', 'ٱلصِّرَٰطَ', 'ٱلْمُسْتَقِيمَ'],
      tr: [
        { ref: 2, text: 'Dosdoğru' },
        { ref: 1, text: 'yola' },
        { ref: 0, text: 'bizi ilet' },
      ],
    },
    {
      n: 7,
      ar: [
        'صِرَٰطَ',
        'ٱلَّذِينَ',
        'أَنْعَمْتَ',
        'عَلَيْهِمْ',
        'غَيْرِ',
        'ٱلْمَغْضُوبِ',
        'عَلَيْهِمْ',
        'وَلَا',
        'ٱلضَّآلِّينَ',
      ],
      tr: [
        { ref: 3,    text: 'Kendilerine' },
        { ref: 2,    text: 'nimet verdiğin' },
        { ref: 1,    text: 'kimselerin' },
        { ref: 0,    text: 'yoluna' },
        { ref: null, text: ';' },
        { ref: 5,    text: 'gazaba uğramışların' },
        { ref: 7,    text: 've' },
        { ref: 8,    text: 'sapmışların' },
        { ref: 4,    text: 'yoluna değil' },
      ],
    },
  ],
};
