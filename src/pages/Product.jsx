import { useEffect, useRef, useState } from 'react';
import { byKey, PRODUCTS, productTitle } from '../data/products.js';
import { EXCHANGE_DAYS, FREE_SHIPPING_AT, SIZES, SPECS } from '../data/store.js';
import { useCart } from '../lib/cart.jsx';
import { Link, navigate } from '../lib/router.jsx';
import { deliveryWindow, inr, toFreeShipping } from '../lib/pricing.js';
import { Accordion, Qty, SizeGuide } from '../components/Bits.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { BoltIcon, CashIcon, CheckIcon, RulerIcon, SwapIcon, TruckIcon } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';
import { productImg, SIZES as IMG_SIZES, thumb } from '../lib/images.js';

export default function Product({ id }) {
  const p = byKey[id];
  if (!p) return <NotFound />;
  return <ProductView p={p} key={p.key} />;
}

function ProductView({ p }) {
  const { add, subtotal } = useCart();
  const [view, setView] = useState(1); // open on the back: that's where the art is
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [guide, setGuide] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const buyRef = useRef(null);
  const sizesRef = useRef(null);

  useEffect(() => {
    document.title = `${productTitle(p)} — ${p.colour} | Artistic Fit`;
  }, [p]);

  // Sticky add-to-cart bar once the main button scrolls out of view.
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const views = [
    { label: 'Front', file: p.front, src: `/products/${p.front}`, kind: 'photo' },
    { label: 'Back', file: p.back, src: `/products/${p.back}`, kind: 'photo' },
    { label: 'The print', src: `/panels/${p.key}.jpg`, kind: 'art' },
  ];

  function requireSize() {
    if (size) return true;
    setSizeError(true);
    sizesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }

  function addToCart() {
    if (!requireSize()) return;
    add(p.key, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function buyNow() {
    if (!requireSize()) return;
    add(p.key, size, qty, { openDrawer: false });
    navigate('/checkout');
  }

  const left = toFreeShipping(subtotal + p.price * qty);
  const others = PRODUCTS.filter((x) => x.key !== p.key);

  return (
    <div className="pdp-page">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to="/shop">Shop all</Link><span>/</span><span>{p.name}</span>
        </nav>

        <div className="pdp">
          <div className="gallery">
            <div className={`gallery-main view--${views[view].kind}`} style={{ '--tee': p.tee }}>
              <img {...(views[view].file ? productImg(views[view].file, IMG_SIZES.gallery) : { src: views[view].src })} key={views[view].src} alt={`${productTitle(p)}, ${views[view].label.toLowerCase()}`} />
              <span className="gallery-label">{views[view].label}</span>
            </div>
            <div className="thumbs" role="tablist" aria-label="Product images">
              {views.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  role="tab"
                  aria-selected={view === i}
                  className={`thumb view--${v.kind}${view === i ? ' is-active' : ''}`}
                  style={{ '--tee': p.tee }}
                  onClick={() => setView(i)}
                >
                  <img src={v.file ? thumb(v.file) : v.src} alt={v.label} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="buy">
            <p className="eyebrow">The Elements · No. {p.no} <span className="kanji">{p.kanji}</span></p>
            <h1 className="buy-title">{productTitle(p)}</h1>
            <p className="buy-colour">
              <span className="swatch" style={{ background: p.tee }} /> {p.colour}
            </p>
            <p className="buy-price">{inr(p.price)} <small>Inclusive of all taxes</small></p>
            <p className="buy-line">{p.story}</p>

            <div className={`sizes${sizeError ? ' has-error' : ''}`} ref={sizesRef}>
              <div className="sizes-head">
                <span>Size{size ? <>: <strong>{size}</strong></> : ''}</span>
                <button type="button" className="link-btn" onClick={() => setGuide(true)}><RulerIcon width="16" height="16" /> Size guide</button>
              </div>
              <div className="size-opts" role="radiogroup" aria-label="Size">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={size === s}
                    className={`size-opt${size === s ? ' is-active' : ''}`}
                    onClick={() => { setSize(s); setSizeError(false); }}
                  >{s}</button>
                ))}
              </div>
              <p className="sizes-note">
                {sizeError ? 'Please choose a size first.' : 'Oversized fit: take your usual size, or size down for a closer fit.'}
              </p>
            </div>

            <div className="buy-row" ref={buyRef}>
              <Qty value={qty} onChange={setQty} />
              <button type="button" className={`btn btn--lg btn--grow${added ? ' is-done' : ''}`} onClick={addToCart}>
                {added ? <><CheckIcon width="18" height="18" /> Added to cart</> : <>Add to cart · {inr(p.price * qty)}</>}
              </button>
            </div>
            <button type="button" className="btn btn--lg btn--block btn--outline" onClick={buyNow}>
              <BoltIcon width="18" height="18" /> Buy it now
            </button>

            <ul className="buy-perks">
              <li><TruckIcon width="18" height="18" />
                <span>Order today, delivered <strong>{deliveryWindow()}</strong>
                  {left > 0 ? <> · Add {inr(left)} more for free shipping</> : <> · <strong>Ships free</strong></>}
                </span>
              </li>
              <li><SwapIcon width="18" height="18" /><span>Free size exchange within {EXCHANGE_DAYS} days</span></li>
              <li><CashIcon width="18" height="18" /><span>Cash on delivery available · 5% off on UPI and cards</span></li>
            </ul>

            <div className="buy-acc">
              <Accordion title="Details" defaultOpen>
                <dl className="specs">
                  {SPECS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </Accordion>
              <Accordion title="Shipping & exchanges">
                <p>Free standard shipping on orders over {inr(FREE_SHIPPING_AT)}, otherwise ₹99. Orders ship in 24–48 hours and arrive in 3–7 days. Express delivery is available at checkout.</p>
                <p>Wrong size? Exchange it within {EXCHANGE_DAYS} days of delivery. It must be unworn, unwashed and tagged. We pick it up from your door.</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <section className="rail-section">
        <div className="wrap">
          <h2 className="section-title">Complete the set</h2>
          <p className="muted section-sub">Two or more tees ship free.</p>
          <div className="grid grid--4">
            {others.map((x) => <ProductCard p={x} key={x.key} badge={null} sizes="(max-width: 1100px) 50vw, 25vw" />)}
          </div>
        </div>
      </section>

      <div className={`sticky-buy${showSticky ? ' is-shown' : ''}`} aria-hidden={!showSticky}>
        <img src={thumb(p.back)} alt="" />
        <div className="sticky-buy-info">
          <strong>{p.name}</strong>
          <span>{inr(p.price)}{size ? ` · ${size}` : ''}</span>
        </div>
        <button type="button" className="btn" onClick={addToCart} tabIndex={showSticky ? 0 : -1}>
          {size ? 'Add to cart' : 'Select size'}
        </button>
      </div>

      <SizeGuide open={guide} onClose={() => setGuide(false)} />
    </div>
  );
}
