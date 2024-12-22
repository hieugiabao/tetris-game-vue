<template>
  <!-- <div class="matrix">
    <TileComponent v-for="(tile, name) in matrix" :tile="tile" :key="name" />
  </div> -->
  <SmallComponent />
</template>

<script setup lang="ts">
import { GameState } from '@/interface/game-state'
import type { Tile } from '@/interface/tile/tile'
import { MatrixUtil } from '@/interface/utils/matrix.util'
import { useGameStateStore } from '@/stores/game-state'
import { useObservable } from '@vueuse/rxjs'
import { combineLatest, map, of, switchMap, takeWhile, timer, type Observable } from 'rxjs'
import TileComponent from '../tile/TileComponent.vue'
import { computed, h } from 'vue'

const tetrisState = useGameStateStore()

function getMatrix(): Observable<Tile[]> {
  return combineLatest([tetrisState.gameState$, tetrisState.matrix$]).pipe(
    switchMap(([gameState, matrix]) => {
      if (gameState !== GameState.Over && gameState !== GameState.Loading) {
        return of(matrix)
      }
      const newMatrix = [...matrix]
      const rowsLength = MatrixUtil.Height * 2
      const animatedMatrix$: Observable<Tile[]> = timer(0, rowsLength).pipe(
        map((x) => x + 1),
        takeWhile((x) => x <= rowsLength + 1),
        switchMap((idx) => {
          const gridIndex = idx - 1
          if (gridIndex < MatrixUtil.Height) {
            newMatrix.splice(gridIndex * MatrixUtil.Width, MatrixUtil.Width, ...MatrixUtil.FullRow)
          }
          if (gridIndex > MatrixUtil.Height && gridIndex <= rowsLength) {
            const startIdx =
              (MatrixUtil.Height - (gridIndex - MatrixUtil.Height)) * MatrixUtil.Width
            newMatrix.splice(startIdx, MatrixUtil.Width, ...MatrixUtil.EmptyRow)
          }

          return of(newMatrix)
        }),
      )
      return animatedMatrix$
    }),
  )
}

const matrix = useObservable(getMatrix())

const matrixClone = computed(() => matrix.value)

const SmallComponent = () => {
  return h(
    'div',
    { class: 'matrix' },
    matrixClone.value?.map((tile) => h(TileComponent, { tile })),
  )
}
</script>

<style lang="scss" src="./matrix.component.scss"></style>
