<template>
  <p>
    <span>{{ tetrisState.hasCurrent ? 'Lines' : 'Start Line' }}</span>
  </p>
  <NumberComponent
    :num="tetrisState.hasCurrent ? tetrisState.clearedLines : tetrisState.initLine"
  />
</template>

<script setup lang="ts">
import { useGameStateStore } from '@/stores/game-state'
import NumberComponent from '../number/NumberComponent.vue'

const tetrisState = useGameStateStore()
</script>

<style lang="scss" src="./start-line.component.scss"></style>
