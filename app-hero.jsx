// Lutherreise — Web-Einladung (Hauptkomponente)

const { useState: useStateW, useEffect: useEffectW } = React;

/* ─── Hero / Cover ──────────────────────────────────────────── */
function Hero({ countdown }) {
  return (
    <section className="hero-sec" style={{ position: 'relative', padding: '64px 56px 56px', overflow: 'hidden' }}>
      {/* Tapes around the cover image */}
      <div className="hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.85fr',
        gap: 48,
        alignItems: 'center',
      }}>
        <div style={{ position: 'relative' }}>
          <Stempel rotate={-4} color="apricot">Einladung · Berlin 2026</Stempel>
          <h1 className="t-display hero-title" style={{
            fontSize: 92, lineHeight: 0.95, margin: '20px 0 8px',
            color: 'var(--brown-deep)', fontWeight: 500,
            letterSpacing: '-0.02em',
          }}>
            Luther<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--apricot-deep)' }}>reise</span>
            <span className="t-handwriting" style={{ fontSize: 56, marginLeft: 12, color: 'var(--sage-deep)' }}>2026</span>
          </h1>
          <p className="t-handwriting" style={{ fontSize: 30, color: 'var(--brown)', margin: '4px 0 18px', lineHeight: 1.1 }}>
            Auf den Spuren der Reformation
          </p>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', margin: '18px 0 20px' }}>
            <div className="ticket t-typewriter" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
              <div style={{ color: 'var(--brown)', opacity: 0.6, fontSize: 9 }}>VON</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>11. JUN</div>
            </div>
            <Arrow length={50} />
            <div className="ticket t-typewriter" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
              <div style={{ color: 'var(--brown)', opacity: 0.6, fontSize: 9 }}>BIS</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>13. JUN</div>
            </div>
            <span className="t-handwriting" style={{ fontSize: 22, color: 'var(--sage-deep)', transform: 'rotate(-4deg)', display: 'inline-block', whiteSpace: 'nowrap' }}>
              3 Tage!
            </span>
          </div>

          <p className="t-body" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink)', maxWidth: 460, margin: 0 }}>
            Wir laden Dich herzlich ein, mit uns auf eine besondere Reise zu gehen — durch
            <span className="wavy"> Eisenach</span>, <span className="wavy">Weimar</span> und <span className="wavy">Wittenberg</span>,
            dorthin, wo Geschichte geschrieben wurde.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <a href="#rsvp" className="btn-pill primary">
              Ich komme mit ✦
            </a>
            <button onClick={downloadICS} className="btn-pill">
              📅 Kalender hinzufügen
            </button>
          </div>
        </div>

        {/* Cover artwork */}
        <div style={{ position: 'relative', minHeight: 460 }}>
          <Tape color="apricot" rotate={-12} top={-14} left="22%" width={120} />
          <Tape color="sage" rotate={10} top={-10} left="78%" width={100} />

          <div className="polaroid" style={{ width: '100%', transform: 'rotate(2deg)' }}>
            {window.CoverSlideshow
              ? <window.CoverSlideshow height={380} interval={3000} />
              : <CoverIllustration height={380} />}
            <div style={{
              fontFamily: "'Caveat', cursive", fontSize: 26, color: 'var(--brown)',
              textAlign: 'center', marginTop: 6,
            }}>
              Wittenberg · 31.10.1517
            </div>
          </div>

          {/* Countdown sticker */}
          <div className="hero-countdown" style={{
            position: 'absolute', bottom: -18, left: -28,
            transform: 'rotate(-6deg)',
          }}>
            <div style={{
              background: 'var(--sage)',
              border: '2.5px solid var(--brown)',
              borderRadius: 16,
              padding: '14px 18px',
              boxShadow: '3px 3px 0 var(--brown)',
              color: '#fff',
              minWidth: 200,
            }}>
              <div className="t-typewriter" style={{ fontSize: 10, letterSpacing: '0.18em', opacity: 0.9 }}>
                NOCH
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginTop: 2 }}>
                <CountBox n={countdown.d} label="Tage" />
                <CountBox n={countdown.h} label="Std" />
                <CountBox n={countdown.m} label="Min" />
                <CountBox n={countdown.s} label="Sek" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountBox({ n, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="t-display" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1 }}>
        {String(n).padStart(2, '0')}
      </span>
      <span className="t-typewriter" style={{ fontSize: 9, opacity: 0.85, letterSpacing: '0.1em', marginTop: 2 }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Map ──────────────────────────────────────────────────── */
function ReiseMap() {
  const { ORTE, ROUTE_ORDER } = window.LUTHER_DATA;
  return (
    <section style={{ padding: '24px 56px 32px', position: 'relative' }}>
      <SectionTitle pre="Karte" titel="Wo wir hinreisen" tape="rose" />

      <div style={{
        position: 'relative',
        background: 'var(--paper)',
        border: '1.5px solid rgba(107,68,35,0.25)',
        borderRadius: 12,
        padding: 24,
        marginTop: 18,
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(107,68,35,0.04) 0 1px, transparent 1px 28px),' +
          'repeating-linear-gradient(90deg, rgba(107,68,35,0.04) 0 1px, transparent 1px 28px)',
      }}>
        <Tape color="sage" rotate={-8} top={-12} left="14%" width={84} />

        <svg viewBox="0 0 100 80" style={{ width: '100%', height: 380, display: 'block', overflow: 'visible' }}>

          {/* ── Germany blob ─────────────────────────────────────── */}
          <path
            d="M 22 12 Q 30 8 40 10 Q 52 6 62 14 Q 72 12 76 22 Q 82 28 78 38 Q 80 50 72 56 Q 70 66 60 70 Q 48 74 40 70 Q 28 72 24 62 Q 16 56 18 46 Q 14 38 18 28 Q 16 18 22 12 Z"
            fill="rgba(168,195,160,0.15)"
            stroke="rgba(107,68,35,0.18)"
            strokeWidth="0.4"
            strokeDasharray="1.2 0.8"
          />

          {/* ── Wartburg Castle illustration (upper-left, near Eisenach) ── */}
          <g transform="translate(12, 2)" opacity="0.92">
            {/* Rock base */}
            <ellipse cx="14" cy="26" rx="13" ry="3" fill="#C4B090" opacity="0.5"/>
            {/* Base trees */}
            <polygon points="1,25.5 3,20 5,25.5" fill="#8FB887"/>
            <polygon points="0,27 2.5,21.5 5,27" fill="#78986F"/>
            <polygon points="23,25.5 25.5,20 28,25.5" fill="#8FB887"/>
            <polygon points="24,27 26.5,21.5 29,27" fill="#78986F"/>
            {/* Outer wall */}
            <rect x="4" y="16" width="22" height="10" fill="#D2B88C" stroke="#7B5030" strokeWidth="0.35"/>
            {/* Left corner tower */}
            <rect x="1" y="11" width="5.5" height="15" fill="#C6A87C" stroke="#7B5030" strokeWidth="0.35"/>
            {/* Left tower red roof */}
            <polygon points="0.5,11 7,11 3.7,8" fill="#C05A50" stroke="#7B5030" strokeWidth="0.3"/>
            {/* Bergfried (central keep) */}
            <rect x="11" y="4" width="6" height="22" fill="#B8A07A" stroke="#7B5030" strokeWidth="0.4"/>
            {/* Battlements */}
            <rect x="10.5" y="2.5" width="1.2" height="2" fill="#B8A07A" stroke="#7B5030" strokeWidth="0.25"/>
            <rect x="12.2" y="2.5" width="1.2" height="2" fill="#B8A07A" stroke="#7B5030" strokeWidth="0.25"/>
            <rect x="13.9" y="2.5" width="1.2" height="2" fill="#B8A07A" stroke="#7B5030" strokeWidth="0.25"/>
            <rect x="15.6" y="2.5" width="1.2" height="2" fill="#B8A07A" stroke="#7B5030" strokeWidth="0.25"/>
            {/* Flag */}
            <line x1="14" y1="1.5" x2="14" y2="-1" stroke="#7B5030" strokeWidth="0.4"/>
            <polygon points="14,-1 17.5,0 14,1" fill="#C05A50"/>
            {/* Palas (right wing, green roof) */}
            <rect x="18" y="9" width="10" height="17" fill="#D2B88C" stroke="#7B5030" strokeWidth="0.35"/>
            <rect x="17.5" y="8" width="11" height="2.5" fill="#7FA177" stroke="#7B5030" strokeWidth="0.3"/>
            {/* Palas windows */}
            <rect x="19.5" y="12" width="1.6" height="2.2" fill="rgba(70,42,15,0.45)" stroke="#7B5030" strokeWidth="0.15"/>
            <rect x="22"   y="12" width="1.6" height="2.2" fill="rgba(70,42,15,0.45)" stroke="#7B5030" strokeWidth="0.15"/>
            <rect x="24.5" y="12" width="1.6" height="2.2" fill="rgba(70,42,15,0.45)" stroke="#7B5030" strokeWidth="0.15"/>
            <rect x="19.5" y="16" width="1.6" height="2.2" fill="rgba(70,42,15,0.45)" stroke="#7B5030" strokeWidth="0.15"/>
            <rect x="22"   y="16" width="1.6" height="2.2" fill="rgba(70,42,15,0.45)" stroke="#7B5030" strokeWidth="0.15"/>
            {/* Left wall windows */}
            <rect x="5.5" y="18" width="1.5" height="2.2" fill="rgba(70,42,15,0.45)" stroke="#7B5030" strokeWidth="0.15"/>
            <rect x="8"   y="18" width="1.5" height="2.2" fill="rgba(70,42,15,0.45)" stroke="#7B5030" strokeWidth="0.15"/>
          </g>

          {/* ── Stadtkirche illustration (lower-right, near Wittenberg) ── */}
          <g transform="translate(66, 44)" opacity="0.92">
            {/* Flanking trees */}
            <ellipse cx="-2"  cy="24" rx="2.5" ry="3.5" fill="#8FB887"/>
            <ellipse cx="19"  cy="23" rx="2"   ry="3"   fill="#8FB887"/>
            {/* Nave body */}
            <rect x="3" y="11" width="13" height="13" fill="#EAD8B4" stroke="#7B5030" strokeWidth="0.35"/>
            {/* Nave gable */}
            <polygon points="3,11 16,11 9.5,8" fill="#CCBB9A" stroke="#7B5030" strokeWidth="0.3"/>
            {/* Left tower */}
            <rect x="1" y="4" width="5" height="20" fill="#D8C5A0" stroke="#7B5030" strokeWidth="0.35"/>
            {/* Right tower */}
            <rect x="13" y="6" width="5" height="18" fill="#D8C5A0" stroke="#7B5030" strokeWidth="0.35"/>
            {/* Left spire */}
            <polygon points="0.5,4 6.5,4 3.5,-2" fill="#8A7A62" stroke="#7B5030" strokeWidth="0.3"/>
            {/* Right spire */}
            <polygon points="12.5,6 18.5,6 15.5,0" fill="#8A7A62" stroke="#7B5030" strokeWidth="0.3"/>
            {/* Crosses */}
            <line x1="3.5"  y1="-2.5" x2="3.5"  y2="-4.5" stroke="#6B4423" strokeWidth="0.45"/>
            <line x1="2.5"  y1="-3.5" x2="4.5"  y2="-3.5" stroke="#6B4423" strokeWidth="0.45"/>
            <line x1="15.5" y1="-0.5" x2="15.5" y2="-2.5" stroke="#6B4423" strokeWidth="0.4"/>
            <line x1="14.5" y1="-1.5" x2="16.5" y2="-1.5" stroke="#6B4423" strokeWidth="0.4"/>
            {/* Gothic windows */}
            <path d="M2,7 L2,12 Q3.5,14 5,12 L5,7 Z"       fill="#A8C3A0" stroke="#7B5030" strokeWidth="0.2"/>
            <path d="M14,9 L14,14 Q15.5,16 17,14 L17,9 Z"   fill="#A8C3A0" stroke="#7B5030" strokeWidth="0.2"/>
            <path d="M4,14 L4,19 Q5,20.5 6,19 L6,14 Z"      fill="#A8C3A0" stroke="#7B5030" strokeWidth="0.2"/>
            <path d="M12,14 L12,19 Q13,20.5 14,19 L14,14 Z" fill="#A8C3A0" stroke="#7B5030" strokeWidth="0.2"/>
            {/* Main door (Gothic arch) */}
            <path d="M7.5,24 L7.5,18 Q9.5,15.5 11.5,18 L11.5,24 Z" fill="#8A6A45" stroke="#7B5030" strokeWidth="0.3"/>
          </g>

          {/* ── Scattered pine trees ──────────────────────────────── */}
          <g fill="#8FB887" opacity="0.75">
            <polygon points="22,71 24.5,65 27,71"/>
            <polygon points="23.5,72 26,66 28.5,72"/>
            <polygon points="38,72 40.5,66 43,72"/>
            <polygon points="39.5,73 42,67 44.5,73"/>
          </g>

          {/* ── Birds ────────────────────────────────────────────── */}
          <g stroke="rgba(107,68,35,0.4)" strokeWidth="0.55" fill="none">
            <path d="M72,13 Q73.3,11.5 74.6,13"/>
            <path d="M75.5,11 Q76.8,9.5 78.1,11"/>
            <path d="M70,15.5 Q71.3,14 72.6,15.5"/>
          </g>

          {/* ── Route line ───────────────────────────────────────── */}
          {(() => {
            const pts = ROUTE_ORDER.map(i => ORTE[i]);
            const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
            return (
              <path d={d} fill="none" stroke="var(--apricot-deep)"
                strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="2 1.5" />
            );
          })()}

          {/* ── City dots ────────────────────────────────────────── */}
          {ORTE.map((o, i) => (
            <g key={i}>
              <circle cx={o.x} cy={o.y} r="1.8" fill="var(--brown)" />
              <circle cx={o.x} cy={o.y} r="3.2" fill="none" stroke="var(--brown)" strokeWidth="0.35" />
            </g>
          ))}

          {/* ── Labels ───────────────────────────────────────────── */}
          {ORTE.map((o, i) => (
            <g key={i}>
              <text x={o.x + o.lx} y={o.y + o.ly} textAnchor={o.ta}
                fontSize="4.5" fontWeight="700" fill="#3A2614"
                fontFamily="'Fraunces', Georgia, serif">
                {o.name}
              </text>
              <text x={o.x + o.lx + (o.rlx || 0)} y={o.y + o.ly + 5.5 + (o.rly || 0)} textAnchor={o.ta}
                fontSize="3.5" fill="#7FA177"
                fontFamily="'Caveat', cursive">
                {o.rolle}
              </text>
            </g>
          ))}

          {/* ── Compass ──────────────────────────────────────────── */}
          <g transform="translate(92, 8)">
            <circle r="5" fill="rgba(255,253,247,0.92)" stroke="#6B4423" strokeWidth="0.8"/>
            <path d="M0,-3.5 L1,0 L0,-1 L-1,0Z" fill="#C03618" stroke="#6B4423" strokeWidth="0.4"/>
            <path d="M0,-1 L1,0 L0,3.5 L-1,0Z" fill="#EEE8D4" stroke="#6B4423" strokeWidth="0.4"/>
            <text y="-5" textAnchor="middle" fontSize="3.5" fill="#6B4423" fontFamily="serif" fontWeight="700">N</text>
          </g>

        </svg>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 18,
        flexWrap: 'wrap',
      }}>
        <a href="guidebook.html" className="btn-pill sage">
          📖 Guidebook öffnen
        </a>
        <span className="t-body" style={{ fontSize: 13.5, letterSpacing: '0.02em', color: 'var(--brown)', opacity: 0.8 }}>
          Deutsch · English · 한국어 · Монгол · Français
        </span>
      </div>
    </section>
  );
}

/* ─── Section title (reusable) ─────────────────────────────── */
function SectionTitle({ pre, titel, tape = 'apricot' }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 14 }}>
      <Tape color={tape} rotate={-6} top={-22} left={48} width={70} />
      <span className="t-typewriter" style={{
        fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--brown)', opacity: 0.7,
      }}>
        {pre}
      </span>
      <h2 className="t-display" style={{
        fontSize: 36, margin: 0, fontWeight: 500,
        color: 'var(--brown-deep)', letterSpacing: '-0.01em',
      }}>
        {titel}
      </h2>
    </div>
  );
}

Object.assign(window, { Hero, ReiseMap, SectionTitle, CountBox });
