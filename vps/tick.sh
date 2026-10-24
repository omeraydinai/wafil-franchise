#!/usr/bin/env bash
# Wafıl Instagram paylaşımı: planı güncelle, zamanı gelenleri paylaş.
# wafil-yayin-tick.timer 5 dakikada bir çalıştırır (root). Kod wafil kullanıcısıyla güncellenir,
# paylaşım root olmayan, salt okunur bir container'da çalışır.
set -euo pipefail
KOK=/opt/wafil-yayin
UID_GID="$(id -u wafil):$(id -g wafil)"

# Plan ve betik: instagram dalı (herkese açık repo, kimlik bilgisi gerekmez)
runuser -u wafil -- git -C "$KOK/kod" pull --ff-only -q origin instagram || echo "uyarı: git pull başarısız, mevcut kodla devam"

# Token yoksa hiçbir şey yapma
if [ ! -s "$KOK/.env" ]; then echo ".env yok; atlandı"; exit 0; fi

exec docker run --rm --name wafil-yayin-tick \
  --user "$UID_GID" --read-only --cap-drop ALL --security-opt no-new-privileges \
  --memory 256m --pids-limit 64 \
  -v "$KOK/kod:/app:ro" -v "$KOK/veri:/veri" \
  --env-file "$KOK/.env" -e KAYIT_DOSYASI=/veri/kayit.jsonl \
  -w /app node:22-alpine node paylas.mjs "$@"
