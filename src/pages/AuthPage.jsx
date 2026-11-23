
import { motion } from 'motion/react'
import LoginForm from '../components/auth/LoginForm'

function AuthPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050810] flex items-center justify-center px-4">

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px]"
        />

      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050810_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Login container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <LoginForm />
      </motion.div>

    </main>
  )
}

export default AuthPage
