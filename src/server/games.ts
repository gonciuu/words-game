/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { Games, Game, Player, GameState, PlayerStatus } from '../types/game'
export const games: Games = {}

const playingPlayers = (game: Game): Player[] => {
  return game.players.filter(player => player.status === PlayerStatus.PLAYING)
}

export const getGame = (id: string): Game => {
  const game = games[id]
  return game
}

const nextPlayer = (game: Game): Game => {
  const playersInGame = playingPlayers(game)
  console.log(playersInGame.length)
  const playerOnTurnIndex = playersInGame.findIndex(p => p.id === game.currentPlayerTurn)

  if (playersInGame.length === playerOnTurnIndex + 1) {
    console.log('chuj player')
    game.currentPlayerTurn = playersInGame[0].id
  } else {
    console.log('kurwa player')
    game.currentPlayerTurn = playersInGame[playerOnTurnIndex + 1].id
  }

  return game
}

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

export const startGame = (id: string, randomLetters: string): Game | null => {
  const game = games[id]
  if (!game) {
    return null
  }
  game.time = 10
  game.state = GameState.GAME
  game.letters = randomLetters
  game.players.forEach(player => {
    player.status = PlayerStatus.PLAYING
    player.lives = 3
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
}
export const onWriteWord = (id: string, playerId: string, word: string) => {
  const game = getGame(id)

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
  nextPlayer(game)
  game.letters = newLetters

  games[gameId] = game

  return game
}

export const timeIsUp = (id: string) => {
  const game = getGame(id)
  const playersInGame = playingPlayers(game)
  const playerIndex = playersInGame.findIndex(p => p.id === game.currentPlayerTurn)
  const player = playersInGame[playerIndex]

  if (player.lives === 1) {
    player.lives = 0
    player.status = PlayerStatus.WAITING
    if (playersInGame.length === 1) {
      game.state = GameState.END
      game.winner = playersInGame[0].id
      return game
    }
    games[id] = game
  } else {
    player.lives -= 1
  }

  if (playersInGame.length <= 1) {
    games[id] = game
    return game
  }
  nextPlayer(game)

  game.time = 10
  games[id] = game

  return game
}

export const onPlayerLeave = (id: string, playerId: string) => {
  const game = getGame(id)
  if (!game) {
    return
  }

  const player = game.players.find(p => p.id === playerId)

  game.players.splice(
    game.players.findIndex(function (i) {
      return i.id === playerId
    }),
    1
  )

  if (game.players.length < 2) {
    game.state = GameState.END
    game.winner = game.players[0].id
  }

  games[id] = game
  return { g: game, player: player?.name ?? '' }
}
