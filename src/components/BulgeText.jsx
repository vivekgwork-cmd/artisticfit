import { Fragment } from 'react';
import { motion } from 'framer-motion';

// Echoes the logo's fisheye lettering: characters near the middle of a line
// stand taller than those at the edges.
export default function BulgeText({ lines, as: Tag = 'h2', amount = 0.42, className = '' }) {
  return (
    <Tag className={`bulge ${className}`} aria-label={lines.join(' ')}>
      {lines.map((line, li) => {
        const last = Math.max(line.length - 1, 1);
        let offset = 0;
        return (
          <span className="bulge-line" key={li} aria-hidden="true">
            {line.split(' ').map((word, wi) => {
              const start = offset;
              offset += word.length + 1;
              return (
                <Fragment key={wi}>
                  {wi > 0 && ' '}
                  <span className="bulge-word">
                  {[...word].map((ch, ci) => {
                    const i = start + ci;
                    const scale = 1 + amount * Math.sin((Math.PI * i) / last);
                    return (
                      <motion.span
                        key={ci}
                        className="bulge-char"
                        initial={{ scaleY: 0.2, opacity: 0 }}
                        whileInView={{ scaleY: scale, opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: li * 0.12 + i * 0.025 }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                  </span>
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
