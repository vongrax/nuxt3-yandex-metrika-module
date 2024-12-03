import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import type { ModuleOptions } from '@nuxt/schema'
import defu from 'defu'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/yandex-metrika',
    configKey: 'yandexMetrika',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    cdn: false,
    currencyCode: 'RUB',
    debug: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.yandexMetrika = defu(nuxt.options.runtimeConfig.public.yandexMetrika, options)

    addPlugin({
      src: resolver.resolve('./runtime/plugin.ts'),
      mode: 'all',
    })

    addImports({
      name: 'useYandexMetrika',
      as: 'useYandexMetrika',
      from: resolver.resolve('./runtime/composables/useYandexMetrika'),
    })
  },
})
