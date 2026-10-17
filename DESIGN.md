# Design

Kaynak: yayındaki kod (`index.html`, `src/index.css`, `tailwind.config.js`, `src/motion.js`), 2026-10-17 yeniden tasarımı. Ürün gerçeği `PRODUCT.md`'de.

## Dünya

Editoryal minimal bir yatırım broşürü: açık ve ferah, sakin, açık sözlü. Bol beyaz alan, ince çizgiler, büyük başlıklar. Kategori varsayılanı olan koyu, parlak, "fırsat" bağıran tanıtım sayfası bilerek reddedildi.

## Renk (Restrained + tek dolu alan)

| Token | Değer | Kullanım |
|---|---|---|
| `paper` | `#FFFFFF` | Ana zemin |
| `mist` | `#F2F5F3` | Bölüm bantları (Model, Başvuru), form autofill |
| `ink` | `#0B2E1F` | Yazı, çizgi, lansman bölümünün dolu zemini, kayan şerit |
| `ink-soft` | `#4A655A` | İkincil metin (beyaz üstünde ~5.9:1) |
| `line` | `#DCE2DF` | Ayraç çizgileri, öncü noktalar |
| `sun` / `sun-deep` | `#FFD21F` / `#F2C200` | **Yalnız başvuru yolunda:** düğmeler, lansman bedeli, aktif süreç noktası, metin seçimi |

`ink` zemin üstünde ikincil metin `#C9D6CF`, üstü çizili fiyat `#9FB4AA`. Gri kullanılmaz; ikincil tonlar yeşilden türetilir.

## Yazı

- **Başlık:** League Spartan Variable (logo fontu da bu; logo "WAFIL" yazısıdır, değişmez). Bölüm başlıkları `clamp(2.5rem, 5.4vw, 4.25rem)`, 600, `-0.035em`, satır yüksekliği 0.98. Giriş başlığı en fazla 6rem; ikinci satır 300 ağırlıkla kontrast kurar.
- **Metin:** Hanken Grotesk Variable (Neue Montreal lisanssız olduğu için). Gövde 18px, `leading-relaxed`, satır uzunluğu ~34–42rem.
- Fontlar `@fontsource-variable` ile kendi sunucumuzdan gelir (Google Fonts yok).
- Rakamlar `tabular` sınıfıyla eşit genişlikte.

## Bileşenler

- **Düğme `btn-sun`:** hap biçimli, sarı, `ink` yazı, oklu SVG ikon; üzerine gelince 1px yükselir ve ok kayar.
- **Bağlantı `link-line`:** altı çizgili, üzerine gelince çizgi silinir.
- **Paket fişi (`ledger-row`):** ad + noktalı öncü çizgi + durum ("✓ Dahil" / "— Sana ait"). Pakette olan ve olmayan iki ayrı liste; sitenin imzası.
- **Süreç ekseni:** dikey çizgi, kaydırdıkça dolar; adım noktaları aktifken sarı, geçince `ink`. Masaüstünde solda sabit `01/06` sayaç.
- **SSS:** ince çizgili liste, `+` ikonu açılınca 45° döner.
- **Form alanı `field`:** kutusuz, yalnız alt çizgi; odakta çizgi `ink` olur.
- **İkonlar:** elde çizilmiş SVG, tek çizgi kalınlığı (1.75), yuvarlak uçlar. İkon fontu yok.
- **Kartlar yok.** Bilgi çizgilerle ve ızgarayla ayrılır; tek yuvarlak köşeli yüzey ürün görseli çerçevesi (28px).

## Düzen

- Çerçeve `max-w-frame` (1360px), yan boşluk 20px (mobil) / 40px.
- Bölümler 12 kolon ızgara; başlık solda (çoğunlukla 5 kolon, masaüstünde sabit), içerik sağda.
- Bölüm ritmi: `py-24` / `md:py-36`; beyaz ve `mist` bantlar sırayla, lansman `ink` ile tek dolu blok.
- Alt bilgide sayfa genişliğinde dev "WAFIL" yazısı.

## Hareket

Tek eğri: `cubic-bezier(0.16, 1, 0.3, 1)` (yaylanma/sekme yok).

- Giriş: başlık satırları maskeden sırayla yükselir; bardak illüstrasyonu belirir, kabarcıklar tek tek dolar, çikolata sosu çizilir.
- Kaydırma: `data-reveal` blokları yukarı kayarak belirir (JS yoksa görünür kalır).
- Süreç ekseni ve sayaç kaydırmaya bağlı.
- Kayan şerit 38 sn'de bir tur, üzerine gelince durur.
- Masaüstünde Lenis ile yumuşak kaydırma; dokunmatikte kapalı.
- `prefers-reduced-motion`: hepsi kapanır.

## Tarayıcı yüzeyleri

Metin seçimi sarı/`ink`, imleç `ink`, odak halkası 2px `ink` (3px boşluk), kaydırma çubuğu `mist`/`line`, alt çizgi boşluğu 0.22em.

## Görseller

Yalnız AI (Google Flow), promptlar `docs/flow-gorseller.md`. Tezgâh/kiosk görseli AI ile üretilmez. Model bölümünde tezgâhın tasarım görselleştirmesi (`public/gorsel/tezgah-*`, "Tezgâh tasarımı · Görselleştirme") var; gerçek fotoğraftan Flow ile üretildi, ön panel afişi Remotion "Site-TezgahPanel" ile tasarlandı. Kat planı çizimi kaldırıldı. Doldurulmamış bilgi `data-todo` ile çizgili işaretlenir ve yayına çıkmaz.

### Görsel yerleri (`slot`)

13 görsel yeri var (liste ve promptlar: `docs/flow-gorseller.md`). Her yer `figure.slot` + `img`: görsel `public/gorsel/<ad>-800|1600.webp` olarak gelince alanı kaplar; yoksa `onerror` resmi kaldırır ve çizgili zemin üstünde "Görsel bekleniyor: <ad>" etiketi kalır. Girişte görsel yoksa çizgi bardak illüstrasyonu görünür. Kaynaklar `assets-src/gorsel/` altına konur, `npm run gorseller` boyutlandırır. Köşe yarıçapları: ürün 28px, şerit ve lokasyon 22px, malzeme 16px. Lokasyon görselleri "Temsili görseller" notuyla gösterilir.
