// Flow'dan gelen site görsellerini hazırlar: npm run gorseller
//
// Kaynak: assets-src/gorsel/<ad>.(jpg|jpeg|png|webp)  — deploy EDİLMEZ
// Çıktı:  public/gorsel/<ad>-800.webp ve <ad>-1600.webp
//         og-paylasim burada işlenmez; Remotion "Site-OG" ile başlıklı basılır
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

  // Paylaşım görseli başlıkla birlikte Remotion'da basılır (marka fontları orada):
  // wafıl-insta/remotion → Site-OG kompozisyonu, zemin public/site/og-paylasim-zemin.jpg
  if (name === 'og-paylasim') {
    console.log('  atlandı: wafıl-insta/remotion içinde "Site-OG" ile render edilir (bkz. src/site/OgPaylasim.tsx)')
    continue
  }

  // Giriş görseli sayfanın beyazına oturmalı: Flow'un ~#F0–#F7 "beyaz" zemini
  // saf beyaza çekilir (açık tonlar hafifçe aydınlatılır), yoksa kutu gibi görünür.
  const prep = () => {
    const img = sharp(src).rotate()
    return name === 'hero-bardak' ? img.linear(1.075, 0) : img
  }

  for (const width of [800, 1600]) {
    const out = `${OUT}/${name}-${width}.webp`
    await prep().resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out)
    console.log(`  ${out.padEnd(42)} ${kb(out)}`)
  }

}
