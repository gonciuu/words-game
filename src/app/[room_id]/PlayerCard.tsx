import React, { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

type PlayerCardProps = {
  name: string
  transform: string
}

const PlayerCard: FC<PlayerCardProps> = ({ name, transform }) => {
  return (
    <div
      className={clsx(
        `absolute duration-300 flex flex-col w-[150px] h-[150px] items-center justify-center`
      )}
      style={{ transform }}
    >
      <span className="text-center black w-[150px] overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium">
        {name}
      </span>
      <Image
        src="/images/avatar.jpeg"
        alt="avatar"
        className="w-10 h-10 object-cover my-1 rounded-full"
        width={40}
        height={40}
      />
      <span className="text-center black w-[150px] overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium ">
        KOT
      </span>
    </div>
  )
}

export default PlayerCard
