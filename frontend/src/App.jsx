
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import{Routes,Route,Navigate}from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import { Toaster } from 'react-hot-toast'
import { authStore } from './store/authStore.js'
import MainPage from './pages/MainPage'
import Navbar from './components/NavBar.jsx'
import NoPage from './pages/NoPage.jsx'
import LogoutPage from './pages/LogoutPage.jsx'

function App() {
  const {authCheck,authUser}=authStore()

  useEffect(() => {
    if(!authUser){
      authCheck()
    }
  },[])

  

  
  
  
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={!authUser?<HomePage/>:<Navigate to={"/main"}/>}/>
        <Route path='/auth' element={!authUser?<AuthPage/>:<Navigate to={"/main"}/>}/>
       <Route path='/main' element={authUser?<MainPage/>:<Navigate to={"/auth"}/>}/>
       <Route path='/logout' element={authUser?<LogoutPage/>:<Navigate to={"/auth"}/>}/>
       <Route path='/*' element={<NoPage/>}/>
      </Routes>
  
      <Toaster
     position="top-center"
     reverseOrder={false}
    />
    </>
  )
}

export default App