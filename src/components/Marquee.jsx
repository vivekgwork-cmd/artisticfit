export default function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {row.map((item, i) => (
              <span className="marquee-item" key={i}>{item}<i className="marquee-oval" /></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
