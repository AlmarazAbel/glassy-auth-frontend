
import { Routes, Route, Navigate } from 'react-router-dom'

import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'

import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/routes/ProtectedRoute'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <p className="text-cyan-400 text-lg">
          Verificando sesión...
        </p>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={user ? '/profile' : '/login'} replace />
        }
      />

      <Route
        path="/login"
        element={
          user ? <Navigate to="/profile" replace /> : <AuthPage />
        }
      />

      <Route
        path="/register"
        element={
          user ? <Navigate to="/profile" replace /> : <AuthPage />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
