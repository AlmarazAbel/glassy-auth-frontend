
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/auth'

const request = async (endpoint, data) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Ocurrió un error en la solicitud')
  }

  return result
}

export const registerUser = (userData) => {
  return request('/register', userData)
}

export const loginUser = (credentials) => {
  return request('/login', credentials)
}
