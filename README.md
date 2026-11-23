# Glassy Auth – Sistema de Autenticación JWT

Aplicación web de autenticación de usuarios desarrollada con React. Incluye registro, inicio de sesión, gestión de sesión mediante cookies HttpOnly, rutas protegidas y una interfaz moderna con efectos Glassmorphism y animaciones.

El proyecto fue desarrollado como parte de mi portfolio personal para demostrar conocimientos de desarrollo frontend, integración con APIs REST y manejo de autenticación.

## ✨ Características principales

- **Registro de usuarios:** formulario para crear nuevas cuentas.
- **Inicio de sesión:** autenticación mediante credenciales.
- **Autenticación JWT:** gestión del token mediante cookies HttpOnly.
- **Persistencia de sesión:** recuperación del usuario autenticado al recargar la aplicación.
- **Rutas protegidas:** acceso restringido a usuarios autenticados.
- **Perfil de usuario:** visualización de los datos del usuario.
- **Cerrar sesión (Logout):** finalización de la sesión y limpieza de la cookie de autenticación.
- **Validación de formularios:** control de los datos ingresados.
- **Alertas personalizadas:** notificaciones de éxito y errores mediante SweetAlert2.
- **Diseño responsive:** interfaz adaptable a diferentes tamaños de pantalla.
- **Animaciones:** transiciones y efectos visuales utilizando Motion.

## 🛠️ Tecnologías utilizadas

### Frontend
- React
- JavaScript
- Vite
- React Router DOM
- Motion
- SweetAlert2
- CSS3
- Fetch API

### Backend e integración
- Node.js
- Express
- MongoDB
- JWT (JSON Web Token)
- bcrypt
- Cookies HttpOnly

## 🔐 Seguridad y autenticación

La aplicación utiliza un sistema de autenticación basado en JWT.

- El token se almacena en una cookie HttpOnly, evitando su acceso desde JavaScript del navegador.
- Las solicitudes autenticadas utilizan `credentials: "include"`.
- El backend verifica el token antes de permitir el acceso a rutas privadas.
- El contexto global de autenticación permite administrar el estado del usuario.
- Al cerrar sesión, el backend elimina la cookie de autenticación.

## 📂 Funcionalidades de la aplicación

| Ruta | Descripción |
|---|---|
| `/login` | Inicio de sesión |
| `/register` | Registro de usuarios |
| `/profile` | Perfil protegido |
| `/` | Redirección según el estado de autenticación |

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/AlmarazAbel/glassy-auth-frontend.git
```

### 2. Ingresar al proyecto

```bash
cd glassy-auth-frontend
```

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Configurar el backend

El frontend necesita conectarse al servidor backend para realizar las operaciones de registro, login, consulta de perfil y logout.

Configurar la URL del backend según la variable de entorno utilizada en `src/services/authService.js`.

### 5. Ejecutar en desarrollo

```bash
pnpm dev
```

### 6. Generar versión de producción

```bash
pnpm build
```

## 🎨 Diseño de interfaz

La interfaz utiliza un estilo Glassmorphism, con transparencias, desenfoques, iluminación y gradientes.

Se incorporaron animaciones para mejorar la experiencia de usuario durante la navegación, el cambio entre formularios y las interacciones con los componentes.

## 📚 Objetivos de aprendizaje

Este proyecto me permitió poner en práctica conocimientos de:

- Desarrollo de interfaces con React.
- Manejo de estados y Context API.
- Navegación y protección de rutas.
- Consumo de APIs REST.
- Autenticación con JWT.
- Manejo de cookies HttpOnly.
- Integración frontend y backend.
- Organización de componentes y servicios.
- Control de versiones con Git y GitHub.

## 👨‍💻 Autor

**Abel Almaraz**

Desarrollador Web Full Stack Jr. en formación.

Interesado en el desarrollo de aplicaciones web, JavaScript, React, Node.js y tecnologías backend.

[GitHub – AlmarazAbel](https://github.com/AlmarazAbel)

---

*Proyecto desarrollado con fines educativos y como parte de mi portfolio de desarrollo web.*