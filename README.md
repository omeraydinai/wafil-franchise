# Instagram paylaşım dalı

Bu dal siteye ait değildir; Vercel bu dalı yayına almaz (`vercel.json`). @wafil.tr paylaşımlarının planı ve kaydı burada durur.

- `plan-hafta-XX.json`: haftanın işleri (zaman, tür, dosyalar, açıklama). Medya dosyaları main dalındaki `public/ig/hX/` klasöründen, sitenin adresinden okunur.
- `paylas.mjs`: zamanı gelen işleri paylaşır.
- `kayit.jsonl`: her paylaşım, atlama ve hata. Paylaşılmış parça tekrar paylaşılmaz.

## Nasıl çalışıyor

Main dalındaki `.github/workflows/instagram.yml` her 15 dakikada bir bu dalı açar, `node paylas.mjs` çalıştırır ve kaydı bu dala geri yazar. GitHub zamanlanmış işleri birkaç dakika, yoğunlukta 15–30 dakika geciktirebilir. Hiç başlamamış bir iş plan saatinden 3 saat sonra hâlâ paylaşılmadıysa atlanır.

Token `IG_ACCESS_TOKEN` adlı GitHub secret'ında durur (repo → Settings → Secrets and variables → Actions). Instagram uzun ömürlü token'ları 60 gün geçerlidir; süresi dolunca yenisi aynı secret'a yazılır.

## Yeni hafta eklemek

1. Medya dosyalarını main'e `public/ig/hX/` olarak koy ve yayına al.
2. `plan-hafta-XX.json` dosyasını bu dala ekle, push'la.
3. Kontrol: GitHub → Actions → "Instagram paylaşım" → Run workflow → "Yalnız kontrol" işaretli. Token'ı ve önümüzdeki işlerin dosyalarını kontrol eder, paylaşmaz.

Elle tek iş: `node paylas.mjs plan-hafta-01.json H1-R1 --simdi` (yerelde token `envDosyasi`'ndan okunur).
