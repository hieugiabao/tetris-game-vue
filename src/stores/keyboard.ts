import type { TetrisKeyboardState } from '@/interface/keyboard'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useKeyboardStore = defineStore('keyboard', () => {
  const state = reactive<TetrisKeyboardState>({
    up: false,
    down: false,
    left: false,
    right: false,
    pause: false,
    sound: false,
    reset: false,
    drop: false,
    hold: false,
  })

  const up = computed(() => state.up)
  const down = computed(() => state.down)
  const left = computed(() => state.left)
  const right = computed(() => state.right)
  const pause = computed(() => state.pause)
  const sound = computed(() => state.sound)
  const reset = computed(() => state.reset)
  const drop = computed(() => state.drop)
  const hold = computed(() => state.hold)

  function setKey(keyState: Partial<TetrisKeyboardState>) {
    Object.assign(state, keyState)
  }

  return { up, down, left, right, pause, sound, reset, drop, hold, setKey }
})
