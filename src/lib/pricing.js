import { byKey } from '../data/products.js';
import { COUPONS, EXPRESS_FEE, FREE_SHIPPING_AT, PREPAID_OFF, SHIPPING_FEE } from '../data/store.js';

export const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export const lineItems = (items) =>
  items.map((it) => ({ ...it, product: byKey[it.key] })).filter((it) => it.product);

export const subtotalOf = (items) => lineItems(items).reduce((s, it) => s + it.product.price * it.qty, 0);

export const toFreeShipping = (subtotal) => Math.max(0, FREE_SHIPPING_AT - subtotal);

export function totals(items, { coupon = null, shipping = 'standard', payment = null } = {}) {
  const subtotal = subtotalOf(items);
  const c = coupon && COUPONS[coupon];
  const couponOff = c ? Math.round((subtotal * c.pct) / 100) : 0;
  const prepaidOff = payment && payment !== 'cod' ? Math.round((subtotal - couponOff) * PREPAID_OFF) : 0;
  const shippingFee = subtotal === 0 ? 0 : shipping === 'express' ? EXPRESS_FEE : subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  return { subtotal, couponOff, prepaidOff, shippingFee, total: subtotal - couponOff - prepaidOff + shippingFee };
}

// "Arrives Mon, 30 Nov – Thu, 3 Dec": skips Sundays.
export function deliveryWindow(minDays = 3, maxDays = 6, from = new Date()) {
  const add = (n) => {
    const d = new Date(from);
    let left = n;
    while (left > 0) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) left -= 1;
    }
    return d;
  };
  const fmt = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  return `${fmt(add(minDays))} – ${fmt(add(maxDays))}`;
}
