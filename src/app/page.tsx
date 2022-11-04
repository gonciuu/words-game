import MainMenu from './MainMenu'
import Profile from './Profile'

const HomePage = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <Profile />
      <MainMenu />
    </div>
  )
}

export default HomePage
