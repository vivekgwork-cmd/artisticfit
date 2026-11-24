import { useEffect, useState } from 'react';
import { Link, useRoute } from '../lib/router.jsx';
import { useCart } from '../lib/cart.jsx';
import { BagIcon, CloseIcon, LockIcon, MenuIcon } from './Icons.jsx';
import { EXCHANGE_DAYS, FREE_SHIPPING_AT } from '../data/store.js';
import { inr } from '../lib/pricing.js';
import { PRODUCTS } from '../data/products.js';

const MESSAGES = [
  `Free shipping on orders over ${inr(FREE_SHIPPING_AT)}`,
  `Easy ${EXCHANGE_DAYS}-day exchanges`,
  'Cash on delivery across India',
  'Extra 5% off when you pay by UPI or card',
];

export function Announcement() {
  const row = [...MESSAGES, ...MESSAGES];
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

function CartButton() {
  const { count, setOpen, lastAdded } = useCart();
  const [bump, setBump] = useState(false);
  useEffect(() => {
    if (!lastAdded) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 500);
    return () => clearTimeout(t);
  }, [lastAdded]);
  return (
    <button type="button" className={`cart-btn${bump ? ' is-bump' : ''}`} onClick={() => setOpen(true)} aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}>
      <BagIcon width="22" height="22" />
      {count > 0 && <span className="cart-count">{count}</span>}
    </button>
  );
}

export default function Header() {
  const [menu, setMenu] = useState(false);
  const { path, query } = useRoute();
  useEffect(() => setMenu(false), [path, query.s]);
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menu);
  }, [menu]);

  return (
    <header className="header">
      <nav className="wrap nav" aria-label="Primary">
        <button type="button" className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu"><MenuIcon width="24" height="24" /></button>
        <Link to="/" className="nav-logo">
          <img src="/logo-ink.png" alt="Artistic Fit" width="676" height="203" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/shop" className={path === '/shop' ? 'is-active' : ''}>Shop all</Link></li>
          {PRODUCTS.map((p) => (
            <li key={p.key}><Link to={`/p/${p.key}`} className={path === `/p/${p.key}` ? 'is-active' : ''}>{p.name}</Link></li>
          ))}
          <li><Link to="/?s=story">Story</Link></li>
        </ul>
        <div className="nav-right">
          <Link to="/shop" className="nav-cta">Shop now</Link>
          <CartButton />
        </div>
      </nav>

      <div className={`sheet sheet--left${menu ? ' is-open' : ''}`} aria-hidden={!menu}>
        <div className="sheet-scrim" onClick={() => setMenu(false)} />
        <div className="sheet-panel" role="dialog" aria-label="Menu">
          <div className="sheet-head">
            <img src="/logo-ink.png" alt="Artistic Fit" className="sheet-logo" />
            <button type="button" className="icon-btn" onClick={() => setMenu(false)} aria-label="Close menu"><CloseIcon /></button>
          </div>
          <ul className="menu-list">
            <li><Link to="/shop">Shop all tees</Link></li>
            {PRODUCTS.map((p) => (
              <li key={p.key}>
                <Link to={`/p/${p.key}`}><span className="kanji">{p.kanji}</span>{p.name} <small>{p.colour}</small></Link>
              </li>
            ))}
            <li><Link to="/?s=story">Our story</Link></li>
            <li><Link to="/?s=faq">FAQ</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export function CheckoutHeader() {
  return (
    <header className="header header--checkout">
      <nav className="wrap nav">
        <Link to="/" className="nav-logo"><img src="/logo-ink.png" alt="Artistic Fit" width="676" height="203" /></Link>
        <span className="secure-tag"><LockIcon width="16" height="16" /> Secure checkout</span>
        <Link to="/cart" className="back-link">Back to cart</Link>
      </nav>
    </header>
  );
}
