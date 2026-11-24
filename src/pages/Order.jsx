import { useEffect, useMemo } from 'react';
import { Link } from '../lib/router.jsx';
import { inr } from '../lib/pricing.js';
import { CheckIcon } from '../components/Icons.jsx';
import { Totals } from '../components/Summary.jsx';
import NotFound from './NotFound.jsx';
import { thumb } from '../lib/images.js';

export default function Order({ id }) {
  const order = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(`af-order-${id}`)); } catch { return null; }
  }, [id]);

  useEffect(() => { document.title = `Order ${id} confirmed | Artistic Fit`; }, [id]);

  if (!order) return <NotFound />;
  const first = order.address.name.split(' ')[0];

  return (
    <div className="wrap order">
      <div className="order-hero">
        <span className="order-check"><CheckIcon width="28" height="28" /></span>
        <p className="eyebrow">Order {order.id}</p>
        <h1 className="section-title">Thank you, {first}!</h1>
        <p className="muted">Your order is confirmed. We’ve sent the details to <strong>{order.contact.email}</strong>, and delivery updates will go to +91 {order.contact.phone}.</p>
      </div>

      <div className="order-grid">
        <section className="summary-card">
          <h2>Arriving {order.eta}</h2>
          <ul className="sum-lines">
            {order.items.map((it) => (
              <li key={`${it.key}-${it.size}`}>
                <span className="sum-img"><img src={thumb(it.img)} alt="" /><b>{it.qty}</b></span>
                <span className="sum-name">{it.name}<small>{it.colour} · {it.size}</small></span>
                <span>{inr(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <Totals t={order.totals} />
        </section>

        <section className="summary-card order-details">
          <div>
            <h3>Delivery to</h3>
            <p>{order.address.name}<br />{order.address.address}{order.address.address2 && <>, {order.address.address2}</>}<br />{order.address.city}, {order.address.state} {order.address.pin}</p>
          </div>
          <div>
            <h3>Shipping</h3>
            <p>{order.shipping === 'express' ? 'Express' : 'Standard'} · {order.eta}</p>
          </div>
          <div>
            <h3>Payment</h3>
            <p>{order.paymentNote}{order.payment === 'cod' && <><br />Please keep {inr(order.totals.total)} ready at delivery.</>}</p>
          </div>
          <div>
            <h3>What happens next</h3>
            <ol className="next-steps">
              <li>We pack and ship your order within 24–48 hours.</li>
              <li>You get a tracking link by email and SMS.</li>
              <li>Wrong size? Exchange it within 7 days of delivery.</li>
            </ol>
          </div>
          <Link to="/shop" className="btn btn--lg btn--block">Continue shopping</Link>
        </section>
      </div>
    </div>
  );
}
