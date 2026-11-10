const MESSAGES = ['Collection 01 — dropping soon', 'Join the list for early access', 'The Elements — fire, water, soil, trees, air'];

export function Announcement() {
  const row = [...MESSAGES, ...MESSAGES, ...MESSAGES];
  return (
    <div className="announce" aria-label={MESSAGES.join('. ')}>
      <div className="announce-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="announce-group" key={copy}>
            {row.map((m, i) => <span key={i}>{m}<i>•</i></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="header">
      <nav className="wrap nav" aria-label="Primary">
        <a href="#top" className="nav-logo">
          <img src="/logo-ink.png" alt="Artistic Fit" width="676" height="203" />
        </a>
        <ul className="nav-links">
          <li><a href="#new">New Arrivals</a></li>
          <li><a href="#elements">Elements</a></li>
          <li><a href="#collections">The Prints</a></li>
          <li><a href="#story">Story</a></li>
        </ul>
        <a href="#notify" className="nav-cta">Notify me</a>
      </nav>
    </header>
  );
}
