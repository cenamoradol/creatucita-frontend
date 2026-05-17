import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Shield, Lock, Sparkles } from 'lucide-react';
import './ResetPasswordEspecialista.css';

const ResetPasswordEspecialista = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/especialista/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el enlace de recuperación');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="reset-password-especialista-container">
        <div className="reset-background-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>

        <div className="reset-password-especialista-card success-card">
          <div className="success-icon-wrapper">
            <div className="success-icon-bg"></div>
            <div className="success-icon-especialista">
              <CheckCircle size={72} strokeWidth={2.5} />
            </div>
          </div>

          <div className="success-content">
            <h1>¡Correo Enviado Exitosamente!</h1>
            <div className="success-badge">
              <Shield size={16} />
              <span>Seguro y Encriptado</span>
            </div>

            <p className="success-message-especialista">
              Hemos enviado un enlace de recuperación seguro a:
            </p>
            <div className="email-display">
              <Mail size={18} />
              <span>{email}</span>
            </div>

            <p className="success-submessage-especialista">
              Revisa tu bandeja de entrada y spam. El enlace expirará en 24 horas por seguridad.
            </p>

            <div className="success-actions">
              <button
                className="reset-button-especialista primary"
                onClick={() => navigate('/especialista/login')}
              >
                <ArrowLeft size={20} />
                Volver al Inicio de Sesion
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-especialista-container">
      <div className="reset-background-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>

      <div className="reset-password-especialista-card">
        <button
          className="back-button-especialista"
          onClick={() => navigate('/especialista/login')}
        >
          <ArrowLeft size={18} />
          <span>Volver</span>
        </button>

        <div className="reset-header-especialista">
          <div className="icon-wrapper">
            <div className="icon-bg pulse"></div>
            <Lock size={56} strokeWidth={2} />
          </div>

          <div className="header-content">
            <h1>Recuperar Contraseña</h1>

            <p>Ingresa tu correo electrónico y te enviaremos un enlace seguro para restablecer tu contraseña.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="reset-form-especialista">
          {error && (
            <div className="error-message-especialista">
              <div className="error-icon">!</div>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group-especialista">
            <label htmlFor="email">
              <Mail size={18} />
              <span>Correo Electrónico Profesional</span>
            </label>
            <div className="input-wrapper">
              <div className="input-with-icon-especialista">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="especialista@ejemplo.com"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="reset-button-especialista"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Enviar Enlace</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordEspecialista;
