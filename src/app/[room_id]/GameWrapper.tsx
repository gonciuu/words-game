'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '@/components/common/Button'
import EnterNicknameModal from '@/components/common/EnterNicknameModal'
import useGame from '@/hooks/useGame'
import { socket } from '@/lib/socketClient'
import { Game, GameState } from '@/types/game'

import GameView from './GameView'

const GameWrapper = () => {
  const gameId = usePathname().replace('/', '')
  const [open, setOpen] = useState(true)

  const { game, setGame } = useGame()

  const joinGame = (nickname: string) => {
    socket.emit('joinGame', gameId, nickname)
  }
  useEffect(() => {
    socket.on('connect', () => {
      socket.on('userJoined', data => {
        console.log(data)
      })
      socket.on('gameJoined', data => {
        console.log(data)
        setGame(data)
      })
      socket.on('gameNotFound', () => {
        setOpen(false)
        setGame(g => ({ ...g, state: GameState.NOT_FOUND } as Game))
        console.log('game not found')
      })
    })
  }, [])

  if (!game) {
    return (
      <>
        <EnterNicknameModal isOpen={open} saveNickname={joinGame} submitText="Dołącz do gry" />
      </>
    )
  }

  if (game.state === GameState.NOT_FOUND) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mt-8">Game not found</h1>
        <Link href="/">
          <Button className="mt-4">Back to lobby</Button>
        </Link>
      </div>
    )
  }

  return <GameView game={game} />
}

export default GameWrapper
