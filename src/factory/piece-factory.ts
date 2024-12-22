import type { Piece } from '@/interface/piece/piece'
import { PieceI } from '@/interface/piece/piece-I'
import { PieceJ } from '@/interface/piece/piece-J'
import { PieceL } from '@/interface/piece/piece-L'
import { NonePiece } from '@/interface/piece/piece-none'
import { PieceO } from '@/interface/piece/piece-O'
import { PieceS } from '@/interface/piece/piece-S'
import { PieceT } from '@/interface/piece/piece-T'
import { PieceZ } from '@/interface/piece/piece-Z'

export const SPAWN_POSITION_X = 4
export const SPAWN_POSITION_Y = -4

export class PieceFactory {
  private readonly available: (typeof Piece)[] = []
  private currentBag: (typeof Piece)[] = []

  private static instance: PieceFactory | null = null

  static getInstance(): PieceFactory {
    if (!this.instance) {
      this.instance = new PieceFactory()
    }
    return this.instance
  }

  constructor() {
    this.available.push(PieceI)
    this.available.push(PieceJ)
    this.available.push(PieceL)
    this.available.push(PieceO)
    this.available.push(PieceS)
    this.available.push(PieceT)
    this.available.push(PieceZ)
  }

  getNonePiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y): Piece {
    return new NonePiece(x, y)
  }

  getRandomPiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y): Piece {
    if (this.currentBag.length == 0) {
      this.generateNewBag()
    }

    const nextPiece = this.currentBag.pop()!
    return new nextPiece(x, y)
  }

  generateNewBag() {
    this.currentBag = this.available.slice()
    this.shuffleArray(this.currentBag)
  }

  shuffleArray(array: (typeof Piece)[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
}
