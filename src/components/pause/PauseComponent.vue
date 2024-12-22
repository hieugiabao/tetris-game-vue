<template>
  <div class="bg pause" :class="{ filled: pause }"></div>
</template>

<script setup lang="ts">
import { GameState } from '@/interface/game-state'
import { useGameStateStore } from '@/stores/game-state'
import { useObservable } from '@vueuse/rxjs'
import { interval, map, of, switchMap } from 'rxjs'

const tetrisState = useGameStateStore()

const pause = useObservable(
  tetrisState.gameState$.pipe(
    switchMap((state) => {
      if (state === GameState.Paused) {
        return interval(250).pipe(map((val) => !!(val % 2)))
      }

      return of(false)
    }),
  ),
)
</script>

<style lang="scss" src="./pause.component.scss"></style>
