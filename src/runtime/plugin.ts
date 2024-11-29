import type { NuxtApp } from 'nuxt/app'
import { useRuntimeConfig } from 'nuxt/app'
import { defineNuxtPlugin } from '#app'

const BASE_CONFIG = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  triggerEvent: true,
  ecommerce: 'dataLayer',
}

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const ready = false


  const { config } = useRuntimeConfig().public.yandexMetrika

  function create() {
    if (!ready) {
      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) }
        m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
      })
      (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

      if (Array.isArray(config)) {
        config.forEach((item) => {
          ym(item.id, 'init', item)
          const noscriptContent = `<noscript><div><img src="https://mc.yandex.ru/watch/${item.id}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`
          document.head.insertAdjacentHTML('beforeend', noscriptContent)
        })
      } else {
        ym(config.id, 'init', item.target)
        const noscriptContent = `<noscript><div><img src="https://mc.yandex.ru/watch/${item.id}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`
        document.head.insertAdjacentHTML('beforeend', noscriptContent)
      }
    }
  }

  console.log(window)

  if (window) {
    create()
  }

  if (config && window.ym) {
    console.log(config)
    ym(config[0].id, 'init', BASE_CONFIG)

    // document.addEventListener(`yacounter${goulashMetricaId}inited`, () => {
    //   window.g_Counter = window[`yaCounter${goulashMetricaId}`];
    // });

    const noscriptContent = `<noscript><div><img src="https://mc.yandex.ru/watch/${config[0].id}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`
    document.head.insertAdjacentHTML('beforeend', noscriptContent)
  }

  const setConfig = (customConfig: any) => {
    if (Array.isArray(customConfig)) {
      customConfig.forEach((item) => {
        ym(item.id, 'init', item)
        const noscriptContent = `<noscript><div><img src="https://mc.yandex.ru/watch/${item.id}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`
        document.head.insertAdjacentHTML('beforeend', noscriptContent)
      })
    }
  }

  //
  // if (partnerMetricaId) {
  //   ym(partnerMetricaId, "init", {
  //     webvisor: true,
  //   });
  //
  //   document.addEventListener(`yacounter${partnerMetricaId}inited`, () => {
  //     window.g_Counter_common = window[`yaCounter${partnerMetricaId}`];
  //   });
  //
  //   let noscriptContent = `<noscript><div><img src=\"https://mc.yandex.ru/watch/${partnerMetricaId}\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>`;
  //   document.head.insertAdjacentHTML("beforeend", noscriptContent);
  // }
  return {
    provide: {
      yandexMetrika: {
        create,
        setConfig,
      },
    },
  }
})
