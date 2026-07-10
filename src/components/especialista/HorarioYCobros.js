import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista';
import './HorarioYCobros.css';

const HorarioYCobros = () => {
  const { token, especialista } = useAuthEspecialista();

  const [specialistId, setSpecialistId] = useState(null);

  const [horarios, setHorarios] = useState({
    lunes: { activo: false, inicio: '09:00', fin: '18:00' },
    martes: { activo: false, inicio: '09:00', fin: '18:00' },
    miercoles: { activo: false, inicio: '09:00', fin: '18:00' },
    jueves: { activo: false, inicio: '09:00', fin: '18:00' },
    viernes: { activo: false, inicio: '09:00', fin: '18:00' },
    sabado: { activo: false, inicio: '09:00', fin: '14:00' },
    domingo: { activo: false, inicio: '09:00', fin: '14:00' }
  });

  const [horariosOriginal, setHorariosOriginal] = useState(null);
  const [editandoHorarios, setEditandoHorarios] = useState(false);

  const [servicios, setServicios] = useState([]);
  const [editandoServicio, setEditandoServicio] = useState(null);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: '',
    precio: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Appointment settings
  const [appointmentDuration, setAppointmentDuration] = useState(30); // minutes (15, 30, 45, 60)
  const [minAdvanceBooking, setMinAdvanceBooking] = useState(4); // hours (1, 2, 4, 24)

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

  const dias = [
    { key: 'lunes', nombre: 'Lunes' },
    { key: 'martes', nombre: 'Martes' },
    { key: 'miercoles', nombre: 'Miércoles' },
    { key: 'jueves', nombre: 'Jueves' },
    { key: 'viernes', nombre: 'Viernes' },
    { key: 'sabado', nombre: 'Sábado' },
    { key: 'domingo', nombre: 'Domingo' }
  ];

  const fetchHorarios = async (sid) => {
    try {
      const response = await fetch(`${API_URL}/schedules/specialist/${sid}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Error al obtener horarios');
      const data = await response.json();
      
      const newHorarios = {
        lunes: { activo: false, inicio: '09:00', fin: '18:00' },
        martes: { activo: false, inicio: '09:00', fin: '18:00' },
        miercoles: { activo: false, inicio: '09:00', fin: '18:00' },
        jueves: { activo: false, inicio: '09:00', fin: '18:00' },
        viernes: { activo: false, inicio: '09:00', fin: '18:00' },
        sabado: { activo: false, inicio: '09:00', fin: '14:00' },
        domingo: { activo: false, inicio: '09:00', fin: '14:00' }
      };

      const diasReverseMap = { 0: 'domingo', 1: 'lunes', 2: 'martes', 3: 'miercoles', 4: 'jueves', 5: 'viernes', 6: 'sabado' };

      data.forEach(h => {
        const dayName = diasReverseMap[h.dayOfWeek];
        if (dayName) {
          newHorarios[dayName] = { 
            activo: true, 
            inicio: h.startTime.substring(0, 5), 
            fin: h.endTime.substring(0, 5) 
          };
        }
      });
      setHorarios(newHorarios);
      setHorariosOriginal(JSON.parse(JSON.stringify(newHorarios)));
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchServicios = async (sid) => {
    try {
      const response = await fetch(`${API_URL}/specialists/${sid}/services`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Error al obtener servicios');
      const data = await response.json();
      const mappedServicios = data.map(s => ({
        id: s.id,
        nombre: s.specialties,
        specialty: s.specialty || '',
        duracion: s.duration,
        precio: s.price
      }));
      setServicios(mappedServicios);
    } catch (err) {
      setError(err.message);
    }
  };

  // Cargar primero el perfil real del especialista para obtener su ID de perfil
  useEffect(() => {
    if (!token || !especialista) return;

    const init = async () => {
      setLoading(true);
      try {
        const resp = await fetch(`${API_URL}/specialists/my-application`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!resp.ok) throw new Error('No se pudo obtener el perfil de especialista');
        const profile = await resp.json();
        setSpecialistId(profile.id);

        // Load duration and anticipation from profile
        if (profile.appointmentDuration) setAppointmentDuration(profile.appointmentDuration);
        if (profile.minAdvanceBooking) setMinAdvanceBooking(profile.minAdvanceBooking);

        await Promise.all([fetchHorarios(profile.id), fetchServicios(profile.id)]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token, especialista]);

  const handleToggleDia = (dia) => {
    if (!editandoHorarios) return;
    setHorarios(prev => ({ ...prev, [dia]: { ...prev[dia], activo: !prev[dia].activo } }));
  };

  const handleHorarioChange = (dia, campo, valor) => {
    if (!editandoHorarios) return;
    setHorarios(prev => ({ ...prev, [dia]: { ...prev[dia], [campo]: valor } }));
  };

  const handleIniciarEdicionHorarios = () => setEditandoHorarios(true);

  const handleCancelarEdicionHorarios = () => {
    setHorarios(JSON.parse(JSON.stringify(horariosOriginal)));
    setEditandoHorarios(false);
  };

  const saveHorarios = async () => {
    if (!specialistId) return;
    try {
      const diasMap = { domingo: 0, lunes: 1, martes: 2, miercoles: 3, jueves: 4, viernes: 5, sabado: 6 };

      const schedulesArray = [];
      Object.keys(horarios).forEach(dia => {
        if (horarios[dia].activo) {
          schedulesArray.push({
            dayOfWeek: diasMap[dia],
            startTime: `${horarios[dia].inicio}:00`,
            endTime: `${horarios[dia].fin}:00`
          });
        }
      });

      // Save schedules
      const response = await fetch(`${API_URL}/schedules/bulk`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedules: schedulesArray })
      });
      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Error al guardar horarios: ${errBody}`);
      }

      // Save duration and anticipation to specialist profile
      const profileRes = await fetch(`${API_URL}/specialists/profile`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentDuration,
          minAdvanceBooking,
        })
      });
      if (!profileRes.ok) {
        const errBody = await profileRes.text();
        throw new Error(`Error al guardar configuración: ${errBody}`);
      }

      setHorariosOriginal(JSON.parse(JSON.stringify(horarios)));
      setEditandoHorarios(false);
      toast.success('Horarios y configuración guardados correctamente');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  const handleAgregarServicio = async () => {
    if (!nuevoServicio.nombre || !nuevoServicio.precio) {
      toast.error('Por favor completa el nombre y precio del servicio');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/specialists/services`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: nuevoServicio.nombre,
          specialties: nuevoServicio.nombre,
          price: parseFloat(nuevoServicio.precio),
          duration: 30
        })
      });
      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Error al agregar servicio: ${errBody}`);
      }
      await fetchServicios(specialistId);
      setNuevoServicio({ nombre: '', precio: '' });
      setMostrarFormulario(false);
      toast.success('Servicio agregado correctamente');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  const handleEditarServicio = (id) => {
    const servicio = servicios.find(s => s.id === id);
    setEditandoServicio({
      id: servicio.id,
      nombre: servicio.nombre,
      precio: servicio.precio
    });
  };

  const handleGuardarEdicion = async () => {
    if (!editandoServicio.nombre || !editandoServicio.precio) {
      toast.error('Nombre y precio son obligatorios');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/specialists/services/${editandoServicio.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: editandoServicio.nombre,
          specialties: editandoServicio.nombre,
          price: parseFloat(editandoServicio.precio),
          duration: 30
        })
      });
      if (!response.ok) throw new Error('Error al actualizar servicio');
      await fetchServicios(specialistId);
      setEditandoServicio(null);
      toast.success('Servicio actualizado correctamente');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  const handleEliminarServicio = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      try {
        const response = await fetch(`${API_URL}/specialists/services/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Error al eliminar servicio');
        await fetchServicios(specialistId);
        toast.success('Servicio eliminado correctamente');
      } catch (err) {
        toast.error(err.message);
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="horario-cobros-container">
      <div className="horario-cobros-grid">
        <div className="horario-section">
          <div className="section-header">
            <Clock size={24} />
            <h2>Horario de Atención</h2>
            {!editandoHorarios && (
              <button className="horario-edit-btn" onClick={handleIniciarEdicionHorarios}>
                <Edit2 size={18} /> Editar
              </button>
            )}
            {editandoHorarios && (
              <div className="form-actions">
                <button className="horario-save-btn" onClick={saveHorarios}>
                  <Save size={18} /> Guardar
                </button>
                <button className="horario-cancel-btn" onClick={handleCancelarEdicionHorarios}>
                  <X size={18} /> Cancelar
                </button>
              </div>
            )}
          </div>
          <div className="horarios-list">
            {dias.map(dia => (
              <div key={dia.key} className="horario-item">
                <div className="horario-item-header">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={horarios[dia.key].activo} 
                      onChange={() => handleToggleDia(dia.key)} 
                      disabled={!editandoHorarios} 
                    />
                    <span className="dia-nombre">{dia.nombre}</span>
                  </label>
                </div>
                {horarios[dia.key].activo && (
                  <div className="horario-inputs">
                    <div className="time-input-group">
                      <label>Inicio</label>
                      <input 
                        type="time" 
                        value={horarios[dia.key].inicio} 
                        onChange={(e) => handleHorarioChange(dia.key, 'inicio', e.target.value)} 
                        disabled={!editandoHorarios} 
                      />
                    </div>
                    <span className="time-separator">-</span>
                    <div className="time-input-group">
                      <label>Fin</label>
                      <input 
                        type="time" 
                        value={horarios[dia.key].fin} 
                        onChange={(e) => handleHorarioChange(dia.key, 'fin', e.target.value)} 
                        disabled={!editandoHorarios} 
                      />
                    </div>
                  </div>
                )}
                {!horarios[dia.key].activo && <div className="dia-cerrado"><span>Cerrado</span></div>}
              </div>
            ))}
          </div>

          {/* Appointment duration and anticipation settings */}
          <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} /> Configuración de citas
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
                Duración de cada cita
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[15, 30, 45, 60].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => editandoHorarios && setAppointmentDuration(d)}
                    disabled={!editandoHorarios}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: editandoHorarios ? 'pointer' : 'not-allowed',
                      fontSize: '13px',
                      fontWeight: 600,
                      backgroundColor: appointmentDuration === d ? '#10b981' : '#fff',
                      color: appointmentDuration === d ? '#fff' : '#374151',
                      border: '1px solid ' + (appointmentDuration === d ? '#10b981' : '#d1d5db'),
                    }}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
                Anticipación mínima para reservar
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[
                  { value: 1, label: '1 hora' },
                  { value: 2, label: '2 horas' },
                  { value: 4, label: '4 horas' },
                  { value: 24, label: '1 día' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => editandoHorarios && setMinAdvanceBooking(opt.value)}
                    disabled={!editandoHorarios}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: editandoHorarios ? 'pointer' : 'not-allowed',
                      fontSize: '13px',
                      fontWeight: 600,
                      backgroundColor: minAdvanceBooking === opt.value ? '#10b981' : '#fff',
                      color: minAdvanceBooking === opt.value ? '#fff' : '#374151',
                      border: '1px solid ' + (minAdvanceBooking === opt.value ? '#10b981' : '#d1d5db'),
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="servicios-section">
          <div className="section-header">
            <DollarSign size={24} />
            <h2>Servicios y Precios</h2>
          </div>

          <button className="btn-agregar-servicio" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            <Plus size={20} /> Agregar Servicio
          </button>

          {mostrarFormulario && (
            <div className="formulario-servicio">
              <h3>Nuevo Servicio</h3>
              
              <div className="form-group">
                <label>Nombre del Servicio <span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  value={nuevoServicio.nombre}
                  onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                  placeholder="Ej: Consulta Médica General"
                />
              </div>

              <div className="form-group">
                <label>Precio (L.) <span style={{color: 'red'}}>*</span></label>
                <input 
                  type="number" 
                  value={nuevoServicio.precio} 
                  onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })} 
                  placeholder="500" 
                  min="0"
                />
              </div>

              <div className="form-actions">
                <button className="btn-guardar" onClick={handleAgregarServicio}>
                  <Save size={18} /> Guardar
                </button>
                <button className="btn-cancelar-hc" onClick={() => {
                  setMostrarFormulario(false);
                  setNuevoServicio({ nombre: '', precio: '' });
                }}>
                  <X size={18} /> Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="servicios-list">
            {servicios.length === 0 && (
              <p style={{color: '#999', textAlign: 'center', padding: '20px 0'}}>
                No tienes servicios creados. Agrega uno para que los pacientes puedan agendar citas.
              </p>
            )}
            {servicios.map(servicio => (
              <div key={servicio.id} className="servicio-card-cobros">
                {editandoServicio?.id === servicio.id ? (
                  <div className="servicio-edit-form">
                    <input
                      type="text"
                      value={editandoServicio.nombre}
                      onChange={(e) => setEditandoServicio({ ...editandoServicio, nombre: e.target.value })}
                      className="edit-input-nombre"
                      placeholder="Nombre del servicio"
                    />
                    <div className="edit-inputs-row">
                      <input 
                        type="number" 
                        value={editandoServicio.precio} 
                        onChange={(e) => setEditandoServicio({ ...editandoServicio, precio: parseFloat(e.target.value) || 0 })} 
                        className="edit-input-small"
                        min="0"
                      />
                      <span>Lps.</span>
                    </div>
                    <div className="servicio-actions">
                      <button className="btn-icon btn-save" onClick={handleGuardarEdicion}>
                        <Save size={18} />
                      </button>
                      <button className="btn-icon btn-cancel" onClick={() => setEditandoServicio(null)}>
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="servicio-info-hc">
                      <h3>{servicio.nombre}</h3>
                      <div className="servicio-detalles">
                        <span className="servicio-precio">
                          <DollarSign size={16} /> L.{(servicio.precio ?? 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="servicio-actions">
                      <button className="btn-icon btn-edit" onClick={() => handleEditarServicio(servicio.id)}>
                        <Edit2 size={18} />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleEliminarServicio(servicio.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="resumen-section">
        <h3>Resumen de Disponibilidad</h3>
        <div className="resumen-grid">
          <div className="resumen-card">
            <div className="resumen-label">Días Activos</div>
            <div className="resumen-value">{Object.values(horarios).filter(h => h.activo).length} / 7</div>
          </div>
          <div className="resumen-card">
            <div className="resumen-label">Duración Cita</div>
            <div className="resumen-value">{appointmentDuration} min</div>
          </div>
          <div className="resumen-card">
            <div className="resumen-label">Anticipación</div>
            <div className="resumen-value">{minAdvanceBooking >= 24 ? `${minAdvanceBooking / 24}d` : `${minAdvanceBooking}h`}</div>
          </div>
          <div className="resumen-card">
            <div className="resumen-label">Servicios Ofrecidos</div>
            <div className="resumen-value">{servicios.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorarioYCobros;