import { useId, useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Front-end only — connect submit() to your mailing list provider.
export default function SignupForm({ cta = 'Notify me', hint = '', dark = false }) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ ok: false, msg: hint });

  function submit(e) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus({ ok: false, msg: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ ok: true, msg: "You're on the list — we'll email you when the drop lands." });
    setEmail('');
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
        />
        <button type="submit">{cta}</button>
      </form>
      <p className={`signup-note${status.ok ? ' is-ok' : ''}`} aria-live="polite">{status.msg}</p>
    </div>
  );
}
