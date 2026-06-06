// Lutherreise — handgezeichnete Cover-Illustration
// Luther schlägt die 95 Thesen an die Tür der Schlosskirche Wittenberg.
// Stil: weich, kindlich, Aquarell-Anmutung, passend zum Scrapbook-Theme.

function CoverIllustration({ width = '100%', height = 380, style }) {
  return (
    <svg
      viewBox="0 0 480 380"
      width={width}
      height={height}
      style={{ display: 'block', background: 'var(--cream-deep, #F8E8D0)', ...style }}
      aria-label="Luther schlägt die 95 Thesen an die Schlosskirche Wittenberg"
    >
      <defs>
        {/* Soft paper grain */}
        <pattern id="grain" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#F8E8D0" />
          <circle cx="1" cy="1" r="0.3" fill="#6B4423" opacity="0.05" />
        </pattern>

        {/* Watercolor cloud */}
        <radialGradient id="sky" cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#FFF4E6" />
          <stop offset="60%" stopColor="#F8E8D0" />
          <stop offset="100%" stopColor="#F4C7A1" stopOpacity="0.4" />
        </radialGradient>

        <radialGradient id="ground" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#A8C3A0" />
          <stop offset="100%" stopColor="#7FA177" />
        </radialGradient>

        {/* church door wood */}
        <linearGradient id="door" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5A2B" />
          <stop offset="100%" stopColor="#6B4423" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="480" height="280" fill="url(#sky)" />
      <rect x="0" y="0" width="480" height="380" fill="url(#grain)" />

      {/* Soft watercolor clouds */}
      <g opacity="0.55">
        <ellipse cx="80"  cy="60"  rx="42" ry="14" fill="#fff" />
        <ellipse cx="110" cy="52"  rx="32" ry="10" fill="#fff" />
        <ellipse cx="380" cy="70"  rx="50" ry="14" fill="#fff" />
        <ellipse cx="410" cy="62"  rx="28" ry="9"  fill="#fff" />
      </g>

      {/* Sun */}
      <circle cx="420" cy="50" r="22" fill="#F4C7A1" opacity="0.7" />
      <circle cx="420" cy="50" r="14" fill="#E8A878" opacity="0.6" />

      {/* Distant hills */}
      <path d="M 0 240 Q 80 210 160 230 T 320 220 T 480 235 L 480 280 L 0 280 Z"
            fill="#A8C3A0" opacity="0.5" />
      <path d="M 0 260 Q 100 240 200 252 T 400 248 T 480 258 L 480 290 L 0 290 Z"
            fill="#A8C3A0" opacity="0.7" />

      {/* Ground */}
      <rect x="0" y="280" width="480" height="100" fill="url(#ground)" />
      {/* Cobblestone hints */}
      <g opacity="0.25" stroke="#4A2E16" strokeWidth="0.8" fill="none">
        <path d="M 40 320 Q 60 318 80 322" />
        <path d="M 110 332 Q 130 330 150 334" />
        <path d="M 200 340 Q 220 338 240 342" />
        <path d="M 290 348 Q 310 346 330 350" />
        <path d="M 380 356 Q 400 354 420 358" />
        <path d="M 70 350 Q 90 348 110 352" />
        <path d="M 250 358 Q 270 356 290 360" />
      </g>

      {/* ─── Schlosskirche Wittenberg (stylized) ─── */}
      {/* Tower roof spire */}
      <path d="M 130 70 L 145 30 L 160 70 Z" fill="#6B4423" />
      <circle cx="145" cy="30" r="3" fill="#E8A878" />
      <line x1="145" y1="27" x2="145" y2="20" stroke="#6B4423" strokeWidth="1.5" />
      <circle cx="145" cy="18" r="2" fill="#E8A878" />

      {/* Tower body */}
      <rect x="125" y="70" width="40" height="170" fill="#FBF2E0" stroke="#6B4423" strokeWidth="1.8" />
      {/* Tower windows */}
      <rect x="138" y="88"  width="14" height="20" rx="6" fill="#A8C3A0" stroke="#6B4423" strokeWidth="1.2" />
      <rect x="138" y="118" width="14" height="20" rx="6" fill="#A8C3A0" stroke="#6B4423" strokeWidth="1.2" />
      {/* Clock */}
      <circle cx="145" cy="160" r="9" fill="#FFF4E6" stroke="#6B4423" strokeWidth="1.5" />
      <line x1="145" y1="160" x2="145" y2="154" stroke="#6B4423" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="145" y1="160" x2="149" y2="162" stroke="#6B4423" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="145" cy="160" r="0.8" fill="#6B4423" />
      {/* Tower base shadow */}
      <rect x="125" y="225" width="40" height="15" fill="#E8A878" opacity="0.4" />

      {/* Main church body */}
      <path d="M 165 100 L 165 240 L 360 240 L 360 100 L 340 80 L 185 80 Z"
            fill="#FFFDF7" stroke="#6B4423" strokeWidth="1.8" />
      {/* Roof */}
      <path d="M 185 80 L 340 80 L 360 100 L 165 100 Z"
            fill="#E8A878" stroke="#6B4423" strokeWidth="1.5" />
      {/* Roof tiles */}
      <g stroke="#6B4423" strokeWidth="0.6" opacity="0.4">
        <line x1="200" y1="82" x2="195" y2="100" />
        <line x1="225" y1="82" x2="220" y2="100" />
        <line x1="250" y1="82" x2="247" y2="100" />
        <line x1="275" y1="82" x2="273" y2="100" />
        <line x1="300" y1="82" x2="300" y2="100" />
        <line x1="325" y1="82" x2="328" y2="100" />
      </g>

      {/* Big arched windows */}
      <g fill="#A8C3A0" stroke="#6B4423" strokeWidth="1.3">
        <path d="M 195 130 Q 195 120 205 120 Q 215 120 215 130 L 215 170 L 195 170 Z" />
        <path d="M 230 130 Q 230 120 240 120 Q 250 120 250 130 L 250 170 L 230 170 Z" />
        <path d="M 305 130 Q 305 120 315 120 Q 325 120 325 130 L 325 170 L 305 170 Z" />
        <path d="M 340 130 Q 340 120 350 120 L 350 170 L 340 170 Z" />
      </g>
      {/* window crosses */}
      <g stroke="#6B4423" strokeWidth="0.8" opacity="0.5">
        <line x1="205" y1="125" x2="205" y2="170" />
        <line x1="195" y1="148" x2="215" y2="148" />
        <line x1="240" y1="125" x2="240" y2="170" />
        <line x1="230" y1="148" x2="250" y2="148" />
        <line x1="315" y1="125" x2="315" y2="170" />
        <line x1="305" y1="148" x2="325" y2="148" />
      </g>

      {/* ─── The famous DOOR ─── */}
      <g>
        {/* Door arch frame */}
        <path d="M 260 180 Q 260 158 280 158 Q 300 158 300 180 L 300 240 L 260 240 Z"
              fill="#3D2817" />
        {/* Door */}
        <path d="M 264 184 Q 264 162 280 162 Q 296 162 296 184 L 296 240 L 264 240 Z"
              fill="url(#door)" />
        {/* Door planks */}
        <line x1="280" y1="168" x2="280" y2="240" stroke="#3D2817" strokeWidth="1" opacity="0.5" />
        <line x1="272" y1="170" x2="272" y2="240" stroke="#3D2817" strokeWidth="0.6" opacity="0.4" />
        <line x1="288" y1="170" x2="288" y2="240" stroke="#3D2817" strokeWidth="0.6" opacity="0.4" />
        {/* Door studs */}
        <circle cx="269" cy="195" r="1.2" fill="#E8A878" />
        <circle cx="291" cy="195" r="1.2" fill="#E8A878" />
        <circle cx="269" cy="220" r="1.2" fill="#E8A878" />
        <circle cx="291" cy="220" r="1.2" fill="#E8A878" />
        {/* Door knob */}
        <circle cx="288" cy="215" r="1.5" fill="#F4C7A1" />

        {/* THE 95 THESEN PAPER — nailed to the door */}
        <g transform="rotate(-3 280 200)">
          <rect x="266" y="180" width="28" height="34" fill="#FFFDF7"
                stroke="#6B4423" strokeWidth="0.8" />
          {/* nail at top */}
          <circle cx="280" cy="181" r="1.3" fill="#3D2817" />
          {/* lines of text */}
          <g stroke="#6B4423" strokeWidth="0.5" opacity="0.7">
            <line x1="269" y1="186" x2="291" y2="186" />
            <line x1="269" y1="189" x2="289" y2="189" />
            <line x1="269" y1="192" x2="290" y2="192" />
            <line x1="269" y1="195" x2="288" y2="195" />
            <line x1="269" y1="198" x2="291" y2="198" />
            <line x1="269" y1="201" x2="289" y2="201" />
            <line x1="269" y1="204" x2="290" y2="204" />
            <line x1="269" y1="207" x2="287" y2="207" />
            <line x1="269" y1="210" x2="290" y2="210" />
          </g>
          {/* Title "95" */}
          <text x="280" y="183.5" textAnchor="middle" fontSize="2.6"
                fontFamily="serif" fontWeight="700" fill="#6B4423">95 THESEN</text>
        </g>
      </g>

      {/* ─── Luther figure — small, friendly ─── */}
      <g transform="translate(212, 188)">
        {/* Robe */}
        <path d="M -16 14 Q -20 30 -22 50 L 22 50 Q 20 30 16 14 Q 12 8 8 8 L -8 8 Q -12 8 -16 14 Z"
              fill="#3D2817" stroke="#221408" strokeWidth="0.8" />
        {/* Robe folds */}
        <path d="M -10 18 Q -10 32 -12 48" stroke="#221408" strokeWidth="0.5" fill="none" opacity="0.6" />
        <path d="M 10 18 Q 10 32 12 48" stroke="#221408" strokeWidth="0.5" fill="none" opacity="0.6" />
        <path d="M 0 14 L 0 50" stroke="#221408" strokeWidth="0.4" fill="none" opacity="0.4" />

        {/* White collar */}
        <path d="M -7 8 L -3 12 L 0 9 L 3 12 L 7 8 L 4 6 L -4 6 Z" fill="#FFFDF7" />

        {/* Head */}
        <ellipse cx="0" cy="0" rx="9" ry="10" fill="#F4C7A1" stroke="#6B4423" strokeWidth="0.7" />
        {/* Hair / cap (Doktorhut style — dark cap) */}
        <path d="M -9 -3 Q -10 -10 0 -11 Q 10 -10 9 -3 Q 8 -7 0 -7 Q -8 -7 -9 -3 Z"
              fill="#3D2817" />
        <ellipse cx="0" cy="-10" rx="11" ry="2.5" fill="#3D2817" />

        {/* Face */}
        <circle cx="-3" cy="0" r="0.7" fill="#3D2817" />
        <circle cx="3"  cy="0" r="0.7" fill="#3D2817" />
        <path d="M -2 4 Q 0 5.5 2 4" stroke="#6B4423" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="-5" cy="3" r="1.3" fill="#E8A4A4" opacity="0.5" />
        <circle cx="5"  cy="3" r="1.3" fill="#E8A4A4" opacity="0.5" />

        {/* Right arm raised — holding hammer toward door */}
        <g>
          <path d="M 8 12 Q 30 6 52 8" stroke="#3D2817" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 8 12 Q 30 6 52 8" stroke="#221408" strokeWidth="0.6" fill="none" opacity="0.4" />
          {/* Hand */}
          <circle cx="54" cy="8" r="3" fill="#F4C7A1" stroke="#6B4423" strokeWidth="0.6" />
          {/* Hammer */}
          <rect x="56" y="6.5" width="14" height="3" fill="#6B4423" rx="1" />
          <rect x="68" y="3" width="6" height="10" fill="#3D2817" rx="0.8" />
          {/* tiny motion lines */}
          <path d="M 62 -2 L 68 -4" stroke="#6B4423" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
          <path d="M 60 14 L 66 16" stroke="#6B4423" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* Left arm down */}
        <path d="M -10 14 Q -16 28 -14 40" stroke="#3D2817" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="-14" cy="42" r="2.5" fill="#F4C7A1" stroke="#6B4423" strokeWidth="0.5" />

        {/* Shoes */}
        <ellipse cx="-7" cy="52" rx="5" ry="2" fill="#221408" />
        <ellipse cx="7"  cy="52" rx="5" ry="2" fill="#221408" />
      </g>

      {/* Tiny tree on the right */}
      <g transform="translate(420, 250)">
        <rect x="-2" y="0" width="4" height="20" fill="#6B4423" />
        <circle cx="0" cy="-4" r="14" fill="#7FA177" />
        <circle cx="-7" cy="-1" r="9" fill="#A8C3A0" />
        <circle cx="7"  cy="-2" r="10" fill="#A8C3A0" />
      </g>
      {/* Tiny tree on the left */}
      <g transform="translate(50, 260)">
        <rect x="-2" y="0" width="4" height="16" fill="#6B4423" />
        <circle cx="0" cy="-2" r="11" fill="#7FA177" />
        <circle cx="-5" cy="0" r="7" fill="#A8C3A0" />
      </g>

      {/* Little birds */}
      <g stroke="#3D2817" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M 70 110 Q 75 106 80 110 Q 85 106 90 110" />
        <path d="M 380 130 Q 385 126 390 130 Q 395 126 400 130" />
      </g>

      {/* "1517" handwritten in corner */}
      <g transform="translate(40, 360) rotate(-4)">
        <text fontFamily="'Caveat', cursive" fontSize="22" fill="#6B4423" opacity="0.7">
          ~ 1517 ~
        </text>
      </g>

      {/* Sparkles */}
      <g fill="#E8A878" opacity="0.85">
        <path d="M 340 60 l 1.5 -3 l 1.5 3 l 3 1.5 l -3 1.5 l -1.5 3 l -1.5 -3 l -3 -1.5 z" />
        <path d="M 60 200 l 1 -2 l 1 2 l 2 1 l -2 1 l -1 2 l -1 -2 l -2 -1 z" />
        <path d="M 440 200 l 1 -2 l 1 2 l 2 1 l -2 1 l -1 2 l -1 -2 l -2 -1 z" />
      </g>
    </svg>
  );
}

window.CoverIllustration = CoverIllustration;

/* ─── Cover-Slideshow: berühmte Darstellungen des Thesenanschlags ───
   Public-Domain-Gemälde von Wikimedia Commons, sanfter Crossfade.
   Fällt bei Ladefehler auf die handgezeichnete CoverIllustration zurück. */
const COVER_IMAGES = [
  { src: 'assets/cover/image-1780706509179.png' },
  { src: 'assets/cover/image-1780706511694.webp' },
  { src: 'assets/cover/Lucas_Cranach_d.Ä._(Werkst.)_-_Porträt_des_Martin_Luther_(Lutherhaus_Wittenberg).jpg' },
  { src: 'assets/cover/Gustav_Ferdinand_Leopold_Konig_-_Martin_Luther_begins_the_translation_of_the_Bible_at_Wartburg_castle_(engraving)_-_(MeisterDrucke-989524).jpg' },
  { src: 'assets/cover/DE_PPW_NONE-PPW001A_FR434_2010-04_Overall-s.jpg' },
  { src: 'assets/cover/image-1780706506066.png' },
  { src: 'assets/cover/image-1780706614700.png' },
];

function CoverSlideshow({ height = 380, interval = 3000 }) {
  const { useState, useEffect } = React;
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const id = setInterval(() => {
      setIdx(i => (i + 1) % COVER_IMAGES.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, failed]);

  if (failed) return <CoverIllustration height={height} />;

  return (
    <div style={{
      position: 'relative', width: '100%', height,
      overflow: 'hidden', background: '#F8E8D0',
    }}>
      {COVER_IMAGES.map((im, i) => (
        <img
          key={i}
          src={im.src}
          alt="Luther schlägt die 95 Thesen an die Schlosskirche Wittenberg"
          onError={() => setFailed(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />
      ))}
      {/* dezente Quellenangabe (nur falls vorhanden) */}
      {COVER_IMAGES[idx].credit && (
        <div style={{
          position: 'absolute', bottom: 7, right: 9,
          fontFamily: "'Special Elite', monospace",
          fontSize: 9, letterSpacing: '0.06em',
          color: '#fff',
          background: 'rgba(61,40,23,0.55)',
          padding: '2px 7px', borderRadius: 999,
          backdropFilter: 'blur(1px)',
        }}>
          {COVER_IMAGES[idx].credit}
        </div>
      )}
    </div>
  );
}

window.CoverSlideshow = CoverSlideshow;
