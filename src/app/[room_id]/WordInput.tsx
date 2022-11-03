'use client'

import React from 'react'
import { createRef } from 'react'

import Input from '@/components/common/Input'
import axiosClient from '@/lib/axiosClient'

const WordInput = () => {
  const inputRef = createRef<HTMLInputElement>()

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

  return (
    <div className="w-full px-4 h-[100px] fixed bottom-0 left-1/2 translate-x-[-50%] bg-gray-900 flex items-center justify-center">
      <Input
        placeholder="Podaj słowo"
        onEnter={onEnter}
        ref={inputRef}
        className="md:w-1/3 w-full text-[22px]"
      />
    </div>
  )
}

export default WordInput
