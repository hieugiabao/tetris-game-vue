<template>
  <div class="logo">
    <div class="bg dragon" :class="className"></div>
    <p>Press Space to start</p>
  </div>
</template>

<script setup lang="ts">
import { useObservable } from '@vueuse/rxjs'
import { concat, delay, finalize, map, repeat, startWith, takeWhile, tap, timer } from 'rxjs'
import { ref } from 'vue'

const className = ref('')

const eyes = () =>
  timer(0, 500).pipe(
    startWith(0),
    map((x) => x + 1),
    takeWhile((x) => x < 6),
    tap((x) => {
      const state = x % 2 === 0 ? 1 : 2
      className.value = `l${state}`
    }),
  )

const run = () => {
  let side = 'r'
  return timer(0, 100).pipe(
    startWith(0),
    map((x) => x + 1),
    takeWhile((x) => x <= 40),
    tap((x) => {
      if (x === 10 || x === 20 || x === 30) {
        side = side === 'r' ? 'l' : 'r'
      }

      const state = x % 2 === 0 ? 3 : 4
      className.value = `${side}${state}`
    }),
    finalize(() => {
      className.value = `${side}1`
    }),
  )
}

useObservable(concat(eyes(), run()).pipe(delay(5000), repeat(1000)))
</script>

<style lang="scss" src="./logo.component.scss"></style>
