import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route
        path='/auth/login'
        element={<LoginPage />}
        >
        </Route>
        <Route
        path='/auth/register'
        element={<RegisterPage />}
        >
        </Route>
      </Routes>
    </Router>
  )
}

export default App
