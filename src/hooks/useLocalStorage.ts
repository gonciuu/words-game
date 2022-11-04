import { Profile } from '@/types/profile'
import { randomId } from '@/utils/id'

const useLocalStorage = () => {
  const profile: Profile = {
    nickname: `Player ${randomId}`,
    avatar: '/images/avatar.jpeg',
  }

  return profile
}

export default useLocalStorage
