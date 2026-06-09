import { useState } from 'react'

// Google Apps Script Web App URL'ini buraya yapıştır
// (Deploy → Web App → URL kopyala)
const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  city: '',
  message: '',
}

const FIELDS = [
  { name: 'name',  label: 'İsim',    type: 'text',  placeholder: 'Adınız ve soyadınız', autoComplete: 'name' },
  { name: 'phone', label: 'Telefon', type: 'tel',   placeholder: '05XX XXX XX XX',      autoComplete: 'tel' },
  { name: 'email', label: 'E-mail',  type: 'email', placeholder: 'ornek@mail.com',      autoComplete: 'email' },
  { name: 'city',  label: 'Şehir',   type: 'text',  placeholder: 'Hangi şehirde?',      autoComplete: 'address-level2' },
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!form.name.trim())    errors.name    = 'İsim gerekli.'
  if (!form.phone.trim())   errors.phone   = 'Telefon gerekli.'
  if (!form.email.trim())   errors.email   = 'E-mail gerekli.'
  else if (!EMAIL_REGEX.test(form.email.trim())) errors.email = 'Geçerli bir e-mail adresi girin.'
  if (!form.city.trim())    errors.city    = 'Şehir gerekli.'
  if (!form.message.trim()) errors.message = 'Mesaj gerekli.'
  return errors
}

export default function App() {
  const [form, setForm]     = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!SCRIPT_URL || SCRIPT_URL.includes('BURAYA')) {
      console.error('VITE_SCRIPT_URL tanımlı değil!')
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      // Google Apps Script CORS kısıtlaması nedeniyle no-cors kullanılır.
      // İstek Apps Script'e ulaşır (email + sheet çalışır), yanıt okunamaz — bu normaldir.
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode:   'no-cors',
        body:   new URLSearchParams({
          name:    form.name.trim(),
          phone:   form.phone.trim(),
          email:   form.email.trim(),
          city:    form.city.trim(),
          message: form.message.trim(),
        }),
      })

      // no-cors'ta response okunamaz; hata yoksa başarı kabul edilir.
      setStatus('success')
      setForm(INITIAL_FORM)
      setErrors({})
    } catch (err) {
      console.error('Gönderim hatası:', err)
      setStatus('error')
    }
  }

  const isSending = status === 'sending'

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-wafil-green">

      {/* ── Sol: Branding ── */}
      <div className="flex flex-col justify-center items-center lg:items-start
                      lg:w-[42%] px-8 py-6 lg:px-16 text-center lg:text-left shrink-0">

        <span className="inline-block rounded-full bg-wafil-yellow px-4 py-1
                         font-heading text-xs font-bold uppercase tracking-[0.2em] text-wafil-green">
          WAFIL
        </span>

        <h1 className="mt-4 font-heading text-4xl lg:text-5xl xl:text-6xl
                       font-extrabold uppercase leading-[1.05] tracking-tight text-white">
          WAFIL
          <br />
          Franchise
          <span className="block text-wafil-yellow">Başvurusu</span>
        </h1>

        <p className="mt-3 font-body text-base lg:text-lg text-white/60">
          Kendi işini kur.
        </p>

        <div className="mt-6 h-px w-12 bg-wafil-yellow/40 hidden lg:block" />

        <p className="mt-4 hidden lg:block font-body text-sm text-white/35 leading-relaxed max-w-xs">
          Türkiye'nin büyüyen marka ekibine katıl,<br />
          kendi şehrine taşı.
        </p>

        <footer className="mt-auto pt-6 font-body text-xs text-white/25 hidden lg:block">
          © {new Date().getFullYear()} WAFIL. Tüm hakları saklıdır.
        </footer>
      </div>

      {/* ── Sağ: Form ── */}
      <div className="flex-1 bg-white flex items-center justify-center
                      px-6 py-6 lg:px-10 overflow-y-auto">
        <div className="w-full max-w-md">

          {status === 'success' ? (
            <SuccessMessage onReset={() => setStatus('idle')} />
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-3">

              <div className="grid grid-cols-2 gap-3">
                {FIELDS.slice(0, 2).map((field) => (
                  <Field key={field.name} field={field}
                         value={form[field.name]} error={errors[field.name]}
                         onChange={handleChange} disabled={isSending} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {FIELDS.slice(2, 4).map((field) => (
                  <Field key={field.name} field={field}
                         value={form[field.name]} error={errors[field.name]}
                         onChange={handleChange} disabled={isSending} />
                ))}
              </div>

              <div>
                <label htmlFor="message"
                       className="mb-1 block font-heading text-xs font-semibold text-wafil-green">
                  Mesaj
                </label>
                <textarea
                  id="message" name="message" rows={3}
                  value={form.message} onChange={handleChange}
                  disabled={isSending}
                  placeholder="Eklemek istediklerinizi yazın..."
                  aria-invalid={Boolean(errors.message)}
                  className={fieldClasses(errors.message) + ' resize-none'}
                />
                {errors.message && <ErrorText>{errors.message}</ErrorText>}
              </div>

              {status === 'error' && (
                <div role="alert"
                     className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  Başvuru gönderilemedi. Lütfen tekrar deneyin.
                </div>
              )}

              <button
                type="submit" disabled={isSending}
                className="w-full rounded-xl bg-wafil-green px-6 py-3.5
                           font-heading text-sm font-bold uppercase tracking-wide text-white
                           transition-all duration-200
                           hover:bg-[#0f3d29] hover:shadow-lg hover:shadow-wafil-green/30
                           focus:outline-none focus:ring-4 focus:ring-wafil-yellow/50
                           active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                {isSending ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>

            </form>
          )}
        </div>
      </div>
    </main>
  )
}

function Field({ field, value, error, onChange, disabled }) {
  return (
    <div>
      <label htmlFor={field.name}
             className="mb-1 block font-heading text-xs font-semibold text-wafil-green">
        {field.label}
      </label>
      <input
        id={field.name} name={field.name} type={field.type}
        value={value} onChange={onChange} disabled={disabled}
        placeholder={field.placeholder} autoComplete={field.autoComplete}
        aria-invalid={Boolean(error)}
        className={fieldClasses(error)}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

function fieldClasses(error) {
  const base =
    'w-full rounded-xl border bg-wafil-green/[0.03] px-3 py-2.5 font-body text-sm text-wafil-green ' +
    'placeholder:text-wafil-green/35 transition-colors duration-150 ' +
    'focus:outline-none focus:ring-2 disabled:opacity-60'
  const state = error
    ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
    : 'border-wafil-green/15 focus:border-wafil-green focus:ring-wafil-yellow/40'
  return `${base} ${state}`
}

function ErrorText({ children }) {
  return <p className="mt-1 text-xs font-medium text-red-600">{children}</p>
}

function SuccessMessage({ onReset }) {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-wafil-yellow">
        <svg className="h-8 w-8 text-wafil-green" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" strokeWidth="3"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 className="mt-5 font-heading text-2xl font-extrabold uppercase text-wafil-green">
        Başvurunuz Alındı!
      </h2>
      <p className="mt-2 font-body text-sm text-wafil-green/70">
        En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
      </p>
      <button
        type="button" onClick={onReset}
        className="mt-6 rounded-xl border-2 border-wafil-green px-6 py-3
                   font-heading text-sm font-bold uppercase tracking-wide text-wafil-green
                   transition-colors duration-200 hover:bg-wafil-green hover:text-white
                   focus:outline-none focus:ring-4 focus:ring-wafil-yellow/50">
        Yeni Başvuru
      </button>
    </div>
  )
}
