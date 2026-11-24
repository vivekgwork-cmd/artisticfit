import { useEffect } from 'react';
import Header, { Announcement, CheckoutHeader } from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Order from './pages/Order.jsx';
import NotFound from './pages/NotFound.jsx';
import { CartProvider } from './lib/cart.jsx';
import { useRoute } from './lib/router.jsx';

const DEFAULT_TITLE = 'Artistic Fit — Oversized Art Tees | Collection 01: The Elements';

// Old one-page anchors (#element-fire, #notify, …) still work.
function redirectLegacyHash() {
  const h = window.location.hash;
  if (!h || h.startsWith('#/')) return;
  const el = h.match(/^#element-(\w+)/);
  window.location.replace(el ? `#/p/${el[1]}` : `#/?s=${h.slice(1)}`);
}

function Page({ path }) {
  if (path === '/') return <Home />;
  if (path === '/shop') return <Shop />;
  if (path === '/cart') return <Cart />;
  if (path === '/checkout') return <Checkout />;
  const pdp = path.match(/^\/p\/([\w-]+)$/);
  if (pdp) return <Product id={pdp[1]} />;
  const order = path.match(/^\/order\/([\w-]+)$/);
  if (order) return <Order id={order[1]} />;
  return <NotFound />;
}

function Shell() {
  const { path, query } = useRoute();
  const inCheckout = path === '/checkout';

  useEffect(redirectLegacyHash, [path]);

  // New page: reset the title and scroll. Home links like #/?s=faq scroll to that section.
  useEffect(() => {
    if (!path.startsWith('/p/') && !['/cart', '/checkout'].includes(path) && !path.startsWith('/order/')) document.title = DEFAULT_TITLE;
    if (query.s) {
      requestAnimationFrame(() => document.getElementById(query.s)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [path, query.s]);

  return (
    <>
      {inCheckout ? <CheckoutHeader /> : <><Announcement /><Header /></>}
      <main>
        <Page path={path} />
      </main>
      {!inCheckout && <Footer />}
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
