export default defineNuxtPlugin(async (nuxtApp) => {
  const response = await $fetch('https://jsonplaceholder.typicode.com/posts')

  nuxtApp.$config.public.yandexMetrika = {
    counter: {
      id: '12345678',
      options: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      },
    },
    second_counter: {
      id: '999999',
      options: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      },
    },
  }
})
