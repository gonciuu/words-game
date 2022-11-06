import { useRecoilState } from 'recoil'

import { socket } from '@/lib/socketClient'
import { gameState } from '@/recoil/gameRecoil'
const useGame = () => {
  const [game, setGame] = useRecoilState(gameState)

  const currentPlayer = game?.players.find(player => player.id === socket.id)

  const joinGame = (nickName: string, roomName: string) => {
    socket.emit('joinGame', roomName, nickName)
  }

  const getGame = (roomName: string) => {
    socket.emit('getGame', roomName)
  }

  const startGame = () => {
    if (game) socket.emit('startGame', game.id)
  }

  const onWriteWord = (word: string) => {
    if (game) socket.emit('writeWord', game.id, word)
  }

  return {
    game,
    setGame,
    currentPlayer,
    joinGame,
    getGame,
    startGame,
    onWriteWord,
  }
}
export default useGame
