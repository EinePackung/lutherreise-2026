// Lutherreise — gemeinsame Bausteine

const { useState, useEffect, useMemo } = React;

/* ─── Tape: Klebestreifen ─────────────────────────────── */
function Tape({ color = 'apricot', rotate = -8, top = -10, left = '50%', width = 96, style }) {
  const cls = color === 'sage' ? 'tape sage' : color === 'rose' ? 'tape rose' : 'tape';
  return (
    <span
      className={cls}
      style={{
        top, left, width, transform: `translateX(-50%) rotate(${rotate}deg)`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Stempel ──────────────────────────────────────────── */
function Stempel({ children, rotate = -6, color = 'brown' }) {
  const c = color === 'sage' ? 'var(--sage-deep)' : color === 'apricot' ? 'var(--apricot-deep)' : 'var(--brown)';
  return (
    <div
      className="t-typewriter"
      style={{
        display: 'inline-block',
        border: `2.5px solid ${c}`,
        color: c,
        padding: '6px 12px',
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        transform: `rotate(${rotate}deg)`,
        opacity: 0.85,
        background: 'transparent',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Polaroid mit Bild-Slot ──────────────────────────── */
function Polaroid({ id, placeholder, caption, rotate = -2, width = 240, height = 200, captionFont = 'caveat', children }) {
  return (
    <div className="polaroid" style={{ transform: `rotate(${rotate}deg)`, width }}>
      <div style={{ width: '100%', height, position: 'relative' }}>
        {children || (
          <image-slot
            id={id}
            placeholder={placeholder}
            shape="rect"
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        )}
      </div>
      {caption && (
        <div
          style={{
            position: 'absolute', bottom: 8, left: 0, right: 0,
            textAlign: 'center',
            fontFamily: captionFont === 'caveat' ? "'Caveat', cursive" : "'Special Elite', monospace",
            fontSize: captionFont === 'caveat' ? 22 : 12,
            color: 'var(--brown)',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

/* ─── Wegweiser-Pfeil ─────────────────────────────────── */
function Arrow({ rotate = 0, length = 80, color = 'var(--brown)', style }) {
  return (
    <svg
      width={length} height="20" viewBox="0 0 120 20"
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    >
      <path
        d="M 4 10 Q 30 4, 60 10 T 110 10"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"
        strokeDasharray="1 4"
      />
      <path d="M 100 4 L 114 10 L 100 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Sticker / Badge ─────────────────────────────────── */
function Sticker({ children, color = 'sage', rotate = -4 }) {
  return (
    <span className={`sticker ${color}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

/* ─── Countdown Hook ──────────────────────────────────── */
function useCountdown(targetIso) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const raw = target - now;
  const past = raw < 0;
  const diff = Math.abs(raw);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, ended: raw <= 0, past };
}

/* ─── Calendar ICS Download ───────────────────────────── */
function downloadICS() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lutherreise 2026//DE',
    'BEGIN:VEVENT',
    'UID:lutherreise-2026@gemeinde',
    'DTSTAMP:20260601T080000Z',
    'DTSTART;VALUE=DATE:20260611',
    'DTEND;VALUE=DATE:20260614',
    'SUMMARY:Lutherreise 2026',
    'DESCRIPTION:Auf den Spuren der Reformation — Eisenach & Wittenberg',
    'LOCATION:Gemeinde Berlin',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Lutherreise-2026.ics';
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
}

Object.assign(window, {
  Tape, Stempel, Polaroid, Arrow, Sticker,
  useCountdown, downloadICS,
});
