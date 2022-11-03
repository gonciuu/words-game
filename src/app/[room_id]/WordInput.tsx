'use client'

import React, { useEffect, useState } from 'react'
import { createRef } from 'react'

import Input from '@/components/common/Input'
import axiosClient from '@/lib/axiosClient'

const WordInput = () => {
  const inputRef = createRef<HTMLInputElement>()
  const [letters, setLetters] = useState<string>('')

  const fetchRandomLetters = async () => {
    const response = await axiosClient.get<string>('/random-letters/3')
    setLetters(response.data)
  }

  const onEnter = async (message: string) => {
    const res = await axiosClient.post<boolean>('/has-word', { word: message })
    if (res.data) {
      if (inputRef.current) {
        inputRef.current.value = ''
      }

      await fetchRandomLetters()
    } else {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }
  useEffect(() => {
    fetchRandomLetters()
      .then(e => {
        console.log(e)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <div className="w-[300px]">
      <div>{letters}</div>
      <Input placeholder="Podaj słowo" onEnter={onEnter} />
    </div>
  )
}

export default WordInput
