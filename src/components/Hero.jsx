import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import OvalRing from './OvalRing.jsx';
import BulgeText from './BulgeText.jsx';
import SignupForm from './SignupForm.jsx';

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 });

  function track(e) {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <span className="badge"><span className="pulse" aria-hidden="true" />Coming soon · Collection 01</span>

        <div className="hero-stage" onPointerMove={track} onPointerLeave={reset}>
          <motion.div className="hero-tilt" style={{ rotateX, rotateY }}>
            <OvalRing text="WEARABLE ART ✺ TAILORED TO YOU ✺ HAND-FINISHED ✺ MADE TO MOVE ✺ COLLECTION 01 ✺ " />
            <motion.img
              className="hero-logo"
              src="/logo-ink.png"
              alt="Artistic Fit"
              width="676"
              height="203"
              initial={{ scaleY: 0.1, scaleX: 1.35, opacity: 0 }}
              animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 11, delay: 0.15 }}
            />
          </motion.div>
        </div>

        <div className="hero-copy">
          <BulgeText as="h1" lines={['Wear the art', 'you are']} amount={0.35} />
          <div>
            <p className="lede">
              Artistic Fit is a studio where the canvas is cut to your shape. Hand-finished pieces,
              bold prints and silhouettes tailored to move with you — our first collection is almost
              off the easel.
            </p>
            <SignupForm hint="Be first in line for the launch drop. No spam, just art." />
          </div>
        </div>
      </div>
    </section>
  );
}
