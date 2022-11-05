export enum GameState {
  NOT_FOUND = 'NOT_FOUND',
  LOBBY = 'LOBBY',
  GAME = 'GAME',
  END = 'END',
}

export interface Player {
  id: string
  name: string
  isHost: boolean
}

export interface Game {
  id: string
  players: Player[]
  letters: string
  state: GameState
  currentPlayerTurn: string
  winner: string | null
}

export interface Games {
  [key: string]: Game
}
