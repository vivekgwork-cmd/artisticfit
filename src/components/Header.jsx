export default function Header() {
  return (
    <header className="header">
      <nav className="wrap nav" aria-label="Primary">
        <a href="#top" className="nav-logo">
          <img src="/logo-ink.png" alt="Artistic Fit" width="676" height="203" />
        </a>
        <ul className="nav-links">
          <li><a href="#manifesto">Manifesto</a></li>
          <li><a href="#collection">Collection 01</a></li>
          <li><a href="#join">Join</a></li>
        </ul>
        <a href="#join" className="pill">Get early access</a>
      </nav>
    </header>
  );
}
