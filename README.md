# Instagram paylaşım dalı

Bu dal siteye ait değildir; Vercel bu dalı yayına almaz (`vercel.json`). @wafil.tr paylaşımlarının planı ve kaydı burada durur.

- `plan-hafta-XX.json`: haftanın işleri (zaman, tür, dosyalar, açıklama). Medya dosyaları main dalındaki `public/ig/hX/` klasöründen, sitenin adresinden okunur.
- `paylas.mjs`: zamanı gelen işleri paylaşır.
- `kayit.jsonl`: her paylaşım, atlama ve hata. Paylaşılmış parça tekrar paylaşılmaz.

## Nasıl çalışıyor

VPS'te (`/opt/wafil-yayin`) `wafil-yayin-tick.timer` 5 dakikada bir `tick.sh` çalıştırır: bu dalı `git pull` ile günceller, `node paylas.mjs`'i root olmayan, salt okunur bir container'da çalıştırır. Kurulum: `vps/kur.sh`.

- Token: `/opt/wafil-yayin/.env` → `IG_ACCESS_TOKEN=...` (root:root 600). Instagram uzun ömürlü token'ları 60 gün geçerlidir.
- Kayıt: `/opt/wafil-yayin/veri/kayit.jsonl` (asıl kayıt). Bu daldaki `kayit.jsonl` 24 Ekim'de dondurulmuş başlangıç kopyasıdır.
- Hiç başlamamış bir iş plan saatinden 3 saat sonra hâlâ paylaşılmadıysa atlanır.
- Hermes supervisor kaydı salt okunur izler; atlanan ya da hatalı paylaşımı raporlar.

Kontrol (paylaşmaz): `ssh … /opt/wafil-yayin/tick.sh --kuru`

## Yeni hafta eklemek

1. Medya dosyalarını main'e `public/ig/hX/` olarak koy ve yayına al.
2. `plan-hafta-XX.json` dosyasını bu dala ekle, push'la.
3. Kontrol: VPS'te `/opt/wafil-yayin/tick.sh --kuru`. Token'ı ve önümüzdeki işlerin dosyalarını kontrol eder, paylaşmaz.

Elle tek iş: `node paylas.mjs plan-hafta-01.json H1-R1 --simdi` (yerelde token `envDosyasi`'ndan okunur).
