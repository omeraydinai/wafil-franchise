#!/usr/bin/env bash
# VPS'e bir kez çalıştırılır (root). Token'ı koymaz: .env'i kullanıcı kendisi yazar.
set -euo pipefail
KOK=/opt/wafil-yayin
id wafil >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin wafil
mkdir -p "$KOK/veri"
[ -d "$KOK/kod/.git" ] || git clone -q --branch instagram --single-branch https://github.com/omeraydinai/wafil-franchise.git "$KOK/kod"
[ -f "$KOK/veri/kayit.jsonl" ] || cp "$KOK/kod/kayit.jsonl" "$KOK/veri/kayit.jsonl"
chown -R wafil:wafil "$KOK/kod" "$KOK/veri"
chown root:wafil "$KOK"
chmod 750 "$KOK" "$KOK/veri"
# .env (token) root:root 600 olmalı; docker daemon okur, wafil okuyamaz
install -m 755 -o root -g root "$KOK/kod/vps/tick.sh" "$KOK/tick.sh"
install -m 644 "$KOK/kod/vps/wafil-yayin-tick.service" /etc/systemd/system/
install -m 644 "$KOK/kod/vps/wafil-yayin-tick.timer" /etc/systemd/system/
docker pull -q node:22-alpine >/dev/null
systemctl daemon-reload
echo "Kuruldu. Zamanlayıcı henüz açık değil: systemctl enable --now wafil-yayin-tick.timer"
