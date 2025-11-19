export enum TetrisKeyboardCode {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
  Space = 'Space',
  P = 'KeyP',
  R = 'KeyR',
  S = 'KeyS',
  C = 'KeyC',
}

export type KeyDirection = 'up' | 'down'

export type KeyAction =
  | 'left'
  | 'right'
  | 'up'
  | 'down'
  | 'drop'
  | 'hold'
  | 'sound'
  | 'pause'
  | 'reset'

export type TetrisKeyboardState = {
  [K in KeyAction]: boolean
}

export type TetrisKeyboardEvent = {
  [K in `key${Capitalize<KeyDirection>}${Capitalize<KeyAction>}`]: () => void
}
