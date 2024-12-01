import type { YandexMetrikaCounter } from '../types'

export class YandexMetrika {
  private readonly counter: YandexMetrikaCounter | null
  private readonly second_counter: YandexMetrikaCounter | null

  constructor(counter: YandexMetrikaCounter, second_counter: YandexMetrikaCounter) {
    this.counter = counter
    this.second_counter = second_counter
  }

  init(): void {
    this.sendEvent('init', this.counter.options)
  }

  reachGoal(...args: unknown[]): void {
    this.sendEvent('reachGoal', ...args)
  }

  private sendEvent(type: string, ...args: unknown[]) {
    if (window && window.ym) {
      if (this.counter) {
        window.ym(this.counter.id, type, ...args)
      }
      if (this.second_counter) {
        window.ym(this.second_counter.id, type, ...args)
      }
    }
  }
}
