'use client'

import React, { useEffect } from 'react'

import clsx from 'clsx'

import PlayerCard from './PlayerCard'

const circleSize = `h-[200px] w-[200px]`
const circleSizeMd = `md:h-[500px] md:w-[500px]`
const circleSizeSm = `sm:h-[300px] sm:w-[300px]`

const GameView = () => {
  const players = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7']
  let angle = 0
  const step = (2 * Math.PI) / players.length

  const [currentCircleWidth, setCurrentCircleWidth] = React.useState<number>(0)

  const onResize = () => {
    if (window.innerWidth < 768 && window.innerWidth > 640) {
      setCurrentCircleWidth(300 / 2)
    } else if (window.innerWidth < 640) {
      setCurrentCircleWidth(200 / 2)
    } else {
      setCurrentCircleWidth(500 / 2)
    }
  }

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div>
      <div className="w-full h-[calc(100vh-100px)]  flex items-center justify-center">
        <div
          className={clsx(`relative rounded-full`, `${circleSize} ${circleSizeMd} ${circleSizeSm}`)}
        >
          {players.map((player, index) => {
            angle = index * step
            const x = Math.round(currentCircleWidth + currentCircleWidth * Math.cos(angle) - 50 / 2)
            const y = Math.round(currentCircleWidth + currentCircleWidth * Math.sin(angle) - 50 / 2)
            const transform = `translate(${x}px, ${y}px)`
            return <PlayerCard transform={transform} name={player} key={player} />
          })}
        </div>
      </div>
    </div>
  )
}

export default GameView
