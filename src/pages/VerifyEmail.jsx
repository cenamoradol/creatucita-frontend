import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { verification_token } = useParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify/${verification_token}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Error en la verificación');
        }
        const data = await res.json();
        setMessage(data.message);
        setStatus('success');
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (err) {
        setMessage(err.message || 'Error de conexión con el servidor');
        setStatus('error');
      }
    };

    verifyToken();
  }, [verification_token, navigate]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        {status === 'verifying' && (
          <>
            <div className="verify-icon">
              <Loader2 size={64} className="animate-spin" />
            </div>
            <h1>Verificando...</h1>
            <p className="loading-message">Por favor espera mientras verificamos tu cuenta.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="verify-icon">
              <CheckCircle size={64} />
            </div>
            <h1>¡Correo Verificado!</h1>
            <p className="verify-message">{message}</p>
            <p className="verify-submessage">
              Ahora puedes disfrutar de todos los servicios de nuestra plataforma.
            </p>
            <div className="countdown-container">
              <p className="countdown-text">
                Serás redirigido a la página principal en {countdown} segundos...
              </p>
            </div>
            <button className="verify-button" onClick={() => navigate('/')}>
              Ir a Inicio Ahora
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="verify-icon">
              <XCircle size={64} />
            </div>
            <h1>Error en la Verificación</h1>
            <p className="error-message">{message}</p>
            <button className="verify-button" onClick={() => navigate('/login')}>
              Volver a Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;