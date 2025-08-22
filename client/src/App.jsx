import React from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter,Route ,Routes} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
