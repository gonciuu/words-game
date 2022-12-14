'use client'
import React, { useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

import Button from '@/components/common/Button'
import useAudio from '@/hooks/useAudio'
import useGame from '@/hooks/useGame'
import { socket } from '@/lib/socketClient'
import { Game, GameState } from '@/types/game'

import Loading from '../loading'
import GameView from './GameView'
import Scoreboard from './Scoreboard'

const GameWrapper = () => {
  const gameId = usePathname().replaceAll('/', '')

  const { game, setGame, getGame } = useGame()
  const { playCorrect, playWrong } = useAudio()

  useEffect(() => {
    getGame(gameId)

    socket.on('userJoined', nickname => {
      toast(`${nickname} dołączył do gry`)
    })

    socket.on('gameJoined', data => {
      setGame(data)
    })

    socket.on('game', (g: Game | undefined) => {
      setGame(g)
    })

    socket.on('gameNotFound', () => {
      setGame(g => ({ ...g, state: GameState.NOT_FOUND } as Game))
      console.log('game not found')
    })

    socket.on('badWord', async word => {
      toast(`Słowo ${word} nie istanieje w słowniku`, {
        type: 'error',
      })
      await playWrong()
    })

    socket.on('correctWord', async () => {
      await playCorrect()
    })

    socket.on('userLeft', nickname => {
      toast(`${nickname} opuścił grę`)
    })

    return () => {
      socket.off('gameJoined')
      socket.off('gameNotFound')
      socket.off('userJoined')
      socket.off('game')
      socket.off('badWord')
      socket.off('correctWord')
    }
  }, [])

  if (game?.state === GameState.END) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl mt-4">Koniec gry</h1>
        <h2>Zwycięzca {game.players.find(p => p.id === game.winner)?.name}</h2>
      </div>
    )
  }

  if (game?.state === GameState.NOT_FOUND) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mt-8">Game not found</h1>
        <Link href="/">
          <Button className="mt-4">Back to lobby</Button>
        </Link>
      </div>
    )
  }

  if (game?.state === GameState.LOBBY) {
    return (
      <>
        <div className="w-full h-[calc(100vh-100px)]  flex items-center justify-center flex-col">
          <h1 className="font-semibold text-4xl">LOBBY</h1>
          <Scoreboard />
        </div>
      </>
    )
  }

  if (game) return <GameView game={game} />

  return <Loading />
}

export default GameWrapper
