/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { Games, Game, Player, GameState, PlayerStatus } from '../types/game'
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

  if (!game) {
    return null
  }

  if (game.state === GameState.LOBBY) {
    player.status = PlayerStatus.PLAYING
  }

  if (!game.players.includes(player)) {
    game.players.push(player)
  }

  return game
}

export const getGame = (id: string): Game | null => {
  const game = games[id]
  if (!game) {
    return null
  }
  return game
}

export const startGame = (id: string, randomLetters: string): Game | null => {
  const game = games[id]
  if (!game) {
    return null
  }

  game.state = GameState.GAME
  game.letters = randomLetters
  game.players.forEach(player => {
    player.status = PlayerStatus.PLAYING
  })
  games[id] = game
  return game
}

export const leaveGame = (id: string, player: Player): Game | null => {
  const game = games[id]

  if (!game) {
    return null
  }

  game.players = game.players.filter(p => p !== player)
  games[id] = game
  return game
} // Path: src/server/index.ts

export const onWriteWord = (id: string, playerId: string, word: string) => {
  const game = getGame(id)
  if (!game) {
    return
  }
  const player = game.players.find(p => p.id === playerId)
  if (!player) {
    return
  }

  player.currentWord = word
  games[id] = game

  return game
}
