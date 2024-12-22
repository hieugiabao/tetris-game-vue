<template>
  <div class="tile" ref="tile"></div>
</template>

<script setup lang="ts">
import { Tile } from '@/interface/tile/tile'
import { useTemplateRef, watchEffect } from 'vue'

const props = defineProps({
  tile: Tile,
})

const elRef = useTemplateRef('tile')

watchEffect(() => {
  if (!props.tile) {
    return
  }

  if (props.tile.isFilled) elRef.value?.classList.add('filled')
  else elRef.value?.classList.remove('filled')

  if (props.tile.isAnimated) elRef.value?.classList.add('animated')
  else elRef.value?.classList.remove('animated')
})
</script>

<style src="./tile.component.scss" lang="scss"></style>
