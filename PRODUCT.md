# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Birincil:** Kendi işini kurmak isteyen girişimciler, maaşlı çalışanlar ve küçük yatırımcılar. Çoğu siteye Instagram reklamından, telefonla gelir; kararı aceleyle değil, birkaç ziyarette ve ön görüşmeyle verir.
- **İkincil:** Ürünü merak eden müşteri (bardakta bubble waffle). Site onlara satış yapmaz; markanın gerçek ve lezzetli bir ürün olduğunu gösterir.

## Product Purpose

WAFIL bir franchise markasıdır: yatırımcı, büyük bir dükkân yerine tek bir tezgâhla (mobil büfe / kiosk) bardakta bubble waffle satan bir işletme açar. Sitenin tek işi nitelikli franchise başvurusu toplamaktır (başvuru formu). Başarı: form doldurulması ve ön görüşmeye dönen başvuru; takipçi veya sayfa görüntüsü tek başına başarı değildir.

## Positioning

- Dükkân değil, tek tezgâh: küçük alan, dükkâna göre küçük ölçekli kurulum.
- Yeni bir marka olduğunu saklamaz. Şu an tek tezgâh var; "ilk 5 ortak" lansman dönemi bu gerçeğin üzerine kurulu.
- Pakette ne olduğunu ve ne olmadığını açıkça yazar.

## Operating Context

- Başvuru akışı: Başvuru → Ön görüşme → Lokasyon onayı → Sözleşme ve ödeme → Kurulum ve eğitim → Açılış.
- Eğitim: teorik kısım markanın yanında, uygulama yatırımcının onaylanan lokasyonunda.
- Tedarik: temel ham maddeler (özel waffle unu, soslar) merkezden; taze meyve yerelden.
- Trafik: Instagram (`@wafil.tr`) reklamları ve organik içerik; içerik aynı marka sesiyle Remotion ile üretiliyor (`../wafıl-insta`).

## Capabilities and Constraints

- Statik çok sayfalı site: Vite + Tailwind, React yok. Vercel'e GitHub `main` dalından otomatik yayın.
- Başvuru formu Google Apps Script web app'ine gider (`src/form.js`, `VITE_SCRIPT_URL`); bu entegrasyon korunur, yeniden yazılmaz.
- Meta Pixel kancası hazır ama `WAFIL_PIXEL_ID` boş; dolunca `PageView` ve başarılı formda `Lead` tetiklenir.
- Yasal sayfalar: `pages/kvkk.html`, `pages/gizlilik.html`, `pages/kullanim-kosullari.html` (taslak; ticaret unvanı/MERSİS eksik).
- Bilgiler: lansman bedeli ilk 5 franchise noktası için 250.000 TL, sonrasında 300.000 TL. Pakette tezgâh, makine ve ekipman, ürün eğitimi (reçete, hazırlık), operasyon eğitimi (stok, hijyen, müşteri iletişimi), açılış haftası saha desteği. Pakette yok: lokasyon, kira, altyapı, dekorasyon. Sözleşme 5 yıl, süre sonunda karşılıklı memnuniyetle yenilenebilir. Royalty ve finansal model ön görüşmede paylaşılır.
- İlk tezgâhın yeri sitede şimdilik gösterilmiyor (2026-10-17 kararı); bilgi gelince eklenebilir.
- **Açık:** Ticaret unvanı, MERSİS, adres (yasal sayfalar için).

## Brand Commitments

- Ad: WAFIL (Türkçe metinde "Wafıl"). Logo dosyası yok; logo, League Spartan ile yazılmış "WAFIL" yazısıdır ve bu font değişmez.
- Ses: sade, dürüst, abartısız, girişimciyle konuşur gibi; marka "biz" diye konuşur. Akıcı günlük Türkçe; "X değil, Y" sloganları, üçlü emir dizileri, zorlama ikilemeler gibi yapay kalıplar kullanılmaz.
- Kullanılmaz: şube sayısı, ciro/kâr/geri dönüş vaadi, "anahtar teslim", "kanıtlanmış sistem", "tanınan marka", var olmayan ekip/ofis/uzman iddiası, "Türkiye'nin en…".
- Kaynak: `knowledge-wafıl.md` (marka bilgisi), içerik tarafında `../wafıl-insta/icerik/00-strateji.md` (gerçeklik çerçevesi).

## Evidence on Hand

- Web sitesindeki paket, süreç, SSS ve bedel bilgileri (yukarıda).
- Görseller: yalnız AI (Google Flow) ile üretilecek. Mevcut `public/wafil-hero-waffle-*` kare petekli Belçika waffle'ı gösterdiği için ürünle uyuşmuyor; `public/wafil-kiosk-*` ilk tezgâhın gerçek fotoğrafı (gün batımı, yalnız 512×382 px; sitede kullanılmıyor). Sitede Model bölümünde `public/gorsel/tezgah-*` var: bu gerçek fotoğraftan Flow ile üretilmiş **tasarım görselleştirmesi** (tam karşıdan, stüdyo zemin, yeni beyaz panel afişi "Mutluluğun çıtır hâli."). Panel bu hâliyle henüz basılmadı; görsel "Tezgâh tasarımı · Görselleştirme" altyazısıyla gösterilir, gerçek fotoğraf gibi sunulmaz.
- **Yok, uydurulmaz:** müşteri yorumu, yatırımcı referansı, şube fotoğrafı, basın, rakamsal başarı verisi. "Bizim tezgâhımız" diye sunulan hiçbir görsel AI olamaz; gerçek fotoğraf gelene kadar orada görsel yerine tipografi kullanılır.

## Product Principles

1. Güven abartıdan değil açık sözlülükten gelir: yeni olduğumuzu, pakette ne olmadığını önce biz söyleriz.
2. Her bölüm başvuruya yaklaştırmalı; ama değerle başlar, satışla açılmaz.
3. Telefonda hızlı ve okunaklı olmak, gösterişten önce gelir; ziyaretçi reklamdan gelir ve sabırsızdır.
4. Ürün sitenin kalbidir ama yatırım kararı için gereken bilgi (paket, bedel, süreç, şartlar) asla görselin arkasına saklanmaz.

## Accessibility & Inclusion

Türkçe karakterler ve büyük harf dönüşümü doğru çalışmalı (`lang="tr"`). Hareket `prefers-reduced-motion` ile kapanabilmeli. Metin kontrastı WCAG AA.
