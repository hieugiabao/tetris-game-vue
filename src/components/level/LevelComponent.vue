<template>
  <p>Level</p>
  <NumberComponent v-if="tetrisState.hasCurrent" :num="tetrisState.speed" :length="1" />
  <NumberComponent v-else :num="tetrisState.initSpeed" :length="1" />
</template>

<script setup lang="ts">
import NumberComponent from '../number/NumberComponent.vue'

import { useGameStateStore } from '@/stores/game-state'

const tetrisState = useGameStateStore()
</script>

<style lang="scss" src="./level.component.scss"></style>
