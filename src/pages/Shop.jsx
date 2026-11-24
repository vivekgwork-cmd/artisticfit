import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import TrustBar from '../components/TrustBar.jsx';
import { PRODUCTS } from '../data/products.js';
import { Link } from '../lib/router.jsx';
import { SIZES } from '../lib/images.js';

const TONES = {
  all: () => true,
  dark: (p) => p.key !== 'water',
  light: (p) => p.key === 'water',
};

export default function Shop() {
  const [tone, setTone] = useState('all');
  const list = useMemo(() => PRODUCTS.filter(TONES[tone]), [tone]);

  return (
    <div className="wrap shop">
      <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Shop all</span></nav>
      <header className="shop-head">
        <div>
          <p className="eyebrow">Collection 01 · The Elements</p>
          <h1 className="section-title">Shop all tees</h1>
          <p className="muted shop-intro">Five original prints on heavyweight oversized tees. Pick one, or collect the set: shipping is free on two or more.</p>
        </div>
        <div className="chips" role="group" aria-label="Filter by tee colour">
          {[['all', 'All'], ['dark', 'Dark tees'], ['light', 'Light tees']].map(([k, label]) => (
            <button key={k} type="button" className={`chip${tone === k ? ' is-active' : ''}`} onClick={() => setTone(k)} aria-pressed={tone === k}>{label}</button>
          ))}
          <span className="muted small">{list.length} product{list.length === 1 ? '' : 's'}</span>
        </div>
      </header>
      <div className="grid">
        {list.map((p) => <ProductCard p={p} key={p.key} sizes={SIZES.grid} />)}
      </div>
      <TrustBar />
    </div>
  );
}
