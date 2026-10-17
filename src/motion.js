// Sayfa hareketleri. Hepsi isteğe bağlı katman: JS yoksa ya da kullanıcı
// "hareketi azalt" demişse içerik olduğu gibi görünür.
import Lenis from 'lenis'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(pointer: fine)').matches

// Yumuşak kaydırma yalnız masaüstü tekerlek/trackpad için; dokunmatikte
// telefonun kendi kaydırması daha hızlı ve tanıdık.
export const lenis =
  !reduceMotion && finePointer
    ? new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    : null

if (lenis) {
  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

export function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: -64 })
  else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
}

// Kaydırınca beliren bloklar
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]')
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  )
  items.forEach((el) => io.observe(el))
}

// Süreç: sayaç, aktif adım ve eksen dolgusu kaydırmaya bağlı
function initProcess() {
  const axis = document.querySelector('[data-axis]')
  if (!axis) return
  const steps = [...axis.querySelectorAll('[data-step]')]
  const digits = document.querySelector('[data-counter]')
  const title = document.querySelector('[data-counter-title]')
  let active = -1

  const setActive = (index) => {
    if (index === active) return
    active = index
    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === index)
      step.classList.toggle('is-done', i < index)
    })
    if (digits) {
      digits.classList.add('is-swap')
      setTimeout(() => {
        digits.textContent = String(index + 1).padStart(2, '0')
        if (title) title.textContent = steps[index].dataset.step
        digits.classList.remove('is-swap')
      }, reduceMotion ? 0 : 180)
    }
  }

  const update = () => {
    const rect = axis.getBoundingClientRect()
    const mid = window.innerHeight * 0.5
    const progress = Math.min(1, Math.max(0, (mid - rect.top) / rect.height))
    axis.style.setProperty('--p', progress.toFixed(3))
    let index = 0
    steps.forEach((step, i) => {
      if (step.getBoundingClientRect().top < mid) index = i
    })
    setActive(index)
  }

  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      update()
      ticking = false
    })
  }

  // Yalnız bölüm ekrandayken dinle
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      window.addEventListener('scroll', onScroll, { passive: true })
      update()
    } else {
      window.removeEventListener('scroll', onScroll)
    }
  })
  io.observe(axis)
  update()
}

// Mobil alt çubuk: başvuru formu ekrandayken çekilir
function initDock() {
  const dock = document.querySelector('[data-dock]')
  const form = document.getElementById('iletisim')
  if (!dock || !form || !('IntersectionObserver' in window)) return
  new IntersectionObserver(([entry]) => dock.classList.toggle('is-hidden', entry.isIntersecting), {
    threshold: 0.15,
  }).observe(form)
}

initReveal()
initProcess()
initDock()
