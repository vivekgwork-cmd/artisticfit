// Product photos come in 400/800/1200/2000px versions (npm run images).
// Let the browser pick the smallest one that stays sharp on the current screen.
const WIDTHS = [400, 800, 1200];

export const productSrc = (file, w = 2000) =>
  w >= 2000 ? `/products/${file}` : `/products/${file.replace(/\.jpg$/, `-${w}.jpg`)}`;

export const productSrcSet = (file) =>
  [...WIDTHS.map((w) => `${productSrc(file, w)} ${w}w`), `${productSrc(file)} 2000w`].join(', ');

// Common `sizes` hints, matching the layouts in styles.css / store.css.
export const SIZES = {
  card: '(max-width: 760px) 72vw, (max-width: 1100px) 38vw, 340px',
  grid: '(max-width: 1100px) 50vw, 33vw',
  gallery: '(max-width: 900px) 100vw, 55vw',
  banner: '(max-width: 760px) 100vw, 45vw',
};

// Spread onto an <img>: {...productImg(p.back, SIZES.card)}
export const productImg = (file, sizes) => ({
  src: productSrc(file, 800),
  srcSet: productSrcSet(file),
  sizes,
});

// Tiny thumbnails (cart lines, summaries): 400px covers them even on 3x screens.
export const thumb = (file) => productSrc(file, 400);
