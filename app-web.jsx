// Lutherreise — App Root: Web-Einladung Variante A (warm cream)

const { useState: useStateA } = React;

function WebEinladung({ variant = 'warm' }) {
  const countdown = useCountdown('2026-06-11T08:45:00');

  // Variant tints
  const themes = {
    warm: {
      '--cream': '#FFF4E6',
      '--cream-deep': '#F8E8D0',
      '--paper': '#FBF2E0',
      '--apricot': '#F4C7A1',
      '--apricot-deep': '#E8A878',
      '--sage': '#A8C3A0',
      '--sage-deep': '#7FA177',
      '--brown': '#6B4423',
      '--brown-deep': '#4A2E16',
    },
    sage: {
      '--cream': '#F4F1E8',
      '--cream-deep': '#E8E2D2',
      '--paper': '#EDE8D9',
      '--apricot': '#D4A574',
      '--apricot-deep': '#B8864F',
      '--sage': '#7FA177',
      '--sage-deep': '#5C7B57',
      '--brown': '#3D2817',
      '--brown-deep': '#221408',
    },
    blush: {
      '--cream': '#FDF6F0',
      '--cream-deep': '#F8E8DC',
      '--paper': '#FBEEE0',
      '--apricot': '#F5B7B1',
      '--apricot-deep': '#E89A93',
      '--sage': '#B8C7E0',
      '--sage-deep': '#8FA1C4',
      '--brown': '#5A3A4A',
      '--brown-deep': '#3D2333',
    },
  };

  const style = themes[variant] || themes.warm;

  return (
    <div className="paper" data-screen-label="Web-Einladung" style={{
      ...style,
      width: 1080,
      minHeight: 1500,
      position: 'relative',
      color: 'var(--ink)',
    }}>
      {/* corner decorations */}
      <div style={{
        position: 'absolute', top: 32, right: 40, transform: 'rotate(8deg)',
        opacity: 0.5,
      }}>
        <div className="t-typewriter" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--brown)' }}>
          № 2026 / 06
        </div>
      </div>

      <Hero countdown={countdown} />
      <Programm />
      <ReiseMap />
      <Packliste />
      <RSVP />
      <FooterStrip />
    </div>
  );
}

window.WebEinladung = WebEinladung;
