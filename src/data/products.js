// Collection 01 — The Elements.
// Photos live in public/products; artwork crops in public/panels (npm run panels).
// Set `price` (e.g. 'INR 2,490.00') once pricing is final; null shows "Coming soon".

export const PRODUCTS = [
  {
    key: 'fire', no: '01', name: 'Fire', kanji: '火', colour: 'Ink Black',
    front: '01_fire_front.jpg', back: '02_fire_back.jpg',
    tee: '#1b1b19', accent: '#b4452a',
    line: 'Flames rising under a blood moon.',
    price: null,
  },
  {
    key: 'water', no: '02', name: 'Water', kanji: '水', colour: 'Bone',
    front: '03_water_front.jpg', back: '04_water_back.jpg',
    tee: '#cec2b4', accent: '#1f2e3e',
    line: 'A great wave breaking beneath the full moon.',
    price: null,
  },
  {
    key: 'soil', no: '03', name: 'Soil', kanji: '土', colour: 'Earth Brown',
    front: '05_soil_front.jpg', back: '06_soil_back.jpg',
    tee: '#39281e', accent: '#6b4f3a',
    line: 'Layered ridges under a dark sun.',
    price: null,
  },
  {
    key: 'trees', no: '04', name: 'Trees', kanji: '木', colour: 'Forest',
    front: '07_trees_front.jpg', back: '08_trees_back.jpg',
    tee: '#242922', accent: '#4f5d42',
    line: 'An old cedar, rooted and reaching.',
    price: null,
  },
  {
    key: 'air', no: '05', name: 'Air', kanji: '風', colour: 'Slate Blue',
    front: '09_air_front.jpg', back: '10_air_back.jpg',
    tee: '#37414a', accent: '#3d4c5a',
    line: 'Clouds drifting across a starlit sky.',
    price: null,
  },
];

export const byKey = Object.fromEntries(PRODUCTS.map((p) => [p.key, p]));
