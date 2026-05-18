import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Calendar, LogOut, ChevronDown, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../components/Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busqueda?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" className="logo">
            <div className="logo-text">
              <span className="logo-title">CreaTuCita</span>
              <span className="logo-subtitle">.com</span>
            </div>
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-icon">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar servicios profesionales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>

          <div className="header-actions">
            {user?.role === 'admin' && (
              <Link to="/admin" className="header-link header-link-admin">
                <Shield size={20} />
                <span>Panel Administrador</span>
              </Link>
            )}
            {user?.role === 'specialist' && (
              <Link to="/especialista/panel" className="header-link header-link-specialist">
                <LayoutDashboard size={20} />
                <span>Panel Especialista</span>
              </Link>
            )}
            <Link to="/citas-pendientes" className="header-link header-link-citas">
              <Calendar size={20} />
              <span>Mis Citas</span>
            </Link>

            {user ? (
              <div className="user-menu-container">
                <button
                  className="user-menu-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {user.picture ? (
                    <img 
                      src={`${process.env.REACT_APP_API_URL}/Uploads/${user.picture}`} 
                      alt={user.name || 'Usuario'} 
                      className="user-avatar" 
                    />
                  ) : (
                    <div className="user-avatar-placeholder">
                      <User size={20} />
                    </div>
                  )}
                  <span className="user-name">
                    {user.name ? user.name.split(' ')[0] : 'Usuario'}
                  </span>
                  <ChevronDown size={16} />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/perfil" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <User size={18} />
                      <span>Mi Perfil</span>
                    </Link>
                    <Link to="/citas-pendientes" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <Calendar size={18} />
                      <span>Mis Citas</span>
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <Shield size={18} />
                        <span>Panel Administrador</span>
                      </Link>
                    )}
                    {user.role === 'specialist' && (
                      <Link to="/especialista/panel" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <LayoutDashboard size={18} />
                        <span>Panel Especialista</span>
                      </Link>
                    )}
                    <button className="dropdown-item" onClick={handleLogout}>
                      <LogOut size={18} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="header-link header-link-login">
                <User size={20} />
                <span>Ingresar</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;