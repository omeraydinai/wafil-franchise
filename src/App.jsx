import { useState } from 'react'
import emailjs from '@emailjs/browser'

// EmailJS configuration — set these in a .env file (see .env.example).
// Başvurular omersametaydin@gmail.com adresine gönderilir
// (alıcı adresi EmailJS şablonunda "To Email" olarak tanımlanır).
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const RECIPIENT = 'omersametaydin@gmail.com'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  city: '',
  message: '',
}

const FIELDS = [
  {
    name: 'name',
    label: 'İsim',
    type: 'text',
    placeholder: 'Adınız ve soyadınız',
    autoComplete: 'name',
  },
  {
    name: 'phone',
    label: 'Telefon',
    type: 'tel',
    placeholder: '05XX XXX XX XX',
    autoComplete: 'tel',
  },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'ornek@mail.com',
    autoComplete: 'email',
  },
  {
    name: 'city',
    label: 'Şehir',
    type: 'text',
    placeholder: 'Hangi şehirde?',
    autoComplete: 'address-level2',
  },
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}

  if (!form.name.trim()) errors.name = 'İsim gerekli.'
  if (!form.phone.trim()) errors.phone = 'Telefon gerekli.'

  if (!form.email.trim()) {
    errors.email = 'E-mail gerekli.'
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Geçerli bir e-mail adresi girin.'
  }

  if (!form.city.trim()) errors.city = 'Şehir gerekli.'
  if (!form.message.trim()) errors.message = 'Mesaj gerekli.'

  return errors
}

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Kullanıcı yazmaya başlayınca o alanın hatasını temizle.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error(
        'EmailJS ortam değişkenleri tanımlı değil. .env dosyasını kontrol edin.',
      )
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          message: form.message,
          to_email: RECIPIENT,
          reply_to: form.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )

      setStatus('success')
      setForm(INITIAL_FORM)
      setErrors({})
    } catch (err) {
      console.error('Başvuru gönderilemedi:', err)
      setStatus('error')
    }
  }

  const isSending = status === 'sending'

  return (
    <main className="min-h-screen w-full bg-wafil-green px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-10">
          <span className="inline-block rounded-full bg-wafil-yellow px-4 py-1 font-heading text-xs font-bold uppercase tracking-[0.2em] text-wafil-green">
            WAFIL
          </span>
          <h1 className="mt-5 font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
            WAFIL Franchise
            <span className="block text-wafil-yellow">Başvurusu</span>
          </h1>
          <p className="mt-3 font-body text-base text-white/70 sm:text-lg">
            Kendi işini kur.
          </p>
        </header>

        {/* Form card */}
        <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
          {status === 'success' ? (
            <SuccessMessage onReset={() => setStatus('idle')} />
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-5">
              {FIELDS.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={form[field.name]}
                  error={errors[field.name]}
                  onChange={handleChange}
                  disabled={isSending}
                />
              ))}

              {/* Mesaj */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-heading text-sm font-semibold text-wafil-green"
                >
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  disabled={isSending}
                  placeholder="Eklemek istediklerinizi yazın..."
                  aria-invalid={Boolean(errors.message)}
                  className={fieldClasses(errors.message)}
                />
                {errors.message && <ErrorText>{errors.message}</ErrorText>}
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  Başvuru gönderilemedi. Lütfen tekrar deneyin.
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="group relative w-full overflow-hidden rounded-xl bg-wafil-green px-6 py-4 font-heading text-base font-bold uppercase tracking-wide text-white transition-all duration-200 hover:bg-[#0f3d29] hover:shadow-lg hover:shadow-wafil-green/30 focus:outline-none focus:ring-4 focus:ring-wafil-yellow/50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>
            </form>
          )}
        </div>

        <footer className="mt-8 text-center font-body text-xs text-white/40">
          © {new Date().getFullYear()} WAFIL. Tüm hakları saklıdır.
        </footer>
      </div>
    </main>
  )
}

function Field({ field, value, error, onChange, disabled }) {
  return (
    <div>
      <label
        htmlFor={field.name}
        className="mb-1.5 block font-heading text-sm font-semibold text-wafil-green"
      >
        {field.label}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        aria-invalid={Boolean(error)}
        className={fieldClasses(error)}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

function fieldClasses(error) {
  const base =
    'w-full rounded-xl border bg-wafil-green/[0.03] px-4 py-3 font-body text-base text-wafil-green placeholder:text-wafil-green/35 transition-colors duration-150 focus:outline-none focus:ring-2 disabled:opacity-60'
  const state = error
    ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
    : 'border-wafil-green/15 focus:border-wafil-green focus:ring-wafil-yellow/40'
  return `${base} ${state}`
}

function ErrorText({ children }) {
  return <p className="mt-1.5 text-xs font-medium text-red-600">{children}</p>
}

function SuccessMessage({ onReset }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-wafil-yellow">
        <svg
          className="h-8 w-8 text-wafil-green"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 className="mt-5 font-heading text-2xl font-extrabold uppercase text-wafil-green">
        Başvurunuz Alındı!
      </h2>
      <p className="mt-2 font-body text-base text-wafil-green/70">
        En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-xl border-2 border-wafil-green px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-wafil-green transition-colors duration-200 hover:bg-wafil-green hover:text-white focus:outline-none focus:ring-4 focus:ring-wafil-yellow/50"
      >
        Yeni Başvuru
      </button>
    </div>
  )
}
