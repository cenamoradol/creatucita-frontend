import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, LogOut, ChevronDown, LayoutDashboard, Shield, Menu, User, X } from 'lucide-react';
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

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeMenu = () => {
    setShowUserMenu(false);
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
            {user ? (
              <div className="user-menu-container">
                <button
                  className="user-menu-button"
                  onClick={toggleUserMenu}
                >
                  <Menu size={20} />
                  <span className="user-name">Menú</span>
                  <ChevronDown size={16} />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <span className="dropdown-welcome">Hola, {user.name?.split(' ')[0] || 'Usuario'}</span>
                      <button className="dropdown-close" onClick={closeMenu}>
                        <X size={18} />
                      </button>
                    </div>
                    <Link to="/perfil" className="dropdown-item" onClick={closeMenu}>
                      <User size={18} />
                      <span>Mi Perfil</span>
                    </Link>
                    <Link to="/citas-pendientes" className="dropdown-item" onClick={closeMenu}>
                      <Calendar size={18} />
                      <span>Mis Citas</span>
                    </Link>
                    {user.role === 'specialist' && (
                      <Link to="/especialista/panel" className="dropdown-item" onClick={closeMenu}>
                        <LayoutDashboard size={18} />
                        <span>Panel Especialista</span>
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link to="/admin" className="dropdown-item" onClick={closeMenu}>
                        <Shield size={18} />
                        <span>Panel Administrador</span>
                      </Link>
                    )}
                    <div className="dropdown-divider" />
                    <button className="dropdown-item dropdown-item-logout" onClick={handleLogout}>
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