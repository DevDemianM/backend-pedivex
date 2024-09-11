// src/services/authService.js

const API_URL = 'http://localhost:5000/api/auth'; // Cambia la URL según tu configuración

// Función para registrar un usuario
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el registro');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en register:', error);
    throw error;
  }
};

// Función para iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el inicio de sesión');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Función para recuperar la contraseña
export const recoverPassword = async (mail, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/recover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la recuperación de contraseña');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en recoverPassword:', error);
    throw error;
  }
};
