import { Route, Routes } from 'react-router-dom'
import Dashboard  from '../view/Dashboard'
import SignUpView from '../view/Signup'
import LoginView from '../view/Login'

export const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element ={ <Dashboard /> }  />
        <Route path='/login' element ={ <LoginView /> }  />
        <Route path='/signup' element ={ <SignUpView /> }  />
    </Routes>
  )
}
