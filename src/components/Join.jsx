import { motion } from 'framer-motion';
import BulgeText from './BulgeText.jsx';
import SignupForm from './SignupForm.jsx';

export default function Join() {
  return (
    <section className="join" id="join">
      <div className="wrap join-inner">
        <motion.img
          className="join-logo"
          src="/logo-paper.png"
          alt=""
          width="676"
          height="203"
          initial={{ scaleY: 0.1, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 180, damping: 11 }}
        />
        <span className="eyebrow eyebrow--hot">The unveiling</span>
        <BulgeText lines={['The drop lands soon']} amount={0.4} />
        <p>Join the list for first access to Collection 01, studio notes and a private preview before anyone else.</p>
        <SignupForm cta="Reserve my spot" dark />
      </div>
    </section>
  );
}
