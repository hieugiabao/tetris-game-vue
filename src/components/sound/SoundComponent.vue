<template>
  <div class="sound bg" :class="{ filled: muted }"></div>
</template>

<script setup lang="ts">
import { useGameStateStore } from '@/stores/game-state'
import { computed } from 'vue'

const tetrisState = useGameStateStore()

const muted = computed(() => !tetrisState.isEnableSound)
</script>

<style lang="scss" src="./sound.component.scss"></style>
