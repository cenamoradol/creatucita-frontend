import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email.includes('@')) {
        setSuccess(true);
      } else {
        setError('Por favor ingresa un correo electrónico válido');
      }
      setLoading(false);
    }, 1000);
  };

  if (success) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>¡Correo Enviado!</h1>
          <p className="success-message">
            Hemos enviado un enlace de recuperación a tu correo electrónico.
          </p>
          <p className="success-submessage">
            Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
          </p>
          <button
            className="forgot-button"
            onClick={() => navigate('/login')}
          >
            Volver al Inicio de Sesion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <button
          className="back-button"
          onClick={() => navigate('/login')}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="forgot-header">
          <Mail size={48} />
          <h1>¿Olvidaste tu Contraseña?</h1>
          <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="forgot-button"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
