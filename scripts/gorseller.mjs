// Flow'dan gelen site görsellerini hazırlar: npm run gorseller
//
// Kaynak: assets-src/gorsel/<ad>.(jpg|jpeg|png|webp)  — deploy EDİLMEZ
// Çıktı:  public/gorsel/<ad>-800.webp ve <ad>-1600.webp
//         og-paylasim için ayrıca public/gorsel/og-paylasim.jpg (1200×630)
// Adlar ve hangi bölümde kullanıldıkları: docs/flow-gorseller.md
import sharp from 'sharp'
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import { extname, basename, join } from 'node:path'

const SRC = 'assets-src/gorsel'
const OUT = 'public/gorsel'
const kb = (p) => (statSync(p).size / 1024).toFixed(0) + ' KB'

mkdirSync(OUT, { recursive: true })
const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
if (!files.length) console.log(`${SRC} boş; Flow görsellerini buraya koy.`)

for (const file of files) {
  const src = join(SRC, file)
  const name = basename(file, extname(file))
  console.log(`\n${src} → ${kb(src)}`)

  for (const width of [800, 1600]) {
    const out = `${OUT}/${name}-${width}.webp`
    await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out)
    console.log(`  ${out.padEnd(42)} ${kb(out)}`)
  }

  if (name === 'og-paylasim') {
    const out = `${OUT}/og-paylasim.jpg`
    await sharp(src).rotate().resize(1200, 630, { fit: 'cover', position: 'right' }).jpeg({ quality: 80, mozjpeg: true }).toFile(out)
    console.log(`  ${out.padEnd(42)} ${kb(out)}`)
  }
}
