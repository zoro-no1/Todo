
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import{Routes,Route,Navigate}from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import { Toaster } from 'react-hot-toast'
import { authStore } from './store/authStore.js'
import MainPage from './pages/MainPage'

function App() {
  const {authCheck,authUser}=authStore()

  useEffect(() => {
    if(!authUser){
      authCheck()
    }
  },[])

  

  
  
  
  return (
    <>
      <Routes>
        <Route path='/' element={!authUser?<HomePage/>:<Navigate to={"/main"}/>}/>
        <Route path='/auth' element={!authUser?<AuthPage/>:<Navigate to={"/main"}/>}/>
       <Route path='/main' element={authUser?<MainPage/>:<Navigate to={"/auth"}/>}/>
      </Routes>
  
      <Toaster
     position="top-center"
     reverseOrder={false}
    />
    </>
  )
}

export default App