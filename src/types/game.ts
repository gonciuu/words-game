export interface Player {
  id: string
  name: string
  isHost: boolean
}

export interface Game {
  id: string
  players: Player[]
  letters: string
  started: boolean
  finished: boolean
  winner: string | null
}

export interface Games {
  [key: string]: Game
}
