import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { registerUser, loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const { setUser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (isRegister && !formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresá un email válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "Debe tener al menos 8 caracteres";
    }

    setErrors(newErrors);
    setMessage("");

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      let result;

      if (isRegister) {
        result = await registerUser({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });
      } else {
        result = await loginUser({
          email: formData.email.trim(),
          password: formData.password,
        });
      }

      setMessage(
        result.message ||
          (isRegister
            ? "Cuenta creada correctamente."
            : "Inicio de sesión exitoso."),
      );

      setMessageType("success");

      // Si el usuario inició sesión, guardar sus datos
      if (!isRegister) {
        setUser(result.user);
      }

      if (isRegister) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const changeMode = () => {
    setIsRegister(!isRegister);
    setErrors({});
    setMessage("");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <motion.div
      layout
      className="w-full rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isRegister ? "register" : "login"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              {isRegister ? "Crear una cuenta" : "Bienvenido"}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              {isRegister
                ? "Crea tu cuenta para empezar"
                : "Inicia sesión para continuar accediendo a tu cuenta"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {isRegister && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Nombre Completo
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Correo Electronico
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Contraseña
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400">
                  <input type="checkbox" className="accent-cyan-400" />
                  Recordar
                </label>

                <button
                  type="button"
                  className="text-cyan-400 transition hover:text-cyan-300"
                >
                  Olvidaste la contraseña?
                </button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Processing..."
                : isRegister
                  ? "Create Account"
                  : "Sign In"}
            </motion.button>

            {message && (
              <p
                className={`text-center text-sm ${
                  messageType === "error" ? "text-red-400" : "text-cyan-300"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            {isRegister ? "Ya tienes una cuenta?" : "No tienes una cuenta?"}

            <button
              type="button"
              onClick={changeMode}
              className="ml-2 font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              {isRegister ? "Iniciar sesión" : "Crear una cuenta"}
            </button>
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default LoginForm;
