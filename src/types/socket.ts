import { Game } from './game'

export interface ServerToClientEvents {
  gameCreated: (game: Game) => void
  gameJoined: (game: Game) => void
  userJoined: (user: string) => void
  userLeft: (user: string) => void
  gameNotFound: () => void
  game: (game: Game | undefined) => void
  badWord: (word: string) => void
  correctWord: () => void
  timer: (timer: number) => void
}

export interface ClientToServerEvents {
  createGame: (roomName: string, nickname: string) => void
  joinGame: (roomName: string, nickname: string) => void
  getGame: (roomName: string) => void
  startGame: (roomName: string) => void
  writeWord: (roomName: string, word: string) => void
  guessWord: (roomName: string, word: string) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
