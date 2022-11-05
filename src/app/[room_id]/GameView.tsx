'use client'

import React, { FC, useEffect, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import { Game } from '@/types/game'

import PlayerCard from './PlayerCard'

const circleSize = `h-[250px] w-[250px]`
const circleSizeMd = `md:h-[500px] md:w-[500px]`
const circleSizeSm = `sm:h-[300px] sm:w-[300px]`

type GameViewProps = {
  game: Game
}
const GameView: FC<GameViewProps> = ({ game }) => {
  const [currentCircleWidth, setCurrentCircleWidth] = useState<number>(250)

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
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const players = game.players
  const step = (2 * Math.PI) / players.length
  const curPlayer = 1
  const onePlayerRotateStep = 360 / players.length

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
          return <PlayerCard transform={transform} name={player.name} key={player.id} />
        })}
      </div>
    </div>
  )
}

export default GameView
