'use client'

import React, { FormEvent, useState } from 'react'
import { createRef } from 'react'
import { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import useGame from '@/hooks/useGame'
import axiosClient from '@/lib/axiosClient'
import { PlayerStatus } from '@/types/game'

const WordInput = () => {
  const inputRef = createRef<HTMLInputElement>()
  const [nickname, setNickname] = useState('')
  const gameId = usePathname().replaceAll('/', '')

  const { currentPlayer, joinGame, game } = useGame()

  useEffect(() => {
    setNickname(localStorage.getItem('nickname') || '')
  }, [currentPlayer])

  console.log(game)

  const onEnter = async (message: string) => {
    const res = await axiosClient.post<boolean>('/has-word', { word: message })
    if (res.data) {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    } else {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }
  const joinToGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('nickname', nickname)
    joinGame(nickname, gameId)
  }

  return (
    <div className="w-full px-4 h-[100px] fixed bottom-0 left-1/2 translate-x-[-50%] bg-gray-900 flex items-center justify-center">
      {currentPlayer?.status === PlayerStatus.PLAYING && (
        <Input
          placeholder="Podaj słowo"
          onEnter={onEnter}
          ref={inputRef}
          className="md:w-1/3 w-full text-[22px]"
        />
      )}

      {currentPlayer?.status === PlayerStatus.WAITING && (
        <div className="text-white text-2xl">Czekaj na swoją kolej</div>
      )}

      {!currentPlayer && (
        <form onSubmit={joinToGame}>
          <div className="flex flex-col items-center justify-center">
            <Input placeholder="Nickname" defaultValue={nickname} onChange={setNickname} required />
            <Button className="mt-2 w-full" type="submit">
              Dołącz do gry
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default WordInput
