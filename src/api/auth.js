import api from './conexionapi'; // Si decides mantener el nombre original

export const login = async (correo, contrasena) => {
  try {
    const response = await api.post('/login', { correo, contrasena })
    return response.data // Devuelve los datos de la API
  } catch (error) {
    throw error.response?.data?.message || 'Error en la autenticación'
  }
}
