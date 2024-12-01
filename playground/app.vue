<template>
  <div>
    Nuxt module playground!
    <button @click="clickHandler">
      click
    </button>
  </div>
</template>

<script setup>
import { useYandexMetrika } from '../src/runtime/composables/useYandexMetrika'

const yandexMetrika = useYandexMetrika()
const cb = () => {
  console.log('from cb')
}
const clickHandler = () => {
  yandexMetrika.reachGoal('click', { order_price: '1000.35', currency: 'RUB' }, cb)
}
</script>
