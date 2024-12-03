import { useRouter, useRuntimeConfig, useHead, defineNuxtPlugin } from 'nuxt/app'
import type { YandexMetrikaOptions } from '../typespaces/types'
import { YandexMetrika } from './yandexMetrika'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.yandexMetrika as YandexMetrikaOptions

  const { counter, second_counter, currencyCode, cdn, debug } = config

  const metrikaUrl = (cdn ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : 'https://mc.yandex.ru/metrika') + '/tag.js'

  useHead({
    script: [
      {
        innerHTML: `
          (function(m, e, t, r, i, k, a) {
            m[i] = m[i] || function() {
              (m[i].a = m[i].a || []).push(arguments);
            };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) {
                return;
              }
            }
            k = e.createElement(t), a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;
            a.parentNode.insertBefore(k, a);
          })(window, document, "script", "${metrikaUrl}", "ym");
        `,
        type: 'text/javascript',
      },
    ],
  })

  if (counter?.id) {
    useHead({
      noscript: [
        {
          key: `yandex-metrika-noscript-${counter.id}`,
          innerHTML: `
            <div>
              <img src="https://mc.yandex.ru/watch/${counter.id}"
                   style="position:absolute; left:-9999px;" alt="" />
            </div>
          `,
        },
      ],
    })
  }

  if (second_counter?.id) {
    useHead({
      noscript: [
        {
          key: `yandex-metrika-noscript-${second_counter.id}`,
          innerHTML: `
            <div>
              <img src="https://mc.yandex.ru/watch/${second_counter.id}"
                   style="position:absolute; left:-9999px;" alt="" />
            </div>
          `,
        },
      ],
    })
  }
  const yandexMetrika = new YandexMetrika(counter, second_counter, currencyCode, debug)
  if (import.meta.client) {
    const router = useRouter()
    let ready = false

    void router.isReady().then(() => {
      ready = true
    })

    router.afterEach(() => {
      if (!ready) {
        return
      }
    })
    yandexMetrika.init()
  }

  return {
    provide: {
      yandexMetrika,
    },
  }
})
