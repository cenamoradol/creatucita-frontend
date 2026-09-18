import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista'; // Asumiendo que este es el path correcto para el contexto
import './CitasView.css';

const CitasView = () => {
  const { especialista, token } = useAuthEspecialista();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    const specialistId = especialista?.id || especialista?.especialistaid;
    
    if (!specialistId) {
      setError('No se encontró el ID del especialista');
      setLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/appointments/specialist/upcoming`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar las citas');
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [especialista]);

  // Función para actualizar estado (confirmar, cancelar, completar)
  const onUpdateStatus = async (id, newStatus) => {
    try {
      let statusValue;

      if (newStatus === 'Confirmada') {
        statusValue = 'confirmed';
      } else if (newStatus === 'Cancelada') {
        if (!window.confirm('¿Estás seguro de cancelar esta cita?')) return;
        statusValue = 'cancelled';
      } else if (newStatus === 'Completada') {
        statusValue = 'completed';
      } else {
        throw new Error('Estado inválido');
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: statusValue })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el estado');
      }

      toast.success(`Cita ${newStatus.toLowerCase()} exitosamente`);
      fetchAppointments();
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  const getEffectiveStatus = (apt) => {
    return apt.status || 'pending'; 
  };

  // Filtrar citas próximas (pendientes y confirmadas)
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const upcomingAppointments = [...pendingAppointments, ...confirmedAppointments]
    .sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`));

  // Función para verificar si la fecha es hoy o ya pasó
  const isDateTodayOrPast = (date, startTime) => {
    const appointmentDateTime = new Date(`${date}T${startTime}`);
    return appointmentDateTime <= new Date();
  };

  if (loading) {
    return <div>Cargando citas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="citas-view">
      <div className="citas-stats">
        <div className="stat-card-mini pending">
          <div className="stat-number">{pendingAppointments.length}</div>
          <div className="stat-label">Pendientes</div>
        </div>
        <div className="stat-card-mini confirmed">
          <div className="stat-number">{confirmedAppointments.length}</div>
          <div className="stat-label">Confirmadas</div>
        </div>
        <div className="stat-card-mini total">
          <div className="stat-number">{upcomingAppointments.length}</div>
          <div className="stat-label">Total Próximas</div>
        </div>
      </div>

      <div className="citas-list">
        <h2>Citas Próximas</h2>

        {upcomingAppointments.length === 0 ? (
          <div className="empty-state">
            <Calendar size={64} />
            <p>No hay citas próximas</p>
          </div>
        ) : (
          <div className="appointments-grid">
              {upcomingAppointments.map(apt => {
                const effectiveStatus = getEffectiveStatus(apt);
                const statusLabels = {
                  'pending': 'Pendiente',
                  'confirmed': 'Confirmada',
                  'completed': 'Completada',
                  'cancelled': 'Cancelada'
                };
                const statusLabel = statusLabels[effectiveStatus] || effectiveStatus;

                return (
                  <div key={apt.id} className={`appointment-card ${effectiveStatus}`}>
                    <div className="appointment-header-card">
                      <div className="client-info-card">
                        <div className="client-avatar">
                          <User size={24} />
                        </div>
                        <div>
                          <h3>{apt.client?.name || 'Cliente'}</h3>
                          <p className="client-contact">{apt.client?.email}</p>
                          <p className="client-contact">{apt.client?.telephone}</p>
                        </div>
                      </div>
                      <span className={`status-badge-card ${effectiveStatus}`}>
                        {statusLabel}
                      </span>
                    </div>

                  <div className="appointment-details-card">
                    <div className="detail-row">
                      <Calendar size={18} />
                      <span>{new Date(apt.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="detail-row">
                      <Clock size={18} />
                      <span>{apt.startTime}</span>
                    </div>
                    <div className="detail-row service">
                      <span className="service-tag">{apt.service || 'Consulta'}</span>
                      {apt.price && <span className="price-tag">L.{apt.price}</span>}
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="appointment-notes">
                      <strong>Notas:</strong> {apt.notes}
                    </div>
                  )}

                  <div className="appointment-actions-card">
                    {effectiveStatus === 'pending' && (
                      <>
                        <button
                          className="btn-action confirm"
                          onClick={() => onUpdateStatus(apt.id, 'Confirmada')}
                        >
                          <CheckCircle size={18} />
                          Confirmar
                        </button>
                        <button
                          className="btn-action reject"
                          onClick={() => onUpdateStatus(apt.id, 'Cancelada')}
                        >
                          <XCircle size={18} />
                          Cancelar
                        </button>
                      </>
                    )}
                    {effectiveStatus === 'confirmed' && (
                      <>
                        <button
                          className="btn-action reject"
                          onClick={() => onUpdateStatus(apt.id, 'Cancelada')}
                        >
                          <XCircle size={18} />
                          Cancelar
                        </button>
                        {isDateTodayOrPast(apt.date, apt.startTime) && (
                          <button
                            className="btn-action complete"
                            onClick={() => onUpdateStatus(apt.id, 'Completada')}
                          >
                            <CheckCircle size={18} />
                            Marcar como Completada
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitasView;