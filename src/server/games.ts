import { Games, Game, Player, GameState } from '../types/game'

export const games: Games = {}

export const createGame = (id: string, player: Player): Game => {
  const game: Game = {
    id,
    players: [player],
    letters: '',
    winner: null,
    state: GameState.LOBBY,
    currentPlayerTurn: player.id,
  }
  games[id] = game
  return game
}

export const joinGame = (id: string, player: Player): Game | null => {
  const game = games[id]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!game) {
    return null
  }

  if (!game.players.includes(player)) {
    game.players.push(player)
  }
  return game
}

export const leaveGame = (id: string, player: Player): Game | null => {
  const game = games[id]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!game) {
    return null
  }

  game.players = game.players.filter(p => p !== player)
  games[id] = game
  return game
} // Path: src/server/index.ts
