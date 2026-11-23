
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { registerUser, loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

function LoginForm({ initialMode = false }) {
  const { setUser } = useAuth();
  const [isRegister, setIsRegister] = useState(initialMode);

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
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
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
            : "Inicio de sesión exitoso.")
      );

      setMessageType("success");

    if (!isRegister) {
  setUser(result.user);

  await Swal.fire({
    icon: "success",
    title: "¡Inicio exitoso!",
    text: "Bienvenido. Has iniciado sesión correctamente.",
    confirmButtonText: "Continuar",
    customClass: {
      popup: "glassy-popup",
      title: "glassy-title",
      htmlContainer: "glassy-html",
      confirmButton: "glassy-confirm",
    },
    buttonsStyling: false,
    background: "transparent",
    showClass: {
      popup: "swal2-show",
    },
    hideClass: {
      popup: "swal2-hide",
    },
  });
}

      if (isRegister) {
  setFormData({
    name: "",
    email: "",
    password: "",
  });

  await Swal.fire({
    icon: "success",
    title: "¡Cuenta creada!",
    text: "Tu registro se completó correctamente.",
    confirmButtonText: "¡Genial!",
    customClass: {
      popup: "glassy-popup",
      title: "glassy-title",
      htmlContainer: "glassy-html",
      confirmButton: "glassy-confirm",
    },
    buttonsStyling: false,
    background: "transparent",
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
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const inputStyles =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-gray-400 outline-none backdrop-blur-md transition-all duration-300 hover:border-cyan-300/40 hover:bg-white/[0.08] focus:scale-[1.01] focus:border-cyan-400 focus:bg-cyan-400/[0.08] focus:ring-2 focus:ring-cyan-400/30 [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(15,23,42,0.75)] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]";

  const fieldVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const formVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      layout
      className="relative w-full overflow-hidden rounded-3xl border border-white/25 bg-white/3 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md"
    >
      {/* Brillo diagonal sutil de vidrio */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/[0.14] via-transparent to-cyan-300/6" />

      <AnimatePresence mode="wait">
        <motion.div
          key={isRegister ? "register" : "login"}
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.97,
            filter: "blur(6px)",
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              {isRegister ? "Crear una cuenta" : "Bienvenido"}
            </h1>

            <p className="mt-2 text-sm text-gray-300">
              {isRegister
                ? "Crea tu cuenta para empezar"
                : "Inicia sesión para continuar accediendo a tu cuenta"}
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            {isRegister && (
              <motion.div variants={fieldVariants}>
                <label className="mb-2 block text-sm text-gray-200">
                  Nombre Completo
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={inputStyles}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </motion.div>
            )}

            <motion.div variants={fieldVariants}>
              <label className="mb-2 block text-sm text-gray-200">
                Correo Electrónico
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                className={inputStyles}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="mb-2 block text-sm text-gray-200">
                Contraseña
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputStyles}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password}
                </p>
              )}
            </motion.div>

            {!isRegister && (
              <motion.div
                variants={fieldVariants}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    className="accent-cyan-400"
                  />
                  Recordar
                </label>

                <button
                  type="button"
                  className="text-cyan-400 transition hover:text-cyan-300"
                >
                  ¿Olvidaste la contraseña?
                </button>
              </motion.div>
            )}

            <motion.button
              variants={fieldVariants}
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-xl border border-cyan-300/40 bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600 py-4 font-bold tracking-wide text-white shadow-[0_0_30px_rgba(34,211,238,0.45)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(34,211,238,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Procesando..."
                : isRegister
                  ? "Crear cuenta"
                  : "Iniciar sesión"}
            </motion.button>

            {message && (
              <motion.p
                variants={fieldVariants}
                className={`text-center text-sm ${
                  messageType === "error"
                    ? "text-red-400"
                    : "text-cyan-300"
                }`}
              >
                {message}
              </motion.p>
            )}
          </motion.form>

          <p className="mt-6 text-center text-sm text-gray-300">
            {isRegister
              ? "Ya tienes una cuenta?"
              : "No tienes una cuenta?"}

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
