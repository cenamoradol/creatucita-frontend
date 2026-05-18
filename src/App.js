import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AuthProviderEspecialista } from './context/AuthContextEspecialista';
import './App.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import CitasPendientes from './pages/CitasPendientes';
import AgendarCita from './pages/AgendarCita';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';

// Páginas de Especialistas
import LoginEspecialista from './pages/especialista/LoginEspecialista';
import PanelEspecialista from './pages/especialista/PanelEspecialista';
import ProtectedRouteEspecialista from './pages/especialista/ProtectedRouteEspecialista';
import VerifyEmailEspecialista from './pages/especialista/VerifyEmailEspecialista';
import ResetPasswordEspecialista from './pages/especialista/ResetPasswordEspecialista';
import ConfirmResetEspecialista from './pages/especialista/ConfirmResetEspecialista';

// Páginas de Búsqueda
import BusquedaResultados from './pages/BusquedaResultados';

// Páginas de Administrador
import PanelAdministrador from './pages/admin/PanelAdministrador';

const App = () => {
  return (
    <AuthProvider>
      <AuthProviderEspecialista>
        <Router>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="app-container">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify/:verification_token" element={<VerifyEmail />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/citas-pendientes" element={<CitasPendientes />} />
                <Route path="/agendar-cita/:id" element={<AgendarCita />} />
                <Route path="/busqueda" element={<BusquedaResultados />} />

                {/* Rutas de Especialistas */}
                <Route path="/especialista/login" element={<LoginEspecialista />} />
                <Route path="/especialista/reset-password" element={<ResetPasswordEspecialista />} />
                <Route path="/especialista/reset/:token" element={<ConfirmResetEspecialista />} />
                <Route path="/especialista/verify/:verify_token" element={<VerifyEmailEspecialista />} />
                <Route
                  path="/especialista/panel"
                  element={
                    <ProtectedRouteEspecialista>
                      <PanelEspecialista />
                    </ProtectedRouteEspecialista>
                  }
                />

                {/* Rutas de Administrador */}
                <Route path="/admin" element={<PanelAdministrador />} />

              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProviderEspecialista>
    </AuthProvider>
  );
};

export default App;