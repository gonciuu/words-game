import { Game } from './game'

export interface ServerToClientEvents {
  gameCreated: (game: Game) => void
  gameJoined: (game: Game) => void
  gameNotFound: () => void
}

export interface ClientToServerEvents {
  createGame: (roomName: string, nickname: string) => void
  joinGame: (roomName: string, nickname: string) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
