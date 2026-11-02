import { motion } from 'framer-motion';
import BulgeText from './BulgeText.jsx';

const INK = '#111111';
const PAPER = '#f4f1ea';
const HOT = '#ff4d1c';

const PIECES = [
  {
    name: 'The Sunspot Tee',
    art: (
      <>
        <path d="M110 70 L80 82 L40 130 L62 160 L88 145 L90 330 L210 330 L212 145 L238 160 L260 130 L220 82 L190 70 C 182 92, 118 92, 110 70Z" fill={INK} />
        <circle cx="150" cy="210" r="42" fill={HOT} />
        <circle cx="150" cy="210" r="42" fill="url(#halftone)" />
      </>
    ),
  },
  {
    name: 'The Tidal Overshirt',
    art: (
      <>
        <path d="M105 60 L60 80 L30 220 L65 228 L82 140 L84 340 L216 340 L218 140 L235 228 L270 220 L240 80 L195 60 C 185 85, 115 85, 105 60Z" fill={INK} />
        <path d="M84 190 C 124 160, 172 232, 216 196" stroke={PAPER} strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M84 240 C 124 210, 172 282, 216 246" stroke={HOT} strokeWidth="12" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    name: 'The Charcoal Trouser',
    art: (
      <>
        <path d="M95 60 L205 60 L215 120 L240 360 L170 360 L150 180 L130 360 L60 360 L85 120Z" fill={INK} />
        <path d="M92 96 L208 96" stroke={HOT} strokeWidth="9" />
        <ellipse cx="200" cy="300" rx="22" ry="14" fill={PAPER} />
      </>
    ),
  },
  {
    name: 'The Studio Jacket',
    art: (
      <>
        <path d="M100 50 L55 70 L25 240 L60 248 L80 140 L75 350 L225 350 L220 140 L240 248 L275 240 L245 70 L200 50 L170 110 L150 70 L130 110Z" fill={INK} />
        <path d="M100 50 L55 70 L25 240 L60 248 L80 140 L75 350 L225 350 L220 140 L240 248 L275 240 L245 70 L200 50 L170 110 L150 70 L130 110Z" fill="url(#halftone-paper)" />
        <path d="M96 220 C 136 200, 160 260, 206 230" stroke={HOT} strokeWidth="8" fill="none" strokeLinecap="round" />
      </>
    ),
  },
];

export default function Collection() {
  return (
    <section className="section section--tight" id="collection">
      <div className="wrap">
        <div className="collection-head">
          <div>
            <span className="eyebrow">Collection 01</span>
            <BulgeText lines={['Primer']} amount={0.5} className="collection-title" />
          </div>
          <p>Four foundational pieces, still drying on the easel. Hover to sneak a peek — the full reveal lands at launch.</p>
        </div>

        <svg width="0" height="0" aria-hidden="true" className="defs">
          <defs>
            <pattern id="halftone" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.6" fill={INK} opacity=".35" />
            </pattern>
            <pattern id="halftone-paper" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.6" fill={PAPER} opacity=".22" />
            </pattern>
          </defs>
        </svg>

        <div className="pieces">
          {PIECES.map((p, i) => (
            <motion.article
              className="piece"
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="piece-frame">
                <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  {p.art}
                </svg>
                <span className="piece-veil">Coming soon</span>
              </div>
              <div className="piece-meta">
                <span>{p.name}</span>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
