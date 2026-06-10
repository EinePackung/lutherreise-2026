// Lutherreise 2026 — Reisedaten

const REISE = {
  titel: 'Lutherreise',
  jahr: '2026',
  untertitel: 'Auf den Spuren der Reformation',
  datum: '11. – 13. Juni 2026',
  einladung: 'Wir laden Dich herzlich ein, mit uns auf eine besondere Reise zu gehen — durch Eisenach, Weimar und Wittenberg, dorthin, wo Geschichte geschrieben wurde.',
  treffpunkt: 'Gemeinde · 7:00 Uhr',
  kontakt: 'M. Bae · Vorstände',
};

const TAGE = [
  {
    nr: 1,
    tag: 'Donnerstag',
    datum: '11. Juni',
    ort: 'Eisenach → Weimar → Berlin',
    farbe: 'apricot',
    motto: 'Aufbruch & Ankunft',
    items: [
      { zeit: '7:00',  titel: 'Treffen & Startgebet',        note: 'Gemeinsam losbeten' },
      { zeit: '7:15',  titel: 'Abfahrt',                     note: 'Es geht los!' },
      { zeit: '9:45',  titel: 'Ankunft in Eisenach',         note: 'Hotdog zum Mittag' },
      { zeit: '10:00', titel: 'Wartburg — Schloss',          note: 'Wo Luther die Bibel übersetzte', highlight: true, detail: 'wartburg' },
      { zeit: '12:00', titel: 'Abfahrt nach Weimar',         note: '' },
      { zeit: '13:15', titel: 'Ankunft in Weimar',           note: 'Tiefgarage am Goethehaus' },
      { zeit: '13:30', titel: 'Herderkirche',                note: 'Stadtkirche St. Peter und Paul', highlight: true, detail: 'cranach' },
      { zeit: '15:00', titel: 'Abfahrt nach Berlin',         note: '' },
      { zeit: '18:30', titel: 'Abendessen',                  note: 'Putzen & Abspülen nach dem Dienstplan' },
      { zeit: '20:00', titel: 'Predigt & Gemeinschaft 1',    note: 'Gottes Werk in der Stille', highlight: true,
        dienste: [
          { rolle: 'Predigt',     wer: 'M. Bae' },
          { rolle: 'Übersetzung', wer: 'B. Hyunwoo' },
          { rolle: 'Gemeinschaft', wer: 'S. Hyunji / S. Jieun' },
        ] },
      { zeit: '23:00', titel: 'Schlafen',                    note: 'Kochen fürs Frühstück: Brüder' },
    ],
  },
  {
    nr: 2,
    tag: 'Freitag',
    datum: '12. Juni',
    ort: 'Wittenberg',
    farbe: 'sage',
    motto: 'Sola Scriptura',
    items: [
      { zeit: '8:00',  titel: 'Treffen in der Gemeinde',     note: '' },
      { zeit: '8:30',  titel: 'Abfahrt & Frühstück im Auto', note: 'Brötchen unterwegs' },
      { zeit: '10:00', titel: 'Ankunft Wittenberg',          note: '' },
      { zeit: '10:30', titel: 'Schlosskirche',               note: 'Andacht zu den 95 Thesen', highlight: true },
      { zeit: '11:20', titel: 'Stadtkirche St. Marien',      note: '' },
      { zeit: '12:00', titel: 'Mittagspause',                note: 'Sandwich am Marktplatz' },
      { zeit: '13:30', titel: 'Cranach-Hof',                 note: 'Cranach-Höfe · Ort des Buchdrucks' },
      { zeit: '14:15', titel: 'Luthereiche',                 note: 'Verbrennung der Bannandrohungsbulle', highlight: true },
      { zeit: '14:40', titel: 'Lutherhaus / Augusteum',      note: 'Augusteum (Lutherhaus-Sanierung)', highlight: true },
      { zeit: '15:15', titel: 'Freizeit',                    note: 'Luther 1517 360° · Melanchthonhaus' },
      { zeit: '16:00', titel: 'Abfahrt nach Berlin',         note: '' },
      { zeit: '18:30', titel: 'Abendessen',                  note: 'Putzen & Abspülen nach dem Dienstplan' },
      { zeit: '20:00', titel: 'Predigt & Gemeinschaft 2',    note: 'Sola Scriptura', highlight: true,
        dienste: [
          { rolle: 'Predigt',     wer: 'M. Lim' },
          { rolle: 'Übersetzung', wer: 'S. Lena' },
          { rolle: 'Gemeinschaft', wer: 'B. Martin & S. Joycee' },
        ] },
      { zeit: '23:00', titel: 'Schlafen',                    note: '' },
    ],
  },
  {
    nr: 3,
    tag: 'Samstag',
    datum: '13. Juni',
    ort: 'Gemeinde',
    farbe: 'sage',
    motto: 'Gemeinschaft & Heimkehr',
    items: [
      { zeit: '8:00',  titel: 'Ankunft & QT',                note: 'Römer Kapitel 1 (Gruppenweise)', highlight: true },
      { zeit: '8:30',  titel: 'Frühstück',                   note: '' },
      { zeit: '9:20',  titel: 'Aufräumen',                   note: 'Putzen nach dem Dienstplan · Gepäck · Fundsachen' },
      { zeit: '10:00', titel: 'Gemeinschaft 3',              note: 'Vollversammlung', highlight: true,
        dienste: [
          { rolle: 'Übersetzung', wer: 'S. Yujeong / S. Melissa' },
        ] },
      { zeit: '11:30', titel: 'Mittagessen',                 note: '' },
      { zeit: '13:00', titel: 'Rückfahrt',                   note: 'Bis bald!' },
    ],
  },
];

const PACKLISTE = [
  { kat: 'Dokumente', items: ['Personalausweis', 'Bibel', 'Notizbuch & Stift'] },
  { kat: 'Kleidung',  items: ['Bequeme Schuhe', 'Wetterfeste Jacke', 'Warme Kleidung für abends'] },
  { kat: 'Schlafen',  items: ['Schlafsack', 'Kissen', 'Handtuch'] },
  { kat: 'Hygiene',   items: ['Zahnbürste & Zahnpasta', 'Duschzeug', 'Persönliche Medikamente'] },
  { kat: 'Sonstiges', items: ['Wasserflasche', 'Snacks für unterwegs', 'Regenschirm falls es regnet', 'Betendes Herz ✦'] },
];

// SVG viewBox 0 0 100 80, Germany blob spans x≈14–82, y≈6–74
// Positions calculated from real lat/lon (5.9–15.0°E, 47.3–55.1°N)
// lx/ly: Versatz des Ortsnamens · rlx/rly: zusätzlicher Versatz der Rolle (2. Zeile)
const ORTE = [
  { name: 'Oberursel',  rolle: 'Start & Heimkehr',    x: 32, y: 58, lx: -3, ly:  0, ta: 'end',    rlx: -2.5, rly: 0    },
  { name: 'Eisenach',   rolle: 'Tag 1 — Wartburg',    x: 46, y: 42, lx: -3, ly:  0, ta: 'end',    rlx: -2.5, rly: 0    },
  { name: 'Weimar',     rolle: 'Tag 1 — Herderkirche', x: 55, y: 45, lx:  0, ly:  8.5, ta: 'middle', rlx: 0,    rly: 0    },
  { name: 'Berlin',     rolle: 'Übernachtung',         x: 70, y: 26, lx:  4.5, ly:  0, ta: 'start',  rlx: 2.5,  rly: -1.5 },
  { name: 'Wittenberg', rolle: 'Tag 2 — Reformation', x: 63, y: 36, lx:  4.5, ly:  0, ta: 'start',  rlx: 2.5,  rly: -1.5 },
];

// Hinweg: Oberursel → Eisenach → Weimar → Berlin → Wittenberg (Rückweg ohne Linie)
const ROUTE_ORDER = [0, 1, 2, 3, 4];

// ── Gruppenaufteilung ─────────────────────────────────────────
const GRUPPEN = [
  { nr: 1, leiter: 'B. Hyunwoo',   mit: ['B. Jordy', 'S. Eyleen', 'S. Svenja', 'S. Rohmi', 'S. Amin', 'S. Hyunji'] },
  { nr: 2, leiter: 'B. Yeseok',    mit: ['B. Sihyeon', 'S. Melissa', 'S. Nomin', 'S. Yundermaa', 'S. Pagmaa', 'S. Seogyeong'] },
  { nr: 3, leiter: 'B. Youngwoong', mit: ['B. Poeun', 'S. Joycee', 'S. Xi', 'S. Jieun', 'S. Michelle', 'S. Hanna'] },
  { nr: 4, leiter: 'B. Wonmin',    mit: ['B. Martin', 'S. Lena', 'S. Nayoung', 'S. Haneul', 'S. Yujeong'] },
];

// ── Dienstplan ────────────────────────────────────────────────
const DIENSTPLAN = {
  // Rotierende Dienste über die drei Tage
  spalten: ['Tag 1 · Abend', 'Tag 2 · Abend', 'Tag 3 · Morgen'],
  rotation: [
    { aufgabe: 'Abspülen',        tage: ['Gruppe 1', 'Gruppe 2', 'Gruppe 3'] },
    { aufgabe: 'Putzen',          tage: ['Gruppe 4', 'Gruppe 1', 'Gruppe 2'] },
    { aufgabe: 'Toiletten putzen', tage: ['Gruppe 3', 'Gruppe 4', '—'] },
  ],
  // Feste Dienste
  fest: [
    { aufgabe: 'Frühstück & Mittag', wer: 'Brüder' },
    { aufgabe: 'Wasser für die Prediger', wer: 'S. Lena' },
    { aufgabe: 'Grill vorbereiten', wer: 'B. Poeun · B. Youngwoong · S. Seogyeong' },
  ],
};

window.LUTHER_DATA = { REISE, TAGE, PACKLISTE, ORTE, ROUTE_ORDER, GRUPPEN, DIENSTPLAN };
