
import { useAuth } from '../context/AuthContext'

function ProfilePage() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <main className="min-h-screen bg-[#050810] flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/6 p-8 text-white shadow-2xl backdrop-blur-xl">

        <h1 className="mb-6 text-3xl font-bold">
          Mi perfil
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Nombre</p>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">ID de usuario</p>
            <p className="break-all font-medium">{user?.id}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          Cerrar sesión
        </button>

      </div>
    </main>
  )
}

export default ProfilePage
