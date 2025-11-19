<template>
  <div class="matrix">
    <TileComponent v-for="(tile, name) in tetrisState.matrix" :tile="tile" :key="name" />
  </div>
</template>

<script setup lang="ts">
import { GameState } from '@/interface/game-state'
import type { Tile } from '@/interface/tile/tile'
import { MatrixUtil } from '@/interface/utils/matrix.util'
import { useGameStateStore } from '@/stores/game-state'
import { useObservable } from '@vueuse/rxjs'
import { filter, map, Observable, switchMap, takeWhile, tap, timer } from 'rxjs'
import TileComponent from '../tile/TileComponent.vue'

const tetrisState = useGameStateStore()

const animatedMatrix$: Observable<Tile[]> = tetrisState.gameState$.pipe(
  filter((state) => state === GameState.Loading || state === GameState.Over),
  switchMap(() =>
    timer(0, MatrixUtil.Height * 2).pipe(
      map((x) => x + 1),
      takeWhile((x) => x <= MatrixUtil.Height * 2 + 1),
      map((idx) => {
        const newMatrix = [...tetrisState.matrix]
        const gridIndex = idx - 1
        if (gridIndex < MatrixUtil.Height) {
          newMatrix.splice(gridIndex * MatrixUtil.Width, MatrixUtil.Width, ...MatrixUtil.FullRow)
        }
        if (gridIndex > MatrixUtil.Height && gridIndex <= MatrixUtil.Height * 2) {
          const startIdx = (MatrixUtil.Height - (gridIndex - MatrixUtil.Height)) * MatrixUtil.Width
          newMatrix.splice(startIdx, MatrixUtil.Width, ...MatrixUtil.EmptyRow)
        }
        return newMatrix
      }),
    ),
  ),
  tap((matrix) => {
    tetrisState.updateState({ matrix })
  }),
)

useObservable(animatedMatrix$)
</script>

<style lang="scss" src="./matrix.component.scss"></style>
