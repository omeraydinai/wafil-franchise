# Site görselleri — Google Flow promptları

13 görsel. Site açık ve ferah: beyaz ve çok açık yeşil-gri zemin, koyu yeşil yazı, sarı yalnız düğmelerde. Görseller bu zemine oturmalı; Instagram görsellerindeki koyu, loş atmosfer burada kullanılmaz.

## Nasıl üretilir, nereye konur

1. Flow'da **görsel** üret (video değil). Her prompt için 4 varyasyon al, en iyisini indir.
2. En-boy oranını promptun başındaki gibi seç (3:4, 1:1, 4:3, 16:9).
3. Dosyayı **tablodaki adla** `wafıl-franchise/assets-src/gorsel/` klasörüne koy (jpg veya png). Örnek: `assets-src/gorsel/urun-bardak.jpg`.
4. Bana haber ver. `npm run gorseller` ile boyutlandırıp yayına hazırlarım; sitedeki yerine kendiliğinden oturur.

Gelmeyen görselin yerinde sitede çizgili bir "Görsel bekleniyor" alanı görünür. Giriş görseli gelmezse yerinde çizgi bardak illüstrasyonu kalır.

## Ortak kurallar

- Ürün: **kâğıt bardakta bubble waffle**. Yuvarlak küre kabarcıklar; kare petekli Belçika waffle'ı değil.
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
Clean product photograph, vertical 3:4. One bubble waffle in a plain white paper cup, centered, seen from a slightly elevated front angle, on a pure white seamless background (#FFFFFF) that fades into white with no visible horizon. Golden round hemispherical waffle bubbles rising above the rim, fresh strawberries, blueberries, a thin dark chocolate drizzle and one scoop of vanilla ice cream on top. The cup fills about 70% of the frame height with even white space around it. Bright, even, soft studio daylight, only a faint soft contact shadow under the cup, crisp detail, calm and minimal. No text, no logo on the cup, no hands, no people, no props, not fast-food style, not neon, no square Belgian waffle grid.
```

### 2. `urun-bardak` · 3:4
```
Editorial product photograph, vertical 3:4. A single bubble waffle served in a plain white paper cup, standing on a pale sage-gray surface in front of a seamless very light gray-green backdrop (#F2F5F3). The waffle is golden with round hemispherical bubbles, folded loosely into the cup and rising above the rim, topped with fresh strawberries, blueberries, a thin drizzle of dark chocolate sauce and one scoop of vanilla ice cream. Soft natural window light from the left, a gentle soft shadow, generous empty space above the cup, calm and minimal, high detail, shallow depth of field, 85mm lens. No text, no logo on the cup, no hands, no people, no props, not fast-food style, not neon, no square Belgian waffle grid.
```

### 3. `og-paylasim` · 16:9
Sol üçte iki boş kalmalı; başlığı ve WAFIL yazısını oraya ben eklerim.
```
Wide editorial product photograph, horizontal 16:9. A single bubble waffle in a plain white paper cup placed in the right third of the frame, on a pale sage-gray surface in front of a seamless very light gray-green backdrop (#F2F5F3). The left two thirds of the frame are empty, smooth backdrop with no objects, reserved for text. Golden round hemispherical waffle bubbles above the rim, fresh strawberries, blueberries, a thin dark chocolate drizzle and one scoop of vanilla ice cream. Soft natural window light from the left, gentle soft shadow to the right, calm and minimal, high detail, 50mm lens. No text, no logo on the cup, no hands, no people, no props, not fast-food style, not neon, no square Belgian waffle grid.
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
Square editorial food photograph, 1:1. A bubble waffle in a plain white paper cup being finished: a gloved hand placing a fresh strawberry on top, blueberries and one scoop of vanilla ice cream already in place, a thin dark chocolate drizzle, on a pale sage-gray surface against a very light gray-green backdrop (#F2F5F3). Only the hand, the cup and the toppings in frame. Soft natural window light from the left, calm and minimal, crisp detail. No faces, no text, no logo on the cup, not fast-food style, not neon, no square Belgian waffle grid.
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
