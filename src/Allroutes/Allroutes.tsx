import { Route, Routes } from 'react-router-dom'
import Dashboard  from '../view/Dashboard'
import VideoMenu from '../view/VideoMenu'

export const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element= { <Dashboard /> }  />
        <Route path='/player' element= {<VideoMenu/>} />
    </Routes>
  )
}
