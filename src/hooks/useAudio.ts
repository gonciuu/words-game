import { useEffect, useRef } from 'react'

const useAudio = () => {
  const correctMusicPlayer = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('/audio/correct.mp3') : undefined
  )

  const wrongMusicPlayer = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('/audio/wrong.mp3') : undefined
  )

  useEffect(() => {
    correctMusicPlayer.current = new Audio('/audio/correct.mp3')
    wrongMusicPlayer.current = new Audio('/audio/wrong.mp3')
  }, [])

  const playWrong = async () => {
    await wrongMusicPlayer.current?.play()
  }

  const playCorrect = async () => {
    await correctMusicPlayer.current?.play()
  }

  return { playWrong, playCorrect }
}

export default useAudio
