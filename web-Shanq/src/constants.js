/* ============================================================
   ENCHANTED GARDEN — all editable content & shared settings
   Change the personal data here instead of editing components.
   ============================================================ */

export const SECRET_CODE = "191024";

export const PALETTE = {
  night: "#070a1a",
  night2: "#0d1230",
  gold: "#e8c56b",
  firefly: "#ffe08a",
  forest: "#3f6f56",
  forestDeep: "#25493a",
  cream: "#f4ecd8",
  rose: "#d9a5ad",
};

/* ============================================================
   GLOBAL SITE CONTENT
   ============================================================ */

export const SITE = {
  browserTitle: "Happy Birthday",
  recipient: "Wawa",
  sender: "Ihsan",
};

/* ============================================================
   PERFORMANCE / MOTION SETTINGS
   ============================================================ */

export const MOTION = {
  starfield: {
    desktop: 48,
    mobile: 28,
  },
  fireflies: {
    lock: 12,
    gift: 14,
    hero: 14,
    loveLetter: 6,
    footer: 10,
  },
  heroPetals: {
    desktop: 14,
    mobile: 8,
  },
  bouquetParticles: {
    flowers: 5,
    stars: 4,
  },
  giftBurstParticles: 24,
  footerParticles: {
    desktop: 72,
    mobile: 48,
    durationMin: 4.5,
    durationRange: 1.8,
    delayRange: 1.0,
    rotationMin: 260,
    rotationRange: 360,
    sizeMin: 11,
    sizeRange: 11,
  },
};

/* ============================================================
   PHASE 1 — SECURITY LOCK
   ============================================================ */

export const LOCK_CONTENT = {
  title: "For You, My Love",
  description: `Enter the ${SECRET_CODE.length}-digit date that only we would know.`,
  hint: "Hint : Our Special date ❤️",
  error: "Not quite. Try our date again.",
  unlockLabel: "Unlock",
};

/* ============================================================
   PHASE 2 — GIFT
   ============================================================ */

export const GIFT_CONTENT = {
  closed: "Tap to open the magic",
  opening: "The garden is opening for you...",
};

/* ============================================================
   HERO
   ============================================================ */

export const HERO_CONTENT = {
  eyebrow: `FROM ${SITE.sender.toUpperCase()}, WITH ALL MY LOVE`,
  title: "Happy Birthday,",
  name: SITE.recipient,
  description:
    "Walk with me a little further into the garden I grew for you.",
  scrollLabel: "scroll down ↓",
};

/* ============================================================
   DIGITAL BOUQUET
   ============================================================ */

export const BOUQUET_CONTENT = {
  eyebrow: "MY FIRST GIFT",
  title: "A Digital Bouquet",
  subtitle: "Each flower holds a little message just for you",
  emptyMessage:
    "This entire garden is for you — because you deserve all the beauty in the world.",
  instructionDesktop: "Hover a flower to discover its message",
  instructionMobile: "Tap a flower to discover its message",
  continueLabel: "Lanjut →",

 flowers: [
  {
    id: 1,
    name: "Cherry Blossom",
    emoji: "🌸",
    message:
      "Selamat ulang tahun yang ke-18, sayangg. Semoga di usia yang baru ini kamu selalu dikelilingi hal-hal baik dan kebahagiaan.",
  },

  {
    id: 2,
    name: "Hibiscus",
    emoji: "🌺",
    message:
      "Makasihh yaa sayangg karena kamu udaa hadir di hidup aku dan membuat hampir 2 tahun ini menjadi begitu berarti.",
  },

  {
    id: 3,
    name: "Tulip",
    emoji: "🌷",
    message:
      "Aku bersyukur banget bisa memiliki perempuan seperti kamu yang selalu sayangg sama aku dan selalu sabar ngehadapin aku.",
  },

  {
    id: 4,
    name: "Daisy",
    emoji: "🌼",
    message:
      "Makasihh karena kamu selalu mau menerima aku dengan segala kekurangan dan sifat aku yang kadang bikin kamu marah dan kesel.",
  },

  {
    id: 5,
    name: "Rose",
    emoji: "🌹",
    message:
      "Aku masih bersyukur sampai hari ini karena dari sekian banyak orang di dunia, aku bisa mengenal dan mencintai kamu.",
  },

  {
    id: 6,
    name: "Sunflower",
    emoji: "🌻",
    message:
      "Semoga kamu selalu menjadi perempuan hebatt yang terus tumbuh, bersinar, dan membahagiakan orang-orang yang kamu sayangi.",
  },

  {
    id: 7,
    name: "Pink Blossom",
    emoji: "🌸",
    message:
      "Hampir 2 tahun kita bersama, dan aku berharap masih ada banyak cerita, tawa, dan kenangan yang bisa kita lewatin bersama.",
  },

  {
    id: 8,
    name: "Little Bouquet",
    emoji: "💐",
    message:
      "Selamatt ulang tahun yang ke-18 yaa sayangg. I love you more sayanggkuu cintakuu. Semoga kita selalu bersama sampai akhirr. 🤍",
  },
],

  positions: [
    { left: "50%", top: "8%", size: 58 },
    { left: "71%", top: "15%", size: 56 },
    { left: "82%", top: "32%", size: 55 },
    { left: "71%", top: "49%", size: 55 },
    { left: "50%", top: "55%", size: 54 },
    { left: "29%", top: "49%", size: 55 },
    { left: "18%", top: "32%", size: 55 },
    { left: "29%", top: "15%", size: 56 },
  ],
};

/* ============================================================
   MEMORY GALLERY

   Put the real files in /public/images/ using these names.
   ============================================================ */

export const MEMORY_CONTENT = {
  eyebrow: "MOMENTS WE SHARED",
  title: "Our Memory Garden",
};

export const MEMORIES = [
  {
    id: 1,
    image: "/images/memory-1.jpg",
    alt: "A special memory together",
  },
  {
    id: 2,
    image: "/images/memory-2.jpg",
    alt: "A beautiful memory together",
  },
  {
    id: 3,
    image: "/images/memory-3.jpg",
    alt: "A favorite memory together",
  },
];

/* ============================================================
   LOVE LETTER
   ============================================================ */

export const LOVE_LETTER_CONTENT = {
  eyebrow: "A LITTLE SOMETHING TO KEEP",

  title: "A Letter for You",

  greeting: `My dearest ${SITE.recipient},`,

  body: `Happy birthday cayangg, sekarang udaa tambah dewasa ajaa yaa. Aku mengenalmu disaat aku berumur 15 tahun dan kamu 16 tahun, 2 tahun hampir berlalu dan di hari ini usiamu bertambah. Gaa nyangka yaa kita udah ngelawatin banyak hal selama hampir 2 tahun ini, akuu sangatt bersyukur dan beruntung bisa memiliki perempuan sepertii kamu yang selalu sayangg sama aku dan selalu sabar ngehadapin sifat aku yang selalu bikin kamu marah dan kesel, akuu ingin ucapin makasihh banget sama kamu karena kamu udaa mau nerima dan hadir di hidup aku.

Semoga kamuu selalu panjang umur, sehatt selalu dan berbakti kepada kedua orang tua kamu. Jangan pernah ngecewain orang-orang disekitaran kamu yaa sayangg, aku tauu kamu perempuan hebatt. Dan jangann pernah nyerah atau cape sama aku, semogaa kita selalu bersama sampai akhirr yaa sayangg. I love you more sayanggkuu cintakuu 🤍🤍💐💐

Selamatt ulang tahun yang ke-18 yaa sayangg 🤩🥳`,

  signoff: "with all my love,",

  sender: SITE.sender,

  footerNote: "a page made to feel like it was kept, not just displayed.",
};

/* Backwards-compatible export for any component that still imports it. */
export const LOVE_LETTER = `${LOVE_LETTER_CONTENT.greeting}\n\n${LOVE_LETTER_CONTENT.body}\n\nForever yours,\n${LOVE_LETTER_CONTENT.sender} 🌙`;

/* ============================================================
   OUR STORY
   ============================================================ */

export const STORY_CONTENT = {
  eyebrow: "Our Journey",

  title: "Cerita Kita, Hampir 2 Tahun Bersama",

  description:
    "Dari dua orang yang saling mengenal di usia yang masih muda, sampai sekarang kita sudah melewati begitu banyak cerita bersama.",

  items: [
    {
      icon: "✨",
      label: "THE VERY BEGINNING",
      title: "Saat Kita Pertama Kali Bertemu",
      text: "Aku mengenalmu saat aku berumur 15 tahun dan kamu 16 tahun. Waktu itu aku nggak pernah menyangka kalau pertemuan sederhana itu nantinya akan membawa kita sejauh ini.",
    },

    {
      icon: "💬",
      label: "THE FIRST CHAPTER",
      title: "Awal Kita Saling Mengenal",
      text: "Dari obrolan-obrolan kecil, tawa, dan cerita yang kita bagi bersama, perlahan kamu menjadi seseorang yang semakin berarti buat aku.",
    },

    {
      icon: "🌿",
      label: "OUR FIRST MEMORIES",
      title: "Mulai Banyak Cerita Bersama",
      text: "Kita mulai melewati banyak hal bersama. Ada bahagia, ada tawa, ada juga hal-hal yang nggak selalu mudah, tapi semuanya menjadi bagian dari cerita yang aku syukuri.",
    },

    {
      icon: "😄",
      label: "ALMOST TWO YEARS",
      title: "Hampir 2 Tahun Bersama",
      text: "Nggak kerasa yaa, hampir 2 tahun sudah kita lewatin bersama. Banyak sekali hal yang sudah terjadi, dan setiap kenangan itu selalu punya tempat tersendiri di hati aku.",
    },

    {
      icon: "🤍",
      label: "WHAT I'M GRATEFUL FOR",
      title: "Terima Kasih Sudah Bertahan",
      text: "Aku sangat bersyukur dan beruntung bisa memiliki perempuan seperti kamu yang selalu sayangg sama aku, selalu sabar menghadapi sifat aku, dan tetap mau hadir di hidup aku.",
    },

    {
      icon: "🎂",
      label: "TODAY — 18 YEARS OLD",
      title: "Selamat Ulang Tahun yang Ke-18",
      text: "Hari ini usiamu bertambah menjadi 18 tahun. Semoga kamu selalu panjang umur, sehat, menjadi perempuan hebat, dan semoga kita masih bisa menulis banyak cerita bersama sampai akhir.",
    },
  ],
};

/* ============================================================
   PLAYLIST

   Put the real audio files in /public/music/ using these names.
   ============================================================ */

export const PLAYLIST_CONTENT = {
  eyebrow: "SONGS I WOULD SAVE FOR YOU",
  title: "Our Playlist",
  nowPlaying: "Now playing",
  chooseSong: "Choose a song",

  songs: [
    {
      title: "Bergema Sampai Selamanya",
      artist: "Nadhif Basamalah",
      file: "/music/Bergema.mp3",
      art: "💌",
      note: "for us, always and forever",
      startTime: 2,
      endTime: null,
    },

    {
      title: "Lesung Pipi",
      artist: "Raim Laode",
      file: "/music/Lesung.mp3",
      art: "🌙",
      note: "a song that reminds me of you",
      startTime: 115,
      endTime: 226,
    },

    {
      title: "Akad",
      artist: "Payung Teduh",
      file: "/music/Akad.mp3",
      art: "🌷",
      note: "for the love we share",
      startTime: 74,
      endTime: 165,
    },
  ],
};

/* ============================================================
   GRATITUDE JAR
   ============================================================ */

export const GRATITUDE_CONTENT = {
  eyebrow: "A JAR FULL OF LITTLE THANKS",

  title: "The Gratitude Jar",

  button: "Shake the jar",

  prefix: "Aku bersyukur",

  reasons: [
    "karena kamu selalu sayangg sama aku dan tetap sabar ngehadapin sifat aku yang kadang bikin kamu marah dan kesel.",

    "karena kamu mau menerima aku dengan segala kekurangan dan sifat aku.",

    "karena kamu sudah hadir di hidup aku dan membuat hampir 2 tahun ini menjadi begitu berarti.",

    "karena setiap momen sederhana yang kita lewatin bersama selalu punya tempat tersendiri di hati aku.",

    "karena kamu selalu ada dan mau bertahan melewati berbagai hal yang kita hadapi bersama.",

    "karena aku bisa mengenal kamu sejak aku berumur 15 tahun, dan sekarang bisa melihat kamu bertambah dewasa menjadi 18 tahun.",

    "karena kamu adalah perempuan hebat yang selalu berusaha memberikan yang terbaik untuk orang-orang yang kamu sayangi.",

    "karena sampai hari ini aku masih bisa memanggil kamu sayanggkuu, cintakuu, dan menjadi bagian dari hidup kamu.",

    "karena bersamamu aku belajar bahwa cinta bukan cuma tentang bahagia, tapi juga tentang sabar, menerima, dan tetap memilih satu sama lain.",

    "karena kamu adalah salah satu hal paling indah yang pernah hadir di hidup aku.",
  ],
};

/* ============================================================
   FOOTER / BIRTHDAY POPUP
   ============================================================ */

export const FOOTER_CONTENT = {
  eyebrow: "until the next little adventure",
  titleLine1: "May your life always be",
  titleLine2: "filled with flowers.",
  signature: `Happy Birthday, ${SITE.recipient}. With all my love — ${SITE.sender}`,
  popupLabel: "a little notification",
  popupTitle: "Happy Birthday!",
  popupSubtitle: `The most special ${SITE.recipient} 🌸`,
  close: "Close",
  particleEmojis: [
    "🌸",
    "🌷",
    "🌺",
    "🌼",
    "🌹",
    "💮",
    "✨",
    "⭐",
  ],
};
