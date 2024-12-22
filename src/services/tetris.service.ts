import { PieceFactory, SPAWN_POSITION_X, SPAWN_POSITION_Y } from '@/factory/piece-factory'
import { inject } from 'vue'
import { SoundManagerService } from './sound-manager.service'
import { useGameStateStore } from '@/stores/game-state'
import { GameState } from '@/interface/game-state'
import { MatrixUtil } from '@/interface/utils/matrix.util'
import type { Speed } from '@/interface/speed'
import { LocalStorageService } from './local-storage.service'
import type { CallBack } from '@/interface/callback'
import { FilledTile } from '@/interface/tile/filled-tile'
import { EmptyTile } from '@/interface/tile/empty-tile'
import type { Tile } from '@/interface/tile/tile'
import type { Piece } from '@/interface/piece/piece'

export class TetrisService {
  gameInterval!: number | null | undefined

  private readonly soundManager = inject<SoundManagerService>('soundManager')
  private readonly pieceFactory = PieceFactory.getInstance()
  private readonly tetrisState = useGameStateStore()

  start() {
    if (!this.tetrisState.hasCurrent) {
      this.setCurrentPiece(this.tetrisState.next)
      this.setNext()
    }

    this.tetrisState.updateState({
      points: 0,
      gameState: GameState.Started,
      matrix: MatrixUtil.getStartBoard(this.tetrisState.initLine),
      speed: this.tetrisState.initSpeed,
    })
    this.stopGameInterval()
    this.auto(MatrixUtil.getSpeedDelay(this.tetrisState.initSpeed))
    this.setLocked(false)
  }

  auto(delay: number) {
    this.update()
    this.gameInterval = setInterval(() => {
      this.update()
    }, delay)
  }

  pause() {
    if (!this.tetrisState.isPlaying) {
      return
    }

    this.tetrisState.updateState({
      locked: true,
      gameState: GameState.Paused,
    })
    this.stopGameInterval()
  }

  resume() {
    if (!this.tetrisState.isPaused) {
      return
    }

    this.tetrisState.updateState({
      locked: false,
      gameState: GameState.Started,
    })
    this.auto(MatrixUtil.getSpeedDelay(this.tetrisState.speed))
  }

  reset() {
    this.tetrisState.resetState({
      sound: this.tetrisState.isEnableSound,
    })
  }

  moveLeft() {
    if (this.tetrisState.locked) {
      return
    }

    this.clearPiece()
    this.setCurrentPiece(this.tetrisState.current?.store())
    this.setCurrentPiece(this.tetrisState.current?.moveLeft())
    if (this.isCollidesLeft) {
      this.setCurrentPiece(this.tetrisState.current?.revert())
    }
    this.drawPiece()
  }

  moveRight() {
    if (this.tetrisState.locked) {
      return
    }

    this.clearPiece()
    this.setCurrentPiece(this.tetrisState.current?.store())
    this.setCurrentPiece(this.tetrisState.current?.moveRight())

    if (this.isCollidesRight) {
      this.setCurrentPiece(this.tetrisState.current?.revert())
    }
    this.drawPiece()
  }

  rotate() {
    if (this.tetrisState.locked) {
      return
    }

    this.clearPiece()
    this.setCurrentPiece(this.tetrisState.current?.store())
    this.setCurrentPiece(this.tetrisState.current?.rotate())

    while (this.isCollidesRight) {
      this.setCurrentPiece(this.tetrisState.current?.moveLeft())
      if (this.isCollidesLeft) {
        this.setCurrentPiece(this.tetrisState.current?.revert())
        break
      }
    }

    this.drawPiece()
  }

  moveDown() {
    this.update()
  }

  drop() {
    if (this.tetrisState.locked) {
      return
    }

    while (!this.isCollidesBottom) {
      this.clearPiece()
      this.setCurrentPiece(this.tetrisState.current?.store())
      this.setCurrentPiece(this.tetrisState.current?.moveDown())
    }
    this.setCurrentPiece(this.tetrisState.current?.revert())
    this.drawPiece()
    this.setCanHold(true)
  }

  hold() {
    if (this.tetrisState.locked || !this.tetrisState.canHold) {
      return
    }

    this.clearPiece()
    const isHoldNonePiece = this.tetrisState.hold.isNone()
    const newCurrent = isHoldNonePiece ? this.tetrisState.next : this.tetrisState.hold
    if (isHoldNonePiece) {
      this.setNext()
    }
    this.setHold(this.tetrisState.current!.reset())
    this.setCurrentPiece(newCurrent)
    this.resetPosition(this.tetrisState.hold)
    this.setCanHold(false)
  }

  increaseLevel() {
    const initSpeed = this.tetrisState.initSpeed
    const newSpeed = (initSpeed + 1 > 6 ? 1 : initSpeed + 1) as Speed
    this.tetrisState.updateState({
      initSpeed: newSpeed,
    })
  }

  decreaseLevel() {
    const initSpeed = this.tetrisState.initSpeed
    const newSpeed = (initSpeed - 1 < 1 ? 6 : initSpeed - 1) as Speed
    this.tetrisState.updateState({
      initSpeed: newSpeed,
    })
  }

  increaseStartLine() {
    const initLine = this.tetrisState.initLine
    const startLine = initLine + 1 > 10 ? 1 : initLine + 1
    this.tetrisState.updateState({
      initLine: startLine,
    })
  }

  decreaseStartLine() {
    const initLine = this.tetrisState.initLine
    const startLine = initLine - 1 < 1 ? 10 : initLine - 1
    this.tetrisState.updateState({
      initLine: startLine,
    })
  }

  toggleSound() {
    this.tetrisState.updateState({
      sound: !this.tetrisState.isEnableSound,
    })
  }

  private update() {
    if (this.tetrisState.locked) {
      return
    }

    this.setLocked(true)
    this.setCurrentPiece(this.tetrisState.current?.revert())
    this.clearPiece()
    this.setCurrentPiece(this.tetrisState.current?.store())
    this.setCurrentPiece(this.tetrisState.current!.moveDown())

    if (this.isCollidesBottom) {
      this.setCurrentPiece(this.tetrisState.current!.revert())
      this.markAsSolid()
      this.drawPiece()
      this.clearFullLines()
      this.setCurrentPiece(this.tetrisState.next)
      this.setNext()
      this.setCanHold(true)
      if (this.isGameOver) {
        this.onGameOver()
        return
      }
    }

    this.drawPiece()
    this.setLocked(false)
  }

  private onGameOver() {
    this.pause()
    this.soundManager?.gameOver()
    const maxPoint = Math.max(this.tetrisState.points, this.tetrisState.max)
    LocalStorageService.maxPoint = maxPoint
    this.tetrisState.resetState({
      max: maxPoint,
      gameState: GameState.Over,
      sound: this.tetrisState.isEnableSound,
    })
  }

  private get isCollidesBottom(): boolean {
    if ((this.tetrisState.current?.bottomRow ?? 0) >= MatrixUtil.Height) {
      return true
    }

    return this.collides()
  }

  private get isCollidesLeft(): boolean {
    if ((this.tetrisState.current?.leftCol ?? 0) < 0) {
      return true
    }

    return this.collides()
  }

  private get isCollidesRight(): boolean {
    if ((this.tetrisState.current?.rightCol ?? 0) >= MatrixUtil.Width) {
      return true
    }
    return this.collides()
  }

  private get isGameOver(): boolean {
    this.setCurrentPiece(this.tetrisState.current?.store())
    this.setCurrentPiece(this.tetrisState.current?.moveDown())
    if (this.isCollidesBottom) {
      return true
    }
    this.setCurrentPiece(this.tetrisState.current?.revert())
    return false
  }

  private collides(): boolean {
    return !!this.tetrisState.current?.positionOnGrid.some(
      (pos) => this.tetrisState.matrix[pos].isSolid,
    )
  }

  private loopThroughPiecePosition(callback: CallBack<number>) {
    this.tetrisState.current?.positionOnGrid.forEach((position) => {
      callback(position)
    })
  }

  private drawPiece() {
    this.setCurrentPiece(this.tetrisState.current?.clearStore())
    this.loopThroughPiecePosition((position) => {
      const isSolid = this.tetrisState.matrix[position].isSolid
      this.updateMatrix(position, new FilledTile(isSolid))
    })
  }

  private markAsSolid() {
    this.loopThroughPiecePosition((position) => {
      this.updateMatrix(position, new FilledTile(true))
    })
  }

  private clearPiece() {
    this.loopThroughPiecePosition((position) => {
      this.updateMatrix(position, new EmptyTile())
    })
  }

  private clearFullLines() {
    let numOfClearedLines = 0
    const newMatrix = [...this.tetrisState.matrix]
    for (let row = MatrixUtil.Height - 1; row >= 0; row--) {
      const pos = row * MatrixUtil.Width
      const fullRowTiles = newMatrix.slice(pos, pos + MatrixUtil.Width)
      const isFullRow = fullRowTiles.every((x) => x.isSolid)
      if (isFullRow) {
        numOfClearedLines++
        const topPortion = this.tetrisState.matrix.slice(0, row * MatrixUtil.Width)
        newMatrix.splice(0, ++row * MatrixUtil.Width, ...MatrixUtil.EmptyRow.concat(topPortion))
        this.setMatrix(newMatrix)
      }
    }

    this.setPointsAndSpeed(numOfClearedLines)
  }

  private setPointsAndSpeed(numberOfClearedLines: number) {
    if (!numberOfClearedLines) {
      return
    }

    this.soundManager?.clear()
    const newLines = this.tetrisState.clearedLines + numberOfClearedLines
    const newPoints = this.getPoints(numberOfClearedLines, this.tetrisState.points)
    const newSpeed = this.getSpeed(newLines, this.tetrisState.initSpeed)

    this.tetrisState.updateState({
      points: newPoints,
      speed: newSpeed,
      clearedLines: newLines,
    })

    if (this.tetrisState.speed !== newSpeed) {
      this.stopGameInterval()
    }
  }

  private getSpeed(totalLines: number, initSpeed: number): Speed {
    const addedSpeed = Math.floor(totalLines / MatrixUtil.Height)
    let newSpeed = (initSpeed + addedSpeed) as Speed
    newSpeed = newSpeed > 6 ? 6 : newSpeed
    return newSpeed
  }

  private getPoints(numberOfClearedLines: number, points: number): number {
    const addedPoints = MatrixUtil.Points[numberOfClearedLines - 1]
    const newPoints = points + addedPoints
    return newPoints > MatrixUtil.MaxPoint ? MatrixUtil.MaxPoint : newPoints
  }

  private updateMatrix(pos: number, tile: Tile) {
    const newMatrix = [...this.tetrisState.matrix]
    newMatrix[pos] = tile
    this.setMatrix(newMatrix)
  }

  private setNext() {
    this.tetrisState.updateState({
      next: this.pieceFactory.getRandomPiece(),
    })
  }

  private setCurrentPiece(piece: Piece | null | undefined) {
    this.tetrisState.updateState({
      current: piece ?? null,
    })
  }

  private setMatrix(matrix: Tile[]) {
    this.tetrisState.updateState({
      matrix,
    })
  }

  private setLocked(locked: boolean) {
    this.tetrisState.updateState({
      locked,
    })
  }

  private setHold(piece: Piece): void {
    this.tetrisState.updateState({
      hold: piece,
    })
  }

  private setCanHold(canHoldPiece: boolean) {
    this.tetrisState.updateState({
      canHold: canHoldPiece,
    })
  }

  private stopGameInterval() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval)
    }
  }

  private resetPosition(piece: Piece) {
    piece.x = SPAWN_POSITION_X
    piece.y = SPAWN_POSITION_Y
  }
}
