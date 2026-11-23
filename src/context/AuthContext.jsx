
import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile, logoutUser } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Comprobar si existe una sesión activa
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await getProfile()
        setUser(result.user)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Cerrar sesión
  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado
export const useAuth = () => {
  return useContext(AuthContext)
}

