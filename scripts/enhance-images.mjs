// Builds the site's product photos and artwork panels from the originals in source/products.
//
//   npm run images                                  resize only
//   REALESRGAN=path/to/realesrgan-ncnn-vulkan.exe npm run images     AI-enhanced (recommended)
//
// The originals are low resolution (upscaled, JPEG-blocky), so with REALESRGAN set each photo is:
//   downscaled to its real detail level (700px) -> Real-ESRGAN x4plus (2800px)
//   -> blended with 25% of the original to keep the woodblock grain -> exported.
// Real-ESRGAN: https://github.com/xinntao/Real-ESRGAN/releases (realesrgan-ncnn-vulkan, Windows/macOS/Linux)
//
// Output:
//   public/products/<name>.jpg            2000px
//   public/products/<name>-{400,800,1200}.jpg   responsive sizes (see src/lib/images.js)
//   public/panels/<element>.jpg           the print, cropped from the back shots

import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const SRC = 'source/products';
const OUT = 'public/products';
const PANELS = 'public/panels';
const EXE = process.env.REALESRGAN;
const BASE = 700; // the photos' real detail level
const SCALE = 4;
const KEEP_ORIGINAL = 0.25;
const WIDTHS = [400, 800, 1200];

// Print position inside the 2000x2000 back shots (just inside the printed frame).
const CROP = { left: 784, top: 442, width: 424, height: 1112 };
const PANEL_OF = {
  '02_fire_back.jpg': 'fire',
  '04_water_back.jpg': 'water',
  '06_soil_back.jpg': 'soil',
  '08_trees_back.jpg': 'trees',
  '10_air_back.jpg': 'air',
};

mkdirSync(OUT, { recursive: true });
mkdirSync(PANELS, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'af-images-'));

async function master(file) {
  const src = join(SRC, file);
  if (!EXE) {
    const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    return { data, size: info.width };
  }
  const size = BASE * SCALE;
  const inp = join(tmp, `${file}.in.png`);
  const out = join(tmp, `${file}.out.png`);
  await sharp(src).resize(BASE, BASE, { kernel: 'lanczos3' }).png().toFile(inp);
  execFileSync(EXE, ['-i', inp, '-o', out, '-n', 'realesrgan-x4plus', '-s', String(SCALE), '-m', join(dirname(EXE), 'models')], { stdio: 'pipe' });
  const up = await sharp(out).removeAlpha().raw().toBuffer();
  const orig = await sharp(src).resize(size, size, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer();
  const data = Buffer.alloc(up.length);
  for (let i = 0; i < up.length; i++) data[i] = Math.round(up[i] * (1 - KEEP_ORIGINAL) + orig[i] * KEEP_ORIGINAL);
  return { data, size };
}

const jpeg = (q) => ({ quality: q, mozjpeg: true, chromaSubsampling: '4:4:4' });

try {
  const files = readdirSync(SRC).filter((f) => f.endsWith('.jpg')).sort();
  for (const file of files) {
    const t = Date.now();
    const { data, size } = await master(file);
    const img = () => sharp(data, { raw: { width: size, height: size, channels: 3 } });
    const base = file.replace(/\.jpg$/, '');

    await img().resize(2000, 2000, { kernel: 'lanczos3' }).jpeg(jpeg(86)).toFile(join(OUT, file));
    for (const w of WIDTHS) {
      await img().resize(w, w, { kernel: 'lanczos3' }).sharpen({ sigma: 0.5 }).jpeg(jpeg(84)).toFile(join(OUT, `${base}-${w}.jpg`));
    }
    if (PANEL_OF[file]) {
      const k = size / 2000;
      const crop = { left: Math.round(CROP.left * k), top: Math.round(CROP.top * k), width: Math.round(CROP.width * k), height: Math.round(CROP.height * k) };
      await img().extract(crop).jpeg(jpeg(88)).toFile(join(PANELS, `${PANEL_OF[file]}.jpg`));
    }
    console.log(`${file}  ${((Date.now() - t) / 1000).toFixed(1)}s${EXE ? '  (enhanced)' : ''}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
