
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
  console.log(!authUser);
  

  
  
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
       <Route path='/main' element={<MainPage/>}/>
      </Routes>
  
      <Toaster
     position="top-center"
     reverseOrder={false}
    />
    </>
  )
}

export default App