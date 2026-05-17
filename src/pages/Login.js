import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, AlertCircle, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    telefono: '',
    codigoPais: '',
    pais: '',
    ciudad: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const codigosPais = [
    { codigo: '+504', pais: 'Honduras', bandera: '🇭🇳' },
    { codigo: '+503', pais: 'El Salvador', bandera: '🇸🇻' },
    { codigo: '+507', pais: 'Panamá', bandera: '🇵🇦' },
  ];

  const paises = ['Honduras', 'El Salvador', 'Panamá'];

  const ciudadesPorPais = {
    'Honduras': ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choloma', 'Comayagua'],
    'El Salvador': ['San Salvador', 'Santa Ana', 'San Miguel', 'Soyapango', 'Mejicanos'],
    'Panamá': ['Ciudad de Panamá', 'San Miguelito', 'Tocumen', 'David', 'Colón']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pais') {
      setFormData({
        ...formData,
        [name]: value,
        ciudad: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      // Login
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message || 'Error en el inicio de sesión');
          return;
        }

        const data = await res.json();
        login({ ...data.user, access_token: data.access_token });
        navigate('/');
      } catch (err) {
        setError('Error de conexión con el servidor');
      }
    } else {
      // Registro
      const telephone = `${formData.codigoPais}${formData.telefono}`;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.nombre,
            email: formData.email,
            password: formData.password,
            telephone,
            locationCountry: formData.pais,
            locationCity: formData.ciudad
          })
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message || 'Error en el registro');
          return;
        }

        const data = await res.json();
        setSuccess(data.message);

        // Espera 3 segundos para que el usuario lea el mensaje, luego cambia a login y resetea form
        setTimeout(() => {
          setSuccess('');
          setIsLogin(true);
          setFormData({
            ...formData,
            nombre: '',
            telefono: '',
            codigoPais: '',
            pais: '',
            ciudad: '',
            password: ''
          });
        }, 3000);
      } catch (err) {
        setError('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="login-subtitle">
            {isLogin
              ? 'Accede a tu cuenta de CreaTuCita.com'
              : 'Regístrate en CreaTuCita.com'}
          </p>

          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="success-message">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="nombre">
                    <User size={18} />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">
                    <Phone size={18} />
                    Número de Teléfono
                  </label>
                  <div className="phone-input-wrapper">
                    <select
                      name="codigoPais"
                      value={formData.codigoPais}
                      onChange={handleChange}
                      className="country-code-select"
                    >
                      {codigosPais.map((pais) => (
                        <option key={pais.codigo} value={pais.codigo}>
                          {pais.bandera} {pais.codigo}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="1234 5678"
                      required
                      className="phone-number-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pais">
                    <MapPin size={18} />
                    País
                  </label>
                  <select
                    id="pais"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona tu país</option>
                    {paises.map((pais) => (
                      <option key={pais} value={pais}>
                        {pais}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="ciudad">
                    <MapPin size={18} />
                    Ciudad
                  </label>
                  <select
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                    disabled={!formData.pais}
                  >
                    <option value="">
                      {formData.pais ? 'Selecciona tu ciudad' : 'Primero selecciona un país'}
                    </option>
                    {formData.pais && ciudadesPorPais[formData.pais]?.map((ciudad) => (
                      <option key={ciudad} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} />
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={18} />
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>
                <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="toggle-form">
            <p>
              {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
                {isLogin ? 'Regístrate' : 'Inicia Sesión'}
              </button>
            </p>
          </div>

          <div className="back-home">
            <Link to="/">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;