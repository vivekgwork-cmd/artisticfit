import { motion } from 'framer-motion';
import BulgeText from './BulgeText.jsx';

const PILLARS = [
  { n: '01', title: 'The Canvas', body: 'Natural, breathable fabrics — organic cotton, linen and heavyweight twill — chosen to hold colour and soften with every wear.' },
  { n: '02', title: 'The Brushwork', body: 'Original artwork, printed and hand-detailed in small batches. No two pieces carry quite the same stroke.' },
  { n: '03', title: 'The Fit', body: 'Patterns drafted for real bodies and real movement — relaxed where you want ease, sharp where you want shape.' },
];

const rise = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

export default function Manifesto() {
  return (
    <section className="section" id="manifesto">
      <div className="wrap">
        <span className="eyebrow">The manifesto</span>
        <BulgeText lines={['Every body is a canvas.', 'Every fit, a signature.']} amount={0.3} className="manifesto-title" />

        <motion.div className="manifesto-body" {...rise} transition={{ duration: 0.7 }}>
          <p>
            We started Artistic Fit because clothing had split in two: <strong>art you admire</strong> and{' '}
            <strong>clothes you actually wear</strong>. We think they belong together.
          </p>
          <p>
            Each piece begins as artwork in our studio — brushwork, ink studies, torn-paper collage — and is
            translated onto fabric that's cut to flatter, layered to last and finished by hand. No trends to
            chase. Just limited runs that feel made for you, because the fit is part of the art.
          </p>
        </motion.div>

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <motion.article className="pillar" key={p.n} {...rise} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <span className="pillar-num">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
