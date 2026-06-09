# WAFIL Franchise Başvuru Formu

React + Vite + Tailwind CSS ile yapılmış, mobile-first franchise başvuru formu.
Başvurular EmailJS üzerinden **omersametaydin@gmail.com** adresine gönderilir.

## Özellikler

- 📱 Mobile-first, tablet/desktop uyumlu responsive tasarım
- 🎨 WAFIL marka renkleri (#ffd21f sarı, #0b2e1f koyu yeşil, #ffffff beyaz)
- 🔤 League Spartan (başlık) + Inter / Neue Montreal (gövde) fontları
- ✅ Form validasyonu (zorunlu alanlar + e-mail format kontrolü)
- 📧 EmailJS entegrasyonu
- 🎉 Başarı mesajı ve otomatik form reset
- ▲ Vercel'e deploy'a hazır

## Kurulum

```bash
npm install
```

### EmailJS Ayarları

1. [emailjs.com](https://www.emailjs.com) üzerinde ücretsiz hesap açın.
2. Bir **Email Service** ekleyin (örn. Gmail) → `Service ID` alın.
3. Bir **Email Template** oluşturun. Şablonda **To Email** alanına
   `omersametaydin@gmail.com` (veya `{{to_email}}`) yazın. Şu değişkenleri kullanın:
   - `{{from_name}}` — İsim
   - `{{phone}}` — Telefon
   - `{{email}}` — E-mail
   - `{{city}}` — Şehir
   - `{{message}}` — Mesaj
   - `Reply-To` alanı için `{{reply_to}}`
4. **Account → API Keys** bölümünden `Public Key` alın.
5. `.env.example` dosyasını `.env` olarak kopyalayıp değerleri doldurun:

```bash
cp .env.example .env
```

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

### Geliştirme

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` açılır.

### Production Build

```bash
npm run build      # dist/ klasörünü üretir
npm run preview    # build'i lokalde önizler
```

## Vercel'e Deploy

1. Projeyi bir GitHub deposuna push edin.
2. [vercel.com](https://vercel.com) → **Add New → Project** → repoyu seçin.
3. Vercel Vite'ı otomatik algılar:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Settings → Environment Variables** bölümüne üç `VITE_EMAILJS_*`
   değişkenini ekleyin.
5. **Deploy**'a tıklayın. ✅

> Not: `.env` dosyası `.gitignore` içinde olduğu için repoya gönderilmez —
> ortam değişkenlerini Vercel panelinden eklemeyi unutmayın.

## Proje Yapısı

```
.
├── index.html              # Giriş HTML + font yüklemeleri
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx             # Form bileşeni + validasyon + EmailJS
│   ├── main.jsx            # React giriş noktası
│   └── index.css           # Tailwind direktifleri + base stiller
├── tailwind.config.js      # Marka renkleri & fontlar
├── vercel.json             # SPA rewrite
└── .env.example            # EmailJS ortam değişkeni şablonu
```

## Notlar

- **Neue Montreal** ticari bir fonttur ve Google Fonts'ta yoktur. Lisanslı
  font dosyanız varsa `src/index.css` içine `@font-face` ile ekleyebilirsiniz;
  aksi halde benzer geometrik bir sans-serif olan **Inter** fallback olarak
  yüklenir.
