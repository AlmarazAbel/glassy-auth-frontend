
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider, useAuth } from './context/AuthContext'

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

  return user ? <ProfilePage /> : <AuthPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
