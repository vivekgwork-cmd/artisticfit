import { useEffect } from 'react';
import { useCart } from '../lib/cart.jsx';
import { Link, navigate } from '../lib/router.jsx';
import { lineItems, totals } from '../lib/pricing.js';
import { CartLine, Upsell } from '../components/CartDrawer.jsx';
import { FreeShipping } from '../components/Bits.jsx';
import { CouponForm, Totals } from '../components/Summary.jsx';
import TrustBar from '../components/TrustBar.jsx';
import { LockIcon } from '../components/Icons.jsx';

export default function Cart() {
  const { items, coupon, setQty, remove, count } = useCart();
  const lines = lineItems(items);
  const t = totals(items, { coupon });

  useEffect(() => { document.title = 'Your cart | Artistic Fit'; }, []);

  if (lines.length === 0) {
    return (
      <div className="wrap empty-page">
        <h1 className="section-title">Your cart is empty</h1>
        <p className="muted">Five prints, one for every element. Find yours.</p>
        <Link to="/shop" className="btn btn--lg">Shop the collection</Link>
      </div>
    );
  }

  return (
    <div className="wrap cart-page">
      <h1 className="section-title">Your cart <span className="muted">({count})</span></h1>
      <div className="cart-layout">
        <div>
          <FreeShipping subtotal={t.subtotal} />
          <ul className="lines">
            {lines.map((it) => (
              <CartLine key={`${it.key}-${it.size}`} it={it} onQty={(q) => setQty(it.key, it.size, q)} onRemove={() => remove(it.key, it.size)} />
            ))}
          </ul>
          <Upsell items={items} />
          <Link to="/shop" className="link-btn continue">← Continue shopping</Link>
        </div>
        <aside className="summary-card">
          <h2>Order summary</h2>
          <CouponForm />
          <Totals t={t} />
          <button type="button" className="btn btn--block btn--lg" onClick={() => navigate('/checkout')}>
            <LockIcon width="18" height="18" /> Checkout securely
          </button>
          <p className="muted small center">UPI · Cards · Cash on delivery</p>
          <TrustBar compact />
        </aside>
      </div>
    </div>
  );
}
