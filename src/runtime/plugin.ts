import { useRuntimeConfig } from 'nuxt/app'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('>>>>>>>>>>>>>>>', useRuntimeConfig().public)
  console.log('Plugin injected by my-module!', _nuxtApp)
})
