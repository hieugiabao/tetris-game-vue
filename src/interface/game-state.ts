import type { Piece } from './piece/piece'
import type { Speed } from './speed'
import type { Tile } from './tile/tile'

export enum GameState {
  Loading,
  Paused,
  Started,
  Over,
}

export interface TetrisState {
  matrix: Tile[]
  current: Piece | null
  next: Piece
  hold: Piece
  canHold: boolean
  points: number
  locked: boolean
  sound: boolean
  initSpeed: Speed
  speed: Speed
  initLine: number
  clearedLines: number
  gameState: GameState
  saved: TetrisState | null
  max: number
}
