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
    time: 10,
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

export const onGuessWord = (gameId: string, newLetters: string) => {
  const game = getGame(gameId)
  if (!game) {
    return
  }

  const playerIndex = game.players.findIndex(p => p.id === game.currentPlayerTurn)

  if (game.players.length === playerIndex + 1) {
    game.currentPlayerTurn = game.players[0].id
  } else {
    game.currentPlayerTurn = game.players[playerIndex + 1].id
  }

  game.letters = newLetters

  return game
}

export const timeIsUp = (id: string) => {
  const game = getGame(id)
  if (!game) {
    return
  }

  game.time = 10

  const playerIndex = game.players.findIndex(p => p.id === game.currentPlayerTurn)
  const player = game.players[playerIndex]

  if (player.lives === 1) {
    player.lives = 0
  } else {
    player.lives -= 1
  }

  if (game.players.length === playerIndex + 1) {
    game.currentPlayerTurn = game.players[0].id
  } else {
    game.currentPlayerTurn = game.players[playerIndex + 1].id
  }

  games[id] = game

  return game
}
