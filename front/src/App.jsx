import './App.css'
import UserProvider from './contexts/User'
import Base from './pages/Base'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios'
import Perfil from './pages/Perfil'
import Users from './pages/Users'

axios.defaults.baseURL = 'https://exa844-users.onrender.com'
axios.defaults.withCredentials = true

function App() {

  return (

    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Base />}>
            <Route index element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/users' element={<Users />} />
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
