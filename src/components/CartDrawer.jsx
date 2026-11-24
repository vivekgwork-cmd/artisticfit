import { useEffect, useState } from 'react';
import { useCart } from '../lib/cart.jsx';
import { Link, navigate, useRoute } from '../lib/router.jsx';
import { inr, lineItems } from '../lib/pricing.js';
import { PRODUCTS, productTitle } from '../data/products.js';
import { SIZES } from '../data/store.js';
import { FreeShipping, Qty } from './Bits.jsx';
import { ArrowRight, CashIcon, CloseIcon, LockIcon, SwapIcon } from './Icons.jsx';
import { thumb } from '../lib/images.js';

export function CartLine({ it, onQty, onRemove, compact = false }) {
  const p = it.product;
  return (
    <li className={`line${compact ? ' line--compact' : ''}`}>
      <Link to={`/p/${p.key}`} className="line-img"><img src={thumb(p.back)} alt={productTitle(p)} loading="lazy" /></Link>
      <div className="line-info">
        <div className="line-top">
          <Link to={`/p/${p.key}`} className="line-name">{productTitle(p)}</Link>
          <span className="line-price">{inr(p.price * it.qty)}</span>
        </div>
        <p className="line-meta">{p.colour} · Size {it.size}</p>
        <div className="line-actions">
          <Qty value={it.qty} onChange={onQty} min={1} small label={`Quantity of ${p.name}`} />
          <button type="button" className="link-btn" onClick={onRemove}>Remove</button>
        </div>
      </div>
    </li>
  );
}

// Suggest one element the shopper does not have yet: nudges them over the free-shipping line.
export function Upsell({ items }) {
  const { add } = useCart();
  const inCart = new Set(items.map((it) => it.key));
  const p = PRODUCTS.find((x) => !inCart.has(x.key));
  const lastSize = items[items.length - 1]?.size ?? 'M';
  const [size, setSize] = useState(lastSize);
  useEffect(() => setSize(lastSize), [lastSize]);
  if (!p || items.length === 0) return null;
  return (
    <div className="upsell">
      <p className="upsell-title">Complete the set</p>
      <div className="upsell-row">
        <Link to={`/p/${p.key}`} className="upsell-img"><img src={thumb(p.back)} alt="" loading="lazy" /></Link>
        <div className="upsell-info">
          <Link to={`/p/${p.key}`}><strong>{productTitle(p)}</strong></Link>
          <span>{p.colour} · {inr(p.price)}</span>
          <div className="upsell-actions">
            <label className="sr-only" htmlFor="upsell-size">Size</label>
            <select id="upsell-size" value={size} onChange={(e) => setSize(e.target.value)}>
              {SIZES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button type="button" className="btn btn--sm" onClick={() => add(p.key, size, 1, { openDrawer: false })}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal, count } = useCart();
  const { path } = useRoute();
  const lines = lineItems(items);

  useEffect(() => setOpen(false), [path, setOpen]);
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <div className={`sheet sheet--right${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="sheet-scrim" onClick={() => setOpen(false)} />
      <aside className="sheet-panel drawer" role="dialog" aria-label="Your cart">
        <div className="sheet-head">
          <h2>Your cart {count > 0 && <span className="muted">({count})</span>}</h2>
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart"><CloseIcon /></button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="drawer-empty-title">Your cart is empty</p>
            <p className="muted">Five prints, one for every element. Find yours.</p>
            <Link to="/shop" className="btn">Shop the collection</Link>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              <FreeShipping subtotal={subtotal} />
              <ul className="lines">
                {lines.map((it) => (
                  <CartLine key={`${it.key}-${it.size}`} it={it} compact onQty={(q) => setQty(it.key, it.size, q)} onRemove={() => remove(it.key, it.size)} />
                ))}
              </ul>
              <Upsell items={items} />
            </div>
            <div className="drawer-foot">
              <div className="sum-row sum-row--big"><span>Subtotal</span><strong>{inr(subtotal)}</strong></div>
              <p className="muted small">Taxes included. Shipping and discounts are calculated at checkout.</p>
              <button type="button" className="btn btn--block btn--lg" onClick={() => navigate('/checkout')}>
                <LockIcon width="18" height="18" /> Checkout · {inr(subtotal)}
              </button>
              <Link to="/cart" className="drawer-viewcart">View cart <ArrowRight width="16" height="16" /></Link>
              <ul className="mini-trust">
                <li><CashIcon width="16" height="16" /> COD available</li>
                <li><SwapIcon width="16" height="16" /> 7-day exchanges</li>
              </ul>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
