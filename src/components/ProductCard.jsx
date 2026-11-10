// Front view by default; the back (where the artwork lives) fades in on hover.
export default function ProductCard({ p }) {
  return (
    <a className="card" href={`#element-${p.key}`}>
      <div className="card-media">
        <span className="badge" style={{ background: p.accent }}>New</span>
        <img src={`/products/${p.front}`} alt={`${p.name} T-shirt in ${p.colour}, front`} width="2000" height="2000" loading="lazy" decoding="async" />
        <img className="card-back" src={`/products/${p.back}`} alt="" width="2000" height="2000" loading="lazy" decoding="async" />
      </div>
      <div className="card-info">
        <span className="card-kicker">The Elements · No. {p.no}</span>
        <div className="card-row">
          <span className="card-name">{p.name} — {p.colour}</span>
          <span className="card-price">{p.price ?? 'Coming soon'}</span>
        </div>
      </div>
    </a>
  );
}
