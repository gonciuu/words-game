/* eslint-disable @typescript-eslint/no-floating-promises */
import fs from 'fs'
import { createServer } from 'http'

import bodyParser from 'body-parser'
import express from 'express'
import next from 'next'
import { Server } from 'socket.io'

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '@/types/socket'

import { GameState, PlayerStatus } from '../types/game'
import {
  createGame,
  getGame,
  joinGame,
  onGuessWord,
  onPlayerLeave,
  onWriteWord,
  startGame,
  timeIsUp,
} from './games'
const dev = process.env.NODE_ENV !== 'production'

const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const port = parseInt(process.env.PORT as string, 10) || 3000

const app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)

const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  server
)

// read sjp file words
const array = fs
  .readFileSync(__dirname + '/sjp.txt')
  .toString()
  .split('\n')

const wordsSet = new Set(array)

const generateRandomLetters = (lettersCount: number): string => {
  const randomWord = array[Math.floor(Math.random() * array.length)]
  let randomStartIndex = Math.floor(Math.random() * randomWord.length)

  while (randomStartIndex + lettersCount > randomWord.length) {
    randomStartIndex--
  }
  const randomEndIndex = randomStartIndex + lettersCount
  const randomLetters = randomWord.slice(randomStartIndex, randomEndIndex)

  return randomLetters
}

const timers: { [key: string]: NodeJS.Timer } = {}

nextApp
  .prepare()
  .then(() => {
    io.on('connection', socket => {
      const getRoomId = () => {
        const joinedRoom: string | undefined = Array.from(socket.rooms.values()).find(
          room => room !== socket.id
        )
        if (!joinedRoom) return socket.id
        return joinedRoom
      }

      socket.on('createGame', (roomName: string, nickname: string) => {
        if (socket.rooms.has(roomName)) {
          return
        }

        socket.join(roomName)
        const game = createGame(roomName, {
          id: socket.id,
          name: nickname,
          status: PlayerStatus.NOT_PLAYING,
          isHost: true,
          lives: 20,
        })
        io.to(roomName).emit('gameCreated', game)
      })

      socket.on('getGame', (roomName: string) => {
        const game = getGame(roomName)

        io.to(socket.id).emit('game', game)
      })

      socket.on('joinGame', (roomName: string, nickname: string) => {
        const game = joinGame(roomName, {
          id: socket.id,
          name: nickname,
          status: PlayerStatus.WAITING,
          isHost: false,
          lives: 3,
        })

        if (!game) {
          socket.emit('gameNotFound')
          io.to(roomName).emit('gameNotFound')
          return
        }

        socket.join(roomName)
        io.to(roomName).emit('gameJoined', game)
        socket.broadcast.to(roomName).emit('userJoined', nickname)
      })

      socket.on('startGame', (roomName: string) => {
        const randomLetters = generateRandomLetters(3)
        const game = startGame(roomName, randomLetters)

        if (!game) {
          socket.emit('gameNotFound')
          return
        }

        clearInterval(timers[roomName])

        timers[roomName] = setInterval(() => {
          game.time--
          if (game.time === 0) {
            const g = timeIsUp(roomName)

            io.in(roomName).emit('game', g)
            io.in(roomName).emit('timer', g.time)
            return
          }
          io.in(roomName).emit('timer', game.time)
        }, 1000)

        io.to(roomName).emit('game', game)
      })

      socket.on('writeWord', (roomName: string, word: string) => {
        const game = onWriteWord(roomName, socket.id, word)

        if (!game) {
          socket.emit('gameNotFound')
          return
        }
        io.in(roomName).emit('game', game)
      })

      socket.on('guessWord', (roomName: string, word: string) => {
        const hasWord = wordsSet.has(word)

        if (!hasWord) {
          socket.emit('badWord', word)

          return
        }

        const randomLetters = generateRandomLetters(3)
        const game = onGuessWord(roomName, randomLetters)

        clearInterval(timers[roomName])
        game.time = 10
        if (game.state === GameState.END) {
          io.in(roomName).emit('game', game)
          return
        }
        io.in(roomName).emit('timer', game.time)
        timers[roomName] = setInterval(() => {
          if (game.time === 0) {
            const g = timeIsUp(roomName)
            g.time = 10
            io.in(roomName).emit('game', g)
            io.in(roomName).emit('timer', g.time)
            return
          }
          game.time--
          io.in(roomName).emit('timer', game.time)
        }, 1000)
        io.in(roomName).emit('correctWord')
        io.in(roomName).emit('game', game)
      })

      socket.on('disconnecting', () => {
        const roomId = getRoomId()

        const g = onPlayerLeave(roomId, socket.id)
        socket.broadcast.to(roomId).emit('userLeft', g?.player ?? '')
        io.to(roomId).emit('game', g?.g)
      })
    })

    server.listen(port)
    app.get('*', (req, res): any => {
      return nextHandler(req, res)
    })
  })
  .catch(err => console.error(err))
