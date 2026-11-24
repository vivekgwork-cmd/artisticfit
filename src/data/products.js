// Collection 01 — The Elements.
// Photos are built into public/products and public/panels from source/products (npm run images).
// `price` is in rupees (integer). PLACEHOLDER pricing — set the real numbers before launch.

export const PRODUCTS = [
  {
    key: 'fire', no: '01', name: 'Fire', kanji: '火', colour: 'Ink Black',
    front: '01_fire_front.jpg', back: '02_fire_back.jpg',
    tee: '#1b1b19', accent: '#b4452a',
    line: 'Flames rising under a blood moon.',
    story: 'Fire is the first print in the series: flames twisting up towards a blood-red moon, cut in the rough, layered strokes of an old woodblock. Printed in ember and rust on an ink-black tee, so the artwork glows.',
    price: 1499,
  },
  {
    key: 'water', no: '02', name: 'Water', kanji: '水', colour: 'Bone',
    front: '03_water_front.jpg', back: '04_water_back.jpg',
    tee: '#cec2b4', accent: '#1f2e3e',
    line: 'A great wave breaking beneath the full moon.',
    story: 'A great wave curls and breaks beneath a full moon. Deep indigo on a warm bone tee: the lightest piece in the collection, and the easiest to wear every day.',
    price: 1499,
  },
  {
    key: 'soil', no: '03', name: 'Soil', kanji: '土', colour: 'Earth Brown',
    front: '05_soil_front.jpg', back: '06_soil_back.jpg',
    tee: '#39281e', accent: '#6b4f3a',
    line: 'Layered ridges under a dark sun.',
    story: 'Ridge after ridge of layered earth under a dark sun. Printed in warm clay tones on an earth-brown tee, it is quiet up close and striking from across the room.',
    price: 1499,
  },
  {
    key: 'trees', no: '04', name: 'Trees', kanji: '木', colour: 'Forest',
    front: '07_trees_front.jpg', back: '08_trees_back.jpg',
    tee: '#242922', accent: '#4f5d42',
    line: 'An old cedar, rooted and reaching.',
    story: 'An old cedar, roots gripping the ground and branches reaching for the sky. Moss and bark tones on a deep forest tee.',
    price: 1499,
  },
  {
    key: 'air', no: '05', name: 'Air', kanji: '風', colour: 'Slate Blue',
    front: '09_air_front.jpg', back: '10_air_back.jpg',
    tee: '#37414a', accent: '#3d4c5a',
    line: 'Clouds drifting across a starlit sky.',
    story: 'Clouds drifting across a starlit night sky. Soft greys and pale blues on a slate-blue tee: the calmest of the five.',
    price: 1499,
  },
];

export const byKey = Object.fromEntries(PRODUCTS.map((p) => [p.key, p]));
export const productTitle = (p) => `${p.name} Oversized Tee`;
