<template>
  <div class="keyboard" :style="{ marginTop: `${filling} px` }">
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.up"
      :arrow-button="ArrowButton.UP"
      :top="0"
      :left="374"
      :is-absolute="true"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Up"
    >
      Rotation
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.down"
      :arrow-button="ArrowButton.DOWN"
      :top="180"
      :left="374"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Down"
    >
      Down
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.left"
      :arrow-button="ArrowButton.LEFT"
      :top="90"
      :left="284"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Left"
    >
      Left
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.right"
      :arrow-button="ArrowButton.RIGHT"
      :top="90"
      :left="464"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Right"
    >
      Right
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.hold"
      :top="100"
      :left="0"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Hold"
    >
      Hold (C)
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-lg"
      :active="keyboardStore.drop"
      :top="100"
      :left="110"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Space"
    >
      Drop (Space)
    </ButtonComponent>
    <ButtonComponent
      class-name="red btn-sm"
      :active="keyboardStore.reset"
      :top="0"
      :left="196"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Reset"
    >
      Reset (R)
    </ButtonComponent>
    <ButtonComponent
      class-name="green btn-sm"
      :active="keyboardStore.sound"
      :top="0"
      :left="106"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Sound"
    >
      Sound (S)
    </ButtonComponent>
    <ButtonComponent
      class-name="green btn-sm"
      :active="keyboardStore.pause"
      :top="0"
      :left="16"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="Pause"
    >
      {{ pauseButtonLabel }} (P)
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from '@/stores/game-state'
import { useKeyboardStore } from '@/stores/keyboard'
import { computed } from 'vue'
import ButtonComponent from '../button/ButtonComponent.vue'
import { ArrowButton } from '@/interface/arrow-button'

type Props = {
  filling?: number
  onMouseDown: (key: string) => void
  onMouseUp: (key: string) => void
}

const tetrisState = useGameStateStore()
const keyboardStore = useKeyboardStore()

withDefaults(defineProps<Props>(), {
  filling: 20,
})

const pauseButtonLabel = computed(() => (tetrisState.isPaused ? 'Play' : 'Pause'))
</script>

<style lang="scss" src="./keyboard.component.scss"></style>
