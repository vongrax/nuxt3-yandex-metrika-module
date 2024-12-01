declare global {
  interface Window {
    ym: (...args: unknown[]) => void
  }
}

export type YandexMetrikaOptions = {
  cdn: boolean
  counter?: YandexMetrikaCounter
  second_counter?: YandexMetrikaCounter
}

export type YndexMetrikaCounterOptions = {
  clickmap: boolean
  trackLinks: boolean
  accurateTrackBounce: boolean
  webvisor?: boolean
  ecommerce?: string
}

export type YandexMetrikaCounter = {
  id: string
  options?: YndexMetrikaCounterOptions
}
