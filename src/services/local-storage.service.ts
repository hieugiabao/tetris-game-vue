const MAX_POINT = 'TETRIS_MAX_POINT'

export class LocalStorageService {
  static get maxPoint() {
    const max = parseInt(localStorage.getItem(MAX_POINT) ?? '')
    return Number.isInteger(max) ? max : 0
  }

  static set maxPoint(max: number) {
    localStorage.setItem(MAX_POINT, `${max}`)
  }
}
