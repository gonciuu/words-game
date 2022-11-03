'use client'

import Input from '@/components/common/Input'
import axiosClient from '@/lib/axiosClient'
import React, { useEffect, useRef, useState } from 'react'
import { createRef } from 'react'

const WordInput = () => {
  const inputRef = createRef()

  const fetchRandomLetters = async () => {
    const response = await axiosClient.get<string>('/random-letters/3')
    setLetters(response.data)
  }
  const [letters, setLetters] = useState<string>('')
  const onEnter = async (message: string) => {
    const res = await axiosClient.post<boolean>('/has-word', { word: message })
    if (res.data) {
      inputRef.current.value = ''
      fetchRandomLetters()
    } else {
      inputRef.current.value = ''
    }
  }
  useEffect(() => {
    fetchRandomLetters()
  }, [])

  return (
    <div className="w-[300px]">
      <div>{letters}</div>
      <Input placeholder="Podaj słowo" onEnter={onEnter} />
    </div>
  )
}

export default WordInput
