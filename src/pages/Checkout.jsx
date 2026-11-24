import { useEffect, useRef, useState } from 'react';
import { useCart } from '../lib/cart.jsx';
import { Link, navigate } from '../lib/router.jsx';
import { deliveryWindow, inr, lineItems, totals } from '../lib/pricing.js';
import { productTitle } from '../data/products.js';
import { DEMO_MODE, EXPRESS_FEE, FREE_SHIPPING_AT, INDIAN_STATES, SHIPPING_FEE } from '../data/store.js';
import { CouponForm, Totals } from '../components/Summary.jsx';
import { ChevronDown, LockIcon } from '../components/Icons.jsx';
import { thumb } from '../lib/images.js';

const SAVED = 'af-checkout-details';
const EMPTY = {
  email: '', phone: '', news: true,
  firstName: '', lastName: '', address: '', address2: '', city: '', state: '', pin: '',
  save: true,
};

const RULES = {
  email: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email so we can send your order confirmation.'],
  phone: [/^[6-9]\d{9}$/, 'Enter a 10-digit mobile number for delivery updates.'],
  firstName: [/\S/, 'Enter your first name.'],
  lastName: [/\S/, 'Enter your last name.'],
  address: [/\S{3,}/, 'Enter your house number and street.'],
  city: [/\S/, 'Enter your city.'],
  state: [/\S/, 'Select your state.'],
  pin: [/^[1-9]\d{5}$/, 'Enter a valid 6-digit PIN code.'],
  upi: [/^[\w.-]{2,}@[a-zA-Z]{2,}$/, 'Enter a valid UPI ID, e.g. name@okaxis.'],
  cardNumber: [/^\d{16}$/, 'Enter the 16-digit card number.'],
  cardExpiry: [/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY.'],
  cardCvv: [/^\d{3,4}$/, 'Enter the 3-digit CVV.'],
  cardName: [/\S/, 'Enter the name on the card.'],
};

const PAYMENT_FIELDS = { upi: ['upi'], card: ['cardNumber', 'cardExpiry', 'cardCvv', 'cardName'], cod: [] };
const digits = (s) => s.replace(/\D/g, '');

function loadSaved() {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(SAVED)) }; } catch { return EMPTY; }
}

function Field({ name, label, form, errors, onChange, onBlur, type = 'text', autoComplete, inputMode, placeholder, maxLength, optional, half }) {
  const err = errors[name];
  return (
    <div className={`field${half ? ' field--half' : ''}${err ? ' has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>{label}{optional && <span className="muted"> (optional)</span>}</label>
      <input
        id={`f-${name}`} name={name} type={type} value={form[name] ?? ''}
        autoComplete={autoComplete} inputMode={inputMode} placeholder={placeholder} maxLength={maxLength}
        onChange={onChange} onBlur={onBlur} aria-invalid={!!err} aria-describedby={err ? `e-${name}` : undefined}
      />
      {err && <p className="field-error" id={`e-${name}`}>{err}</p>}
    </div>
  );
}

export default function Checkout() {
  const cart = useCart();
  const [form, setForm] = useState(loadSaved);
  const [pay, setPay] = useState({ upi: '', cardNumber: '', cardExpiry: '', cardCvv: '', cardName: '' });
  const [shipping, setShipping] = useState('standard');
  const [payment, setPayment] = useState('upi');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => { document.title = 'Checkout | Artistic Fit'; }, []);

  const lines = lineItems(cart.items);
  const t = totals(cart.items, { coupon: cart.coupon, shipping, payment });
  const all = { ...form, ...pay };

  if (lines.length === 0 && !processing) {
    return (
      <div className="wrap empty-page">
        <h1 className="section-title">Your cart is empty</h1>
        <p className="muted">Add a tee or two before checking out.</p>
        <Link to="/shop" className="btn btn--lg">Shop the collection</Link>
      </div>
    );
  }

  const check = (name, value) => {
    const rule = RULES[name];
    if (!rule) return '';
    const v = ['cardNumber'].includes(name) ? digits(value) : String(value).trim();
    return rule[0].test(v) ? '' : rule[1];
  };

  const onChange = (e) => {
    const { name, type, checked } = e.target;
    let { value } = e.target;
    if (name === 'phone') value = digits(value).replace(/^91(?=\d{10})/, '').slice(0, 10);
    if (name === 'pin') value = digits(value).slice(0, 6);
    if (name === 'cardNumber') value = digits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    if (name === 'cardExpiry') {
      const d = digits(value).slice(0, 4);
      value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    }
    if (name === 'cardCvv') value = digits(value).slice(0, 4);
    const next = type === 'checkbox' ? checked : value;
    if (name in pay) setPay((p) => ({ ...p, [name]: next })); else setForm((f) => ({ ...f, [name]: next }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: check(name, next) }));
  };
  const onBlur = (e) => {
    const { name, value } = e.target;
    if (value) setErrors((er) => ({ ...er, [name]: check(name, value) }));
  };

  const fieldProps = { form: all, errors, onChange, onBlur };

  function placeOrder(e) {
    e.preventDefault();
    const names = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'state', 'pin', ...PAYMENT_FIELDS[payment]];
    const found = {};
    names.forEach((n) => { const m = check(n, all[n] ?? ''); if (m) found[n] = m; });
    setErrors(found);
    const first = names.find((n) => found[n]);
    if (first) {
      const el = document.getElementById(`f-${first}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus({ preventScroll: true });
      return;
    }

    if (form.save) localStorage.setItem(SAVED, JSON.stringify(form)); else localStorage.removeItem(SAVED);

    setProcessing(true);
    const id = `AF-${String(Date.now()).slice(-6)}`;
    const order = {
      id,
      placedAt: new Date().toISOString(),
      items: lines.map(({ key, size, qty, product }) => ({ key, size, qty, name: productTitle(product), colour: product.colour, price: product.price, img: product.back })),
      totals: t,
      coupon: cart.coupon,
      contact: { email: form.email, phone: form.phone },
      address: { name: `${form.firstName} ${form.lastName}`.trim(), address: form.address, address2: form.address2, city: form.city, state: form.state, pin: form.pin },
      shipping,
      payment,
      paymentNote: payment === 'card' ? `Card ending ${digits(pay.cardNumber).slice(-4)}` : payment === 'upi' ? `UPI · ${pay.upi}` : 'Cash on delivery',
      eta: shipping === 'express' ? deliveryWindow(1, 3) : deliveryWindow(),
    };
    // Simulated payment round-trip.
    setTimeout(() => {
      localStorage.setItem(`af-order-${id}`, JSON.stringify(order));
      cart.clear();
      navigate(`/order/${id}`);
    }, 1400);
  }

  const payLabel = payment === 'cod' ? `Place order · ${inr(t.total)}` : `Pay ${inr(t.total)}`;
  const freeStd = t.subtotal >= FREE_SHIPPING_AT;

  return (
    <div className="checkout">
      <button type="button" className="summary-toggle" onClick={() => setSummaryOpen((o) => !o)} aria-expanded={summaryOpen}>
        <span>{summaryOpen ? 'Hide' : 'Show'} order summary <ChevronDown width="16" height="16" /></span>
        <strong>{inr(t.total)}</strong>
      </button>

      <div className="wrap checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder} noValidate ref={formRef}>
          <ol className="steps" aria-label="Checkout progress">
            <li className="is-done"><Link to="/cart">Cart</Link></li>
            <li className="is-active">Details &amp; payment</li>
            <li>Confirmation</li>
          </ol>

          {DEMO_MODE && <p className="demo-note">Demo store: no real payment is taken and no order is shipped.</p>}

          <section className="co-section">
            <h2>Contact</h2>
            <div className="fields">
              <Field name="email" label="Email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" {...fieldProps} />
              <Field name="phone" label="Mobile number" type="tel" autoComplete="tel-national" inputMode="numeric" placeholder="10-digit mobile" maxLength={10} {...fieldProps} />
            </div>
            <label className="check"><input type="checkbox" name="news" checked={!!form.news} onChange={onChange} /> Email me about new prints and restocks</label>
          </section>

          <section className="co-section">
            <h2>Delivery address</h2>
            <div className="fields">
              <Field name="firstName" label="First name" autoComplete="given-name" half {...fieldProps} />
              <Field name="lastName" label="Last name" autoComplete="family-name" half {...fieldProps} />
              <Field name="address" label="House no., building, street" autoComplete="address-line1" {...fieldProps} />
              <Field name="address2" label="Landmark, area" autoComplete="address-line2" optional {...fieldProps} />
              <Field name="pin" label="PIN code" autoComplete="postal-code" inputMode="numeric" maxLength={6} half {...fieldProps} />
              <Field name="city" label="City" autoComplete="address-level2" half {...fieldProps} />
              <div className={`field${errors.state ? ' has-error' : ''}`}>
                <label htmlFor="f-state">State</label>
                <select id="f-state" name="state" value={form.state} onChange={onChange} onBlur={onBlur} autoComplete="address-level1" aria-invalid={!!errors.state}>
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.state && <p className="field-error">{errors.state}</p>}
              </div>
            </div>
            <label className="check"><input type="checkbox" name="save" checked={!!form.save} onChange={onChange} /> Save these details for next time</label>
          </section>

          <section className="co-section">
            <h2>Shipping method</h2>
            <div className="options">
              <label className={`option${shipping === 'standard' ? ' is-active' : ''}`}>
                <input type="radio" name="shipping" value="standard" checked={shipping === 'standard'} onChange={() => setShipping('standard')} />
                <span className="option-main"><strong>Standard</strong><small>Arrives {deliveryWindow()}</small></span>
                <span className="option-price">{freeStd ? 'Free' : inr(SHIPPING_FEE)}</span>
              </label>
              <label className={`option${shipping === 'express' ? ' is-active' : ''}`}>
                <input type="radio" name="shipping" value="express" checked={shipping === 'express'} onChange={() => setShipping('express')} />
                <span className="option-main"><strong>Express</strong><small>Arrives {deliveryWindow(1, 3)}</small></span>
                <span className="option-price">{inr(EXPRESS_FEE)}</span>
              </label>
            </div>
          </section>

          <section className="co-section">
            <h2>Payment</h2>
            <p className="muted small co-lead"><LockIcon width="14" height="14" /> All transactions are secure and encrypted.</p>
            <div className="options">
              <label className={`option${payment === 'upi' ? ' is-active' : ''}`}>
                <input type="radio" name="payment" checked={payment === 'upi'} onChange={() => setPayment('upi')} />
                <span className="option-main"><strong>UPI</strong><small>GPay, PhonePe, Paytm or any UPI app</small></span>
                <span className="option-tag">5% off</span>
              </label>
              {payment === 'upi' && (
                <div className="option-body fields">
                  <Field name="upi" label="UPI ID" placeholder="name@okaxis" autoComplete="off" {...fieldProps} />
                </div>
              )}
              <label className={`option${payment === 'card' ? ' is-active' : ''}`}>
                <input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} />
                <span className="option-main"><strong>Credit or debit card</strong><small>Visa, Mastercard, RuPay</small></span>
                <span className="option-tag">5% off</span>
              </label>
              {payment === 'card' && (
                <div className="option-body fields">
                  <Field name="cardNumber" label="Card number" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" {...fieldProps} />
                  <Field name="cardExpiry" label="Expiry (MM/YY)" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" half {...fieldProps} />
                  <Field name="cardCvv" label="CVV" type="password" inputMode="numeric" autoComplete="cc-csc" placeholder="123" half {...fieldProps} />
                  <Field name="cardName" label="Name on card" autoComplete="cc-name" {...fieldProps} />
                </div>
              )}
              <label className={`option${payment === 'cod' ? ' is-active' : ''}`}>
                <input type="radio" name="payment" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                <span className="option-main"><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span>
              </label>
            </div>
          </section>

          <button type="submit" className="btn btn--block btn--lg place-btn" disabled={processing}>
            {processing ? <><span className="spinner" /> Processing…</> : <><LockIcon width="18" height="18" /> {payLabel}</>}
          </button>
          <p className="muted small center">By placing your order you agree to our terms and exchange policy.</p>
        </form>

        <aside className={`checkout-summary${summaryOpen ? ' is-open' : ''}`}>
          <ul className="sum-lines">
            {lines.map((it) => (
              <li key={`${it.key}-${it.size}`}>
                <span className="sum-img"><img src={thumb(it.product.back)} alt="" /><b>{it.qty}</b></span>
                <span className="sum-name">{productTitle(it.product)}<small>{it.product.colour} · {it.size}</small></span>
                <span>{inr(it.product.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <CouponForm />
          <Totals t={t} payment={payment} />
        </aside>
      </div>
    </div>
  );
}
