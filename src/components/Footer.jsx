import SignupForm from './SignupForm.jsx';
import { Link } from '../lib/router.jsx';
import { PRODUCTS } from '../data/products.js';

export default function Footer() {
  return (
    <footer className="footer" id="notify">
      <div className="wrap footer-top">
        <div className="footer-signup">
          <h2>Get 10% off your first order.</h2>
          <p>Join the list for new prints, restocks and studio notes. Your code arrives instantly.</p>
          <SignupForm cta="Get my 10%" />
        </div>
        <div className="footer-cols">
          <div>
            <h3>Shop</h3>
            <ul>
              <li><Link to="/shop">All tees</Link></li>
              {PRODUCTS.map((p) => <li key={p.key}><Link to={`/p/${p.key}`}>{p.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li><Link to="/?s=faq">FAQ</Link></li>
              <li><Link to="/?s=faq">Shipping &amp; exchanges</Link></li>
              <li><Link to="/cart">Your cart</Link></li>
              <li><a href="mailto:hello@artisticfit.com">hello@artisticfit.com</a></li>
            </ul>
          </div>
          <div>
            <h3>Studio</h3>
            <ul>
              <li><Link to="/?s=story">Our story</Link></li>
              <li><a href="#/">Instagram</a></li>
              <li><a href="#/">Pinterest</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap footer-base">
        <img src="/logo-paper.png" alt="Artistic Fit" width="676" height="203" />
        <span>© {new Date().getFullYear()} Artistic Fit. Wearable art, printed on your back.</span>
      </div>
    </footer>
  );
}
