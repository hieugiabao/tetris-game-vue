<template>
  <div>
    <p>{{ labelAndPoints?.label }}</p>
    <NumberComponent :num="labelAndPoints?.points" />
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from '@/stores/game-state'
import { useObservable } from '@vueuse/rxjs'
import { map, of, switchMap, timer } from 'rxjs'
import NumberComponent from '../number/NumberComponent.vue'
const REFRESH_LABEL_INTERVAL = 3000

class LabelAndNumber {
  constructor(
    public label: string,
    public points: number,
  ) {}
}

const tetrisState = useGameStateStore()

const labelAndPoints = useObservable(
  tetrisState.current$.pipe(
    map((current) => !!current),
    switchMap((hasCurrent) => {
      if (hasCurrent) {
        return of(new LabelAndNumber('Score', tetrisState.points))
      }
      return timer(0, REFRESH_LABEL_INTERVAL).pipe(
        map((val) => {
          const isOdd = val % 2 === 0
          const points = tetrisState.points
          const max = tetrisState.max
          return isOdd ? new LabelAndNumber('Score', points) : new LabelAndNumber('Max ', max)
        }),
      )
    }),
  ),
)
</script>

<style lang="scss" src="./point.component.scss"></style>
