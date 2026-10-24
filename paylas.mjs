// Instagram'a paylaşım (Instagram API, Instagram Login token'ı).
//
// Otomatik kip (GitHub Actions bunu çalıştırır):
//   node paylas.mjs [--kuru]
//   Bütün plan-*.json dosyalarında zamanı gelmiş ve paylaşılmamış işleri paylaşır.
//   --kuru: token'ı ve önümüzdeki işlerin dosya adreslerini kontrol eder, paylaşmaz.
// Tek iş kipi:
//   node paylas.mjs <plan.json> <iş-id> [--simdi] [--kuru]
//
// Token: IG_ACCESS_TOKEN ortam değişkeni (bulutta GitHub secret). Yoksa planın envDosyasi'ndaki access_token.
// Token ekrana ve kayda yazılmaz. Kayıt: kayit.jsonl (paylaşılan kare/gönderi tekrar paylaşılmaz).
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const API = 'https://graph.instagram.com/v21.0';
const GEC_KALMA_SINIRI_SAAT = 3; // hiç başlamamış iş bu kadar gecikirse atlanır
const KAYIT = path.join(DIR, 'kayit.jsonl');

const argv = process.argv.slice(2);
const bayraklar = argv.filter((a) => a.startsWith('--'));
const [planArg, isArg] = argv.filter((a) => !a.startsWith('--'));
const kuru = bayraklar.includes('--kuru');
const simdi = bayraklar.includes('--simdi');

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

const kayitlar = () =>
  fs.existsSync(KAYIT) ? fs.readFileSync(KAYIT, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [];
const yaz = (isId, kayit) => fs.appendFileSync(KAYIT, JSON.stringify({zaman: new Date().toISOString(), is: isId, ...kayit}) + '\n');

const tokenBul = (plan) => {
  if (process.env.IG_ACCESS_TOKEN) return process.env.IG_ACCESS_TOKEN.trim();
  if (plan?.envDosyasi && fs.existsSync(path.resolve(DIR, plan.envDosyasi))) {
    const m = fs.readFileSync(path.resolve(DIR, plan.envDosyasi), 'utf8').match(/^access_token=(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  }
  return null;
};

const planlar = () =>
  fs
    .readdirSync(DIR)
    .filter((f) => /^plan-.*\.json$/.test(f))
    .sort()
    .map((f) => ({dosya: f, ...JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'))}));

const istemci = (plan, token) => {
  const temizle = (s) => String(s).split(token).join('<token>');
  const istek = async (yontem, uc, params = {}) => {
    const body = new URLSearchParams({...params, access_token: token});
    const res = yontem === 'GET' ? await fetch(`${API}${uc}?${body}`) : await fetch(`${API}${uc}`, {method: 'POST', body});
    const json = await res.json();
    if (json.error) throw new Error(temizle(`${json.error.message} (kod ${json.error.code}${json.error.error_subcode ? '/' + json.error.error_subcode : ''})`));
    return json;
  };
  return {istek, temizle};
};

const url = (plan, dosya) => `${plan.medyaAdresi}/${dosya}`;

const adresKontrol = async (plan, dosyalar) => {
  for (const d of dosyalar) {
    const res = await fetch(url(plan, d), {method: 'HEAD'});
    const tur = res.headers.get('content-type') || '';
    if (!res.ok || tur.includes('text/html')) throw new Error(`Dosya adreste yok: ${url(plan, d)} (${res.status} ${tur})`);
  }
};

// Bir işi paylaşır. Kayıtta paylaşılmış parçaları atlar.
const isiPaylas = async (plan, is, token) => {
  const {istek} = istemci(plan, token);
  const ig = plan.igKullanici;
  const yapildi = new Set(kayitlar().filter((k) => k.durum === 'paylasildi').map((k) => k.parca));

  const hazirOlmasiniBekle = async (id) => {
    for (let i = 0; i < 60; i++) {
      const {status_code, status} = await istek('GET', `/${id}`, {fields: 'status_code,status'});
      if (status_code === 'FINISHED') return;
      if (status_code === 'ERROR' || status_code === 'EXPIRED') throw new Error(`Kapsayıcı ${status_code}: ${status}`);
      await bekle(5000);
    }
    throw new Error('Kapsayıcı 5 dakikada hazırlanmadı');
  };
  const yayinla = async (creationId) => (await istek('POST', `/${ig}/media_publish`, {creation_id: creationId})).id;

  // Kayıt yazılamadan önceki bir çalışma paylaşmış olabilir: aynı açıklamayla yeni bir gönderi varsa tekrar paylaşma
  const zatenFeedde = async () => {
    const {data = []} = await istek('GET', `/${ig}/media`, {fields: 'id,caption,timestamp', limit: '10'});
    const esik = new Date(is.zaman).getTime() - 3600e3;
    return data.find((m) => (m.caption ?? '').trim() === is.aciklama.trim() && new Date(m.timestamp).getTime() >= esik);
  };

  await adresKontrol(plan, is.dosyalar);

  if (is.tur === 'REELS' || is.tur === 'CAROUSEL') {
    if (yapildi.has(is.id)) return;
    const onceki = await zatenFeedde();
    if (onceki) {
      yaz(is.id, {durum: 'paylasildi', parca: is.id, medya: onceki.id, not: 'feedde zaten vardı'});
      return console.log(`${is.id}: feedde zaten var (${onceki.id}), kayda işlendi.`);
    }
    let id;
    if (is.tur === 'REELS') {
      ({id} = await istek('POST', `/${ig}/media`, {
        media_type: 'REELS',
        video_url: url(plan, is.dosyalar[0]),
        caption: is.aciklama,
        share_to_feed: 'true',
        ...(is.kapakMs !== undefined ? {thumb_offset: String(is.kapakMs)} : {}),
      }));
    } else {
      const cocuklar = [];
      for (const d of is.dosyalar) cocuklar.push((await istek('POST', `/${ig}/media`, {image_url: url(plan, d), is_carousel_item: 'true'})).id);
      for (const c of cocuklar) await hazirOlmasiniBekle(c);
      ({id} = await istek('POST', `/${ig}/media`, {media_type: 'CAROUSEL', children: cocuklar.join(','), caption: is.aciklama}));
    }
    await hazirOlmasiniBekle(id);
    const medya = await yayinla(id);
    yaz(is.id, {durum: 'paylasildi', parca: is.id, medya});
    console.log(`${is.id}: ${is.tur} paylaşıldı (${medya}).`);
  } else if (is.tur === 'STORY') {
    for (const [i, d] of is.dosyalar.entries()) {
      const parca = `${is.id}#${i}`;
      if (yapildi.has(parca)) continue;
      const {id} = await istek('POST', `/${ig}/media`, {media_type: 'STORIES', image_url: url(plan, d)});
      await hazirOlmasiniBekle(id);
      const medya = await yayinla(id);
      yaz(is.id, {durum: 'paylasildi', parca, medya});
      console.log(`${is.id}: hikâye karesi ${i + 1}/${is.dosyalar.length} paylaşıldı (${medya}).`);
      await bekle(3000);
    }
  } else throw new Error(`Bilinmeyen tür: ${is.tur}`);
};

const parcalar = (is) => (is.tur === 'STORY' ? is.dosyalar.map((_, i) => `${is.id}#${i}`) : [is.id]);

const durum = (is) => {
  const k = kayitlar().filter((x) => x.is === is.id);
  const yapildi = new Set(k.filter((x) => x.durum === 'paylasildi').map((x) => x.parca));
  const hepsi = parcalar(is).every((p) => yapildi.has(p));
  return {hepsi, basladi: yapildi.size > 0, atlandi: k.some((x) => x.durum === 'atlandi')};
};

// Geçici hatalarda iki kez daha dener
const denemeli = async (plan, is, token) => {
  const {temizle} = istemci(plan, token);
  for (let deneme = 1; ; deneme++) {
    try {
      return await isiPaylas(plan, is, token);
    } catch (e) {
      const mesaj = temizle(e.message);
      yaz(is.id, {durum: 'hata', deneme, mesaj});
      console.error(`${is.id}: hata (deneme ${deneme}): ${mesaj}`);
      if (deneme >= 3 || /adreste yok|Bilinmeyen tür/.test(mesaj)) throw new Error(mesaj);
      await bekle(30000);
    }
  }
};

const otomatik = async () => {
  const hepsi = planlar();
  const token = tokenBul(hepsi[0]);
  if (!token) {
    console.log('IG_ACCESS_TOKEN yok; hiçbir şey yapılmadı.');
    return;
  }
  const now = Date.now();

  if (kuru) {
    const {istek} = istemci(hepsi[0], token);
    const me = await istek('GET', '/me', {fields: 'username'});
    console.log(`Token geçerli: @${me.username}`);
    for (const plan of hepsi)
      for (const is of plan.isler) {
        if (durum(is).hepsi || new Date(is.zaman).getTime() < now - GEC_KALMA_SINIRI_SAAT * 36e5) continue;
        await adresKontrol(plan, is.dosyalar);
        console.log(`Hazır: ${is.id} · ${is.zaman} · ${is.dosyalar.length} dosya`);
      }
    return;
  }

  let hata = false;
  for (const plan of hepsi)
    for (const is of plan.isler) {
      const t = new Date(is.zaman).getTime();
      if (t > now) continue;
      const d = durum(is);
      if (d.hepsi || d.atlandi) continue;
      const gecSaat = (now - t) / 36e5;
      // Yarıda kalmış hikâye her zaman tamamlanır; hiç başlamamış iş çok geç kaldıysa atlanır
      if (!d.basladi && gecSaat > GEC_KALMA_SINIRI_SAAT) {
        yaz(is.id, {durum: 'atlandi', neden: `plan saatinden ${gecSaat.toFixed(1)} saat geç`});
        console.log(`${is.id}: ${gecSaat.toFixed(1)} saat geç, atlandı.`);
        continue;
      }
      try {
        await denemeli(plan, is, token);
      } catch {
        hata = true;
      }
    }
  if (hata) process.exitCode = 1;
};

const tekIs = async () => {
  const plan = JSON.parse(fs.readFileSync(path.resolve(DIR, planArg), 'utf8'));
  const is = plan.isler.find((i) => i.id === isArg);
  if (!is) throw new Error(`Planda yok: ${isArg}`);
  const token = tokenBul(plan);
  if (!token) throw new Error('Token bulunamadı (IG_ACCESS_TOKEN ya da envDosyasi)');
  if (kuru) {
    await adresKontrol(plan, is.dosyalar);
    return console.log(`Kuru çalışma tamam: ${is.dosyalar.length} dosya adreste.`);
  }
  if (!simdi) {
    const gec = (Date.now() - new Date(is.zaman).getTime()) / 36e5;
    if (gec < -0.1) throw new Error(`Daha erken: plan saati ${is.zaman}`);
  }
  await denemeli(plan, is, token);
};

await (planArg ? tekIs() : otomatik());
