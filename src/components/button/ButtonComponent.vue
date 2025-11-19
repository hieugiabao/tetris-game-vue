<template>
  <div
    :style="styles"
    class="button"
    :class="className"
    @mousedown.prevent="() => onMouseDown(keyPress)"
    @mouseup.prevent="() => onMouseUp(keyPress)"
    @touchstart.prevent="() => onMouseDown(keyPress)"
    @touchend.prevent="() => onMouseUp(keyPress)"
    v-keydown="{
      active: !!keyBinding,
      handlers: keydownHandlers,
    }"
    v-keyup="{
      active: !!keyBinding,
      handlers: keyUpHandlers,
    }"
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
import type { KeyAction, TetrisKeyboardCode } from '@/interface/keyboard'
import vKeydown from '@/directives/v-keydown'
import vKeyup from '@/directives/v-keyup'
import { computed, defineProps, reactive } from 'vue'

type Props = {
  className?: string
  isAbsolute?: boolean
  top: number
  left: number
  active: boolean
  arrowButton?: ArrowButton
  onMouseDown: (key: KeyAction) => void
  onMouseUp: (key: KeyAction) => void
  keyPress: KeyAction
  keyBinding?: TetrisKeyboardCode
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isAbsolute: false,
})

const keydownHandlers = {
  [`${props.keyBinding}`]: () => props.onMouseDown(props.keyPress),
}

const keyUpHandlers = {
  [`${props.keyBinding}`]: () => props.onMouseUp(props.keyPress),
}

const styles = reactive({
  top: `${props.top}px`,
  left: `${props.left}px`,
})

const arrowTransform = computed(() =>
  props.arrowButton ? ArrowButtonTransform[props.arrowButton] : '',
)
</script>

<style src="./button.component.scss" lang="scss"></style>
