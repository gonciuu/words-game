'use client'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil'
import { io, Socket } from 'socket.io-client'

import Button from '@/components/common/Button'
import EnterNicknameModal from '@/components/common/EnterNicknameModal'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
import { gameState } from '@/recoil/gameRecoil'
import { ClientToServerEvents, ServerToClientEvents } from '@/types/socket'
import { randomId } from '@/utils/id'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({ multiplex: false })

const MainMenu = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const setGameState = useSetRecoilState(gameState)

  const enterNick = () => {
    setOpen(true)
  }

  const createGame = (nickname: string) => {
    setOpen(false)
    setIsLoading(true)
    socket.emit('createGame', randomId, nickname)
  }

  useEffect(() => {
    socket.on('gameCreated', data => {
      setGameState(data)
      router.push(`/${data.id}`)
    })
    return () => {
      socket.off('gameCreated')
      setIsLoading(false)
    }
  }, [socket, router])

  return (
    <div className="p-4">
      <h1 className="text-5xl font-semibold">Gra słowna</h1>
      <h4 className="text-xl mt-4">Wymyśl słowo zawierające podane litery i wygrywaj</h4>
      <div className="mt-16 border rounded-lg p-6 border-gray-400">
        <Label>Dołącz do pokoju</Label>
        <Input type="text" placeholder="Id pokoju" className="mt-1" />
        <Button className="mt-4 w-full">Dołącz do gry</Button>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Lub</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <EnterNicknameModal
          isOpen={open}
          saveNickname={nickname => {
            createGame(nickname)
          }}
          submitText="Stwórz pokój"
        />

        <Button className="w-full" variant="secondary" onClick={isLoading ? undefined : enterNick}>
          {isLoading ? (
            <svg
              className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            'Stwórz pokój'
          )}
        </Button>
      </div>
    </div>
  )
}

export default MainMenu
