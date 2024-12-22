<template>
  <div class="number">
    <span
      v-for="(sequence, index) in nums"
      :key="index"
      class="bg num"
      :class="`num-${sequence}`"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  num?: number
  length?: number
}

const props = withDefaults(defineProps<Props>(), {
  num: 0,
  length: 6,
})

const nums = computed(() => `${props.num}`.padStart(props.length, 'n').split(''))
</script>

<style lang="scss" src="./number.component.scss"></style>
