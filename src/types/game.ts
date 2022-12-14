export enum GameState {
  NOT_FOUND = 'NOT_FOUND',
  LOBBY = 'LOBBY',
  GAME = 'GAME',
  END = 'END',
}

export enum PlayerStatus {
  NOT_PLAYING = 'NOT_PLAYING',
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
}
export interface Player {
  id: string
  name: string
  status: PlayerStatus
  isHost: boolean
  lives: number
  currentWord?: string
}

export interface Game {
  id: string
  players: Player[]
  letters: string
  state: GameState
  currentPlayerTurn: string
  winner: string | null
  time: number
}

export interface Games {
  [key: string]: Game
}
