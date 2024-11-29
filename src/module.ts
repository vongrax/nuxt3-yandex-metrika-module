import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { ModuleOptions } from '@nuxt/schema'
import defu from 'defu'

export interface YandexMetrikaModuleOptions extends ModuleOptions {
  clickmap: true
  trackLinks: true
  accurateTrackBounce: true
  webvisor: true
  triggerEvent: true
  ecommerce: 'dataLayer'
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/yandex-metrika',
    configKey: 'yandexMetrika',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    ssr: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.yandexMetrika = defu(nuxt.options.runtimeConfig.public.yandexMetrika, options)

    const head = nuxt.options.app.head
    head.script = head.script || []
    head.script.push({
      src: 'https://mc.yandex.ru/metrika/tag.js',
      async: true,
      tagPosition: 'head',
    })

    addPlugin({
      src: resolver.resolve('./runtime/plugin.ts'),
      mode: 'client',
    })
  },
})
