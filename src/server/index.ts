import { createServer } from 'http'

import express from 'express'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'

const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const port = parseInt(process.env.PORT as string, 10) || 3000

const app = express()

const server = createServer(app)
const io = new Server(server)

nextApp
  .prepare()
  .then(() => {
    app.get('*', (req, res): any => {
      return nextHandler(req, res)
    })
    io.on('connection', socket => {
      socket.on('message', (message: string) => {
        console.log('message', message)
      })
    })
    server.listen(port)
  })
  .catch(err => console.error(err))
