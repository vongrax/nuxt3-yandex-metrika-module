import { useRouter, useRuntimeConfig, useHead, defineNuxtPlugin } from 'nuxt/app'
import type { YandexMetrikaOptions } from '../types'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.yandexMetrika as YandexMetrikaOptions

  const { counter, second_counter } = config

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
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
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

    if (typeof window !== 'undefined' && window.ym) {
      if (counter?.id) {
        window.ym(counter.id, 'init', counter.options || {})
      }

      if (second_counter?.id) {
        window.ym(second_counter.id, 'init', second_counter.options || {})
      }
    }
  }
})
