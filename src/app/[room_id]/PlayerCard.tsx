import React, { FC } from 'react'

import clsx from 'clsx'

type PlayerCardProps = {
  name: string
  transform: string
}

const PlayerCard: FC<PlayerCardProps> = ({ name, transform }) => {
  return (
    <div
      className={clsx(`absolute w-[50px] border-2 border-red-200 rounded-full duration-300`)}
      style={{ transform }}
    >
      {name}
    </div>
  )
}

export default PlayerCard
