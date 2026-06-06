// Lutherreise — Programm, Packliste, RSVP

const { useState: useStateP, useEffect: useEffectP } = React;

/* ─── Programm mit Tab ─────────────────────────────────────── */
const DETAIL_LABELS = {
  wartburg: 'Rundgang über die Wartburg',
  cranach: 'Cranach-Altar entdecken',
};

function Programm() {
  const { TAGE } = window.LUTHER_DATA;
  const [active, setActive] = useStateP(1);
  const [openDetail, setOpenDetail] = useStateP(null);
  const tag = TAGE.find(t => t.nr === active);

  const switchTag = (nr) => { setActive(nr); setOpenDetail(null); };
  const toggleDetail = (key) => setOpenDetail(cur => cur === key ? null : key);

  return (
    <section style={{ padding: '32px 56px', position: 'relative' }}>
      <SectionTitle pre="Programm" titel="Drei Tage, ein Weg." tape="apricot" />

      <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
        {TAGE.map(t => (
          <button
            key={t.nr}
            data-active={active === t.nr}
            className="day-tab"
            onClick={() => switchTag(t.nr)}
          >
            <span className="t-typewriter" style={{ fontSize: 10, letterSpacing: '0.15em', display: 'block', opacity: 0.7 }}>
              TAG {t.nr}
            </span>
            <span style={{ fontSize: 16 }}>{t.tag} · {t.datum}</span>
          </button>
        ))}
      </div>

      {/* Day card */}
      <div className="day-card" style={{
        marginTop: 22,
        background: '#FFFDF7',
        border: '1.5px solid rgba(107,68,35,0.2)',
        borderRadius: 14,
        padding: '28px 32px',
        position: 'relative',
        boxShadow: '0 6px 20px rgba(107,68,35,0.08)',
      }}>
        <Tape color={tag.farbe === 'sage' ? 'sage' : 'apricot'} rotate={-4} top={-12} left="50%" width={120} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="t-handwriting" style={{ fontSize: 28, color: 'var(--apricot-deep)', lineHeight: 1, transform: 'rotate(-2deg)', display: 'inline-block' }}>
              „{tag.motto}"
            </div>
            <h3 className="t-display" style={{ margin: '6px 0 4px', fontSize: 32, color: 'var(--brown-deep)', fontWeight: 500 }}>
              {tag.tag}, {tag.datum}
            </h3>
            <div className="t-typewriter" style={{ fontSize: 12, color: 'var(--brown)', opacity: 0.7, letterSpacing: '0.1em' }}>
              {tag.ort}
            </div>
          </div>
          <Stempel rotate={6} color={tag.farbe === 'sage' ? 'sage' : 'apricot'}>Tag {tag.nr} / 3</Stempel>
        </div>

        {/* Timeline */}
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 56, top: 4, bottom: 4,
            borderLeft: '2px dotted rgba(107,68,35,0.3)',
          }} />
          {tag.items.map((item, i) => {
            const hasDetail = item.detail && (
              (item.detail === 'wartburg' && window.WartburgSection) ||
              (item.detail === 'cranach' && window.CranachAltarSection)
            );
            const isOpen = hasDetail && openDetail === item.detail;
            return (
            <React.Fragment key={i}>
            <li style={{
              display: 'grid',
              gridTemplateColumns: '52px 24px 1fr',
              gap: 12,
              alignItems: 'baseline',
              padding: '8px 0',
            }}>
              <span className="t-typewriter" style={{
                fontSize: 13, color: 'var(--brown)', fontWeight: 600,
                letterSpacing: '0.04em',
                textAlign: 'right',
                paddingTop: 2,
              }}>
                {item.zeit}
              </span>
              <span style={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
                <span className="tl-dot" style={{
                  background: item.highlight ? 'var(--sage)' : 'var(--apricot-deep)',
                }} />
              </span>
              <div>
                <div className="t-body" style={{
                  fontSize: 16, fontWeight: item.highlight ? 600 : 500,
                  color: 'var(--ink)',
                }}>
                  {item.titel}
                  {item.highlight && (
                    <span className="t-handwriting" style={{ marginLeft: 10, fontSize: 18, color: 'var(--sage-deep)' }}>
                      ✦
                    </span>
                  )}
                </div>
                {item.note && (
                  <div className="t-handwriting" style={{ fontSize: 17, color: 'var(--brown)', opacity: 0.8, lineHeight: 1.1, marginTop: 1 }}>
                    {item.note}
                  </div>
                )}
                {item.dienste && (
                  <div style={{ marginTop: 9, display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {item.dienste.map((d, k) => (
                      <span key={k} className="dienst-chip" style={{
                        display: 'inline-flex', alignItems: 'baseline', gap: 6,
                        padding: '3px 11px', borderRadius: 999,
                        background: 'rgba(127,161,119,0.12)',
                        border: '1px solid rgba(127,161,119,0.35)',
                      }}>
                        <span className="t-typewriter" style={{ fontSize: 10, letterSpacing: '0.07em', color: 'var(--sage-deep)', textTransform: 'uppercase' }}>
                          {d.rolle}
                        </span>
                        <span className="t-body" style={{ fontSize: 13, fontWeight: 600, color: 'var(--brown-deep)', whiteSpace: 'nowrap' }}>
                          {d.wer}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
                {hasDetail && (
                  <button
                    type="button"
                    onClick={() => toggleDetail(item.detail)}
                    aria-expanded={isOpen}
                    style={{
                      marginTop: 8,
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '5px 13px',
                      borderRadius: 999, cursor: 'pointer',
                      border: `1.5px solid ${isOpen ? 'var(--sage-deep)' : 'rgba(107,68,35,0.35)'}`,
                      background: isOpen ? 'var(--sage-deep)' : '#FFFDF7',
                      color: isOpen ? '#fff' : 'var(--brown-deep)',
                      fontFamily: "'Special Elite', monospace",
                      fontSize: 11, letterSpacing: '0.06em',
                      transition: 'background .2s, border-color .2s, color .2s',
                    }}>
                    <span style={{ fontSize: 13, lineHeight: 1 }}>{item.detail === 'cranach' ? '🖼' : '🗺'}</span>
                    {DETAIL_LABELS[item.detail]}
                    <span style={{ fontSize: 13, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
                  </button>
                )}
              </div>
            </li>
            {isOpen && (
              <li style={{
                padding: '0 0 10px',
                animation: 'fadeIn .3s ease',
                position: 'relative',
                zIndex: 1,
                background: '#FFFDF7',
              }}>
                {item.detail === 'wartburg' && window.WartburgSection && <window.WartburgSection />}
                {item.detail === 'cranach' && window.CranachAltarSection && <window.CranachAltarSection />}
              </li>
            )}
            </React.Fragment>
            );
          })}
        </ol>

        {/* Day 2 map section */}
        {tag.nr === 2 && window.WittenbergSection && <window.WittenbergSection />}
      </div>
    </section>
  );
}

/* ─── Packliste ────────────────────────────────────────────── */
const PACKLISTE_KEY = 'lutherreise_packliste_v1';

function Packliste() {
  const { PACKLISTE } = window.LUTHER_DATA;
  // Beim ersten Render aus localStorage laden (pro Browser, nicht geteilt)
  const [checked, setChecked] = useStateP(() => {
    try { return JSON.parse(localStorage.getItem(PACKLISTE_KEY)) || {}; }
    catch (e) { return {}; }
  });
  // Bei jeder Änderung speichern
  useEffectP(() => {
    try { localStorage.setItem(PACKLISTE_KEY, JSON.stringify(checked)); }
    catch (e) {}
  }, [checked]);
  const toggle = (key) => setChecked(c => ({ ...c, [key]: !c[key] }));

  const total = PACKLISTE.reduce((s, k) => s + k.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <section style={{ padding: '32px 56px', position: 'relative' }}>
      <SectionTitle pre="Vor der Reise" titel="Was Du mitbringen solltest" tape="sage" />

      <div className="t-handwriting" style={{
        fontSize: 22, color: 'var(--sage-deep)',
        marginTop: 8, marginLeft: 4,
      }}>
        Hak ab, was Du schon eingepackt hast → {done} / {total}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 18, marginTop: 18,
      }}>
        {PACKLISTE.map((kat, i) => (
          <div key={i} className="dashed-frame" style={{
            background: 'var(--paper)', padding: '16px 18px',
            transform: `rotate(${(i % 2 ? 0.5 : -0.5)}deg)`,
          }}>
            <div className="t-display" style={{
              fontSize: 18, fontWeight: 600, color: 'var(--brown-deep)',
              marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{kat.kat}</span>
              <span style={{ flex: 1, borderTop: '1.5px dotted rgba(107,68,35,0.4)' }} />
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {kat.items.map((it, j) => {
                const key = `${i}-${j}`;
                const isC = !!checked[key];
                return (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      className="chk"
                      data-checked={isC}
                      role="checkbox"
                      aria-checked={isC}
                      tabIndex={0}
                      onClick={() => toggle(key)}
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(key); } }}
                    >
                      {isC && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M 2 7 L 6 11 L 12 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="t-body" style={{
                      fontSize: 14,
                      color: isC ? 'rgba(107,68,35,0.5)' : 'var(--ink)',
                      textDecoration: isC ? 'line-through' : 'none',
                      transition: 'color .15s, text-decoration .15s',
                    }}>
                      {it}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Gruppenaufteilung ───────────────────────────────────── */
const GRUPPE_FARBEN = ['apricot', 'sage', 'rose', 'apricot'];

function Gruppen() {
  const { GRUPPEN } = window.LUTHER_DATA;
  return (
    <section style={{ padding: '32px 56px', position: 'relative' }}>
      <SectionTitle pre="Gemeinsam unterwegs" titel="Unsere Gruppen" tape="apricot" />

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 18, marginTop: 18,
      }}>
        {GRUPPEN.map((g, i) => (
          <div key={g.nr} style={{
            background: '#FFFDF7',
            border: '1.5px solid rgba(107,68,35,0.2)',
            borderRadius: 14,
            padding: '20px 22px 18px',
            position: 'relative',
            boxShadow: '0 6px 20px rgba(107,68,35,0.08)',
            transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)`,
          }}>
            <Tape color={GRUPPE_FARBEN[i % GRUPPE_FARBEN.length]} rotate={i % 2 ? 5 : -5} top={-12} left="50%" width={90} />

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
              <span className="t-handwriting" style={{ fontSize: 38, color: 'var(--sage-deep)', lineHeight: 1 }}>
                {g.nr}
              </span>
              <h3 className="t-display" style={{ margin: 0, fontSize: 22, color: 'var(--brown-deep)', fontWeight: 500 }}>
                Gruppe {g.nr}
              </h3>
            </div>

            <div className="t-typewriter" style={{
              fontSize: 11, letterSpacing: '0.06em', color: 'var(--apricot-deep)',
              marginBottom: 12, textTransform: 'uppercase',
            }}>
              Leitung · {g.leiter}
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {g.mit.map((m, j) => (
                <li key={j} className="t-body" style={{
                  fontSize: 13, color: 'var(--ink)',
                  padding: '3px 10px', borderRadius: 999,
                  background: 'rgba(107,68,35,0.06)',
                  border: '1px solid rgba(107,68,35,0.12)',
                }}>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Dienstplan ──────────────────────────────────────────── */
function Dienstplan() {
  const { DIENSTPLAN } = window.LUTHER_DATA;
  const headCell = {
    fontFamily: "'Special Elite', monospace",
    fontSize: 11, letterSpacing: '0.06em', color: 'var(--brown)',
    padding: '10px 12px', textAlign: 'center',
    borderBottom: '2px dotted rgba(107,68,35,0.3)',
  };
  const aufgabeCell = {
    fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600,
    fontSize: 14, color: 'var(--brown-deep)',
    padding: '11px 12px', textAlign: 'left', whiteSpace: 'nowrap',
  };
  const cell = {
    fontSize: 13, color: 'var(--ink)', textAlign: 'center',
    padding: '11px 12px',
  };

  return (
    <section style={{ padding: '8px 56px 32px', position: 'relative' }}>
      <SectionTitle pre="Wer macht was" titel="Dienstplan" tape="sage" />

      <div style={{
        marginTop: 18,
        background: '#FFFDF7',
        border: '1.5px solid rgba(107,68,35,0.2)',
        borderRadius: 14,
        padding: '22px 24px',
        position: 'relative',
        boxShadow: '0 6px 20px rgba(107,68,35,0.08)',
        overflowX: 'auto',
      }}>
        <Tape color="apricot" rotate={-4} top={-12} left="50%" width={110} />

        {/* Rotierende Dienste */}
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460 }}>
          <thead>
            <tr>
              <th style={{ ...headCell, textAlign: 'left' }}>Dienst</th>
              {DIENSTPLAN.spalten.map((s, i) => (
                <th key={i} style={headCell}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIENSTPLAN.rotation.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px dashed rgba(107,68,35,0.15)' }}>
                <td style={aufgabeCell}>{r.aufgabe}</td>
                {r.tage.map((t, j) => (
                  <td key={j} style={cell}>
                    {t === '—' ? (
                      <span style={{ color: 'rgba(107,68,35,0.3)' }}>—</span>
                    ) : (
                      <span style={{
                        display: 'inline-block', padding: '3px 11px', borderRadius: 999,
                        background: 'rgba(127,161,119,0.14)',
                        border: '1px solid rgba(127,161,119,0.35)',
                        color: 'var(--brown-deep)', fontWeight: 600,
                      }}>
                        {t}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Feste Dienste */}
        <div style={{
          marginTop: 18, paddingTop: 16,
          borderTop: '2px dotted rgba(107,68,35,0.3)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12,
        }}>
          {DIENSTPLAN.fest.map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span className="t-typewriter" style={{
                fontSize: 10, letterSpacing: '0.07em', color: 'var(--apricot-deep)',
                textTransform: 'uppercase',
              }}>
                {f.aufgabe}
              </span>
              <span className="t-body" style={{ fontSize: 14, fontWeight: 600, color: 'var(--brown-deep)' }}>
                {f.wer.split(' · ').map((n, k, arr) => (
                  <React.Fragment key={k}>
                    <span style={{ whiteSpace: 'nowrap' }}>{n}</span>
                    {k < arr.length - 1 && ' · '}
                  </React.Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RSVP ────────────────────────────────────────────────── */
const RSVP_KEY = 'lutherreise_rsvp_names_v1';
const rsvpNames = () => {
  try { return JSON.parse(localStorage.getItem(RSVP_KEY)) || []; }
  catch (e) { return []; }
};

function RSVP() {
  const [name, setName] = useStateP('');
  const [zusage, setZusage] = useStateP(null); // 'ja' | 'vielleicht' | 'nein'
  const [sent, setSent] = useStateP(false);
  const [dup, setDup] = useStateP(false); // bereits mit diesem Namen geantwortet?

  // Google Forms Anbindung
  const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSe20Nztj-fHMwI0FjJCiGIMqSnvGH7gNcu-EWpmSOs8LsuE6Q/formResponse';
  const ENTRY_NAME = 'entry.1116031617';
  const ENTRY_ZUSAGE = 'entry.972603903';
  const ZUSAGE_LABEL = {
    ja:         'komme mit / I will attend',
    vielleicht: 'überlege noch / I am still considering',
    nein:       'kann leider nicht / Unfortunately, I cannot attend',
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name || !zusage) return;
    const norm = name.trim().toLowerCase();
    const names = rsvpNames();
    // Doppel-Antwort mit gleichem Namen (in diesem Browser) verhindern
    if (names.includes(norm)) { setDup(true); return; }
    const body = new URLSearchParams();
    body.append(ENTRY_NAME, name);
    body.append(ENTRY_ZUSAGE, ZUSAGE_LABEL[zusage]);
    // no-cors: Google liefert keine CORS-Header zurück; wir senden „fire-and-forget"
    fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body }).catch(() => {});
    try { localStorage.setItem(RSVP_KEY, JSON.stringify([...names, norm])); }
    catch (e2) {}
    setSent(true);
  };

  return (
    <section id="rsvp" style={{ padding: '32px 56px 56px', position: 'relative' }}>
      <SectionTitle pre="Antwort" titel="Bist Du dabei?" tape="rose" />

      <div className="rsvp-grid" style={{
        marginTop: 22,
        background: '#FFFDF7',
        borderRadius: 14,
        border: '1.5px solid rgba(107,68,35,0.2)',
        padding: '28px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 0.8fr',
        gap: 32,
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 6px 20px rgba(107,68,35,0.08)',
      }}>
        <Tape color="rose" rotate={4} top={-12} left="14%" width={100} />
        <Tape color="sage" rotate={-6} top={-12} left="86%" width={80} />

        {!sent ? (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label className="t-handwriting" style={{ fontSize: 22, color: 'var(--brown)' }}>
              Mein Name ist…
              <input
                value={name}
                onChange={(e) => { setName(e.target.value); if (dup) setDup(false); }}
                placeholder="Vorname"
                className="t-display"
                style={{
                  display: 'block', marginTop: 4, width: '100%', maxWidth: 360,
                  border: 0, borderBottom: '2px dashed var(--brown)',
                  background: 'transparent', padding: '6px 4px',
                  fontSize: 22, color: 'var(--brown-deep)', outline: 'none',
                }}
              />
            </label>

            <div>
              <div className="t-handwriting" style={{ fontSize: 22, color: 'var(--brown)', marginBottom: 8 }}>
                Ich…
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { v: 'ja',         l: '✦ komme mit',     c: 'sage' },
                  { v: 'vielleicht', l: 'überlege noch',   c: 'apricot' },
                  { v: 'nein',       l: 'kann leider nicht', c: 'brown' },
                ].map(opt => (
                  <button
                    key={opt.v} type="button"
                    onClick={() => setZusage(opt.v)}
                    className={`btn-pill ${zusage === opt.v ? (opt.c === 'sage' ? 'sage' : 'primary') : ''}`}
                    style={{ opacity: zusage && zusage !== opt.v ? 0.55 : 1 }}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-pill primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}
                    disabled={!name || !zusage}>
              Antwort abschicken →
            </button>

            {dup && (
              <div className="t-handwriting" style={{ fontSize: 18, color: 'var(--apricot-deep)', lineHeight: 1.2, marginTop: -4 }}>
                Mit diesem Namen wurde von diesem Gerät bereits geantwortet ✓
              </div>
            )}

            <div className="t-typewriter" style={{ fontSize: 11, color: 'var(--brown)', opacity: 0.6, letterSpacing: '0.1em', marginTop: 4 }}>
              Oder direkt an: Jugendvorstände der Gemeinde
            </div>
          </form>
        ) : (
          <div style={{ padding: '12px 0' }}>
            <Stempel rotate={-4} color="sage">Antwort erhalten</Stempel>
            <div className="t-display" style={{ fontSize: 32, color: 'var(--brown-deep)', marginTop: 14, fontWeight: 500 }}>
              Danke, {name}!
            </div>
            <div className="t-handwriting" style={{ fontSize: 24, color: 'var(--sage-deep)', marginTop: 4 }}>
              {zusage === 'ja' && 'Wir freuen uns riesig auf Dich ✦'}
              {zusage === 'vielleicht' && 'Sag uns Bescheid, sobald Du weißt!'}
              {zusage === 'nein' && 'Schade — Du fehlst uns. Bis bald!'}
            </div>
          </div>
        )}

        {/* Side decoration: postcard */}
        <div style={{ position: 'relative' }}>
          <div className="polaroid" style={{ transform: 'rotate(3deg)', padding: '14px 14px 22px' }}>
            <div style={{
              border: '1.5px solid rgba(107,68,35,0.25)',
              padding: '14px 16px',
              fontFamily: "'Special Elite', monospace",
              fontSize: 11,
              lineHeight: 1.7,
              color: 'var(--brown)',
              background: 'var(--cream)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(107,68,35,0.25)', paddingBottom: 4, marginBottom: 8 }}>
                <span>POSTKARTE</span>
                <span>· LUTHERREISE ·</span>
              </div>
              <div>An: alle von der Jugendgruppe</div>
              <div>Von: Jugendgruppe</div>
              <div style={{ marginTop: 8, fontFamily: "'Caveat', cursive", fontSize: 22, lineHeight: 1.1, color: 'var(--brown-deep)' }}>
                „Komm mit, es wird schön!"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────── */
function FooterStrip() {
  return (
    <footer style={{
      padding: '20px 56px 36px',
      borderTop: '1.5px dashed rgba(107,68,35,0.3)',
      marginTop: 12,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 12,
    }}>
      <div className="t-typewriter" style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--brown)', opacity: 0.7 }}>
        LUTHERREISE · 11 — 13 · JUNI · MMXXVI
      </div>
      <div className="t-handwriting" style={{ fontSize: 22, color: 'var(--sage-deep)' }}>
        Soli Deo Gloria ✦
      </div>
    </footer>
  );
}

Object.assign(window, { Programm, Gruppen, Dienstplan, Packliste, RSVP, FooterStrip });
