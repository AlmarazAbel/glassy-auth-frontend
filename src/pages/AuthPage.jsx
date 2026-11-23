import { motion } from "motion/react";
import LoginForm from "../components/auth/LoginForm";
import { useLocation } from "react-router-dom";

function AuthPage() {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050810] flex items-center justify-center px-4 py-10">
      {/* Halo de luz detrás del formulario para dar transparencia al cristal */}
<div className="pointer-events-none absolute top-1/2 left-1/2 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 blur-[95px]" />
      {/* Fondo ambiental */}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Luz azul */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 h-128 w-lg rounded-full bg-blue-500/35 blur-[130px]"
        />

        {/* Luz violeta */}
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -right-32 h-136 w-136 rounded-full bg-purple-500/30 blur-[140px]"
        />

        {/* Luz celeste central */}
        <motion.div
          animate={{
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-400/30 blur-[110px]"
        />
      </div>

      {/* Cuadrícula decorativa */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      {/* Viñeta oscura suave */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,#050810_90%)]" />

      {/* Formulario */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-md"
      >
        <LoginForm initialMode={isRegister} />
      </motion.div>
    </main>
  );
}

export default AuthPage;