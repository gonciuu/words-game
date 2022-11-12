import React from 'react'

import useGame from '@/hooks/useGame'

const Scoreboard = () => {
  //get players from usegame hook
  const { game } = useGame()
  return (
    <div>
      <div className="mt-4 bg-gray-600 p-6 rounded-md min-w-[300px]">
        <h2 className="text-xl font-bold">Lista graczy:</h2>
        <div className="mt-2">
          {game?.players.map((p, index) => (
            <div key={p.id}>
              {index + 1}. {p.name} {p.isHost && ' (HOST)'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
