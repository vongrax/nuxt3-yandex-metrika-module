export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-28',
  // yandexMetrika: {
  //   config: [{
  //     id: '323424234',
  //     clickmap: true,
  //     trackLinks: true,
  //     accurateTrackBounce: true,
  //     webvisor: true,
  //     triggerEvent: true,
  //     ecommerce: 'dataLayer',
  //   }, {
  //     id: '12345678',
  //     clickmap: true,
  //     trackLinks: true,
  //     accurateTrackBounce: true,
  //     webvisor: true,
  //     triggerEvent: true,
  //     ecommerce: 'dataLayer',
  //   }],
  // },
})
