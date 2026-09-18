import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista';
import { UserCircle, Lock, Mail, Phone, Building, MapPin, Globe, FileText } from 'lucide-react';
import './LoginEspecialista.css';

const PAISES = [
  { code: 'HN', name: 'Honduras', phoneCode: '+504' },
  { code: 'PA', name: 'Panamá', phoneCode: '+507' },
  { code: 'SV', name: 'El Salvador', phoneCode: '+503' }
];

const CIUDADES = {
  HN: ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba'],
  PA: ['Ciudad de Panamá', 'San Miguelito', 'Tocumen', 'David'],
  SV: ['San Salvador', 'Santa Ana', 'San Miguel', 'Soyapango']
};

const ESPECIALIDADES = [
  { id: 'salud', name: 'Salud' },
];

const TIPOS_SERVICIO = {
  salud: [
    { id: 1, name: 'Doctor' },
    { id: 2, name: 'Examen de Laboratorio' },
    { id: 3, name: 'Estudio Medico' },
    { id: 4, name: 'Clinica' }
  ]
};

const SPECIALTIES = {
  salud: {
    1: ['Medicina General', 'Cardiología', 'Dermatología', 'Pediatría', 'Ginecología', 'Psiquiatría', 'Oftalmología', 'Odontología', 'Neurología', 'Ortopedia'],
    2: ['Análisis de Sangre', 'Examen de Orina', 'Perfil Lipídico', 'Glucosa', 'Hemograma Completo', 'Prueba de Tiroides'],
    3: ['Radiografía', 'Tomografía', 'Resonancia Magnética', 'Ultrasonido', 'Electrocardiograma', 'Ecocardiograma'],
    4: ['Clínica General', 'Clínica Especializada', 'Hospital', 'Centro de Salud']
  }
};

const API_BASE_URL = 'http://localhost:3001';

const LoginEspecialista = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    identificacion_tributaria: '',
    specialty: '',
    phoneCode: '+504',
    phone: '',
    address: '',
    country: 'HN',
    city: ''
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, especialista } = useAuthEspecialista();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Manejar query param de verificación
    const query = new URLSearchParams(location.search);
  }, [location]);

  useEffect(() => {
    if (especialista) {
      navigate('/especialista/panel', { replace: true });
    }
  }, [especialista, navigate]);

  // Redirigir después de mostrar mensaje de éxito en registro
  useEffect(() => {
    if (successMessage === 'Registrado con éxito. Revisa tu email para verificar.') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
    setSuccessMessage('');

    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: value,
        city: '',
        phoneCode: PAISES.find(p => p.code === value)?.phoneCode || '+504'
      }));
    }

    if (name === 'specialty') {
      setSelectedServices([]);
      setSelectedSpecialties([]);
    }
  };

  const toggleService = (service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === service.id);
      if (isSelected) {
        setSelectedSpecialties(prevSpecs => prevSpecs.filter(spec => spec.serviceId !== service.id));
        return prev.filter(s => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const toggleSpecialty = (specialtyName, serviceId) => {
    setSelectedSpecialties(prev => {
      const isSelected = prev.some(s => s.name === specialtyName && s.serviceId === serviceId);
      if (isSelected) {
        return prev.filter(s => s.name !== specialtyName || s.serviceId !== serviceId);
      }
      return [...prev, { name: specialtyName, serviceId }];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const fullPhone = `${formData.phoneCode}${formData.phone}`;
      const fullCountryName = PAISES.find(p => p.code === formData.country)?.name || formData.country;
      const fullSpecialtyName = ESPECIALIDADES.find(esp => esp.id === formData.specialty)?.name || formData.specialty;

      const endpoint = isLogin ? '/especialista/login' : '/especialista/register';
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            identificacion_tributaria: formData.identificacion_tributaria,
            specialty: fullSpecialtyName,
            phone: fullPhone,
            address: formData.address,
            country: fullCountryName,
            city: formData.city,
            services: selectedServices,
            specialties: selectedSpecialties
          };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la operación');
      }

      if (isLogin) {
        login(data);
        setSuccessMessage('Login exitoso');
      } else {
        setSuccessMessage('Registrado con éxito. Revisa tu email para verificar.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-especialista-container">
      <div className="login-especialista-card">
        <h1>{isLogin ? 'Login Especialista' : 'Registro Especialista'}</h1>
        
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              required
            />
            {isLogin && (
              <div className="forgot-password-link">
                <button 
                  type="button" 
                  onClick={() => navigate('/especialista/reset-password')}
                  className="link-btn"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">
                  <UserCircle size={18} />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="identificacion_tributaria">
                  <FileText size={18} />
                  Identificación Tributaria
                </label>
                <input
                  type="text"
                  id="identificacion_tributaria"
                  name="identificacion_tributaria"
                  value={formData.identificacion_tributaria}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">
                  <Globe size={18} />
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  {PAISES.map(pais => (
                    <option key={pais.code} value={pais.code}>
                      {pais.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="city">
                  <MapPin size={18} />
                  Ciudad
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una ciudad</option>
                  {CIUDADES[formData.country]?.map(ciudad => (
                    <option key={ciudad} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  <Building size={18} />
                  Dirección del Consultorio
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle Principal #123"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialty">
                  <Building size={18} />
                  Especialidad
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una especialidad</option>
                  {ESPECIALIDADES.map(esp => (
                    <option key={esp.id} value={esp.id}>
                      {esp.name}
                    </option>
                  ))}
                </select>
              </div>

              {formData.specialty && (
                <div className="form-group">
                  <label>
                    <Building size={18} />
                    Tipos de Servicio que Ofreces
                  </label>
                  <div className="service-tabs">
                    {TIPOS_SERVICIO[formData.specialty]?.map(servicio => (
                      <button
                        key={servicio.id}
                        type="button"
                        className={`service-tab ${selectedServices.some(s => s.id === servicio.id) ? 'active' : ''}`}
                        onClick={() => toggleService(servicio)}
                      >
                        {servicio.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedServices.length > 0 && (
                <div className="form-group">
                  <label>
                    <Building size={18} />
                    Especialidades Específicas
                  </label>
                  {selectedServices.map(service => (
                    <div key={service.id} className="specialty-section">
                      <h4 className="specialty-section-title">{service.name}</h4>
                      <div className="service-tabs">
                        {SPECIALTIES[formData.specialty]?.[service.id]?.map(specialty => (
                          <button
                            key={`${service.id}-${specialty}`}
                            type="button"
                            className={`service-tab ${selectedSpecialties.some(s => s.name === specialty && s.serviceId === service.id) ? 'active' : ''}`}
                            onClick={() => toggleSpecialty(specialty, service.id)}
                          >
                            {specialty}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="form-group phone-group">
                <label htmlFor="phone">
                  <Phone size={18} />
                  Teléfono
                </label>
                <div className="phone-input-container">
                  <select
                    className="phone-code"
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                  >
                    {PAISES.map(pais => (
                      <option key={pais.code} value={pais.phoneCode}>
                        {pais.phoneCode}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="phone-number"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234-5678"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn-submit-especialista">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse como Especialista'}
          </button>
        </form>

        <div className="login-especialista-toggle">
          <button onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setSuccessMessage('');
          }}>
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginEspecialista;