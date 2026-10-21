/**
 * compress-images.mjs
 * Compresses images in public/ that exceed 300 KB.
 *
 * Strategy:
 *  - Banners/heroes  → max 1920 px wide, PNG lossless compressionLevel:9, JPG quality:82
 *  - Channel covers  → max 600 px wide,  PNG palette (lossy quantization), JPG quality:82
 *  - Team portraits  → max 600 px wide,  PNG lossless compressionLevel:9
 *
 * Rules:
 *  - Never enlarge images
 *  - Never change filenames or extensions
 *  - Skip files already ≤ 300 KB
 *  - Only write the compressed file if it is smaller than the original
 */

import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '../public');
const MIN_BYTES  = 300 * 1024;

/* ─── Categorisation ─────────────────────────────────────────────────────── */

const BANNER_PREFIXES = [
  'banner', 'rpp-mic', 'mic-carrier', 'mt-fibra', 'banner-hero-home',
  'nosotros banner', // "Nosotros Banner.png"
];

function category(filename) {
  const lower = filename.toLowerCase();
  if (lower.startsWith('nosotros-') && lower.endsWith('.png')) return 'portrait';
  if (BANNER_PREFIXES.some(p => lower.startsWith(p)))            return 'banner';
  return 'cover';
}

/* ─── Compression ────────────────────────────────────────────────────────── */

async function compressFile(filePath, cat) {
  const ext      = extname(filePath).toLowerCase();
  const maxWidth = (cat === 'banner') ? 1920 : 600;
  const tempPath = filePath + '.tmp';

  let pipeline = sharp(filePath);
  const meta   = await pipeline.metadata();

  if (meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, {
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    });
  }

  if (ext === '.png') {
    if (cat === 'cover') {
      // Lossy palette quantization — good for flat channel-art graphics
      await pipeline.png({ compressionLevel: 9, palette: true, colors: 256, quality: 80 }).toFile(tempPath);
    } else {
      // Lossless — banners and portraits
      await pipeline.png({ compressionLevel: 9 }).toFile(tempPath);
    }
  } else if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(tempPath);
  } else {
    return null; // Unsupported
  }

  const afterSize  = statSync(tempPath).size;
  const beforeSize = statSync(filePath).size;

  if (afterSize < beforeSize) {
    renameSync(tempPath, filePath);
    return { before: beforeSize, after: afterSize };
  } else {
    unlinkSync(tempPath);
    return { before: beforeSize, after: beforeSize, skipped: true };
  }
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

const files = readdirSync(PUBLIC_DIR)
  .filter(f => /\.(png|jpg|jpeg)$/i.test(f))
  .map(f => ({ name: f, path: join(PUBLIC_DIR, f), size: statSync(join(PUBLIC_DIR, f)).size }))
  .filter(f => f.size > MIN_BYTES)
  .sort((a, b) => b.size - a.size);

console.log(`\nProcessing ${files.length} files > 300 KB...\n`);

let totalBefore = 0;
let totalAfter  = 0;
const rows = [];

for (const file of files) {
  const cat = category(file.name);
  process.stdout.write(`  [${cat.padEnd(8)}] ${file.name} ... `);

  try {
    const result = await compressFile(file.path, cat);
    if (!result) {
      console.log('skipped (unsupported ext)');
      continue;
    }
    const bKB = Math.round(result.before / 1024);
    const aKB = Math.round(result.after  / 1024);
    const pct = Math.round((1 - result.after / result.before) * 100);
    totalBefore += result.before;
    totalAfter  += result.after;
    const note = result.skipped ? ' (already optimal, kept original)' : '';
    console.log(`${bKB} KB → ${aKB} KB  (${pct}% saved)${note}`);
    rows.push({ name: file.name, cat, bKB, aKB, pct });
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    rows.push({ name: file.name, cat, error: err.message });
  }
}

const totalSavedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
console.log(`\n${'─'.repeat(70)}`);
console.log(`Total saved: ${totalSavedMB} MB  (${Math.round(totalBefore/1024)} KB → ${Math.round(totalAfter/1024)} KB)`);
console.log(`${'─'.repeat(70)}\n`);
