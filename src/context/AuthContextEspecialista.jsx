import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';

const AuthContextEspecialista = createContext(null);

export const AuthProviderEspecialista = ({ children }) => {
  const { user: mainUser } = useAuth();
  const [especialista, setEspecialista] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  };

  useEffect(() => {
    // If we have a specialist in main AuthContext, use it
    if (mainUser && mainUser.role === 'specialist') {
      setEspecialista(mainUser);
      setToken(mainUser.access_token);
      setLoading(false);
      return;
    }

    const storedEspecialista = localStorage.getItem('especialista');
    const storedToken = localStorage.getItem('token');
    if (storedEspecialista && storedToken) {
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem('especialista');
        localStorage.removeItem('token');
      } else {
        setEspecialista(JSON.parse(storedEspecialista));
        setToken(storedToken);
      }
    }
    setLoading(false);
  }, [mainUser]);

  const login = async (responseData) => {
    const { token, user: especialistaData } = responseData;

    if (isTokenExpired(token)) {
      throw new Error('Token recibido ha expirado');
    }

    let fullData = { ...especialistaData };

    if (!especialistaData.servicios && especialistaData.especialistaid) {
      try {
        const servicesResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/especialista/services`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          fullData.servicios = servicesData.servicios;
        }
      } catch (err) {
        console.warn('No se pudieron cargar servicios adicionales:', err);
      }
    }

    // Parsing condicional
    const parsedServices = typeof fullData.services === 'string'
      ? JSON.parse(fullData.services || '[]')
      : fullData.services || [];
    
    const parsedSpecialties = typeof fullData.specialties === 'string'
      ? JSON.parse(fullData.specialties || '[]')
      : fullData.specialties || [];

    if (fullData.servicios && Array.isArray(fullData.servicios)) {
      fullData.services = fullData.servicios;
    }

    const parsedData = {
      ...fullData,
      services: parsedServices.length > 0 ? parsedServices : (fullData.services || []),
      specialties: parsedSpecialties.length > 0 ? parsedSpecialties : (fullData.specialties || []),
    };

    setEspecialista(parsedData);
    setToken(token);

    localStorage.setItem('especialista', JSON.stringify(parsedData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setEspecialista(null);
    setToken(null);
    localStorage.removeItem('especialista');
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return especialista !== null && token !== null && !isTokenExpired(token);
  };

  return (
    <AuthContextEspecialista.Provider value={{ especialista, token, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContextEspecialista.Provider>
  );
};

export const useAuthEspecialista = () => {
  const context = useContext(AuthContextEspecialista);
  if (!context) {
    throw new Error('useAuthEspecialista must be used within an AuthProviderEspecialista');
  }
  return context;
};