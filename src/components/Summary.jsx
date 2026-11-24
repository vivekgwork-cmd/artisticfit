import { useState } from 'react';
import { useCart } from '../lib/cart.jsx';
import { inr } from '../lib/pricing.js';
import { COUPONS } from '../data/store.js';
import { TagIcon } from './Icons.jsx';

export function CouponForm() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (coupon) {
    return (
      <div className="coupon-applied">
        <TagIcon width="16" height="16" />
        <span><strong>{coupon}</strong> · {COUPONS[coupon].label}</span>
        <button type="button" className="link-btn" onClick={removeCoupon}>Remove</button>
      </div>
    );
  }

  function submit(e) {
    e.preventDefault();
    if (!code.trim()) return;
    if (applyCoupon(code)) { setCode(''); setError(''); } else setError('That code isn’t valid.');
  }

  return (
    <form className="coupon" onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor="coupon">Discount code</label>
      <input id="coupon" placeholder="Discount code" value={code} onChange={(e) => { setCode(e.target.value); setError(''); }} aria-invalid={!!error} />
      <button type="submit" className="btn btn--outline" disabled={!code.trim()}>Apply</button>
      {error && <p className="field-error">{error}</p>}
    </form>
  );
}

export function Totals({ t, shippingKnown = true, payment }) {
  return (
    <div className="totals">
      <dl>
      <div className="sum-row"><dt>Subtotal</dt><dd>{inr(t.subtotal)}</dd></div>
      {t.couponOff > 0 && <div className="sum-row sum-row--save"><dt>Discount</dt><dd>−{inr(t.couponOff)}</dd></div>}
      {t.prepaidOff > 0 && <div className="sum-row sum-row--save"><dt>Prepaid discount (5%)</dt><dd>−{inr(t.prepaidOff)}</dd></div>}
      <div className="sum-row">
        <dt>Shipping</dt>
        <dd>{shippingKnown ? (t.shippingFee === 0 ? 'Free' : inr(t.shippingFee)) : <span className="muted">At next step</span>}</dd>
      </div>
      <div className="sum-row sum-row--big"><dt>Total</dt><dd><small>INR</small> {inr(t.total)}</dd></div>
      </dl>
      {payment === 'cod' && <p className="muted small">Pay by UPI or card instead and save an extra 5%.</p>}
      {(t.couponOff + t.prepaidOff) > 0 && <p className="savings">You’re saving {inr(t.couponOff + t.prepaidOff)} on this order</p>}
    </div>
  );
}
