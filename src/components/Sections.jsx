import { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS, byKey } from '../data/products.js';

const ViewAll = ({ href = '#notify', label = 'View all' }) => (
  <a className="pill-btn" href={href}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="3" y="2.5" width="9" height="13" rx="1.5" /><path d="M5.5 6h4M5.5 9h4M5.5 12h2.5M12 6.5h2.5v9H6" />
    </svg>
    {label}
  </a>
);

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <div className="hero-panels">
          {PRODUCTS.map((p) => (
            <figure key={p.key}>
              <img src={`/panels/${p.key}.jpg`} alt={`${p.name} artwork`} width="424" height="1112" />
              <figcaption><span className="kanji">{p.kanji}</span>{p.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="hero-overlay">
          <p className="hero-tag">Collection 01<br />The Elements</p>
          <p className="hero-kanji" aria-hidden="true">火水土木風</p>
          <div className="hero-bottom">
            <a href="#notify" className="hero-cta">Get early access</a>
            <p className="hero-copy">Five elements, drawn in the old woodblock way and printed across the back of an oversized tee.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewArrivals() {
  return (
    <Carousel title="New Arrivals" id="new" footer={<ViewAll />}>
      {PRODUCTS.map((p) => <ProductCard p={p} key={p.key} />)}
    </Carousel>
  );
}

// Tabs per element: front, back and a close look at the print.
export function ShopByElement() {
  const fromHash = () => {
    const k = window.location.hash.replace('#element-', '');
    return byKey[k] ? k : null;
  };
  const [tab, setTab] = useState(() => fromHash() ?? 'fire');

  useEffect(() => {
    const onHash = () => {
      const k = fromHash();
      if (k) {
        setTab(k);
        document.getElementById('elements')?.scrollIntoView();
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const p = byKey[tab];
  const tabs = (
    <div className="tabs" role="tablist">
      {PRODUCTS.map((x) => (
        <button key={x.key} type="button" role="tab" aria-selected={tab === x.key} className={`tab${tab === x.key ? ' is-active' : ''}`} onClick={() => setTab(x.key)}>
          <span className="kanji">{x.kanji}</span>{x.name}
        </button>
      ))}
    </div>
  );

  const views = [
    { label: 'Front', sub: 'Artistic Fit oval, centre chest', src: `/products/${p.front}`, kind: 'photo' },
    { label: 'Back', sub: p.line, src: `/products/${p.back}`, kind: 'photo' },
    { label: 'The print', sub: `${p.name} — full artwork panel`, src: `/panels/${p.key}.jpg`, kind: 'art' },
  ];

  return (
    <Carousel title="Shop by Element" id="elements" tabs={tabs} resetKey={tab} footer={<ViewAll label={`Notify me about ${p.name}`} />}>
      {views.map((v) => (
        <figure className={`view view--${v.kind}`} key={v.label} style={{ '--tee': p.tee }}>
          <div className="view-media">
            <img src={v.src} alt={`${p.name} T-shirt — ${v.label.toLowerCase()}`} loading="lazy" decoding="async" />
          </div>
          <figcaption className="card-info">
            <span className="card-kicker">{p.name} · {p.colour}</span>
            <div className="card-row">
              <span className="card-name">{v.label}</span>
              <span className="card-price">{v.sub}</span>
            </div>
          </figcaption>
        </figure>
      ))}
    </Carousel>
  );
}

export function SplitBanner({ left, right, caption, title, cta, href = '#notify', tone = 'stone', fit = 'photo' }) {
  return (
    <section className={`banner banner--${tone}`}>
      <img className={`banner-side banner-side--left banner-side--${fit}`} src={left} alt="" loading="lazy" decoding="async" />
      <img className={`banner-side banner-side--right banner-side--${fit}`} src={right} alt="" loading="lazy" decoding="async" />
      <div className="banner-text">
        {caption && <p className="banner-caption">{caption}</p>}
        <h2>{title}</h2>
        {cta && <a className="banner-cta" href={href}>{cta}</a>}
      </div>
    </section>
  );
}

export function ElementCards() {
  return (
    <Carousel title="The Five Elements" id="collections">
      {PRODUCTS.map((p) => (
        <a className="collection-card" href={`#element-${p.key}`} key={p.key} style={{ '--tint': p.tee }}>
          <img src={`/panels/${p.key}.jpg`} alt="" width="424" height="1112" loading="lazy" decoding="async" />
          <span className="collection-kanji" aria-hidden="true">{p.kanji}</span>
          <span className="collection-text">
            <strong>{p.name}</strong>
            <small>{p.line}</small>
          </span>
          <svg className="collection-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ))}
    </Carousel>
  );
}

const NOTES = [
  'Every element starts as a drawing — fire, water, soil, trees and air, carved out in the spirit of old woodblock prints.',
  'The art lives on the back, framed like a print on a gallery wall. The front keeps it quiet: just the oval.',
  'Oversized, dropped-shoulder tees in colours pulled straight from each artwork.',
];

export function StudioNotes() {
  return (
    <section className="notes" id="story">
      <div className="wrap">
        <svg className="quote-mark" width="52" height="40" viewBox="0 0 52 40" aria-hidden="true">
          <path fill="currentColor" d="M0 40V24C0 10 7 2 21 0l2 6c-7 2-11 6-11 13h10v21H0Zm29 0V24c0-14 7-22 21-24l2 6c-7 2-11 6-11 13h10v21H29Z" />
        </svg>
        <div className="notes-rail">
          {NOTES.map((n) => <p key={n}>{n}</p>)}
        </div>
        <p className="notes-by">— Notes from the Artistic Fit studio</p>
      </div>
    </section>
  );
}
