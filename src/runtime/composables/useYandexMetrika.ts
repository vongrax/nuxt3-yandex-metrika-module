import { useNuxtApp } from '#app'

export const useYandexMetrika = () => {
  const { $yandexMetrika } = useNuxtApp()
  return $yandexMetrika
}
