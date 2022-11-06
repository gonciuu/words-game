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

  return {
    game,
    setGame,
    currentPlayer,
    joinGame,
    getGame,
    startGame,
  }
}
export default useGame
