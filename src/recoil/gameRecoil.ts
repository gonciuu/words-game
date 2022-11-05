import { atom } from 'recoil'

import { Game } from '@/types/game'

export const gameState = atom<Game | undefined>({
  key: 'gameState',
  default: undefined,
})
