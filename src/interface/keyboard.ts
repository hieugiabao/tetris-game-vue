export enum TetrisKeyboard {
  Up = 'arrowup',
  Down = 'arrowdown',
  Left = 'arrowleft',
  Right = 'arrowright',
  Space = 'space',
  P = 'p',
  R = 'r',
  S = 's',
  C = 'c',
}

export interface TetrisKeyboardState {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  pause: boolean
  sound: boolean
  reset: boolean
  drop: boolean
  hold: boolean
}
