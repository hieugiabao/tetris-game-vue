import { PieceFactory } from '@/factory/piece-factory'
import { GameState, type TetrisState } from '@/interface/game-state'
import type { Piece } from '@/interface/piece/piece'
import type { Tile } from '@/interface/tile/tile'
import { MatrixUtil } from '@/interface/utils/matrix.util'
import { LocalStorageService } from '@/services/local-storage.service'
import { from } from '@vueuse/rxjs'
import { defineStore } from 'pinia'
import { combineLatest, delay, of, switchMap } from 'rxjs'
import { computed, reactive, type ComputedRef } from 'vue'

const createInitialState = (pieceFactory: PieceFactory): TetrisState => ({
  matrix: MatrixUtil.getStartBoard(),
  current: null,
  next: pieceFactory.getRandomPiece(),
  hold: pieceFactory.getNonePiece(),
  canHold: true,
  points: 0,
  locked: true,
  sound: true,
  initSpeed: 1,
  speed: 1,
  initLine: 0,
  clearedLines: 0,
  gameState: GameState.Loading,
  saved: null,
  max: LocalStorageService.maxPoint,
})

export const useGameStateStore = defineStore('gameState', () => {
  const pieceFactory = PieceFactory.getInstance()
  const tetrisState = reactive<TetrisState>(createInitialState(pieceFactory))

  const next = computed(() => tetrisState.next) as ComputedRef<Piece>
  const hold = computed(() => tetrisState.hold) as ComputedRef<Piece>
  const matrix = computed(() => tetrisState.matrix) as ComputedRef<Tile[]>
  const current = computed(() => tetrisState.current) as ComputedRef<Piece | null>
  const isEnableSound = computed(() => tetrisState.sound)
  const gameState = computed(() => tetrisState.gameState)
  const hasCurrent = computed(() => !!tetrisState.current)
  const points = computed(() => tetrisState.points)
  const clearedLines = computed(() => tetrisState.clearedLines)
  const max = computed(() => tetrisState.max)
  const speed = computed(() => tetrisState.speed)
  const initSpeed = computed(() => tetrisState.initSpeed)
  const initLine = computed(() => tetrisState.initLine)
  const canStartGame = computed(() => tetrisState.gameState !== GameState.Started)
  const isPlaying = computed(() => tetrisState.gameState === GameState.Started)
  const isPaused = computed(() => tetrisState.gameState === GameState.Paused)
  const locked = computed(() => tetrisState.locked)
  const canHold = computed(() => tetrisState.canHold)

  const gameState$ = from(gameState, {
    immediate: true,
  })
  const matrix$ = from(matrix, {
    immediate: true,
    deep: true,
  })
  const current$ = from(current, {
    immediate: true,
  })

  const isShowLogo$ = computed(() =>
    combineLatest([gameState$, current$]).pipe(
      switchMap(([state, current]) => {
        const isLoadingOrOver = state === GameState.Loading || state === GameState.Over
        const isRenderingLogo$ = of(isLoadingOrOver && !current)
        return isLoadingOrOver ? isRenderingLogo$.pipe(delay(1800)) : isRenderingLogo$
      }),
    ),
  )

  function updateState(updatedState: Partial<TetrisState>) {
    Object.assign(tetrisState, updatedState)
  }

  function resetState(updatedState: Partial<TetrisState> = {}) {
    updateState(createInitialState(pieceFactory))
    updateState(updatedState)
  }

  return {
    next,
    hold,
    matrix,
    current,
    isEnableSound,
    gameState,
    hasCurrent,
    points,
    clearedLines,
    max,
    speed,
    initSpeed,
    initLine,
    canStartGame,
    isPlaying,
    isPaused,
    locked,
    canHold,
    gameState$,
    matrix$,
    current$,
    isShowLogo$,
    updateState,
    resetState,
  }
})
