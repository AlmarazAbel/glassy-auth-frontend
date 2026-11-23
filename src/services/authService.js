
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/auth'

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Ocurrió un error en la solicitud')
  }

  return result
}

export const registerUser = (userData) => {
  return request('/register', {
    method: 'POST',
    body: userData,
  })
}

export const loginUser = (credentials) => {
  return request('/login', {
    method: 'POST',
    body: credentials,
  })
}

export const getProfile = () => {
  return request('/profile', {
    method: 'GET',
  })
}

export const logoutUser = () => {
  return request('/logout', {
    method: 'POST',
  })
}
