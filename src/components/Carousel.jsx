import { useEffect, useRef, useState } from 'react';

const Arrow = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d={dir === 'prev' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Horizontal, scroll-snapping rail with a title row and prev/next buttons.
export default function Carousel({ title, id, tabs, resetKey, children, footer }) {
  const rail = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  function update() {
    const el = rail.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0 });
    update();
  }, [resetKey]);

  function go(dir) {
    const el = rail.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  return (
    <section className="rail-section" id={id}>
      <div className="rail-head wrap">
        <h2 className="section-title">{title}</h2>
        <div className="rail-nav">
          <button type="button" className="circle" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous">
            <Arrow dir="prev" />
          </button>
          <button type="button" className="circle" onClick={() => go(1)} disabled={edge.end} aria-label="Next">
            <Arrow dir="next" />
          </button>
        </div>
      </div>
      {tabs && <div className="wrap">{tabs}</div>}
      <div className="rail" ref={rail} onScroll={update}>
        {children}
      </div>
      {footer && <div className="rail-foot">{footer}</div>}
    </section>
  );
}
