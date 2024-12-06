import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [systems, setSystems] = useState([]); // Almacena los sistemas en el contexto

  // Función para iniciar sesión
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/login', { email, password });
      const { access_token } = response.data;
      await AsyncStorage.setItem('token', access_token);
      setUser({ email });
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un usuario
  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        return true;
      } else {
        console.error('Error al registrar usuario:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error.response?.data || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setSystems([]); // Limpia los sistemas al cerrar sesión
  };

  // Función para cargar sistemas
  const fetchSystems = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/sistema');
      setSystems(response.data); // Actualiza el estado `systems`
    } catch (error) {
      console.error('Error al obtener sistemas:', error);
      setSystems([]); // Limpia sistemas en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar información de sistemas
  const updateSystem = async (codigo_sistema, newTitle, newCsvLink) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/sistema/${codigo_sistema}`, {
        titulo: newTitle,
        csv_link: newCsvLink,
      });

      if (response.status === 200) {
        console.log('Sistema actualizado correctamente');
        fetchSystems(); // Refresca los sistemas tras la actualización
        return true;
      } else {
        console.error('Error al actualizar el sistema:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error al actualizar el sistema:', error.response?.data || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

    // Función para eliminar un sistema
    const deleteSystem = async (codigo_sistema) => {
        setLoading(true);
        try {
          const response = await apiClient.delete(`/sistema/${codigo_sistema}`);
          if (response.status === 200) {
            console.log('Sistema eliminado correctamente');
            // Actualizar sistemas localmente sin llamar a fetchSystems
            setSystems((prevSystems) =>
              prevSystems.filter((system) => system.codigo_sistema !== codigo_sistema)
            );
            return true;
          } else {
            console.error('Error al eliminar el sistema:', response.data);
            return false;
          }
        } catch (error) {
          console.error('Error al eliminar el sistema:', error.response?.data || error.message);
          return false;
        } finally {
          setLoading(false);
        }
      };

    // Función para registrar un nuevo sistema
    const createSystem = async (titulo, codigo_sistema, csv_link) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/sistema', {
        titulo,
        codigo_sistema,
        csv_link,
      });
  
      if (response.status === 201) {
        console.log('Sistema registrado correctamente');
        fetchSystems(); // Refresca la lista de sistemas
        return true;
      } else {
        console.error('Error al registrar el sistema:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error al registrar el sistema:', error.response?.data || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, systems, fetchSystems, updateSystem, deleteSystem, createSystem }}>
      {children}
    </AuthContext.Provider>
  );
};


