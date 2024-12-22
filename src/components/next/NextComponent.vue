<template>
  <div>
    <p>Next</p>
    <div class="next">
      <div v-for="(row, index) in next" :key="index" class="row">
        <TileComponent v-for="(tile, index) in row" :key="index" :tile="tile" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TileComponent from '../tile/TileComponent.vue'

import { Tile, type TileValue } from '@/interface/tile/tile'
import { useGameStateStore } from '@/stores/game-state'
import { computed } from 'vue'

const tetrisState = useGameStateStore()

const next = computed(() =>
  tetrisState.next.next.map((row) => row.map((value) => new Tile(value as TileValue))),
)
</script>

<style lang="scss" src="./next.component.scss"></style>
