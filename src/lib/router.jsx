import { useMemo, useSyncExternalStore } from 'react';

// Tiny hash router (#/shop, #/p/fire, #/cart, #/checkout, #/order/AF-123456).
// Hash routes keep the site deployable to any static host with no rewrite rules.

const subscribe = (cb) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};
const getHash = () => window.location.hash;

export function parseHash(hash) {
  const raw = hash.replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  return { path: path.startsWith('/') ? path : '/', query: Object.fromEntries(new URLSearchParams(qs)) };
}

export function useRoute() {
  const hash = useSyncExternalStore(subscribe, getHash, getHash);
  return useMemo(() => parseHash(hash), [hash]);
}

export function navigate(to) {
  window.location.hash = to;
}

// Clicking a link to the page you're already on doesn't fire hashchange, so handle the scroll here.
export function Link({ to, children, onClick, ...rest }) {
  function click(e) {
    onClick?.(e);
    if (e.defaultPrevented || window.location.hash !== `#${to}`) return;
    e.preventDefault();
    const s = parseHash(`#${to}`).query.s;
    const el = s && document.getElementById(s);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return <a href={`#${to}`} onClick={click} {...rest}>{children}</a>;
}
