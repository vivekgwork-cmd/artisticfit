// Builds trimmed ink (black) and paper (white) logo variants from the master PNG.
import sharp from 'sharp';

const SRC = 'artisticfit-logo.png';

const { data, info } = await sharp(SRC).trim().ensureAlpha().raw().toBuffer({ resolveWithObject: true });

async function variant(rgb, out) {
  const buf = Buffer.from(data);
  for (let i = 0; i < buf.length; i += 4) {
    // Keep the shape's alpha, but treat any light pixel as background.
    const lum = (buf[i] + buf[i + 1] + buf[i + 2]) / 3;
    buf[i + 3] = Math.round(buf[i + 3] * (1 - lum / 255));
    buf[i] = rgb[0]; buf[i + 1] = rgb[1]; buf[i + 2] = rgb[2];
  }
  await sharp(buf, { raw: info }).png().toFile(out);
  console.log('wrote', out);
}

await variant([17, 17, 17], 'public/logo-ink.png');
await variant([244, 241, 234], 'public/logo-paper.png');
