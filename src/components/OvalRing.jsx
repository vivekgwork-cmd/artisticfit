import { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const RX = 480;
const RY = 196;
const ELLIPSE = `M 500 ${220 - RY} A ${RX} ${RY} 0 1 1 499.9 ${220 - RY} Z`;

// Text that travels endlessly around the logo's oval.
export default function OvalRing({ text, duration = 40 }) {
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    setLen(pathRef.current.getTotalLength());
  }, []);

  return (
    <svg className="oval-ring" viewBox="0 0 1000 440" aria-hidden="true">
      <path id="af-oval" ref={pathRef} d={ELLIPSE} fill="none" />
      <ellipse cx="500" cy="220" rx={RX - 30} ry={RY - 30} className="oval-ring-line" />
      {len > 0 &&
        [0, -len].map((from) => (
          <text key={from}>
            <textPath href="#af-oval" startOffset={from} textLength={len} lengthAdjust="spacing">
              {text}
              {!reduceMotion && (
                <animate attributeName="startOffset" from={from} to={from + len} dur={`${duration}s`} repeatCount="indefinite" />
              )}
            </textPath>
          </text>
        ))}
    </svg>
  );
}
