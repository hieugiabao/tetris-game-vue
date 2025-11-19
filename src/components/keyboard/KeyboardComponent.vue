<template>
  <div class="keyboard" :style="{ marginTop: `${filling} px` }">
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.up"
      :arrow-button="ArrowButton.UP"
      :top="0"
      :left="374"
      :is-absolute="true"
      :key-binding="TetrisKeyboardCode.Up"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="up"
    >
      Rotation
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.down"
      :arrow-button="ArrowButton.DOWN"
      :top="180"
      :left="374"
      :key-binding="TetrisKeyboardCode.Down"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="down"
    >
      Down
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.left"
      :arrow-button="ArrowButton.LEFT"
      :top="90"
      :left="284"
      :key-binding="TetrisKeyboardCode.Left"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="left"
    >
      Left
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.right"
      :arrow-button="ArrowButton.RIGHT"
      :top="90"
      :left="464"
      :key-binding="TetrisKeyboardCode.Right"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="right"
    >
      Right
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-md"
      :active="keyboardStore.hold"
      :top="100"
      :left="0"
      :key-binding="TetrisKeyboardCode.C"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="hold"
    >
      Hold (C)
    </ButtonComponent>
    <ButtonComponent
      class-name="blue btn-lg"
      :active="keyboardStore.drop"
      :top="100"
      :left="110"
      :key-binding="TetrisKeyboardCode.Space"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="drop"
    >
      Drop (Space)
    </ButtonComponent>
    <ButtonComponent
      class-name="red btn-sm"
      :active="keyboardStore.reset"
      :top="0"
      :left="196"
      :key-binding="TetrisKeyboardCode.R"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="reset"
    >
      Reset (R)
    </ButtonComponent>
    <ButtonComponent
      class-name="green btn-sm"
      :active="keyboardStore.sound"
      :top="0"
      :left="106"
      :key-binding="TetrisKeyboardCode.S"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="sound"
    >
      Sound (S)
    </ButtonComponent>
    <ButtonComponent
      class-name="green btn-sm"
      :active="keyboardStore.pause"
      :top="0"
      :left="16"
      :key-binding="TetrisKeyboardCode.P"
      @mouse-up="onMouseUp"
      @mouse-down="onMouseDown"
      key-press="pause"
    >
      {{ pauseButtonLabel }} (P)
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import { ArrowButton } from '@/interface/arrow-button'
import { TetrisKeyboardCode, type KeyAction } from '@/interface/keyboard'
import { useGameStateStore } from '@/stores/game-state'
import { useKeyboardStore } from '@/stores/keyboard'
import { computed } from 'vue'
import ButtonComponent from '../button/ButtonComponent.vue'

type Props = {
  filling?: number
  onMouseDown: (key: KeyAction) => void
  onMouseUp: (key: KeyAction) => void
}

const tetrisState = useGameStateStore()
const keyboardStore = useKeyboardStore()

withDefaults(defineProps<Props>(), {
  filling: 20,
})

const pauseButtonLabel = computed(() => (tetrisState.isPaused ? 'Play' : 'Pause'))
</script>

<style lang="scss" src="./keyboard.component.scss"></style>
