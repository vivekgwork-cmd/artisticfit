import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { subtotalOf } from './pricing.js';
import { COUPONS } from '../data/store.js';

// Front-end-only cart, persisted to localStorage.
const KEY = 'af-cart-v1';
const CartCtx = createContext(null);

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return { items: Array.isArray(saved?.items) ? saved.items : [], coupon: saved?.coupon ?? null };
  } catch {
    return { items: [], coupon: null };
  }
}

export function CartProvider({ children }) {
  const [state, setState] = useState(load);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const add = useCallback((key, size, qty = 1, { openDrawer = true } = {}) => {
    setState((s) => {
      const found = s.items.find((it) => it.key === key && it.size === size);
      const items = found
        ? s.items.map((it) => (it === found ? { ...it, qty: Math.min(10, it.qty + qty) } : it))
        : [...s.items, { key, size, qty }];
      return { ...s, items };
    });
    setLastAdded({ key, size, at: Date.now() });
    if (openDrawer) setOpen(true);
  }, []);

  const setQty = useCallback((key, size, qty) => {
    setState((s) => ({
      ...s,
      items: qty <= 0
        ? s.items.filter((it) => !(it.key === key && it.size === size))
        : s.items.map((it) => (it.key === key && it.size === size ? { ...it, qty: Math.min(10, qty) } : it)),
    }));
  }, []);

  const remove = useCallback((key, size) => setQty(key, size, 0), [setQty]);
  const clear = useCallback(() => setState({ items: [], coupon: null }), []);

  const applyCoupon = useCallback((code) => {
    const c = code.trim().toUpperCase();
    if (!COUPONS[c]) return false;
    setState((s) => ({ ...s, coupon: c }));
    return true;
  }, []);
  const removeCoupon = useCallback(() => setState((s) => ({ ...s, coupon: null })), []);

  const value = useMemo(() => ({
    items: state.items,
    coupon: state.coupon,
    count: state.items.reduce((n, it) => n + it.qty, 0),
    subtotal: subtotalOf(state.items),
    open, setOpen, lastAdded,
    add, setQty, remove, clear, applyCoupon, removeCoupon,
  }), [state, open, lastAdded, add, setQty, remove, clear, applyCoupon, removeCoupon]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
