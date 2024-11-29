export default defineNuxtPlugin(async (nuxtApp) => {
  const response = await $fetch('https://jsonplaceholder.typicode.com/posts')
})
