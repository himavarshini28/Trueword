import React from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter,Route ,Routes} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
    <Route element={<ProtectedRoute/>}>
 <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
