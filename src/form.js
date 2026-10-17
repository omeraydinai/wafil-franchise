import '@fontsource-variable/league-spartan'
import '@fontsource-variable/hanken-grotesk'
import './index.css'
import { scrollToTarget } from './motion.js'

const SCRIPT_URL =
  import.meta.env.VITE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbyUcHNGlLsU-j1DEdjtn5kRtEbhL0qoUTWD_hCRktEGxBj2VrdMRpj_N6SXPgpp5iRrYA/exec'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function composeMessage({ district, note }) {
  const lines = []
  if (district) lines.push(`İlçe: ${district}`)
  if (note) lines.push(note)
  return lines.join('\n') || 'Franchise landing başvurusu'
}

function setStatus(form, type, text) {
  let box = form.querySelector('[data-form-status]')
  if (!box) {
    box = document.createElement('div')
    box.dataset.formStatus = 'true'
    box.setAttribute('role', 'alert')
    form.querySelector('[type="submit"]')?.before(box)
  }
  box.textContent = text
  box.className =
    type === 'error'
      ? 'border-t-2 border-[#b42318] pt-3 text-[15px] font-medium text-[#b42318]'
      : type === 'success'
        ? 'pt-3 text-[15px] text-ink-soft'
        : 'hidden'
}

function showSuccess(form) {
  const panel = form.parentElement
  panel.innerHTML = `
    <div class="py-10">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-sun text-ink">
        <svg class="ic !h-7 !w-7" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
      </div>
      <h3 class="mt-6 font-display text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-ink">Başvurunuz alındı</h3>
      <p class="mt-3 text-lg text-ink-soft">En kısa sürede sizinle iletişime geçeceğiz.</p>
      <button type="button" data-new-application class="link-line mt-8 text-ink">Yeni başvuru</button>
    </div>
  `
  panel.querySelector('[data-new-application]')?.addEventListener('click', () => location.reload())
}

/**
 * Başvuruyu Apps Script'e gönderir.
 *
 * Eskiden `mode: 'no-cors'` kullanılıyordu; o modda yanıt okunamadığı için
 * fetch HER ZAMAN başarılı görünüyordu. Apps Script kotası dolsa veya deploy
 * bozulsa kullanıcı yine "Başvurunuz alındı" ekranını görüyor, başvuru ise
 * hiçbir yere ulaşmıyordu. Endpoint `Access-Control-Allow-Origin: *`
 * döndürdüğü için normal CORS isteği atıp yanıtı gerçekten doğrulayabiliyoruz.
 */
async function submitApplication(params) {
  const res = await fetch(`${SCRIPT_URL}?${params.toString()}`, { method: 'GET' })
  if (!res.ok) throw new Error(`Sunucu ${res.status} döndü`)

  const body = await res.json()
  if (!body?.success) throw new Error(body?.error || 'Sunucu başvuruyu kaydetmedi')
  return body
}

export function initFranchiseForm() {
  const form = document.getElementById('franchise-form')
  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form).entries())
    const name = (data.name || '').trim()
    const phone = (data.phone || '').trim()
    const email = (data.email || '').trim()
    const city = (data.city || '').trim()
    const district = (data.district || '').trim()
    const note = (data.note || '').trim()

    // E-posta artık zorunlu değil — sadece doldurulmuşsa formatı kontrol edilir.
    if (!name || !phone || !city) {
      setStatus(form, 'error', 'Lütfen ad soyad, telefon ve şehir alanlarını doldurun.')
      return
    }
    if (email && !EMAIL_REGEX.test(email)) {
      setStatus(form, 'error', 'Geçerli bir e-posta adresi girin veya alanı boş bırakın.')
      return
    }
    if (!SCRIPT_URL || SCRIPT_URL.includes('BURAYA')) {
      console.error('VITE_SCRIPT_URL tanımlı değil')
      setStatus(form, 'error', 'Başvuru gönderilemedi. Lütfen tekrar deneyin.')
      return
    }

    const submit = form.querySelector('[type="submit"]')
    const previous = submit.textContent
    submit.disabled = true
    submit.textContent = 'Gönderiliyor...'
    setStatus(form, 'success', '')

    try {
      await submitApplication(
        new URLSearchParams({
          name,
          phone,
          email,
          city,
          message: composeMessage({ district, note }),
        }),
      )

      // Meta Pixel'e dönüşümü bildir (Pixel ID boşsa fbq tanımlı değildir).
      window.fbq?.('track', 'Lead')

      showSuccess(form)
    } catch (err) {
      console.error('Başvuru gönderilemedi:', err)
      submit.disabled = false
      submit.textContent = previous
      setStatus(
        form,
        'error',
        'Başvuru gönderilemedi. Lütfen tekrar deneyin veya @wafil.tr üzerinden bize yazın.',
      )
    }
  })
}

function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle')
  const panel = document.getElementById('mobile-menu')
  if (!toggle || !panel) return

  const setOpen = (open) => {
    panel.classList.toggle('hidden', !open)
    toggle.setAttribute('aria-expanded', String(open))
  }

  toggle.addEventListener('click', () => setOpen(panel.classList.contains('hidden')))
  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)))
}

function initAccordion() {
  document.querySelectorAll('.accordion-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.closest('.accordion-item')?.classList.toggle('active')
      button.setAttribute('aria-expanded', String(Boolean(open)))
    })
  })
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      scrollToTarget(target)
    })
  })
}

initFranchiseForm()
initMobileNav()
initAccordion()
initSmoothScroll()
