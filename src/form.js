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
      ? 'rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-300'
      : type === 'success'
        ? 'rounded-lg border border-secondary/40 bg-secondary/10 px-3 py-2 text-sm text-secondary'
        : 'hidden'
}

function showSuccess(form) {
  const panel = form.parentElement
  panel.innerHTML = `
    <div class="py-8 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <span class="material-symbols-outlined text-on-secondary text-3xl icon-fill">check</span>
      </div>
      <h2 class="mt-5 text-headline-md font-headline-md text-on-surface">Başvurunuz alındı</h2>
      <p class="mt-2 text-body-md font-body-md text-on-surface-variant">
        En kısa sürede sizinle iletişime geçeceğiz.
      </p>
      <button type="button" data-new-application
        class="mt-6 rounded border-2 border-secondary px-6 py-3 text-label-bold font-label-bold uppercase text-secondary hover:bg-secondary hover:text-on-secondary transition-colors">
        Yeni başvuru
      </button>
    </div>
  `
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

    if (!name || !phone || !email || !city) {
      setStatus(form, 'error', 'Lütfen zorunlu alanları doldurun.')
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      setStatus(form, 'error', 'Geçerli bir e-posta adresi girin.')
      return
    }
    if (!SCRIPT_URL || SCRIPT_URL.includes('BURAYA')) {
      console.error('VITE_SCRIPT_URL tanımlı değil')
      setStatus(form, 'error', 'Başvuru gönderilemedi. Lütfen tekrar deneyin.')
      return
    }

    const panel = form.parentElement
    const submit = form.querySelector('[type="submit"]')
    const previous = submit.textContent
    submit.disabled = true
    submit.textContent = 'Gönderiliyor...'
    setStatus(form, 'success', '')

    try {
      const params = new URLSearchParams({
        name,
        phone,
        email,
        city,
        message: composeMessage({ district, note }),
      })

      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      })

      showSuccess(form)
      panel
        ?.querySelector('[data-new-application]')
        ?.addEventListener('click', () => location.reload())
    } catch (err) {
      console.error(err)
      submit.disabled = false
      submit.textContent = previous
      setStatus(form, 'error', 'Başvuru gönderilemedi. Lütfen tekrar deneyin.')
    }
  })
}

function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle')
  const panel = document.getElementById('mobile-menu')
  if (!toggle || !panel) return
  toggle.addEventListener('click', () => {
    panel.classList.toggle('hidden')
  })
  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => panel.classList.add('hidden'))
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
      target.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

initFranchiseForm()
initMobileNav()
initSmoothScroll()
