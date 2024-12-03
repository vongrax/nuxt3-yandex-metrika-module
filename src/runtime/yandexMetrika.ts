import type { EcommerceProduct, YandexMetrikaCounter } from '../typespaces/types'
import { EcommerceActionType, Methods } from '../typespaces/enums'

export class YandexMetrika {
  private readonly counter: YandexMetrikaCounter | null
  private readonly second_counter: YandexMetrikaCounter | null
  private readonly currencyCode: string
  private readonly debug: boolean

  constructor(counter: YandexMetrikaCounter, second_counter: YandexMetrikaCounter, currencyCode: string = 'RUB', debug: boolean = false) {
    this.counter = counter
    this.second_counter = second_counter
    this.currencyCode = currencyCode
    this.debug = debug
  }

  init(): void {
    this.sendEvent(Methods.INIT, this.counter.options)
  }

  reachGoal(...args: unknown[]): void {
    this.sendEvent(Methods.REACH_GOAL, ...args)
  }

  sendEcommerceData = (
    actionType: EcommerceActionType,
    products?: EcommerceProduct[],
    orderId?: string | number,
  ) => {
    const data: Record<string, any> = {
      [actionType]: {
        products,
      },
    }
    if (actionType === EcommerceActionType.PURCHASE) {
      data[actionType].actionField = {
        id: orderId,
      }
    }
    this.sendHandler(data)
  }

  private sendHandler(data: Record<string, unknown>): void {
    if (this.debug) {
      console.log('%c[DEBUG]', 'color: white; background: blue; padding: 2px 4px; border-radius: 3px;', 'Yandex ecommerce:', {
        ecommerce: {
          currencyCode: this.currencyCode,
          ...data,
        },
      })
    }

    if (window && window.dataLayer) {
      window.dataLayer.push({
        ecommerce: {
          currencyCode: this.currencyCode,
          ...data,
        },
      })
    }
  };

  private sendEvent(type: string, ...args: unknown[]) {
    console.log(this.debug)
    if (window && window.ym) {
      if (this.counter) {
        window.ym(this.counter.id, type, ...args)

        if (this.debug) {
          console.log('%c[DEBUG]', 'color: white; background: blue; padding: 2px 4px; border-radius: 3px;', `Yandex ${type}:`, {
            counterId: this.counter.id,
            type,
            args,
          })
        }
      }
      if (this.second_counter) {
        window.ym(this.second_counter.id, type, ...args)
        if (this.debug) {
          console.log('%c[DEBUG]', 'color: white; background: blue; padding: 2px 4px; border-radius: 3px;', `Yandex ${type}:`, {
            counterId: this.second_counter.id,
            type,
            args,
          })
        }
      }
    }
  }
}
