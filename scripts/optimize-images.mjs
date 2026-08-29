// assets-src/ içindeki yüksek çözünürlüklü kaynakları,
// public/ altına responsive WebP + JPEG fallback olarak üretir.
//
// Kaynak dosyalar public/ içinde DEĞİL — aksi halde 2.3 MB'lık orijinal
// PNG de deploy edilir. Görsel değiştirdiğinizde: npm run images
import sharp from 'sharp'
import { statSync } from 'node:fs'

const JOBS = [
  { src: 'assets-src/wafil-hero-waffle.png', base: 'wafil-hero-waffle', widths: [768, 1280, 1600], fallback: 1280 },
  { src: 'assets-src/wafil-kiosk.jpg', base: 'wafil-kiosk', widths: [512], fallback: 512 },
]

const kb = (p) => (statSync(p).size / 1024).toFixed(0) + ' KB'

for (const { src, base, widths, fallback } of JOBS) {
  console.log(`\n${src} → ${kb(src)}`)
  for (const w of widths) {
    const out = `public/${base}-${w}.webp`
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out)
    console.log(`  ${out.padEnd(38)} ${kb(out)}`)
  }
  const jpg = `public/${base}-${fallback}.jpg`
  await sharp(src).resize({ width: fallback, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(jpg)
  console.log(`  ${jpg.padEnd(38)} ${kb(jpg)}`)
}
