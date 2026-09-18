import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './VerifyEmailEspecialista.css';

const API_BASE_URL = 'http://localhost:3001';

const VerifyEmailEspecialista = () => {
  const navigate = useNavigate();
  const { verify_token } = useParams();
  const [countdown, setCountdown] = useState(10);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/especialista/verify/${verify_token}`, { method: 'GET' });
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || 'Error en verificación');
          return;
        }
        const timer = setInterval(() => {
          setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
      } catch (err) {
        setError('Error de conexión');
      }
    };
    verifyAccount();
  }, [verify_token]);

  useEffect(() => {
    if (countdown <= 0 && !error) {
      navigate('/especialista/login');
    }
  }, [countdown, error, navigate]);

  if (error) {
    return (
      <div className="verify-email-especialista-container">
        <div className="verify-email-especialista-card">
          <h1>Error</h1>
          <p>{error}</p>
          <button className='verify-button-especialista' onClick={() => navigate('/especialista/login')}>Volver al Inicio de Sesion</button>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-email-especialista-container">
      <div className="verify-email-especialista-card">
        <div className="verify-icon-especialista">
          <CheckCircle size={64} />
        </div>
        <h1>¡Correo Verificado!</h1>
        <p className="verify-message-especialista">
          Tu cuenta de especialista ha sido verificada exitosamente.
        </p>
        <p className="verify-submessage-especialista">
          Ahora puedes iniciar sesión y comenzar a gestionar tus servicios y citas.
        </p>
        <div className="countdown-container-especialista">
          <p className="countdown-text-especialista">
            Serás redirigido al inicio de sesión en {countdown} segundos...
          </p>
        </div>
        <button
          className="verify-button-especialista"
          onClick={() => navigate('/especialista/login')}
        >
          Ir al Login Ahora
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailEspecialista;