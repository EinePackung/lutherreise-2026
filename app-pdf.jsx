// Lutherreise — A5-Kartenformat (für PDF)
// A5 = 148 × 210 mm. Bei 96dpi: 559 × 794 px (vertikal).

const A5_W = 559;
const A5_H = 794;

function A5Card({ children, side = 'front', tilt = 0 }) {
  return (
    <div className="paper" style={{
      width: A5_W, height: A5_H,
      boxShadow: '0 12px 40px rgba(107,68,35,0.18), 0 2px 0 rgba(255,255,255,0.6) inset',
      position: 'relative', overflow: 'hidden',
      borderRadius: 4,
      transform: tilt ? `rotate(${tilt}deg)` : 'none',
      ['--page-side']: side
    }}>
      {children}
    </div>);

}

/* ─── Vorderseite ──────────────────────────────────────── */
function PdfFront() {
  return (
    <A5Card side="front">
      {/* corner tapes */}
      <Tape color="apricot" rotate={-32} top={-12} left={-10} width={120} />
      <Tape color="sage" rotate={28} top={-12} left={A5_W - 60} width={120} />

      <div style={{ padding: '54px 44px 36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stempel rotate={-3} color="apricot">Einladung · Frankfurter & Berliner Gemeinde</Stempel>

        <h1 className="t-display" style={{
          fontSize: 76, lineHeight: 0.92, margin: '22px 0 4px',
          color: 'var(--brown-deep)', fontWeight: 500,
          letterSpacing: '-0.02em'
        }}>
          Luther<br />
          <span style={{ fontStyle: 'italic', color: 'var(--apricot-deep)' }}>reise</span>
        </h1>
        <span className="t-handwriting" style={{ fontSize: 44, color: 'var(--sage-deep)', display: 'inline-block', transform: 'rotate(-3deg)', marginLeft: 4 }}>
          2026
        </span>

        <p className="t-handwriting" style={{ fontSize: 26, color: 'var(--brown)', margin: '14px 0 0', lineHeight: 1.15 }}>
          Auf den Spuren <br />der Reformation
        </p>

        {/* date strip */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 22 }}>
          <div className="ticket t-typewriter" style={{ fontSize: 11, padding: '8px 12px' }}>
            <div style={{ opacity: 0.6, fontSize: 8, letterSpacing: '0.12em' }}>VON</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>11. JUN</div>
          </div>
          <Arrow length={42} />
          <div className="ticket t-typewriter" style={{ fontSize: 11, padding: '8px 12px' }}>
            <div style={{ opacity: 0.6, fontSize: 8, letterSpacing: '0.12em' }}>BIS</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>13. JUN</div>
          </div>
        </div>

        {/* illustration polaroid */}
        <div style={{ marginTop: 18, position: 'relative', alignSelf: 'center' }}>
          <Tape color="rose" rotate={-8} top={-10} left="50%" width={100} />
          <div className="polaroid" style={{ width: 300, transform: 'rotate(2deg)', padding: '8px 8px 26px' }}>
            <CoverIllustration height={170} />
            <div className="t-handwriting" style={{ textAlign: 'center', fontSize: 18, color: 'var(--brown)', marginTop: 2 }}>
              Wittenberg · 1517
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1.5px dashed rgba(107,68,35,0.3)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <div className="t-display" style={{ fontSize: 15, color: 'var(--brown-deep)', fontWeight: 500, fontStyle: 'italic' }}>
            Eisenach &amp; Wittenberg
          </div>
          <div className="t-handwriting" style={{ fontSize: 18, color: 'var(--sage-deep)', whiteSpace: 'nowrap' }}>
            ✦ Du bist eingeladen!
          </div>
        </div>
      </div>
    </A5Card>);

}

/* ─── Spot illustrations (small decorative SVGs) ─────── */
function SpotBible({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {/* Open book */}
      <path d="M 6 18 Q 20 14 32 20 Q 44 14 58 18 L 58 50 Q 44 46 32 52 Q 20 46 6 50 Z"
      fill="#FFFDF7" stroke="#6B4423" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M 32 20 L 32 52" stroke="#6B4423" strokeWidth="1.2" />
      {/* lines on left page */}
      <g stroke="#6B4423" strokeWidth="0.6" opacity="0.5">
        <line x1="11" y1="24" x2="28" y2="22" />
        <line x1="11" y1="28" x2="28" y2="26" />
        <line x1="11" y1="32" x2="28" y2="30" />
        <line x1="11" y1="36" x2="28" y2="34" />
        <line x1="11" y1="40" x2="28" y2="38" />
      </g>
      <g stroke="#6B4423" strokeWidth="0.6" opacity="0.5">
        <line x1="36" y1="22" x2="53" y2="24" />
        <line x1="36" y1="26" x2="53" y2="28" />
        <line x1="36" y1="30" x2="53" y2="32" />
        <line x1="36" y1="34" x2="53" y2="36" />
        <line x1="36" y1="38" x2="53" y2="40" />
      </g>
      {/* cross on the binding */}
      <line x1="32" y1="30" x2="32" y2="38" stroke="#E8A878" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="29" y1="33" x2="35" y2="33" stroke="#E8A878" strokeWidth="1.4" strokeLinecap="round" />
      {/* sparkle */}
      <path d="M 52 12 l 1 -2 l 1 2 l 2 1 l -2 1 l -1 2 l -1 -2 l -2 -1 z" fill="#E8A878" />
    </svg>);

}

function SpotQuill({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden="true">
      {/* feather */}
      <path d="M 8 48 Q 14 30 28 18 Q 40 8 48 8 Q 46 18 38 28 Q 26 42 12 50 Z"
      fill="#A8C3A0" stroke="#6B4423" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M 14 44 Q 22 32 34 22" stroke="#6B4423" strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* barbs */}
      <g stroke="#6B4423" strokeWidth="0.5" opacity="0.4" fill="none">
        <path d="M 18 38 L 14 36" />
        <path d="M 22 32 L 17 30" />
        <path d="M 28 26 L 23 24" />
        <path d="M 34 20 L 30 18" />
        <path d="M 28 26 L 30 22" />
        <path d="M 22 32 L 25 28" />
      </g>
      {/* nib */}
      <path d="M 6 50 L 14 42 L 11 47 Z" fill="#3D2817" />
      {/* ink dot */}
      <circle cx="5" cy="52" r="1.6" fill="#3D2817" />
    </svg>);

}

function SpotWartburg({ size = 80 }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 80 44" aria-hidden="true">
      {/* hill */}
      <path d="M 0 40 Q 20 28 40 32 Q 60 28 80 40 L 80 44 L 0 44 Z" fill="#A8C3A0" opacity="0.5" />
      {/* castle */}
      <rect x="28" y="22" width="24" height="14" fill="#FBF2E0" stroke="#6B4423" strokeWidth="1" />
      <rect x="22" y="18" width="8" height="18" fill="#FBF2E0" stroke="#6B4423" strokeWidth="1" />
      <rect x="50" y="14" width="8" height="22" fill="#FBF2E0" stroke="#6B4423" strokeWidth="1" />
      {/* roofs */}
      <path d="M 20 18 L 26 12 L 32 18 Z" fill="#E8A878" stroke="#6B4423" strokeWidth="0.8" />
      <path d="M 48 14 L 54 8 L 60 14 Z" fill="#E8A878" stroke="#6B4423" strokeWidth="0.8" />
      <path d="M 26 22 L 40 14 L 54 22 Z" fill="#E8A878" stroke="#6B4423" strokeWidth="0.8" />
      {/* flag */}
      <line x1="54" y1="8" x2="54" y2="3" stroke="#6B4423" strokeWidth="0.8" />
      <path d="M 54 3 L 60 5 L 54 7 Z" fill="#E8A4A4" />
      {/* windows */}
      <rect x="34" y="26" width="3" height="5" fill="#6B4423" />
      <rect x="42" y="26" width="3" height="5" fill="#6B4423" />
      <rect x="24" y="22" width="2.5" height="4" fill="#6B4423" />
      <rect x="52" y="20" width="2.5" height="4" fill="#6B4423" />
      {/* tiny tree */}
      <circle cx="10" cy="36" r="3.5" fill="#7FA177" />
      <rect x="9.3" y="36" width="1.4" height="3" fill="#6B4423" />
      <circle cx="72" cy="36" r="3" fill="#7FA177" />
      <rect x="71.4" y="36" width="1.2" height="3" fill="#6B4423" />
    </svg>);

}

window.SpotBible = SpotBible;
window.SpotQuill = SpotQuill;
window.SpotWartburg = SpotWartburg;

/* ─── Rückseite: Erzählung + Programm ──────────────────── */
function PdfBack() {
  const { TAGE } = window.LUTHER_DATA;
  return (
    <A5Card side="back">
      <Tape color="sage" rotate={-6} top={-12} left="50%" width={130} />

      <div style={{ padding: '32px 32px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Erzählung ──────────────────────────────── */}
        <div style={{ position: 'relative' }}>
          <div className="t-typewriter" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'var(--brown)', opacity: 0.7 }}>
            WITTENBERG · 1517
          </div>
          <h2 className="t-display" style={{
            fontSize: 22, margin: '2px 0 8px', color: 'var(--brown-deep)',
            fontWeight: 500, letterSpacing: '-0.01em', fontStyle: 'italic'
          }}>
            Eine Nacht, in der etwas begann.
          </h2>

          <p className="t-body" style={{
            fontSize: 10.5, lineHeight: 1.55, color: 'var(--ink)', margin: 0
          }}>
            Wittenberg, 1517 — eine dunkle Nacht des Glaubens lag über der Stadt.
            Martin Luther fasste einen Entschluss. Das Evangelium, das mir geschenkt wurde.
            Die Schrift, die mir anvertraut ist. <i>Wie kam sie überhaupt bis zu mir?</i>
          </p>
          <p className="t-body" style={{
            fontSize: 10.5, lineHeight: 1.55, color: 'var(--ink)', margin: '6px 0 0'
          }}>
            Eine Reise auf den Spuren der Reformation. Eine Reise, auf der wir
            gemeinsam neu nachdenken über den Wert <span className="wavy">des Wortes</span> und <span className="wavy">des Evangeliums</span>.
            <span className="t-handwriting" style={{ fontSize: 16, color: 'var(--sage-deep)', marginLeft: 4 }}>
              — komm mit.
            </span>
          </p>
        </div>

        {/* ── Themen ──────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <div style={{
            border: '1.5px solid rgba(107,68,35,0.3)',
            borderRadius: 6,
            padding: '10px 12px',
            background: 'rgba(244,199,161,0.18)'
          }}>
            <div className="t-typewriter" style={{ fontSize: 8, letterSpacing: '0.16em', color: 'var(--apricot-deep)', fontWeight: 700 }}>
              TAG 1 · GEMEINSCHAFT 1
            </div>
            <div className="t-display" style={{ fontSize: 13, fontWeight: 600, color: 'var(--brown-deep)', marginTop: 2, fontStyle: 'italic', lineHeight: 1.2 }}>
              Gottes Werk in der Stille
            </div>
          </div>
          <div style={{
            border: '1.5px solid rgba(107,68,35,0.3)',
            borderRadius: 6,
            padding: '10px 12px',
            background: 'rgba(168,195,160,0.22)'
          }}>
            <div className="t-typewriter" style={{ fontSize: 8, letterSpacing: '0.16em', color: 'var(--sage-deep)', fontWeight: 700 }}>
              TAG 2 · GEMEINSCHAFT 2
            </div>
            <div className="t-display" style={{ fontSize: 13, fontWeight: 600, color: 'var(--brown-deep)', marginTop: 2, fontStyle: 'italic', lineHeight: 1.2 }}>
              Sola Scriptura
            </div>
          </div>
        </div>

        {/* ── Programm ───────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, marginBottom: 8, gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, whiteSpace: 'nowrap' }}>
            <span className="t-typewriter" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--brown)', opacity: 0.7 }}>
              PROGRAMM ·
            </span>
            <h3 className="t-display" style={{ fontSize: 15, margin: 0, color: 'var(--brown-deep)', fontWeight: 500, lineHeight: 1 }}>
              Drei Tage, ein Weg.
            </h3>
            <SpotQuill size={32} />
          </div>
          <Stempel rotate={5} color="brown">11—13 JUN</Stempel>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TAGE.map((tag) => {
            const accent = tag.farbe === 'sage' ? 'var(--sage-deep)' : 'var(--apricot-deep)';
            return (
              <div key={tag.nr} style={{
                display: 'grid', gridTemplateColumns: '46px 1fr', gap: 10,
                borderTop: '1.5px dashed rgba(107,68,35,0.25)', paddingTop: 7
              }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  borderRight: `2.5px solid ${accent}`, paddingRight: 6
                }}>
                  <span className="t-typewriter" style={{ fontSize: 7.5, letterSpacing: '0.18em', color: accent, fontWeight: 700 }}>
                    TAG
                  </span>
                  <span className="t-display" style={{ fontSize: 26, fontWeight: 600, color: accent, lineHeight: 0.95 }}>
                    {tag.nr}
                  </span>
                  <span className="t-handwriting" style={{ fontSize: 12, color: 'var(--brown)', lineHeight: 1, marginTop: 1 }}>
                    {tag.datum}
                  </span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
                    <span className="t-display" style={{ fontSize: 12, fontWeight: 600, color: 'var(--brown-deep)' }}>
                      {tag.tag}
                    </span>
                    <span className="t-typewriter" style={{ fontSize: 8.5, color: 'var(--brown)', opacity: 0.6, letterSpacing: '0.08em', marginLeft: 'auto' }}>
                      {tag.ort}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 12, rowGap: 2 }}>
                    {tag.items.map((it, j) =>
                    <div key={j} style={{ display: 'flex', gap: 5, fontSize: 8.8, lineHeight: 1.35 }}>
                        <span className="t-typewriter" style={{ color: 'var(--brown)', fontWeight: 600, minWidth: 26, opacity: 0.85 }}>
                          {it.zeit}
                        </span>
                        <span className="t-body" style={{ color: 'var(--ink)', fontWeight: it.highlight ? 600 : 400 }}>
                          {it.titel}
                          {it.highlight && <span style={{ color: 'var(--sage-deep)', marginLeft: 3 }}>✦</span>}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>);

          })}
        </div>

        {/* ── Decorative middle band ──────────────────── */}
        <div style={{
          marginTop: 'auto', marginBottom: 8,
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '6px 4px'
        }}>
          <SpotBible size={48} />
          <div style={{ flex: 1, borderTop: '1.5px dotted rgba(107,68,35,0.4)' }} />
          <div className="t-handwriting" style={{ fontSize: 18, color: 'var(--brown)', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.15 }}>
            „Hier stehe ich,<br />ich kann nicht anders."
          </div>
          <div style={{ flex: 1, borderTop: '1.5px dotted rgba(107,68,35,0.4)' }} />
          <SpotWartburg size={64} />
        </div>

        {/* ── Footer ─────────────────────────────────── */}
        <div style={{
          marginTop: 10,
          padding: '8px 12px',
          background: 'var(--paper)',
          border: '1.5px dashed rgba(107,68,35,0.4)',
          borderRadius: 6,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10
        }}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <div className="t-typewriter" style={{ fontSize: 8, letterSpacing: '0.16em', color: 'var(--brown)', opacity: 0.7 }}>
              RSVP · BIS 1. JUNI
            </div>
            <div className="t-handwriting" style={{ fontSize: 18, color: 'var(--brown-deep)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              Bist Du dabei?
            </div>
          </div>
          <div className="t-body" style={{ fontSize: 9.5, color: 'var(--brown)', textAlign: 'right', lineHeight: 1.4 }}>
            <div>Antwort an: <b>Vorstände der Jugendgruppe</b></div>
            <div style={{ opacity: 0.7 }}></div>
          </div>
        </div>

        <div className="t-typewriter" style={{
          textAlign: 'center', fontSize: 8, letterSpacing: '0.2em', color: 'var(--brown)', opacity: 0.5, marginTop: 6
        }}>
          ✦ SOLI · DEO · GLORIA ✦
        </div>
      </div>
    </A5Card>);

}

/* ─── Variation B: Sage-dominant ──────────────────────── */
function PdfFrontVarSage() {
  return (
    <A5Card side="front-sage">
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, var(--cream) 0%, var(--cream) 60%, var(--sage) 60%, var(--sage) 100%)'
      }} />
      <Tape color="apricot" rotate={-4} top={20} left="50%" width={140} />

      <div style={{ position: 'relative', padding: '56px 44px', height: '100%', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <div className="t-handwriting" style={{ fontSize: 28, color: 'var(--apricot-deep)', transform: 'rotate(-3deg)', display: 'inline-block' }}>
            ~ Du bist eingeladen ~
          </div>
          <h1 className="t-display" style={{
            fontSize: 80, fontWeight: 500, color: 'var(--brown-deep)',
            margin: '6px 0 0', letterSpacing: '-0.02em', lineHeight: 0.95
          }}>
            Lutherreise
          </h1>
          <div className="t-handwriting" style={{ fontSize: 56, color: 'var(--sage-deep)', lineHeight: 1, marginTop: 4 }}>
            2026
          </div>
        </div>

        <div style={{ flex: 1, position: 'relative', marginTop: 30 }}>
          <div className="polaroid" style={{ width: 280, margin: '0 auto', transform: 'rotate(-3deg)' }}>
            <CoverIllustration height={200} />
            <div className="t-handwriting" style={{ textAlign: 'center', fontSize: 20, color: 'var(--brown)', marginTop: 4 }}>
              Eisenach & Wittenberg
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#fff', paddingBottom: 8 }}>
          <div className="t-typewriter" style={{ fontSize: 11, letterSpacing: '0.24em', opacity: 0.85 }}>
            DONNERSTAG — SAMSTAG
          </div>
          <div className="t-display" style={{ fontSize: 30, fontWeight: 500, marginTop: 4 }}>
            11. – 13. Juni 2026
          </div>
          <div className="t-handwriting" style={{ fontSize: 22, marginTop: 4, color: 'rgba(255,255,255,0.95)' }}>
            ✦ Auf den Spuren der Reformation ✦
          </div>
        </div>
      </div>
    </A5Card>);

}

/* ─── Variation C: Postkarten-Stil ────────────────────── */
function PdfFrontVarPostcard() {
  return (
    <A5Card side="front-postcard">
      <div style={{ padding: 20, height: '100%' }}>
        <div style={{
          height: '100%',
          border: '2.5px solid var(--brown)',
          borderRadius: 4,
          padding: 28,
          position: 'relative',
          background: 'var(--cream)',
          backgroundImage:
          'repeating-linear-gradient(0deg, rgba(107,68,35,0.025) 0 1px, transparent 1px 22px)',
          display: 'flex', flexDirection: 'column'
        }}>
          {/* Postage stamp */}
          <div style={{ position: 'absolute', top: 16, right: 16, width: 90, height: 110 }}>
            <div className="stamp" style={{ width: '100%', height: '100%', justifyContent: 'center', padding: 8 }}>
              <div className="t-display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--brown-deep)', lineHeight: 1 }}>
                95
              </div>
              <div className="t-typewriter" style={{ fontSize: 8, letterSpacing: '0.15em', color: 'var(--brown)', textAlign: 'center', marginTop: 2 }}>
                THESEN
              </div>
              <div className="t-typewriter" style={{ fontSize: 7, letterSpacing: '0.12em', color: 'var(--brown)', opacity: 0.7, textAlign: 'center', marginTop: 6 }}>
                DEUTSCHE<br />REFORMATION
              </div>
            </div>
            {/* postmark circle */}
            <div style={{
              position: 'absolute', top: -10, left: -30, width: 64, height: 64,
              borderRadius: '50%', border: '1.5px solid rgba(107,68,35,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(-12deg)',
              opacity: 0.6
            }}>
              <div className="t-typewriter" style={{ fontSize: 7, color: 'var(--brown)', textAlign: 'center', letterSpacing: '0.1em', lineHeight: 1.2 }}>
                BERLIN<br />2026<br />⌑ ⌑ ⌑
              </div>
            </div>
          </div>

          <div className="t-typewriter" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--brown)', opacity: 0.7 }}>
            POSTKARTE · POST CARD · CARTE POSTALE
          </div>
          <div style={{ borderTop: '1.5px solid rgba(107,68,35,0.3)', marginTop: 6, marginBottom: 24 }} />

          <h1 className="t-display" style={{
            fontSize: 64, fontWeight: 500, lineHeight: 0.92,
            color: 'var(--brown-deep)', margin: '40px 0 0', letterSpacing: '-0.02em'
          }}>
            Luther<br />reise
          </h1>
          <div className="t-handwriting" style={{ fontSize: 40, color: 'var(--apricot-deep)', marginTop: 4, transform: 'rotate(-2deg)', display: 'inline-block' }}>
            2026
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div className="t-handwriting" style={{ fontSize: 22, color: 'var(--brown)', lineHeight: 1.15 }}>
                Komm mit nach<br />
                <span style={{ color: 'var(--sage-deep)' }}>Eisenach</span> &amp; <span style={{ color: 'var(--sage-deep)' }}>Wittenberg</span>
              </div>
              <div className="t-typewriter" style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--brown)', marginTop: 12, fontWeight: 600 }}>
                11 — 13 · JUN · MMXXVI
              </div>
            </div>
            <Stempel rotate={-8} color="sage">3 Tage</Stempel>
          </div>
        </div>
      </div>
    </A5Card>);

}

Object.assign(window, { A5Card, PdfFront, PdfBack, PdfFrontVarSage, PdfFrontVarPostcard });