import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <AuthProvider>
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
          <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
          >
          </Route>
          <Route path='/' element={<Navigate to="/dashboard" replace></Navigate>}></Route>
          <Route path='*' element={<Navigate to="/login" replace></Navigate>}></Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
