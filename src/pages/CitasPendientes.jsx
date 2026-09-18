import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, User, DollarSign, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import './CitasPendientes.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const CitasPendientes = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = user?.access_token || localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/appointments/my-appointments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const normalized = (response.data || []).map(cita => ({
          id: cita.id,
          status: cita.status,
          motivo: cita.service || 'Consulta Médica',
          providerName: cita.specialist?.user?.name || 'Especialista',
          providerSpecialty: cita.specialist?.specialty || 'Profesional',
          appointmentDate: cita.date,
          appointmentTime: cita.startTime,
          notes: cita.notes,
          price: cita.price,
          city: cita.specialist?.city || 'San Pedro Sula',
          country: cita.specialist?.country || 'Honduras'
        }));
        
        const citasActivas = normalized.filter(cita => 
          cita.status?.toLowerCase() === 'pending' || 
          cita.status?.toLowerCase() === 'confirmed' ||
          cita.status?.toLowerCase() === 'pendiente' ||
          cita.status?.toLowerCase() === 'confirmada'
        );

        setCitas(citasActivas);
      } catch (err) {
        console.error('Error cargando citas:', err);
        setError('No pudimos cargar tus citas. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user, authLoading, navigate]);

  const handleConfirmAppointment = async (appointmentId) => {
    if (!window.confirm('¿Confirmar esta cita? El especialista será notificado.')) return;

    try {
      const token = user?.access_token || localStorage.getItem('token');
      const response = await axios.patch(`${API_URL}/appointments/${appointmentId}/status`, 
        { status: 'confirmed' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        setCitas(prev =>
          prev.map(cita =>
            cita.id === appointmentId ? { ...cita, status: 'confirmed' } : cita
          )
        );
        toast.success('¡Cita confirmada exitosamente!');
      }

    } catch (err) {
      console.error('Error al confirmar cita (cliente):', err);
      const errorMsg = err.response?.data?.message || 'No se pudo confirmar la cita. Intenta nuevamente.';
      toast.error(errorMsg);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    const mensaje = 
      "IMPORTANTE:\n" +
      "• Citas confirmadas → NO tienen reembolso\n" +
      "• Citas pendientes → reembolso completo SOLO si cancelas con +24 horas de anticipación\n\n" +
      "¿Confirmas la cancelación de esta cita?";

    if (!window.confirm(mensaje)) return;

    try {
      const token = user?.access_token || localStorage.getItem('token');
      const response = await axios.patch(`${API_URL}/appointments/${appointmentId}/status`, 
        { status: 'cancelled' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        // Retira la cita de la lista visible (Pendiente/Confirmada)
        setCitas(prev => prev.filter(cita => cita.id !== appointmentId));
        toast.success('Cita cancelada exitosamente');
      }
    } catch (err) {
      console.error('Error al cancelar:', err);
      const errorMsg = err.response?.data?.message || 'No se pudo cancelar la cita. Intenta nuevamente.';
      toast.error(errorMsg);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const capitalizeDay = (dateStr) => {
    const formatted = formatDate(dateStr);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const formatTime = (time) => {
    if (!time) return '—';
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const getEstadoClass = (cita) => {
    const st = (cita.status || '').toLowerCase();
    const stEsp = (cita.status_especialista || '').toLowerCase();
    if (st === 'pendiente' && stEsp === 'pendiente aprobacion') {
      return 'estado-esperando';
    }
    if (st === 'confirmada') return 'estado-confirmada';
    if (st === 'pendiente') return 'estado-pendiente';
    return 'estado-desconocido';
  };

  const getEstadoTexto = (cita) => {
    const st = (cita.status || '').toLowerCase();
    const stEsp = (cita.status_especialista || '').toLowerCase();
    if (st === 'pendiente' && stEsp === 'pendiente aprobacion') {
      return 'Esperando Aprobacion';
    }
    const estados = {
      confirmada: 'Confirmada',
      pendiente: 'Pendiente',
      cancelada: 'Cancelada'
    };
    return estados[st] || cita.status || '—';
  };

  if (loading || authLoading) {
    return <div className="citas-page"><p className="loading-text">Cargando tus citas...</p></div>;
  }

  return (
    <div className="citas-page">
      <div className="citas-container">
        <h1 className="page-title">Mis Citas</h1>
        <p className="page-subtitle">Próximas citas y citas confirmadas</p>

        {error && <div className="error-message">{error}</div>}

        {citas.length === 0 ? (
          <div className="no-citas">
            <Calendar size={64} />
            <h3>No tienes citas próximas</h3>
            <p>Explora nuestros servicios y agenda tu próxima cita</p>
            <button 
              className="btn-confirmar"
              onClick={() => navigate('/busqueda')}
            >
              Ver servicios disponibles
            </button>
          </div>
        ) : (
          <div className="citas-grid">
            {citas.map((cita) => (
              <div key={cita.id} className="cita-card">
                <div className="cita-header">
                  <div className="cita-categoria">
                    {cita.categoria || cita.serviceName || 'Servicio'}
                  </div>
                  <div className={`cita-estado ${getEstadoClass(cita)}`}>
                    {getEstadoTexto(cita)}
                  </div>
                </div>

                <h3 className="cita-servicio">
                  {cita.motivo}
                </h3>

                <div className="cita-detalles">
                  <div className="detalle-item"><User size={18} /><span>{cita.providerName}</span></div>
                  <div className="detalle-item"><User size={18} /><span>{cita.providerSpecialty}</span></div>
                  <div className="detalle-item"><Calendar size={18} /><span>{capitalizeDay(cita.appointmentDate)}</span></div>
                  <div className="detalle-item"><Clock size={18} /><span>{formatTime(cita.appointmentTime)}</span></div>
                  <div className="detalle-item"><MapPin size={18} /><span>{cita.city}{cita.country ? `, ${cita.country}` : ''}</span></div>
                  {cita.notes && <div className="detalle-item cita-notes"><span>Notas: {cita.notes}</span></div>}
                  {cita.price && <div className="detalle-item"><DollarSign size={18} /><span>L.{cita.price}</span></div>}
                </div>

                <div className="cita-acciones">
                  {cita.status?.toLowerCase() === 'pendiente' && (cita.status_especialista || '').toLowerCase() !== 'pendiente aprobacion' && (
                    <button
                      className="btn-modificar"
                      onClick={() => handleConfirmAppointment(cita.id)}
                    >
                      Confirmar Cita
                    </button>
                  )}

                  <button
                    className="btn-cancelar-citas-pendientes"
                    onClick={() => handleCancelAppointment(cita.id)}
                  >
                    <XCircle size={18} /> Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitasPendientes;