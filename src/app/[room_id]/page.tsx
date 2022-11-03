import axiosClient from '@/lib/axiosClient'
import React, { useEffect } from 'react'
import { useState } from 'react'
import WordInput from './WordInput'

const GameScreen = async () => {
  return (
    <div>
      <WordInput />
    </div>
  )
}

export default GameScreen
