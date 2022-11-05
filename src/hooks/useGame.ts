import { useRecoilState } from 'recoil'

import { gameState } from '@/recoil/gameRecoil'
const useGame = () => {
  const [game, setGame] = useRecoilState(gameState)

  return {
    game,
    setGame,
  }
}
export default useGame
