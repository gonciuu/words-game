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

import { createGame, joinGame } from './games'
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

nextApp
  .prepare()
  .then(() => {
    app.get('/random-letters/:lettersCount', (req, res) => {
      const { lettersCount } = req.params
      const lettersCountInt = parseInt(lettersCount)

      const randomWord = array[Math.floor(Math.random() * array.length)]
      let randomStartIndex = Math.floor(Math.random() * randomWord.length)

      while (randomStartIndex + lettersCountInt > randomWord.length) {
        randomStartIndex--
      }
      const randomEndIndex = randomStartIndex + lettersCountInt
      const randomLetters = randomWord.slice(randomStartIndex, randomEndIndex)

      return res.send(randomLetters)
    })

    app.post('/has-word', async (req, res) => {
      const { word } = req.body as { word: string }
      if (!word || word.length < 3) {
        return res.send(false)
      }
      const hasWord = wordsSet.has(word)
      return res.send(hasWord)
    })

    io.on('connection', socket => {
      socket.on('createGame', (roomName: string, nickname: string) => {
        if (socket.rooms.has(roomName)) {
          return
        }

        socket.join(roomName)
        const game = createGame(roomName, {
          id: socket.id,
          name: nickname,
          isHost: true,
        })
        io.to(roomName).emit('gameCreated', game)
      })

      socket.on('joinGame', (roomName: string, nickname: string) => {
        const game = joinGame(roomName, {
          id: socket.id,
          name: nickname,
          isHost: false,
        })

        if (!game) {
          socket.emit('gameNotFound')
          io.to(roomName).emit('gameNotFound')
          return
        }

        socket.join(roomName)
        io.to(roomName).emit('gameJoined', game)
        socket.broadcast.to(roomName).emit('userJoined', 'essa')
      })
      // socket.on('disconnect', () => {
      //   socket.rooms.forEach(room => {
      //     leaveGame(room, socket.id)
      //   })
      // })
    })

    server.listen(port)
    app.get('*', (req, res): any => {
      return nextHandler(req, res)
    })
  })
  .catch(err => console.error(err))
