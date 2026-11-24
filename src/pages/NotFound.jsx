import { Link } from '../lib/router.jsx';

export default function NotFound() {
  return (
    <div className="wrap empty-page">
      <h1 className="section-title">Page not found</h1>
      <p className="muted">That page doesn’t exist, but all five elements do.</p>
      <Link to="/shop" className="btn btn--lg">Shop the collection</Link>
    </div>
  );
}
