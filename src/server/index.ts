import fs from 'fs'
import { createServer } from 'http'

import bodyParser from 'body-parser'
import express from 'express'
import next from 'next'
import { Server } from 'socket.io'
const dev = process.env.NODE_ENV !== 'production'

const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const port = parseInt(process.env.PORT as string, 10) || 3000

const app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)

const server = createServer(app)
const io = new Server(server)

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
      console.log('a user connected', socket.id)
      socket.on('message', (message: string) => {
        console.log('message', message)
      })
    })
    server.listen(port)
    app.get('*', (req, res): any => {
      return nextHandler(req, res)
    })
  })
  .catch(err => console.error(err))
