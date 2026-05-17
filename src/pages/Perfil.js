import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Award, Heart, LogOut, FileText, Plus, X, Edit2, Check } from 'lucide-react';
import user_picture from '../assets/avatar-user.png'
import './Perfil.css';

const API_URL = process.env.REACT_APP_API_URL;

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [historialMedico, setHistorialMedico] = useState({
    padecimientos: [],
    alergias: [],
    condiciones: []
  });
  const [editando, setEditando] = useState({ tipo: null, index: null });
  const [nuevoItem, setNuevoItem] = useState('');
  const [agregando, setAgregando] = useState(null);

  // Estados para Aplicación de Especialista
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [applyData, setApplyData] = useState({
    rtn: '',
    clinicAddress: '',
    bio: '',
    phone: '',
    subcategoryIds: []
  });
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    if (user) {
      const historialGuardado = localStorage.getItem(`historial_medico_${user.email}`);
      if (historialGuardado) {
        setHistorialMedico(JSON.parse(historialGuardado));
      }

      // Fetch specialist application status
      fetch(`${API_URL}/specialists/my-application`, {
        headers: { 'Authorization': `Bearer ${user.access_token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.status) {
          setApplicationStatus(data.status);
          // Pre-fill form if they already have an application
          setApplyData(prev => ({
            ...prev,
            rtn: data.rtn || '',
            clinicAddress: data.clinicAddress || '',
            bio: data.bio || '',
            phone: data.phone || '',
          }));
        }
      })
      .catch(err => console.error('Error fetching application status:', err));
    }
  }, [user]);

  useEffect(() => {
    if (showApplyForm) {
      fetch(`${API_URL}/categories`)
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error('Error fetching categories:', err));
    }
  }, [showApplyForm]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      setSubcategories(category ? category.subcategories : []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  const handleApplyChange = (e) => {
    const { name, value } = e.target;
    setApplyData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubcategoryToggle = (id) => {
    setApplyData(prev => {
      const subcategoryIds = prev.subcategoryIds.includes(id)
        ? prev.subcategoryIds.filter(sid => sid !== id)
        : [...prev.subcategoryIds, id];
      return { ...prev, subcategoryIds };
    });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplying(true);
    setApplyError('');
    
    try {
      const token = localStorage.getItem('token') || ''; // We should probably store token better
      const res = await fetch(`${API_URL}/specialists/apply`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}` // Assuming user object has access_token from login
        },
        body: JSON.stringify(applyData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al enviar la solicitud');

      setApplySuccess(true);
      setTimeout(() => setShowApplyForm(false), 3000);
    } catch (err) {
      setApplyError(err.message);
    } finally {
      setApplying(false);
    }
  };

  const guardarHistorial = (nuevoHistorial) => {
    localStorage.setItem(`historial_medico_${user.email}`, JSON.stringify(nuevoHistorial));
    setHistorialMedico(nuevoHistorial);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const agregarItem = (tipo) => {
    if (nuevoItem.trim()) {
      const nuevoHistorial = {
        ...historialMedico,
        [tipo]: [...historialMedico[tipo], nuevoItem.trim()]
      };
      guardarHistorial(nuevoHistorial);
      setNuevoItem('');
      setAgregando(null);
    }
  };

  const eliminarItem = (tipo, index) => {
    const nuevoHistorial = {
      ...historialMedico,
      [tipo]: historialMedico[tipo].filter((_, i) => i !== index)
    };
    guardarHistorial(nuevoHistorial);
  };

  const iniciarEdicion = (tipo, index) => {
    setEditando({ tipo, index });
    setNuevoItem(historialMedico[tipo][index]);
  };

  const guardarEdicion = () => {
    if (nuevoItem.trim() && editando.tipo && editando.index !== null) {
      const nuevoHistorial = {
        ...historialMedico,
        [editando.tipo]: historialMedico[editando.tipo].map((item, i) =>
          i === editando.index ? nuevoItem.trim() : item
        )
      };
      guardarHistorial(nuevoHistorial);
      setEditando({ tipo: null, index: null });
      setNuevoItem('');
    }
  };

  const cancelarEdicion = () => {
    setEditando({ tipo: null, index: null });
    setNuevoItem('');
    setAgregando(null);
  };

  const avatarSrc = user.picture ? `${API_URL}/Uploads/${user.picture}` : user_picture;

// Conectar con backend (Pendiente)
  const citasPendientes = user.citasPendientes || 0;
  const citasCompletadas = user.citasCompletadas || 0;
  const serviciosFavoritos = user.serviciosFavoritos || [];

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="perfil-avatar-section">
            <img src={avatarSrc} alt={user.name} className="perfil-avatar" />
            <div className="perfil-info">
              <h1 className="perfil-nombre">{user.name}</h1>
              <p className="perfil-fecha">
                <Calendar size={16} />
                Miembro desde {new Date(user.date_created).toLocaleDateString('es-HN', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>

        <div className="perfil-grid">
          <div className="perfil-card">
            <h2 className="card-title">
              <User size={20} />
              Información Personal
            </h2>
            <div className="info-list">
              <div className="info-item">
                <Mail size={18} />
                <div>
                  <p className="info-label">Correo Electrónico</p>
                  <p className="info-value">{user.email}</p>
                </div>
              </div>
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <p className="info-label">Teléfono</p>
                  <p className="info-value">{user.telephone}</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <p className="info-label">Ubicación</p>
                  <p className="info-value">{user.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="perfil-card">
            <h2 className="card-title">
              <Award size={20} />
              Estadísticas
            </h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{citasPendientes}</div>
                <div className="stat-label">Citas Pendientes</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{citasCompletadas}</div>
                <div className="stat-label">Citas Completadas</div>
              </div>
            </div>
          </div>

          {user.role === 'client' && (
            <div className="perfil-card apply-specialist-card">
              <h2 className="card-title">
                <Award size={20} />
                ¿Eres Especialista?
              </h2>
              {!showApplyForm ? (
                <div className="apply-promo">
                  {applicationStatus === 'pending' ? (
                    <div className="status-badge pending">
                      <Calendar size={24} />
                      <p>Tu solicitud está siendo revisada. Te notificaremos pronto.</p>
                    </div>
                  ) : applicationStatus === 'rejected' ? (
                    <div className="status-badge rejected">
                      <X size={24} />
                      <p>Tu solicitud anterior fue rechazada. Puedes intentar aplicar nuevamente.</p>
                      <button onClick={() => setShowApplyForm(true)} className="btn-apply-specialist">
                        Volver a Aplicar
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>Únete a nuestra plataforma y gestiona tus citas de manera profesional.</p>
                      <button 
                        onClick={() => setShowApplyForm(true)}
                        className="btn-apply-specialist"
                      >
                        Aplicar Ahora
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="apply-form">
                  {applySuccess ? (
                    <div className="apply-success">
                      <Check size={48} />
                      <p>Solicitud enviada con éxito. Revisaremos tu información y te notificaremos pronto.</p>
                    </div>
                  ) : (
                    <>
                      <div className="form-group-apply">
                        <label>RTN (Identificación Tributaria)</label>
                        <input 
                          type="text" 
                          name="rtn" 
                          value={applyData.rtn} 
                          onChange={handleApplyChange} 
                          placeholder="Ej: 0801-1990-123456"
                          required 
                        />
                      </div>
                      <div className="form-group-apply">
                        <label>Dirección del Consultorio</label>
                        <input 
                          type="text" 
                          name="clinicAddress" 
                          value={applyData.clinicAddress} 
                          onChange={handleApplyChange} 
                          placeholder="Ciudad, Calle, Edificio..."
                          required 
                        />
                      </div>
                      <div className="form-group-apply">
                        <label>Biografía Profesional</label>
                        <textarea 
                          name="bio" 
                          value={applyData.bio} 
                          onChange={handleApplyChange} 
                          placeholder="Cuéntanos sobre tu experiencia..."
                        />
                      </div>
                      <div className="form-group-apply">
                        <label>Categoría Principal</label>
                        <select 
                          value={selectedCategory} 
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          required
                        >
                          <option value="">Selecciona una categoría</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      {subcategories.length > 0 && (
                        <div className="form-group-apply">
                          <label>Tus Especialidades (Servicios)</label>
                          <div className="subcategories-grid-apply">
                            {subcategories.map(sub => (
                              <label key={sub.id} className="subcategory-checkbox">
                                <input 
                                  type="checkbox" 
                                  checked={applyData.subcategoryIds.includes(sub.id)}
                                  onChange={() => handleSubcategoryToggle(sub.id)}
                                />
                                {sub.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      {applyError && <p className="apply-error">{applyError}</p>}
                      <div className="apply-actions">
                        <button type="submit" disabled={applying} className="btn-submit-apply">
                          {applying ? 'Enviando...' : 'Enviar Solicitud'}
                        </button>
                        <button type="button" onClick={() => setShowApplyForm(false)} className="btn-cancel-apply">
                          Cancelar
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          )}

          <div className="perfil-card">
            <h2 className="card-title">
              <Heart size={20} />
              Servicios Favoritos
            </h2>
            <div className="favoritos-list">
              {serviciosFavoritos.length === 0 ? (
                <p className="no-items">No hay servicios favoritos</p>
              ) : (
                serviciosFavoritos.map((servicio, index) => (
                  <div key={index} className="favorito-item">
                    <Heart size={16} fill="currentColor" />
                    <span>{servicio}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="perfil-card historial-medico-card">
            <h2 className="card-title">
              <FileText size={20} />
              Historial Médico
            </h2>

            {['padecimientos', 'alergias', 'condiciones'].map((tipo) => (
              <div key={tipo} className="historial-section">
                <div className="historial-header">
                  <h3 className="historial-subtitle">
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </h3>
                  {agregando !== tipo && (
                    <button
                      onClick={() => setAgregando(tipo)}
                      className="btn-agregar-item"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>

                {agregando === tipo && (
                  <div className="input-group">
                    <input
                      type="text"
                      value={nuevoItem}
                      onChange={(e) => setNuevoItem(e.target.value)}
                      placeholder={`Agregar ${tipo.slice(0, -1)}`}
                      className="input-historial"
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') agregarItem(tipo);
                        if (e.key === 'Escape') cancelarEdicion();
                      }}
                    />
                    <div className="input-actions">
                      <button
                        onClick={() => agregarItem(tipo)}
                        className="btn-guardar"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelarEdicion}
                        className="btn-cancelar"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="historial-items">
                  {historialMedico[tipo].length === 0 ? (
                    <p className="no-items">No hay {tipo} registrados</p>
                  ) : (
                    historialMedico[tipo].map((item, index) => (
                      <div key={index} className="historial-item">
                        {editando.tipo === tipo && editando.index === index ? (
                          <div className="input-group">
                            <input
                              type="text"
                              value={nuevoItem}
                              onChange={(e) => setNuevoItem(e.target.value)}
                              className="input-historial"
                              autoFocus
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') guardarEdicion();
                                if (e.key === 'Escape') cancelarEdicion();
                              }}
                            />
                            <div className="input-actions">
                              <button
                                onClick={guardarEdicion}
                                className="btn-guardar"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={cancelarEdicion}
                                className="btn-cancelar"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="item-text">{item}</span>
                            <div className="item-actions">
                              <button
                                onClick={() => iniciarEdicion(tipo, index)}
                                className="btn-editar"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => eliminarItem(tipo, index)}
                                className="btn-eliminar"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;