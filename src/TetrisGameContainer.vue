<template>
  <div class="host" ref="host">
    <div class="react" :class="{ drop: keyboardService.drop }">
      <ScreenDecorationComponent />
      <div class="screen">
        <div class="panel">
          <MatrixComponent />
          <LogoComponent v-if="isShowLogo" />
          <div class="state">
            <div class="last-row">
              <SoundComponent />
              <PauseComponent />
              <ClockComponent />
            </div>
            <PointComponent />
            <StartLineComponent />
            <LevelComponent />
            <NextComponent />
            <HoldComponent />
          </div>
        </div>
      </div>
    </div>

    <KeyboardComponent
      :filling="filling"
      @mouse-down="keyboardMouseDown"
      @mouse-up="keyboardMouseUp"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useGameStateStore } from './stores/game-state'
import { useKeyboardStore } from './stores/keyboard'
import ScreenDecorationComponent from './components/screen-decoration/ScreenDecorationComponent.vue'
import MatrixComponent from './components/matrix/MatrixComponent.vue'
import { useObservable } from '@vueuse/rxjs'
import LogoComponent from './components/logo/LogoComponent.vue'
import SoundComponent from './components/sound/SoundComponent.vue'
import PauseComponent from './components/pause/PauseComponent.vue'
import ClockComponent from './components/clock/ClockComponent.vue'
import PointComponent from './components/point/PointComponent.vue'
import StartLineComponent from './components/start-line/StartLineComponent.vue'
import LevelComponent from './components/level/LevelComponent.vue'
import NextComponent from './components/next/NextComponent.vue'
import HoldComponent from './components/hold/HoldComponent.vue'
import KeyboardComponent from './components/keyboard/KeyboardComponent.vue'
import { SoundManagerService } from './services/sound-manager.service'
import { TetrisService } from './services/tetris.service'

const tetrisState = useGameStateStore()
const keyboardService = useKeyboardStore()
const tetrisService = inject<TetrisService>('tetrisService')
const soundManager = inject<SoundManagerService>('soundManager')

const hostRef = useTemplateRef<HTMLDivElement>('host')

const isShowLogo = useObservable(tetrisState.isShowLogo$)
const filling = ref(0)

const keyboardEvent = {
  keyDownLeft() {
    soundManager?.move()
    keyboardService.setKey({
      left: true,
    })
    if (tetrisState.hasCurrent) {
      tetrisService?.moveLeft()
    } else {
      tetrisService?.decreaseLevel()
    }
  },
  keyUpLeft() {
    keyboardService.setKey({
      left: false,
    })
  },
  keyDownRight() {
    soundManager?.move()
    keyboardService.setKey({
      right: true,
    })
    if (tetrisState.hasCurrent) {
      tetrisService?.moveRight()
    } else {
      tetrisService?.increaseLevel()
    }
  },
  keyUpRight() {
    keyboardService.setKey({
      right: false,
    })
  },
  keyDownDown() {
    soundManager?.move()
    keyboardService.setKey({
      down: true,
    })
    if (tetrisState.hasCurrent) {
      tetrisService?.moveDown()
    } else {
      tetrisService?.decreaseStartLine()
    }
  },
  keyUpDown() {
    keyboardService.setKey({
      down: false,
    })
  },
  keyDownUp() {
    soundManager?.rotate()
    keyboardService.setKey({
      up: true,
    })
    if (tetrisState.hasCurrent) {
      tetrisService?.rotate()
    } else {
      tetrisService?.increaseStartLine()
    }
  },
  keyUpUp() {
    keyboardService.setKey({
      up: false,
    })
  },
  keyDownSpace() {
    keyboardService.setKey({
      drop: true,
    })
    if (tetrisState.hasCurrent) {
      soundManager?.fall()
      tetrisService?.drop()
      return
    }
    soundManager?.start()
    tetrisService?.start()
  },
  keyUpSpace() {
    keyboardService.setKey({
      drop: false,
    })
  },
  keyDownHold() {
    soundManager?.move()
    keyboardService.setKey({
      hold: true,
    })
    tetrisService?.hold()
  },
  keyUpHold() {
    keyboardService.setKey({
      hold: false,
    })
  },
  keyDownSound() {
    soundManager?.move()
    keyboardService.setKey({
      sound: true,
    })
    tetrisService?.toggleSound()
  },
  keyUpSound() {
    keyboardService.setKey({
      sound: false,
    })
  },
  keyDownPause() {
    soundManager?.move()
    keyboardService.setKey({
      pause: true,
    })
    if (tetrisState.canStartGame) {
      tetrisService?.resume()
    } else {
      tetrisService?.pause()
    }
  },
  keyUpPause() {
    keyboardService.setKey({
      pause: false,
    })
  },
  keyDownReset() {
    soundManager?.move()
    keyboardService.setKey({
      reset: true,
    })
    tetrisService?.pause()
    setTimeout(() => {
      if (confirm('You are having a good game. Are you sure you want to reset?')) {
        tetrisService?.reset()
      } else {
        tetrisService?.resume()
      }
      this.keyUpReset()
    })
  },
  keyUpReset() {
    keyboardService.setKey({
      reset: false,
    })
  },
}

function keyboardMouseDown(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(keyboardEvent as any)[`keyDown${key}`]()
}

function keyboardMouseUp(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(keyboardEvent as any)[`keyUp${key}`]()
}

function setPaddingMargin(paddingTop: number, paddingBottom: number, marginTop: number) {
  if (hostRef.value) {
    hostRef.value.style.paddingTop = `${paddingTop}px`
    hostRef.value.style.paddingBottom = `${paddingBottom}px`
    hostRef.value.style.marginTop = `${marginTop}px`
  }
}

function resize() {
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  const ratio = height / width

  let scale = 1
  if (ratio < 1.5) {
    scale = height / 960
  } else {
    scale = width / 640
    filling.value = (height - 960 * scale) / scale / 3
    const paddingTop = Math.floor(filling.value) + 42
    const paddingBottom = Math.floor(filling.value)
    const marginTop = Math.floor(-480 - filling.value * 1.5)
    setPaddingMargin(paddingTop, paddingBottom, marginTop)
  }
  if (hostRef.value) {
    hostRef.value.style.transform = `scale(${scale - 0.01})`
  }
}

function unloadHandler(event: Event) {
  if (tetrisState.hasCurrent) {
    event.preventDefault()
  }
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('beforeunload', unloadHandler)
  // document.addEventListener('keydown', (event) => {
  //   if (keyboardService.isKey(event.key)) {
  //     event.preventDefault()
  //   }
  // })
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('beforeunload', unloadHandler)
})
</script>

<style lang="scss">
$yellow: #efcc19;
$black: #000;

.host {
  width: 640px;
  padding-top: 40px;
  box-shadow: 0 0 10px #fff inset;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -480px 0 0 -320px;
  background: $yellow;
}

.react {
  width: 480px;
  padding: 45px 0 35px;
  border: #000 solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;
  &.drop {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
}

.screen {
  width: 390px;
  height: 478px;
  border: solid 5px;
  border-color: #987f0f #fae36c #fae36c #987f0f;
  margin: 0 auto;
  position: relative;

  .panel {
    width: 380px;
    height: 468px;
    margin: 0 auto;
    background: #9ead86;
    padding: 8px;
    border: 2px solid #494536;
  }
}
</style>
