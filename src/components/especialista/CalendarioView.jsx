import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { serviciosDisponibles, horariosDisponibles } from '../../data/MockDataCitasEspecialista';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista';
import './CalendarioView.css';

const CalendarioView = () => {
  const { especialista, token } = useAuthEspecialista();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  // Normalizar datos del backend
  const normalizeAppointment = (apt) => {
    let dateStr = '';
    const possibleDate = apt.fecha || apt.date;
    if (possibleDate) {
      if (typeof possibleDate === 'string') {
        dateStr = possibleDate.split('T')[0];
      } else if (possibleDate instanceof Date) {
        dateStr = possibleDate.toISOString().split('T')[0];
      }
    }

    const timeClean = (apt.hora || apt.time || apt.startTime || '00:00:00')
      .replace(/:\d{2}$/, '')
      .slice(0, 5);

    let rawStatus = apt.status_especialista || apt.status || 'pendiente';
    let normalizedStatus = rawStatus.toLowerCase().trim();

    if (normalizedStatus.includes('pendiente') || normalizedStatus.includes('aprobacion') || normalizedStatus === 'pending') {
      normalizedStatus = 'pendiente';
    } else if (normalizedStatus.includes('confirmada') || normalizedStatus === 'confirmed') {
      normalizedStatus = 'confirmada';
    } else if (normalizedStatus.includes('cancelada') || normalizedStatus === 'cancelled') {
      normalizedStatus = 'cancelada';
    } else if (normalizedStatus.includes('completada') || normalizedStatus === 'completed') {
      normalizedStatus = 'completada';
    }

    return {
      id: apt.id || apt.idcita,
      date: dateStr,
      time: timeClean,
      clientName: apt.client?.name || apt.clientName || apt.nombre || 'Cliente',
      clientEmail: apt.client?.email || apt.clientEmail || apt.email || '',
      clientPhone: apt.client?.telephone || apt.clientPhone || apt.telefono || '',
      service: apt.service || apt.servicio || 'Servicio',
      notes: apt.notes || apt.notas || apt.motivo || apt.notas_adicionales || '',
      status: normalizedStatus,
      source_table: apt.source_table || (apt.idcita ? 'citas' : 'citas_especialista')
    };
  };

  // Cargar citas
  useEffect(() => {
    const specialistId = especialista?.id || especialista?.especialistaid;
    if (!specialistId || !token) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
        const res = await fetch(
          `${API_URL}/appointments/specialist/upcoming`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!res.ok) {
          if (res.status === 401) throw new Error('Sesión expirada');
          throw new Error('Error al cargar las citas');
        }

        const data = await res.json();
        const normalized = data.map(normalizeAppointment);
        console.log('Citas normalizadas cargadas:', normalized);
        setAppointments(normalized);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [especialista, token]);

  // Funciones del calendario
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr && apt.status !== 'cancelada');
  };

  const isTimeSlotAvailable = (date, time) => {
    if (!date || !time) return true;
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    const timeStr = time.includes(':00') ? time : `${time}:00`;
    
    return !appointments.some(apt => 
      apt.date === dateStr && 
      apt.time === timeStr.replace(/:00$/, '') && 
      apt.status !== 'cancelada'
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCreateForm(false);
  };

  const handleCreateClick = () => {
    if (selectedDate) {
      setNewAppointment(prev => ({
        ...prev,
        date: selectedDate.toISOString().split('T')[0]
      }));
    }
    setShowCreateForm(true);
  };

  // Crear cita manual
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTimeSlotAvailable(newAppointment.date, newAppointment.time)) {
      toast.error('Esta hora ya está ocupada. Por favor selecciona otro horario.');
      return;
    }

    const specialistId = especialista?.id || especialista?.especialistaid;
    if (!specialistId || !token) {
      toast.error('Debes estar autenticado como especialista');
      return;
    }

    try {
      const payload = {
        especialistaid: specialistId,
        nombre: newAppointment.clientName,
        email: newAppointment.clientEmail,
        telefono: newAppointment.clientPhone,
        fecha: newAppointment.date,
        hora: `${newAppointment.time}:00`,
        servicio: newAppointment.service,
        notas: newAppointment.notes || ''
      };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const res = await fetch(
        `${API_URL}/appointments/specialist/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error al crear la cita');
      }

      const createdAppointment = await res.json();
      const optimisticApt = normalizeAppointment(createdAppointment);
      setAppointments(prev => [...prev, optimisticApt]);

      setNewAppointment({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        date: '',
        time: '',
        service: '',
        notes: ''
      });
      setShowCreateForm(false);
      setSelectedDate(null);
      toast.success('¡Cita creada exitosamente!');
    } catch (err) {
      console.error('Error creando cita:', err);
      toast.error(err.message || 'No se pudo crear la cita');
    }
  };

  // Actualizar estado
  const handleUpdateStatus = async (aptId, newStatus, sourceTable) => {
    if (!token) return;

    try {
      let statusValue;
      if (newStatus === 'confirmada') {
        statusValue = 'confirmed';
      } else if (newStatus === 'cancelada') {
        if (!window.confirm('¿Estás seguro de cancelar esta cita?')) return;
        statusValue = 'cancelled';
      } else if (newStatus === 'completada') {
        statusValue = 'completed';
      } else {
        return;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const res = await fetch(
        `${API_URL}/appointments/${aptId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: statusValue })
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `Error ${res.status}`);
      }

      setAppointments(prev =>
        prev.map(apt =>
          apt.id === aptId ? { ...apt, status: newStatus.toLowerCase() } : apt
        )
      );
      toast.success(`Cita ${newStatus.toLowerCase()} exitosamente`);
    } catch (err) {
      console.error('Error actualizando estado:', err);
      toast.error(err.message || 'No se pudo actualizar el estado de la cita');
    }
  };

  const getAvailableHours = (selectedDate) => {
    if (!selectedDate) return horariosDisponibles;
    return horariosDisponibles.map(time => ({
      time,
      available: isTimeSlotAvailable(selectedDate, time)
    }));
  };

  // Render
  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];
  const availableHours = getAvailableHours(newAppointment.date);

  if (loading) return <div className="calendario-view">Cargando calendario...</div>;
  if (error) return <div className="calendario-view error">Error: {error}</div>;

  return (
    <div className="calendario-view">
      <div className="calendario-main">
        <div className="calendar-header">
          <button onClick={handlePreviousMonth} className="month-nav-btn">
            <ChevronLeft size={20} />
          </button>
          <h2>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h2>
          <button onClick={handleNextMonth} className="month-nav-btn">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-grid">
          {weekDays.map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}

          {days.map((day, index) => {
            if (!day) return <div key={`empty-${index}`} className="calendar-day empty" />;

            const dayAppointments = getAppointmentsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

            return (
              <div
                key={index}
                className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayAppointments.length > 0 ? 'has-appointments' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <div className="day-number">{day.getDate()}</div>
                {dayAppointments.length > 0 && (
                  <div className="day-appointments">
                    {dayAppointments.slice(0, 2).map(apt => (
                      <div key={apt.id} className={`appointment-indicator ${apt.status}`}>
                        <Clock size={10} />
                        <span>{apt.time}</span>
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="more-appointments">+{dayAppointments.length - 2}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="calendario-sidebar">
        {showCreateForm ? (
          <div className="create-form-container">
            <div className="sidebar-header">
              <h3>Nueva Cita</h3>
              <button onClick={() => setShowCreateForm(false)} className="close-btn">×</button>
            </div>

            <form onSubmit={handleSubmit} className="appointment-form-compact">
              <div className="form-group">
                <label>Nombre del Cliente</label>
                <input
                  type="text"
                  value={newAppointment.clientName}
                  onChange={e => setNewAppointment({ ...newAppointment, clientName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newAppointment.clientEmail}
                  onChange={e => setNewAppointment({ ...newAppointment, clientEmail: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={newAppointment.clientPhone}
                  onChange={e => setNewAppointment({ ...newAppointment, clientPhone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>Hora</label>
                <select
                  value={newAppointment.time}
                  onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  required
                >
                  <option value="">Seleccionar hora</option>
                  {availableHours.map(({ time, available }) => (
                    <option key={time} value={time} disabled={!available}>
                      {time} {!available ? '(Ocupado)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cambio: input de texto libre en lugar de select */}
              <div className="form-group">
                <label>Servicio</label>
                <input
                  type="text"
                  value={newAppointment.service}
                  onChange={e => setNewAppointment({ ...newAppointment, service: e.target.value })}
                  placeholder="Ej: Corte de pelo, Consulta médica, Revisión legal..."
                  required
                />
                <small style={{ color: '#666', display: 'block', marginTop: '4px' }}>
                  Describe el servicio que vas a realizar
                </small>
              </div>

              <div className="form-group">
                <label>Notas (opcional)</label>
                <textarea
                  value={newAppointment.notes}
                  onChange={e => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  rows="3"
                />
              </div>

              <button type="submit" className="btn-submit-compact">
                <Plus size={18} /> Crear Cita
              </button>
            </form>
          </div>
        ) : selectedDate ? (
          <div className="date-detail-container">
            <div className="sidebar-header">
              <h3>{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
              <button onClick={handleCreateClick} className="btn-add-appointment">
                <Plus size={18} />
              </button>
            </div>

            {selectedDateAppointments.length > 0 ? (
              <div className="date-appointments-list">
                {selectedDateAppointments.map(apt => (
                  <div key={apt.id} className={`appointment-detail-card ${apt.status}`}>
                    <div className="appointment-time-label">
                      <Clock size={16} /> {apt.time}
                    </div>
                    <h4>{apt.clientName}</h4>
                    <p>{apt.service}</p>
                    <span className={`status-badge ${apt.status}`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>

                    <div className="appointment-actions-inline">
                      {apt.status === 'pendiente' && (
                        <>
                          <button
                            className="btn-icon confirm"
                            onClick={() => handleUpdateStatus(apt.id, 'confirmada', apt.source_table)}
                            title="Confirmar"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            className="btn-icon reject"
                            onClick={() => handleUpdateStatus(apt.id, 'cancelada', apt.source_table)}
                            title="Cancelar"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      {apt.status === 'confirmada' && (
                        <button
                          className="btn-icon complete"
                          onClick={() => handleUpdateStatus(apt.id, 'completada', apt.source_table)}
                          title="Marcar como completada"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-appointments">
                <Calendar size={48} />
                <p>No hay citas para este día</p>
                <button onClick={handleCreateClick} className="btn-create-first">
                  Crear Cita
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="no-selection">
            <Calendar size={64} />
            <p>Selecciona un día del calendario</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarioView;