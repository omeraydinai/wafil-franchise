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
      const params = new URLSearchParams({
        name:    form.name.trim(),
        phone:   form.phone.trim(),
        email:   form.email.trim(),
        city:    form.city.trim(),
        message: form.message.trim(),
      })

      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode:   'no-cors',
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

        {/* Instagram */}
        <a
          href="https://www.instagram.com/wafil.tr/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/20
                     px-4 py-2 font-body text-sm text-white/70
                     transition-all duration-200 hover:border-wafil-yellow/60
                     hover:text-wafil-yellow hover:bg-white/5"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @wafil.tr
        </a>

        <footer className="mt-auto pt-6 font-body text-xs text-white/25 hidden lg:block">
          © {new Date().getFullYear()} WAFIL. Tüm hakları saklıdır.
        </footer>
      </div>

      {/* ── Sağ: Form ── */}
      <div className="flex-1 bg-wafil-green flex items-center justify-center
                      px-6 py-6 lg:px-10 overflow-y-auto border-l border-white/10">
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
                       className="mb-1 block font-heading text-xs font-semibold text-white/80">
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
                     className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
                  Başvuru gönderilemedi. Lütfen tekrar deneyin.
                </div>
              )}

              <button
                type="submit" disabled={isSending}
                className="w-full rounded-xl bg-wafil-yellow px-6 py-3.5
                           font-heading text-sm font-bold uppercase tracking-wide text-wafil-green
                           transition-all duration-200
                           hover:bg-yellow-300 hover:shadow-lg hover:shadow-black/20
                           focus:outline-none focus:ring-4 focus:ring-wafil-yellow/30
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
             className="mb-1 block font-heading text-xs font-semibold text-white/80">
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
    'w-full rounded-xl border bg-white/10 px-3 py-2.5 font-body text-sm text-white ' +
    'placeholder:text-white/30 transition-colors duration-150 ' +
    'focus:outline-none focus:ring-2 focus:bg-white/15 disabled:opacity-60'
  const state = error
    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30'
    : 'border-white/20 focus:border-wafil-yellow focus:ring-wafil-yellow/20'
  return `${base} ${state}`
}

function ErrorText({ children }) {
  return <p className="mt-1 text-xs font-medium text-red-400">{children}</p>
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
      <h2 className="mt-5 font-heading text-2xl font-extrabold uppercase text-white">
        Başvurunuz Alındı!
      </h2>
      <p className="mt-2 font-body text-sm text-white/60">
        En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
      </p>
      <button
        type="button" onClick={onReset}
        className="mt-6 rounded-xl border-2 border-wafil-yellow px-6 py-3
                   font-heading text-sm font-bold uppercase tracking-wide text-wafil-yellow
                   transition-colors duration-200 hover:bg-wafil-yellow hover:text-wafil-green
                   focus:outline-none focus:ring-4 focus:ring-wafil-yellow/30">
        Yeni Başvuru
      </button>
    </div>
  )
}
