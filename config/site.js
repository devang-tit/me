/* =====================================================================
   WEDDING SITE CONFIG — EDIT EVERYTHING HERE
   ---------------------------------------------------------------------
   All names, dates, text, photos and links live in this one file.
   Every piece of visible text has an English (en) and Gujarati (gu)
   version; the language toggle in the navbar switches between them.
   ===================================================================== */

export const SITE = {
  /* ---- 1. BASICS --------------------------------------------------- */

  // The final address of the deployed site (needed for WhatsApp link previews).
  siteUrl: 'https://your-wedding-site.vercel.app',

  couple: {
    groom: { en: 'Groom Name', gu: 'વરનું નામ' },
    bride: { en: 'Bride Name', gu: 'કન્યાનું નામ' },
  },

  hashtag: '#GroomBrideWedding',

  // The countdown runs to this moment (+05:30 = India time).
  countdownTo: '2027-01-28T09:00:00+05:30',

  datesText: { en: '28 & 29 January 2027', gu: '૨૮ અને ૨૯ જાન્યુઆરી ૨૦૨૭' },

  /* ---- 2. CONTACT -------------------------------------------------- */

  contact: {
    phoneDisplay: '+91 00000 00000',
    // WhatsApp number: country code + number, digits only (no +, no spaces).
    whatsapp: '910000000000',
  },

  // Optional: paste a Google Apps Script "web app" URL here and every
  // blessing is ALSO saved to your Google Sheet. Leave '' to use WhatsApp only.
  googleSheetsUrl: '',

  /* ---- 3. PHOTOS & MUSIC ------------------------------------------- */
  // Put your files in /public/images (and /public/music) using these names,
  // or change the paths here. A missing photo shows a labelled placeholder.

  images: {
    hero: '/images/hero.jpg',
    gallery: [
      '/images/gallery-1.jpg',
      '/images/gallery-2.jpg',
      '/images/gallery-3.jpg',
      '/images/gallery-4.jpg',
      '/images/gallery-5.jpg',
      '/images/gallery-6.jpg',
      '/images/gallery-7.jpg',
      '/images/gallery-8.jpg',
    ],
    // Preview picture shown when the link is shared (1200 x 630).
    og: '/og-image.png',
  },

  // Background music (muted until the guest taps the music button).
  music: '/music/wedding.mp3',

  /* ---- 4. EVENTS --------------------------------------------------- */
  // `start` / `end` feed the "Add to Calendar" buttons.

  events: [
    {
      icon: 'mandap',
      day: { en: 'Day One', gu: 'પ્રથમ દિવસ' },
      name: { en: 'Mandap Muhurat, Haldi & Sangeet', gu: 'મંડપ મુહૂર્ત, હલ્દી અને સંગીત' },
      date: { en: 'Thursday, 28 January 2027', gu: 'ગુરુવાર, ૨૮ જાન્યુઆરી ૨૦૨૭' },
      time: { en: 'Time to be announced', gu: 'સમય ટૂંક સમયમાં જણાવીશું' },
      start: '2027-01-28T09:00:00+05:30',
      end: '2027-01-28T22:00:00+05:30',
    },
    {
      icon: 'rings',
      day: { en: 'Day Two', gu: 'બીજો દિવસ' },
      name: { en: 'Wedding Ceremony & Reception', gu: 'લગ્નવિધિ અને રિસેપ્શન' },
      date: { en: 'Friday, 29 January 2027', gu: 'શુક્રવાર, ૨૯ જાન્યુઆરી ૨૦૨૭' },
      time: { en: 'Time to be announced', gu: 'સમય ટૂંક સમયમાં જણાવીશું' },
      start: '2027-01-29T09:00:00+05:30',
      end: '2027-01-29T22:00:00+05:30',
    },
  ],

  /* ---- 5. VENUE ---------------------------------------------------- */

  venue: {
    name: { en: 'Venue Name (to be updated)', gu: 'સ્થળનું નામ (અપડેટ થશે)' },
    address: {
      en: 'Jantralkampa, Bayad, Gujarat, India',
      gu: 'જંત્રાલકંપા, બાયડ, ગુજરાત, ભારત',
    },
    // What Google Maps searches for (map embed + "Get Directions").
    mapQuery: 'Jantralkampa, Bayad, Gujarat, India',
    travel: [
      {
        icon: 'train',
        title: { en: 'By Train', gu: 'ટ્રેન દ્વારા' },
        text: {
          en: 'Nearest railway station: [station name] — [distance] from the venue.',
          gu: 'નજીકનું રેલવે સ્ટેશન: [સ્ટેશનનું નામ] — સ્થળથી [અંતર].',
        },
      },
      {
        icon: 'plane',
        title: { en: 'By Air', gu: 'વિમાન દ્વારા' },
        text: {
          en: 'Nearest airport: [airport name] — [distance] from the venue.',
          gu: 'નજીકનું એરપોર્ટ: [એરપોર્ટનું નામ] — સ્થળથી [અંતર].',
        },
      },
      {
        icon: 'bed',
        title: { en: 'Stay', gu: 'રોકાણ' },
        text: {
          en: 'Accommodation details: [hotel / guest house names]. Call us and we will help you arrange your stay.',
          gu: 'રોકાણની વિગતો: [હોટલ / ગેસ્ટ હાઉસના નામ]. અમને ફોન કરો, અમે વ્યવસ્થામાં મદદ કરીશું.',
        },
      },
    ],
  },

  /* ---- 6. OUR STORY ------------------------------------------------ */
  // Each milestone: icon, optional date, title, text and a photo.

  story: [
    {
      icon: 'doc',
      image: '/images/story-1.jpg',
      title: { en: 'The Biodata', gu: 'બાયોડેટા' },
      text: {
        en: 'Our families shared our biodata. I saw hers a week earlier, and she saw mine two days before we met. We both liked what we read.',
        gu: 'અમારા પરિવારોએ બાયોડેટાની આપ-લે કરી. મેં તેનો બાયોડેટા એક અઠવાડિયા પહેલાં જોયો હતો, અને તેણે મારો બાયોડેટા અમારી મુલાકાતના બે દિવસ પહેલાં જોયો. અમને બંનેને ગમ્યું.',
      },
    },
    {
      icon: 'meet',
      image: '/images/story-2.jpg',
      date: { en: '12 July 2026', gu: '૧૨ જુલાઈ ૨૦૨૬' },
      title: { en: 'The First Meeting', gu: 'પહેલી મુલાકાત' },
      text: {
        en: 'We met face to face at my sister’s home in Santipurakampa and talked with a few questions. I was so happy to see her. Afterwards we each went home. My answer was yes, and then hers was yes too.',
        gu: 'શાંતિપુરાકંપામાં મારી બહેનના ઘરે અમે રૂબરૂ મળ્યાં અને થોડા સવાલો સાથે વાતો કરી. તેને જોઈને હું ખૂબ ખુશ થયો. પછી અમે પોતપોતાના ઘરે ગયાં. મારો જવાબ હા હતો, અને પછી તેનો જવાબ પણ હા આવ્યો.',
      },
    },
    {
      icon: 'home',
      image: '/images/story-3.jpg',
      date: { en: '15 July 2026', gu: '૧૫ જુલાઈ ૨૦૨૬' },
      title: { en: 'Two Families Meet', gu: 'બે પરિવારોનું મિલન' },
      text: {
        en: 'Her family came to my home three days later. The families shook hands, and she was welcomed with swagat and aarti. It was a big, happy day. We talked and laughed in a separate room, exchanged phone numbers and followed each other on Instagram.',
        gu: 'ત્રણ દિવસ પછી તેનો પરિવાર મારા ઘરે આવ્યો. બંને પરિવારોએ હાથ મિલાવ્યા, અને તેનું સ્વાગત આરતી સાથે થયું. એ મોટો અને ખુશીનો દિવસ હતો. અમે અલગ રૂમમાં વાતો કરી અને હસ્યાં, ફોન નંબરની આપ-લે કરી અને ઇન્સ્ટાગ્રામ પર એકબીજાને ફોલો કર્યાં.',
      },
    },
    {
      icon: 'chat',
      image: '/images/story-4.jpg',
      title: { en: 'The First Message', gu: 'પહેલો મેસેજ' },
      text: {
        en: 'That night I received her first message: “Hii, Jsk (Jai Shree Krishna).” A simple chat that became the start of everything.',
        gu: 'એ જ રાત્રે મને તેનો પહેલો મેસેજ મળ્યો: “Hii, Jsk (જય શ્રી કૃષ્ણ).” એક સાદી ચેટ, જે બધાની શરૂઆત બની.',
      },
    },
    {
      icon: 'gift',
      image: '/images/story-5.jpg',
      title: { en: 'The First Gift', gu: 'પહેલી ભેટ' },
      text: {
        en: 'After one month she sent me a rose and chocolates.',
        gu: 'એક મહિનો પૂરો થતાં તેણે મને ગુલાબ અને ચોકલેટ મોકલ્યાં.',
      },
    },
    {
      icon: 'heart',
      image: '/images/story-6.jpg',
      title: { en: 'Growing Closer', gu: 'નજીક આવતાં ગયાં' },
      text: {
        en: 'Over the next months we shared love, fun, fights and emotional moments, every feeling that makes a bond real.',
        gu: 'પછીના મહિનાઓમાં અમે પ્રેમ, મસ્તી, ઝઘડા અને લાગણીભરી પળો વહેંચી — દરેક લાગણી જે સંબંધને સાચો બનાવે છે.',
      },
    },
    {
      icon: 'monument',
      image: '/images/story-7.jpg',
      title: { en: 'First Trip: Statue of Unity', gu: 'પહેલી ટ્રિપ: સ્ટેચ્યુ ઓફ યુનિટી' },
      text: {
        en: 'The best day of our lives, and the time I first visited her home.',
        gu: 'અમારા જીવનનો સૌથી સુંદર દિવસ, અને એ જ સમયે હું પહેલી વાર તેના ઘરે ગયો.',
      },
    },
    {
      icon: 'road',
      image: '/images/story-8.jpg',
      title: { en: 'More Journeys: Mumbai & Saputara', gu: 'વધુ સફર: મુંબઈ અને સાપુતારા' },
      text: {
        en: 'Our journey continues with more love and happiness.',
        gu: 'અમારી સફર વધુ પ્રેમ અને ખુશીઓ સાથે ચાલુ છે.',
      },
    },
  ],

  storyFinale: {
    title: { en: 'And now, we begin forever.', gu: 'અને હવે, અમે જીવનભરનો સાથ શરૂ કરીએ છીએ.' },
    button: { en: 'See you at the wedding', gu: 'લગ્નમાં મળીએ' },
  },

  /* ---- 7. SMALL LABELS (navbar, headings, buttons) ------------------ */

  ui: {
    nav: {
      home: { en: 'Home', gu: 'હોમ' },
      story: { en: 'Our Story', gu: 'અમારી કહાની' },
      events: { en: 'Events', gu: 'પ્રસંગો' },
      gallery: { en: 'Gallery', gu: 'ગેલેરી' },
      venue: { en: 'Venue', gu: 'સ્થળ' },
      blessings: { en: 'Blessings', gu: 'આશીર્વાદ' },
    },
    ganesh: { en: '॥ Shree Ganeshay Namah ॥', gu: '॥ શ્રી ગણેશાય નમઃ ॥' },
    weds: { en: 'weds', gu: 'સંગ' },
    tagline: { en: 'We are getting married', gu: 'અમે લગ્નના બંધનમાં બંધાઈ રહ્યાં છીએ' },
    countdown: {
      days: { en: 'Days', gu: 'દિવસ' },
      hours: { en: 'Hours', gu: 'કલાક' },
      minutes: { en: 'Minutes', gu: 'મિનિટ' },
      seconds: { en: 'Seconds', gu: 'સેકન્ડ' },
    },
    scroll: { en: 'Scroll down', gu: 'નીચે સ્ક્રોલ કરો' },

    storyKicker: { en: 'How it all began', gu: 'શરૂઆત કેવી રીતે થઈ' },
    storyTitle: { en: 'Our Story', gu: 'અમારી કહાની' },

    eventsKicker: { en: 'Join the celebration', gu: 'ઉત્સવમાં જોડાઓ' },
    eventsTitle: { en: 'Wedding Events', gu: 'લગ્નના પ્રસંગો' },
    addGoogle: { en: 'Google Calendar', gu: 'Google કેલેન્ડર' },
    addIcs: { en: 'Add to Calendar', gu: 'કેલેન્ડરમાં ઉમેરો' },

    galleryKicker: { en: 'Moments together', gu: 'સાથે વિતાવેલી પળો' },
    galleryTitle: { en: 'Gallery', gu: 'ગેલેરી' },
    galleryHint: { en: 'Swipe, then tap a photo to open it', gu: 'સ્વાઇપ કરો, પછી ફોટો ખોલવા ટેપ કરો' },
    photo: { en: 'Photo', gu: 'ફોટો' },

    venueKicker: { en: 'Where to find us', gu: 'અમને ક્યાં મળશો' },
    venueTitle: { en: 'Venue', gu: 'સ્થળ' },
    directions: { en: 'Get Directions', gu: 'રસ્તો જુઓ' },

    blessKicker: { en: 'Your wishes mean the world', gu: 'તમારી શુભેચ્છા અમારા માટે અમૂલ્ય છે' },
    blessTitle: { en: 'Blessings & RSVP', gu: 'આશીર્વાદ અને હાજરી' },
    formName: { en: 'Your name', gu: 'તમારું નામ' },
    formGuests: { en: 'Number of guests', gu: 'મહેમાનોની સંખ્યા' },
    formMessage: { en: 'Message of blessings', gu: 'આશીર્વાદનો સંદેશ' },
    formSend: { en: 'Send Blessings', gu: 'આશીર્વાદ મોકલો' },
    formThanks: {
      en: 'Thank you! WhatsApp has opened with your message — press send to deliver it.',
      gu: 'આભાર! તમારા સંદેશ સાથે WhatsApp ખૂલ્યું છે — મોકલવા માટે Send દબાવો.',
    },
    whatsappChat: { en: 'Chat with us on WhatsApp', gu: 'WhatsApp પર વાત કરો' },
    call: { en: 'Call', gu: 'ફોન કરો' },
    share: { en: 'Share this invitation', gu: 'આમંત્રણ શેર કરો' },
    shareText: {
      en: 'You are warmly invited to our wedding! 💛',
      gu: 'અમારા લગ્નમાં આપને ભાવભર્યું આમંત્રણ! 💛',
    },

    footerThanks: { en: 'Your presence is our biggest blessing.', gu: 'તમારી હાજરી એ જ અમારો સૌથી મોટો આશીર્વાદ છે.' },
    madeWith: { en: 'Made with love', gu: 'પ્રેમથી બનાવેલ' },
    musicOn: { en: 'Play music', gu: 'સંગીત ચાલુ કરો' },
    musicOff: { en: 'Pause music', gu: 'સંગીત બંધ કરો' },
    musicMissing: {
      en: 'Add your song at public/music/wedding.mp3',
      gu: 'તમારું ગીત public/music/wedding.mp3 પર ઉમેરો',
    },
  },
};
