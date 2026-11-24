import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useCart } from '../lib/cart.jsx';
import { inr } from '../lib/pricing.js';
import { productTitle } from '../data/products.js';
import { SIZES } from '../data/store.js';
import { PlusIcon } from './Icons.jsx';
import { productImg, SIZES as IMG_SIZES } from '../lib/images.js';

// Front view by default; the back (where the artwork lives) fades in on hover.
// "Quick add" opens a size row on the image so shoppers can add without leaving the page.
export default function ProductCard({ p, badge = 'New', sizes = IMG_SIZES.card }) {
  const { add } = useCart();
  const [picking, setPicking] = useState(false);

  return (
    <div className="card" onMouseLeave={() => setPicking(false)}>
      <div className="card-media">
        <Link to={`/p/${p.key}`} className="card-link" aria-label={productTitle(p)}>
          {badge && <span className="badge" style={{ background: p.accent }}>{badge}</span>}
          <img {...productImg(p.front, sizes)} alt={`${productTitle(p)} in ${p.colour}, front`} width="2000" height="2000" loading="lazy" decoding="async" />
          <img className="card-back" {...productImg(p.back, sizes)} alt="" width="2000" height="2000" loading="lazy" decoding="async" />
        </Link>
        <div className={`quick${picking ? ' is-open' : ''}`}>
          {picking ? (
            <div className="quick-sizes" role="group" aria-label={`Choose a size for ${p.name}`}>
              {SIZES.map((s) => (
                <button key={s} type="button" onClick={() => { add(p.key, s); setPicking(false); }}>{s}</button>
              ))}
            </div>
          ) : (
            <button type="button" className="quick-btn" onClick={() => setPicking(true)}>
              <PlusIcon width="16" height="16" /> Quick add
            </button>
          )}
        </div>
      </div>
      <Link to={`/p/${p.key}`} className="card-info">
        <span className="card-kicker">The Elements · No. {p.no}</span>
        <div className="card-row">
          <span className="card-name">{p.name} <span className="card-colour">— {p.colour}</span></span>
          <span className="card-price">{inr(p.price)}</span>
        </div>
        <span className="card-sub">{p.line}</span>
      </Link>
    </div>
  );
}
