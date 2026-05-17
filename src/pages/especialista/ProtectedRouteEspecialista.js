import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRouteEspecialista = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
// ... loading spinner ...
    return <div>Cargando...</div>;
  }

  if (!user || user.role !== 'specialist') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouteEspecialista;