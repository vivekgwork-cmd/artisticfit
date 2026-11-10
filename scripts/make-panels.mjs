// Crops the artwork panel off each back-view photo in public/products,
// for the hero and the element cards.   npm run panels
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

// Panel position inside the 2000×2000 back shots (just inside the printed frame).
const CROP = { left: 784, top: 442, width: 424, height: 1112 };

const BACKS = {
  fire: '02_fire_back.jpg',
  water: '04_water_back.jpg',
  soil: '06_soil_back.jpg',
  trees: '08_trees_back.jpg',
  air: '10_air_back.jpg',
};

mkdirSync('public/panels', { recursive: true });
for (const [name, file] of Object.entries(BACKS)) {
  await sharp(`public/products/${file}`)
    .extract(CROP)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`public/panels/${name}.jpg`);
  console.log('wrote', `public/panels/${name}.jpg`);
}
