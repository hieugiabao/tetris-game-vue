<template>
  <div>
    <p>Hold</p>
    <div class="hold">
      <div v-for="(row, index) in hold" :key="index" class="row">
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

const hold = computed(() =>
  tetrisState.hold.next.map((row) => row.map((value) => new Tile(value as TileValue))),
)
</script>

<style lang="scss" src="./hold.component.scss"></style>
