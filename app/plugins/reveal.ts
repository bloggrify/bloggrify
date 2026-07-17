/**
 * `v-reveal` — a dependency-free scroll-reveal directive.
 *
 * Elements start hidden (see the `[data-reveal]` rules in core.css) and transition in
 * the first time they enter the viewport. This replaces a heavier animation library:
 * the whole effect is one IntersectionObserver plus a CSS transition.
 *
 * Usage:
 *   <div v-reveal />            reveal on scroll
 *   <div v-reveal="120" />      reveal on scroll, delayed by 120ms (for staggering lists)
 *
 * The marker attribute is emitted during SSR via `getSSRProps`, so the pre-rendered HTML
 * is already hidden and there is no flash before hydration. Users who prefer reduced
 * motion get the content revealed immediately, with no observer.
 */
const observers = new WeakMap<HTMLElement, IntersectionObserver>()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    // Runs on the server: mark the element so it renders hidden from the first paint.
    getSSRProps() {
      return { 'data-reveal': '' }
    },

    // Runs in the browser once the element is mounted.
    mounted(el, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('reveal-in')
        return
      }

      if (typeof binding.value === 'number') {
        el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      }

      // Client-only renders (and HMR) never go through getSSRProps, so ensure the marker
      // is present before we start observing.
      el.setAttribute('data-reveal', '')

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal-in')
            observer.disconnect()
            observers.delete(el)
          }
        }
      }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' })

      observer.observe(el)
      observers.set(el, observer)
    },

    unmounted(el) {
      observers.get(el)?.disconnect()
      observers.delete(el)
    },
  })
})
