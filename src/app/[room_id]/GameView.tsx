'use client'

import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { io, Socket } from 'socket.io-client'

import Button from '@/components/common/Button'
import EnterNicknameModal from '@/components/common/EnterNicknameModal'
import { ClientToServerEvents, ServerToClientEvents } from '@/types/socket'

import PlayerCard from './PlayerCard'

const circleSize = `h-[250px] w-[250px]`
const circleSizeMd = `md:h-[500px] md:w-[500px]`
const circleSizeSm = `sm:h-[300px] sm:w-[300px]`

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

export enum GameState {
  NOT_FOUND = 'NOT_FOUND',
  LOBBY = 'LOBBY',
  GAME = 'GAME',
  END = 'END',
}

const GameView = () => {
  const [open, setOpen] = useState(true)

  const roomId = usePathname().replace('/', '')

  const [currentCircleWidth, setCurrentCircleWidth] = useState<number>(250)

  const [gameState, setGameState] = useState<GameState>(GameState.LOBBY)

  const onResize = () => {
    if (window.innerWidth < 768 && window.innerWidth > 640) {
      setCurrentCircleWidth(150)
    } else if (window.innerWidth < 640) {
      setCurrentCircleWidth(125)
    } else {
      setCurrentCircleWidth(250)
    }
  }

  useEffect(() => {
    socket.on('connect', () => {
      // socket.emit('joinGame', roomId, profile.nickname, profile.avatar)
      // socket.on('gameJoined', data => {})
      // socket.on('gameNotFound', () => {
      //   setGameState(GameState.NOT_FOUND)
      // })
    })

    return () => {
      socket.off('gameCreated')
    }
  }, [roomId])

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const players = [
    'player1',
    'player2',
    'player3',
    'player4',
    'player5',
    'player6',
    'player7',
    'player8',
  ]
  const step = (2 * Math.PI) / players.length
  const curPlayer = 1
  const onePlayerRotateStep = 360 / players.length

  const enterNickname = (
    <EnterNicknameModal
      isOpen={open}
      closeModal={() => setOpen(false)}
      saveNickname={nickname => console.log(nickname)}
    />
  )

  if (gameState === GameState.NOT_FOUND) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mt-8">Game not found</h1>
        <Link href="/">
          <Button className="mt-4">Back to lobby</Button>
        </Link>
      </div>
    )
  }

  if (gameState === GameState.LOBBY) {
    return (
      <div className="w-full h-[calc(100vh-100px)]  flex items-center justify-center flex-col">
        {enterNickname}
        <h1 className="text-xl font-semibold">Players: </h1>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {index + 1}. {player}
            </li>
          ))}
        </ul>
        <Button onClick={() => setGameState(GameState.GAME)}>Start</Button>
      </div>
    )
  }

  return (
    <div className="w-full h-[calc(100vh-100px)]  flex items-center justify-center flex-col">
      <div
        className={clsx(`relative rounded-full`, `${circleSize} ${circleSizeMd} ${circleSizeSm}`)}
      >
        <div className="w-2/3 h-2/3  absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
          <div className="relative w-full h-full">
            <Image
              src={'/images/arrow.svg'}
              className="w-full h-full  absolute duration-300"
              fill={true}
              alt="arrow"
              style={{ transform: `rotate(${onePlayerRotateStep * curPlayer}deg)` }}
            />
            <div className="absolute w-[80px] h-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-primary-500 border-gray-700 border-8 rounded-full">
              <span className="font-semibold text-lg leading-[1.5]">HHH</span>
            </div>
          </div>
        </div>
        {players.map((player, index) => {
          const angle = index * step
          const x = Math.round(currentCircleWidth + currentCircleWidth * Math.cos(angle) - 75)
          const y = Math.round(currentCircleWidth + currentCircleWidth * Math.sin(angle) - 75)
          const transform = `translate(${x}px, ${y}px)`
          return <PlayerCard transform={transform} name={player} key={player} />
        })}
      </div>
    </div>
  )
}

export default GameView
