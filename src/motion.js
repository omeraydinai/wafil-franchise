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
initDock()
