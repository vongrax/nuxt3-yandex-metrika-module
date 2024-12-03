declare global {
  interface Window {
    ym: (...args: unknown[]) => void
    dataLayer: Record<string, unknown>[]
  }
}

export type YandexMetrikaOptions = {
  cdn: boolean
  currencyCode?: string
  counter?: YandexMetrikaCounter
  second_counter?: YandexMetrikaCounter
  debug: boolean
}

export type YandexMetrikaCounterOptions = {
  clickmap: boolean
  trackLinks: boolean
  accurateTrackBounce: boolean
  webvisor?: boolean
  ecommerce?: string
}

export type YandexMetrikaCounter = {
  id: string
  options?: YandexMetrikaCounterOptions
}

export type EcommerceProduct = Record<string, unknown>
