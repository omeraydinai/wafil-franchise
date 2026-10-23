# Site görselleri — Google Flow promptları

13 görsel (+ 14. tezgâh düzenlemesi). Site açık ve ferah: beyaz ve çok açık yeşil-gri zemin, koyu yeşil yazı, sarı yalnız düğmelerde. Görseller bu zemine oturmalı; Instagram görsellerindeki koyu, loş atmosfer burada kullanılmaz.

## Nasıl üretilir, nereye konur

1. Flow'da **görsel** üret (video değil). Her prompt için 4 varyasyon al, en iyisini indir.
2. En-boy oranını promptun başındaki gibi seç (3:4, 1:1, 4:3, 16:9).
3. Dosyayı **tablodaki adla** `wafıl-franchise/assets-src/gorsel/` klasörüne koy (jpg veya png). Örnek: `assets-src/gorsel/urun-bardak.jpg`.
4. Bana haber ver. `npm run gorseller` ile boyutlandırıp yayına hazırlarım; sitedeki yerine kendiliğinden oturur.

Gelmeyen görselin yerinde sitede çizgili bir "Görsel bekleniyor" alanı görünür. Giriş görseli gelmezse yerinde çizgi bardak illüstrasyonu kalır.

## Ortak kurallar

- Ürün: **kâğıt bardakta bubble waffle**. Yuvarlak küre kabarcıklar; kare petekli Belçika waffle'ı değil.
- Üstünde meyve, çikolata sosu ve süsler var. **Dondurma yok** (2026-10-20 düzeltmesi). Her ürün promptunda `no ice cream` yazılı kalsın; Flow kendiliğinden dondurma topu eklemeye meyilli.
- **[DOĞRULA]** Süslemenin ne olduğu belli değil (fındık, bisküvi kırığı, renkli şeker…). Öğrenilince ürün promptlarına somut olarak eklenir; o zamana kadar promptlarda yalnız meyve ve çikolata sosu var.
- Yazı, logo, okunur etiket, insan yüzü, neon ve fast-food estetiği yok. Bardakta logo olmasın.
- **Tezgâh / kiosk görseli üretme.** Sitede görünen her tezgâh "bizim tezgâhımız" diye okunur; o yüzden yalnız gerçek fotoğraf olabilir.
- Makine görseli de üretme; AI'nın çizdiği makine pakettekiyle aynı olmaz.
- İnsan gerekiyorsa yalnız eller ya da arkadan flu silüet.

## Liste

| # | Dosya adı | Bölüm | Oran | Durum |
|---|---|---|---|---|
| 1 | `hero-bardak` | Giriş | 3:4 | **Gerekli** |
| 2 | `urun-bardak` | Ürün | 3:4 | **Gerekli** |
| 3 | `og-paylasim` | Link önizlemesi | 16:9 | **Gerekli** |
| 4 | `surec-hamur` | Ürün · hamurdan bardağa 1 | 1:1 | Gerekli |
| 5 | `surec-pisirme` | Ürün · hamurdan bardağa 2 | 1:1 | Gerekli |
| 6 | `surec-bardak` | Ürün · hamurdan bardağa 3 | 1:1 | Gerekli |
| 7 | `surec-susleme` | Ürün · hamurdan bardağa 4 | 1:1 | Gerekli |
| 8 | `lokasyon-avm` | Model · lokasyonlar | 4:3 | Gerekli |
| 9 | `lokasyon-cadde` | Model · lokasyonlar | 4:3 | Gerekli |
| 10 | `lokasyon-etkinlik` | Model · lokasyonlar | 4:3 | Gerekli |
| 11 | `malzeme-un` | Paket · malzemeler | 1:1 | Gerekli |
| 12 | `malzeme-sos` | Paket · malzemeler | 1:1 | Gerekli |
| 13 | `malzeme-meyve` | Paket · malzemeler | 1:1 | Gerekli |

`hero-bardak` ve `urun-bardak` aynı ürünün iki farklı çekimi; ikisi de 3:4. Tek çekimden iki kare seçmek de olur, ama aynı kareyi iki kez kullanma.

Ürün çeşitleri (meyveli, çikolatalı vb.) menü netleşince eklenecek; her çeşit için bir görsel.


---

## Ürün

### 1. `hero-bardak` · 3:4
```
Clean product photograph, vertical 3:4. One bubble waffle in a plain white paper cup, centered, seen from a slightly elevated front angle, on a pure white seamless background (#FFFFFF) that fades into white with no visible horizon. Golden round hemispherical waffle bubbles rising above the rim, the opening of the waffle generously filled with halved fresh strawberries and blueberries and a thin dark chocolate drizzle across the fruit and the bubbles. The cup fills about 70% of the frame height with even white space around it. Bright, even, soft studio daylight, only a faint soft contact shadow under the cup, crisp detail, calm and minimal. No text, no logo on the cup, no hands, no people, no props, no ice cream, no whipped cream, not fast-food style, not neon, no square Belgian waffle grid.
```

### 2. `urun-bardak` · 3:4
```
Editorial product photograph, vertical 3:4. A single bubble waffle served in a plain white paper cup, standing on a pale sage-gray surface in front of a seamless very light gray-green backdrop (#F2F5F3). The waffle is golden with round hemispherical bubbles, folded loosely into the cup and rising above the rim, its opening generously filled with halved fresh strawberries and blueberries and a thin drizzle of dark chocolate sauce on top. Soft natural window light from the left, a gentle soft shadow, generous empty space above the cup, calm and minimal, high detail, shallow depth of field, 85mm lens. No text, no logo on the cup, no hands, no people, no props, no ice cream, no whipped cream, not fast-food style, not neon, no square Belgian waffle grid.
```

### 3. `og-paylasim` · 16:9
Sol üçte iki boş kalmalı; başlığı ve WAFIL yazısını oraya ben eklerim (wafıl-insta/remotion → "Site-OG"; zemin `public/site/og-paylasim-zemin.jpg`).
```
Wide editorial product photograph, horizontal 16:9. A single bubble waffle in a plain white paper cup placed in the right third of the frame, on a pale sage-gray surface in front of a seamless very light gray-green backdrop (#F2F5F3). The left two thirds of the frame are empty, smooth backdrop with no objects, reserved for text. Golden round hemispherical waffle bubbles above the rim, the opening filled with halved fresh strawberries and blueberries and a thin dark chocolate drizzle. Soft natural window light from the left, gentle soft shadow to the right, calm and minimal, high detail, 50mm lens. No text, no logo on the cup, no hands, no people, no props, no ice cream, no whipped cream, not fast-food style, not neon, no square Belgian waffle grid.
```

## Hamurdan bardağa (4 kare, aynı ışık ve zemin)

Dördü yan yana duracak; aynı açık yeşil-gri zemin, aynı yandan gelen yumuşak ışık, aynı yakınlık.

### 4. `surec-hamur` · 1:1
```
Square editorial food photograph, 1:1. Close-up of smooth pale waffle batter being poured from a clear glass measuring jug in a single clean stream, the jug paused mid-pour, on a pale sage-gray surface against a seamless very light gray-green backdrop (#F2F5F3). Soft natural window light from the left, calm and minimal, crisp detail, generous negative space. No text, no markings on the jug, no faces, no logos, not fast-food style, not neon.
```

### 5. `surec-pisirme` · 1:1
```
Square editorial food photograph, 1:1. Extreme close-up of a freshly cooked golden bubble waffle sheet with tight round hemispherical bubbles and crisp edges, a thin veil of steam rising, resting on a pale sage-gray surface against a very light gray-green backdrop (#F2F5F3). Soft natural window light from the left catching the tops of the bubbles, calm and minimal, high detail. Not a square Belgian waffle grid. No machine visible, no text, no logos, no faces, not fast-food style, not neon.
```

### 6. `surec-bardak` · 1:1
```
Square editorial food photograph, 1:1. A cooked golden bubble waffle sheet being placed loosely into a plain white paper cup by hands in light oatmeal-colored food gloves, only the hands, the waffle and the cup in frame, on a pale sage-gray surface against a very light gray-green backdrop (#F2F5F3). The waffle is placed in, not pressed over a mold. Soft natural window light from the left, calm and minimal, crisp detail. No faces, no text, no logo on the cup, not fast-food style, not neon, no square Belgian waffle grid.
```

### 7. `surec-susleme` · 1:1
```
Square editorial food photograph, 1:1. A bubble waffle in a plain white paper cup being finished: a gloved hand placing a fresh strawberry on top, halved strawberries and blueberries already filling the opening of the waffle, a thin dark chocolate drizzle, on a pale sage-gray surface against a very light gray-green backdrop (#F2F5F3). Only the hand, the cup and the toppings in frame. Soft natural window light from the left, calm and minimal, crisp detail. No faces, no text, no logo on the cup, no ice cream, no whipped cream, not fast-food style, not neon, no square Belgian waffle grid.
```

## Lokasyonlar (3 kare, tezgâh YOK)

Tezgâhın kurulabileceği yer türleri. Hiçbirinde kiosk, stant, tabela ya da marka olmamalı; sitede "temsili görsel" diye yazıyor.

### 8. `lokasyon-avm` · 4:3
```
Architectural editorial photograph, horizontal 4:3. A bright, airy, modern shopping mall corridor in daylight from skylights, polished pale floor, clean white and light gray surfaces, a few shoppers far away as soft motion blur, an open empty area of floor in the foreground. Calm and minimal, generous negative space, soft natural light. No kiosks, no stands, no shop signs, no readable text, no logos, no faces in focus, not neon.
```

### 9. `lokasyon-cadde` · 4:3
```
Editorial street photograph, horizontal 4:3. A clean, sunny pedestrian shopping street in a Turkish city on a weekday afternoon, wide pale stone pavement, trees casting soft shadows, people walking in the distance as gentle motion blur, an empty open spot on the pavement in the foreground. Calm, airy, soft natural daylight, muted greens and warm whites. No kiosks, no stands, no readable signs, no logos, no faces in focus, not neon.
```

### 10. `lokasyon-etkinlik` · 4:3
```
Editorial photograph, horizontal 4:3. An open-air weekend event area in a green city park in late afternoon light, a wide paved path lined with trees, string lights overhead not yet lit, a relaxed crowd far in the background as soft blur, an empty open area in the foreground. Calm, airy, soft golden daylight, muted greens. No kiosks, no stands, no tents with branding, no readable text, no logos, no faces in focus, not neon.
```

## Malzemeler (3 kare, aynı ışık ve zemin)

Paket listesinin yanında küçük kareler olarak duracak; konu net ve ortada olsun.

### 11. `malzeme-un` · 1:1
```
Square editorial still life, 1:1. A small heap of fine pale flour in a plain matte ceramic bowl with a wooden scoop resting in it, a light dusting of flour on a pale sage-gray surface, seamless very light gray-green backdrop (#F2F5F3). Soft natural window light from the left, calm and minimal, centered subject, crisp detail. No packaging, no text, no labels, no logos, no hands, not fast-food style.
```

### 12. `malzeme-sos` · 1:1
```
Square editorial still life, 1:1. A small plain glass jar of glossy dark chocolate sauce with a spoon lifting a slow ribbon of sauce, a few drops on a pale sage-gray surface, seamless very light gray-green backdrop (#F2F5F3). Soft natural window light from the left, calm and minimal, centered subject, crisp detail. No label on the jar, no text, no logos, no hands, not fast-food style.
```

### 13. `malzeme-meyve` · 1:1
```
Square editorial still life, 1:1. Fresh strawberries, some halved, and a small handful of blueberries in a shallow plain white ceramic bowl, a few berries scattered on a pale sage-gray surface, seamless very light gray-green backdrop (#F2F5F3). Soft natural window light from the left, calm and minimal, centered subject, crisp detail, dewy freshness. No text, no logos, no hands, not fast-food style.
```

## Tezgâh görselleştirmesi (dondurmasız düzeltme)

### 14. `tezgah` · 4:3 · düzenleme
Sıfırdan üretme; mevcut `assets-src/gorsel/tezgah.jpg`'yi Flow'a referans olarak yükle ve yalnız ön paneldeki bardağı düzelt. Tezgâhın kendisi, tabela, ışık ve yazılar aynen kalmalı. Çıkan sonuçta "Mutluluğun çıtır hâli." ve "Taze meyve, gerçek çikolata." yazılarının bozulmadığını kontrol et; bozulduysa o varyasyonu kullanma.

Panel afişi Remotion "Site-TezgahPanel" ile `hero-bardak` görselinden basılmıştı. Yeni `hero-bardak` gelince paneli onunla yeniden basıp tezgâhı o panelle güncellemek de bir yol; aşağıdaki düzenleme daha kısa yol.
```
Edit this image. Change only the bubble waffle cup printed on the white front panel of the kiosk: remove the white scoop of ice cream from the top of the waffle and fill that space with more halved fresh strawberries and blueberries under the same thin dark chocolate drizzle, so the waffle shows only fruit and chocolate. Keep the gloved hand, the cup, the waffle shape and the lighting of the print the same. Keep everything else in the image exactly as it is: the kiosk, the glowing WAFIL sign, the counter and equipment, the background, the camera angle and all text on the panel, letter for letter. No ice cream, no whipped cream, no new text, no new objects.
```
