import { useState } from 'react';
import Carousel from './Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import { Accordion } from './Bits.jsx';
import { ArrowRight } from './Icons.jsx';
import { Link } from '../lib/router.jsx';
import { inr } from '../lib/pricing.js';
import { PRODUCTS, byKey, productTitle } from '../data/products.js';
import { FAQ } from '../data/store.js';
import { productImg, SIZES } from '../lib/images.js';

const FROM = Math.min(...PRODUCTS.map((p) => p.price));

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <div className="hero-panels">
          {PRODUCTS.map((p) => (
            <Link to={`/p/${p.key}`} key={p.key} className="hero-panel" aria-label={`Shop ${productTitle(p)}`}>
              <img src={`/panels/${p.key}.jpg`} alt={`${p.name} artwork`} width="594" height="1557" />
              <span className="hero-panel-cap"><span className="kanji">{p.kanji}</span>{p.name}</span>
            </Link>
          ))}
        </div>
        <div className="hero-overlay">
          <p className="hero-tag">Collection 01<br />The Elements</p>
          <p className="hero-kanji" aria-hidden="true">火水土木風</p>
          <div className="hero-bottom">
            <div className="hero-pitch">
              <h1>Art you wear<br />on your back.</h1>
              <p className="hero-copy">Five woodblock-style prints on heavyweight oversized tees. {inr(FROM)} each, free shipping on two or more.</p>
              <div className="hero-ctas">
                <Link to="/shop" className="hero-cta">Shop the collection</Link>
                <Link to="/?s=elements" className="hero-cta hero-cta--ghost">Find your element</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Bestsellers() {
  return (
    <Carousel
      title="Shop the collection"
      id="new"
      footer={<Link className="pill-btn" to="/shop">View all 5 tees <ArrowRight width="18" height="18" /></Link>}
    >
      {PRODUCTS.map((p) => <ProductCard p={p} key={p.key} />)}
    </Carousel>
  );
}

// Tabs per element: front, back and a close look at the print.
export function ShopByElement() {
  const [tab, setTab] = useState('fire');
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
    { label: 'Front', sub: 'Quiet: just the Artistic Fit oval', file: p.front, src: `/products/${p.front}`, kind: 'photo' },
    { label: 'Back', sub: p.line, file: p.back, src: `/products/${p.back}`, kind: 'photo' },
    { label: 'The print', sub: 'Full artwork panel', src: `/panels/${p.key}.jpg`, kind: 'art' },
  ];

  return (
    <Carousel
      title="Find your element"
      id="elements"
      tabs={tabs}
      resetKey={tab}
      footer={<Link className="btn btn--lg" to={`/p/${p.key}`}>Shop {p.name} · {inr(p.price)} <ArrowRight width="18" height="18" /></Link>}
    >
      {views.map((v) => (
        <Link to={`/p/${p.key}`} className={`view view--${v.kind}`} key={v.label} style={{ '--tee': p.tee }}>
          <div className="view-media">
            <img {...(v.file ? productImg(v.file, SIZES.card) : { src: v.src })} alt={`${productTitle(p)}, ${v.label.toLowerCase()}`} loading="lazy" decoding="async" />
          </div>
          <div className="card-info">
            <span className="card-kicker">{p.name} · {p.colour}</span>
            <div className="card-row">
              <span className="card-name">{v.label}</span>
              <span className="card-price">{v.sub}</span>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}

export function SplitBanner({ left, right, caption, title, ctas = [], tone = 'stone', fit = 'photo' }) {
  const src = (x) => (x.startsWith('/') ? { src: x } : productImg(x, SIZES.banner));
  return (
    <section className={`banner banner--${tone}`}>
      <img className={`banner-side banner-side--left banner-side--${fit}`} {...src(left)} alt="" loading="lazy" decoding="async" />
      <img className={`banner-side banner-side--right banner-side--${fit}`} {...src(right)} alt="" loading="lazy" decoding="async" />
      <div className="banner-text">
        {caption && <p className="banner-caption">{caption}</p>}
        <h2>{title}</h2>
        {ctas.length > 0 && (
          <div className="banner-ctas">
            {ctas.map(([label, to]) => <Link key={to} className="banner-cta" to={to}>{label}</Link>)}
          </div>
        )}
      </div>
    </section>
  );
}

const WHY = [
  ['01', 'Art first', 'Each element starts as an original drawing in the spirit of old woodblock prints, then gets framed across the back like a print on a gallery wall.'],
  ['02', 'Built heavy', 'A thick, structured 240 GSM cotton that holds its boxy shape wash after wash, with no see-through and no sag.'],
  ['03', 'Cut oversized', 'Dropped shoulders, a wide body and a longer sleeve. Relaxed, never sloppy.'],
  ['04', 'Quiet front', 'All the art lives on the back. The front keeps it simple with a small Artistic Fit oval, so it works anywhere.'],
];

export function WhyUs() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <h2 className="section-title">Why it’s worth wearing</h2>
        <div className="why-grid">
          {WHY.map(([n, t, d]) => (
            <div className="why-item" key={n}>
              <span className="why-no">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ElementCards() {
  return (
    <Carousel title="The five elements" id="collections">
      {PRODUCTS.map((p) => (
        <Link className="collection-card" to={`/p/${p.key}`} key={p.key} style={{ '--tint': p.tee }}>
          <img src={`/panels/${p.key}.jpg`} alt="" width="594" height="1557" loading="lazy" decoding="async" />
          <span className="collection-kanji" aria-hidden="true">{p.kanji}</span>
          <span className="collection-text">
            <strong>{p.name}</strong>
            <small>{p.line}</small>
            <em>Shop now · {inr(p.price)}</em>
          </span>
          <ArrowRight className="collection-arrow" width="20" height="20" />
        </Link>
      ))}
    </Carousel>
  );
}

const NOTES = [
  'Every element starts as a drawing: fire, water, soil, trees and air, carved out in the spirit of old woodblock prints.',
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
        <Link to="/shop" className="btn btn--lg notes-cta">Shop the collection</Link>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap faq-grid">
        <div>
          <h2 className="section-title">Questions, answered</h2>
          <p className="muted faq-sub">Something else? Write to <a href="mailto:hello@artisticfit.com">hello@artisticfit.com</a> and we’ll reply within a day.</p>
        </div>
        <div className="faq-list">
          {FAQ.map(([q, a], i) => <Accordion key={q} title={q} defaultOpen={i === 0}><p>{a}</p></Accordion>)}
        </div>
      </div>
    </section>
  );
}
