# WAFIL Franchise Landing

Vite + Tailwind CSS ile yapılmış, mobile-first franchise başvuru sayfası.
Başvurular Google Apps Script üzerinden **wafil.turkiye@gmail.com** adresine gönderilir.

Statik çok sayfalı bir site — React kullanılmıyor.

## Yapı

```
.
├── index.html                      # Landing sayfası
├── pages/
│   ├── kvkk.html                   # KVKK Aydınlatma Metni
│   ├── gizlilik.html               # Gizlilik Politikası
│   └── kullanim-kosullari.html     # Kullanım Koşulları
├── src/
│   ├── form.js                     # Form + akordeon + mobil menü (landing girişi)
│   ├── page.js                     # Yasal sayfaların stil girişi
│   └── index.css                   # Tailwind direktifleri + özel stiller
├── public/                         # Üretilmiş, deploy edilen görseller
├── assets-src/                     # Yüksek çözünürlüklü kaynak görseller (deploy EDİLMEZ)
├── scripts/optimize-images.mjs     # Görsel optimizasyonu
├── apps-script/Code.gs             # Backend (Google Apps Script)
└── tailwind.config.js              # Marka renkleri, tipografi, spacing token'ları
```

## Kurulum

```bash
npm install
```

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` açılır.

## Görseller

Kaynak görseller `assets-src/` içinde durur ve **deploy edilmez**. `public/` içindeki
responsive WebP + JPEG fallback dosyaları bu kaynaklardan üretilir:

```bash
npm run images
```

`assets-src/` içindeki bir görseli değiştirdiğinizde bu komutu tekrar çalıştırın.
Hero görseli mobilde ~51 KB (768w WebP) olarak servis edilir.

> Kaynak görselleri doğrudan `public/` içine koymayın — orijinal hero PNG 2,3 MB'tır
> ve `public/` içindeki her şey olduğu gibi deploy edilir.

## Backend (Google Apps Script)

Form, `apps-script/Code.gs` içindeki Web App'e GET isteği atar. Web App
`Access-Control-Allow-Origin: *` döndürdüğü için istemci yanıtı okuyabilir ve
gerçek başarı/hata durumunu ayırt eder.

Web App URL'i `src/form.js` içinde varsayılan olarak gömülüdür; değiştirmek için
`.env` dosyasına yazın:

```env
VITE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

Endpoint'in ayakta olduğunu doğrulamak için (e-posta göndermez):

```bash
curl -sL "https://script.google.com/macros/s/AKfycbyUcHNGlLsU-j1DEdjtn5kRtEbhL0qoUTWD_hCRktEGxBj2VrdMRpj_N6SXPgpp5iRrYA/exec"
```

`{"status":"WAFIL API çalışıyor."}` dönmelidir.

## Meta Pixel

`index.html` içinde `window.WAFIL_PIXEL_ID` **boştur** — bu hâliyle hiçbir takip
kodu yüklenmez, hiçbir istek atılmaz.

Instagram reklamının tıklama yerine **başvuruya** göre optimize edebilmesi için
Events Manager'daki Pixel ID'nizi bu değişkene yazın. Dolduğu anda:

- sayfa açılışında `PageView`,
- form başarıyla gönderildiğinde `Lead` (bkz. `src/form.js`)

event'leri tetiklenir.

> Pixel'i açtığınızda `pages/gizlilik.html` içindeki "Çerezler" bölümünü güncelleyin
> ve bir çerez onay bandı eklemeyi değerlendirin.

## Yasal metinler

`pages/` altındaki üç metin **taslaktır**. Yayına almadan önce:

1. Tam ticaret unvanı, MERSİS/vergi numarası ve adresi ekleyin
   (dosyaların başındaki HTML yorumlarında işaretli).
2. Bir hukuk danışmanına okutun.
3. VERBİS kayıt yükümlülüğünüz varsa kaydınızı yaptırın.

## Production build

```bash
npm run build
```

`dist/` klasörünü üretir. Önizlemek için:

```bash
npm run preview
```

## Vercel'e deploy

Vercel Vite'ı otomatik algılar (`vercel.json` içinde de tanımlı):

- **Build Command:** `npm run build`
- **Output Directory:** `dist`

`VITE_SCRIPT_URL` kullanıyorsanız Vercel → Settings → Environment Variables
bölümüne eklemeyi unutmayın.

> `vercel.json` içinde eskiden tüm istekleri `/`'a yönlendiren bir SPA rewrite
> kuralı vardı; `pages/` altındaki sayfaları kırdığı için kaldırıldı.
