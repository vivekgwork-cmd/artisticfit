import { useEffect, useState } from 'react';
import { ChevronDown, CloseIcon, MinusIcon, PlusIcon, TruckIcon } from './Icons.jsx';
import { inr, toFreeShipping } from '../lib/pricing.js';
import { FREE_SHIPPING_AT, SIZE_CHART } from '../data/store.js';

export function Qty({ value, onChange, min = 1, small = false, label = 'Quantity' }) {
  return (
    <div className={`qty${small ? ' qty--sm' : ''}`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity"><MinusIcon width="14" height="14" /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= 10} aria-label="Increase quantity"><PlusIcon width="14" height="14" /></button>
    </div>
  );
}

export function FreeShipping({ subtotal }) {
  const left = toFreeShipping(subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);
  return (
    <div className="ship-meter">
      <p>
        <TruckIcon width="18" height="18" />
        {left > 0
          ? <span>You’re <strong>{inr(left)}</strong> away from <strong>free shipping</strong></span>
          : <strong>You’ve unlocked free shipping</strong>}
      </p>
      <div className="ship-bar"><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export function Accordion({ title, children, defaultOpen = false }) {
  return (
    <details className="acc" open={defaultOpen}>
      <summary>{title}<ChevronDown width="18" height="18" /></summary>
      <div className="acc-body">{children}</div>
    </details>
  );
}

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-scrim" onClick={onClose} />
      <div className="modal-panel">
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SizeGuide({ open, onClose }) {
  const [unit, setUnit] = useState('in');
  const v = (n) => (unit === 'in' ? n : Math.round(n * 2.54));
  return (
    <Modal open={open} onClose={onClose} title="Size guide">
      <p className="muted">
        Garment measurements, laid flat. Every tee is cut oversized: <strong>take your usual size</strong> for the relaxed look, or one size down for a closer fit.
      </p>
      <div className="unit-toggle" role="group" aria-label="Units">
        {['in', 'cm'].map((u) => (
          <button key={u} type="button" className={unit === u ? 'is-active' : ''} onClick={() => setUnit(u)}>{u}</button>
        ))}
      </div>
      <table className="size-table">
        <thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Shoulder</th></tr></thead>
        <tbody>
          {SIZE_CHART.map((r) => (
            <tr key={r.size}><td>{r.size}</td><td>{v(r.chest)}</td><td>{v(r.length)}</td><td>{v(r.shoulder)}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="muted small">Between sizes? Size up for more room. Exchanges are free if it doesn’t fit.</p>
    </Modal>
  );
}
