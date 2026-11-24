import { useId, useState } from 'react';
import { useCart } from '../lib/cart.jsx';
import { WELCOME_CODE } from '../data/store.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Front-end only: connect submit() to your mailing list provider.
// On success it reveals the welcome code and applies it to the cart, so nobody has to copy it.
export default function SignupForm({ cta = 'Get my 10%', dark = false }) {
  const id = useId();
  const { applyCoupon } = useCart();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    applyCoupon(WELCOME_CODE);
    setDone(true);
  }

  if (done) {
    return (
      <div className={`signup signup--done${dark ? ' signup--dark' : ''}`} aria-live="polite">
        <p className="signup-code">Your code: <strong>{WELCOME_CODE}</strong></p>
        <p className="signup-note is-ok">We’ve applied it to your cart. You’ll see 10% off at checkout.</p>
      </div>
    );
  }

  return (
    <div className={`signup${dark ? ' signup--dark' : ''}`}>
      <form onSubmit={submit} noValidate>
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
        />
        <button type="submit">{cta}</button>
      </form>
      <p className="signup-note" aria-live="polite">{error || 'No spam. Unsubscribe anytime.'}</p>
    </div>
  );
}
