<template>
  <div class="number">
    <span v-for="(item, index) in clock" :key="index" class="bg num" :class="`num-${item}`"></span>
  </div>
</template>

<script setup lang="ts">
import { useObservable } from '@vueuse/rxjs'
import { map, timer } from 'rxjs'

const REFRESH_CLOCK_INTERVAL = 1000

function formatTwoDigits(num: number): string[] {
  return `${num}`.padStart(2, '0').split('')
}

function renderClock(): string[] {
  const now = new Date()
  const hours = formatTwoDigits(now.getHours())
  const minutes = formatTwoDigits(now.getMinutes())
  const isOddSecond = now.getSeconds() % 2 !== 0
  const blinking = `colon-${isOddSecond ? 'solid' : 'faded'}`
  return [...hours, blinking, ...minutes]
}

const clock = useObservable(timer(0, REFRESH_CLOCK_INTERVAL).pipe(map(() => renderClock())))
</script>

<style src="./clock.component.scss" lang="scss"></style>
