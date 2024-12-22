<template>
  <div
    :style="styles"
    class="button"
    :class="className"
    @mousedown.prevent="() => onMouseDown(keyPress)"
    @mouseup.prevent="() => onMouseUp(keyPress)"
    @touchstart.prevent="() => onMouseDown(keyPress)"
    @touchend.prevent="() => onMouseUp(keyPress)"
  >
    <i :class="{ active: active }"></i>
    <em :style="{ transform: arrowTransform }" v-if="arrowButton"></em>
    <span :class="{ absolute: isAbsolute }">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ArrowButtonTransform, type ArrowButton } from '@/interface/arrow-button'
import { computed, defineProps, reactive } from 'vue'

type Props = {
  className?: string
  isAbsolute?: boolean
  top: number
  left: number
  active: boolean
  arrowButton?: ArrowButton
  onMouseDown: (key: string) => void
  onMouseUp: (key: string) => void
  keyPress: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isAbsolute: false,
})

const styles = reactive({
  top: `${props.top}px`,
  left: `${props.left}px`,
})

const arrowTransform = computed(() =>
  props.arrowButton ? ArrowButtonTransform[props.arrowButton] : '',
)
</script>

<style src="./button.component.scss" lang="scss"></style>
