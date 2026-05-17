import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle, Shield, Eye, EyeOff } from 'lucide-react';
import './ResetPasswordEspecialista.css';

const ConfirmResetEspecialista = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/especialista/reset/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al restablecer la contraseña');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/especialista/login');
      }, 3000);
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
        </div>

        <div className="reset-password-especialista-card success-card">
          <div className="success-icon-wrapper">
            <div className="success-icon-bg"></div>
            <div className="success-icon-especialista">
              <CheckCircle size={72} strokeWidth={2.5} />
            </div>
          </div>

          <div className="success-content">
            <h1>¡Contraseña Restablecida!</h1>
            <p className="success-message-especialista">
              Tu contraseña ha sido actualizada exitosamente.
            </p>
            <p className="success-submessage-especialista">
              Serás redirigido al inicio de sesión en unos segundos...
            </p>
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
      </div>

      <div className="reset-password-especialista-card">
        <button
          className="back-button-especialista"
          onClick={() => navigate('/especialista/login')}
        >
          <ArrowLeft size={18} />
          <span>Cancelar</span>
        </button>

        <div className="reset-header-especialista">
          <div className="icon-wrapper">
            <div className="icon-bg pulse"></div>
            <Lock size={56} strokeWidth={2} />
          </div>

          <div className="header-content">
            <h1>Nueva Contraseña</h1>
            <p>Por favor ingresa tu nueva contraseña de acceso.</p>
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
            <label htmlFor="password">
              <Lock size={18} />
              <span>Nueva Contraseña</span>
            </label>
            <div className="input-wrapper">
              <div className="input-with-icon-especialista">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="show-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="form-group-especialista">
            <label htmlFor="confirmPassword">
              <Shield size={18} />
              <span>Confirmar Contraseña</span>
            </label>
            <div className="input-wrapper">
              <div className="input-with-icon-especialista">
                <Shield size={20} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
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
            {loading ? 'Procesando...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmResetEspecialista;
