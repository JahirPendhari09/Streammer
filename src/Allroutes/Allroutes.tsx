import { Route, Routes } from 'react-router-dom'
import Dashboard  from '../view/Dashboard'
import { Profile } from '../view/Profile'
import Notifications from '../view/Notifications'
import { Room } from '../view/Room'
import { Search } from '../view/Search'
import { Home } from '../view/Home'
import { VideoPlayer } from '../view/VideoPlayer'
import VideoMenu from '../view/VideoMenu'

export const Allroutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="room" element={<Room />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="watch/:filename" element={<VideoPlayer />} />
        <Route path="room/:roomId" element={<VideoMenu/>} />
      </Route>
      <Route path='/' element= {<Dashboard/>} />

  {/* Other routes */}
    </Routes>

  )
}
