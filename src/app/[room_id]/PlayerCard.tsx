'use client'
import React, { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import { IoMdHeart } from 'react-icons/io'
type PlayerCardProps = {
  name: string
  transform: string
  currentWord: string
  lives: number
}

const Lives = ({ lives }: { lives: number }) => {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: lives }, (_, i) => (
        <IoMdHeart key={i} className="text-red-500" />
      ))}
    </div>
  )
}

const PlayerCard: FC<PlayerCardProps> = ({ name, transform, currentWord, lives }) => {
  return (
    <div
      className={clsx(
        `absolute duration-300 flex flex-col w-[150px] h-[150px] items-center justify-center`
      )}
      style={{ transform }}
    >
      <Lives lives={lives} />
      <span className="text-center  block w-[150px] overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium">
        {name}
      </span>
      <Image
        src="/images/avatar.jpeg"
        alt="avatar"
        className="w-10 h-10 object-cover my-1 rounded-full"
        width={40}
        height={40}
      />
      <span className="text-center block w-[150px] overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium ">
        {currentWord}
      </span>
    </div>
  )
}

export default PlayerCard
