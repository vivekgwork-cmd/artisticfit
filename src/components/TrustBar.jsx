import { CashIcon, LockIcon, SwapIcon, TruckIcon } from './Icons.jsx';
import { EXCHANGE_DAYS, FREE_SHIPPING_AT } from '../data/store.js';
import { inr } from '../lib/pricing.js';

const ITEMS = [
  [TruckIcon, 'Free shipping', `On orders over ${inr(FREE_SHIPPING_AT)}`],
  [SwapIcon, `${EXCHANGE_DAYS}-day exchanges`, 'Wrong size? We pick it up'],
  [CashIcon, 'Cash on delivery', 'Or 5% off on UPI and cards'],
  [LockIcon, 'Secure checkout', 'Encrypted payments'],
];

export default function TrustBar({ compact = false }) {
  return (
    <ul className={`trust${compact ? ' trust--compact' : ''}`}>
      {ITEMS.map(([Icon, title, sub]) => (
        <li key={title}>
          <Icon width="22" height="22" />
          <span><strong>{title}</strong>{!compact && <small>{sub}</small>}</span>
        </li>
      ))}
    </ul>
  );
}
