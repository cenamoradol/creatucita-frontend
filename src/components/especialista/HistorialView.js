import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, DollarSign, Filter, Search, FileText, Loader2 } from 'lucide-react';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista';
import './HistorialView.css';

const HistorialView = () => {
  const { especialista, token } = useAuthEspecialista();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHistorial = async () => {
      if (!especialista?.especialistaid || !token) {
        setError('No hay especialista autenticado o token inválido');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/citas/historial/${especialista.especialistaid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error cargando historial:', err);
        setError(err.message || 'No se pudo cargar el historial');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistorial();
  }, [especialista?.especialistaid, token]);

  const getNormalizedStatus = (status, statusEspecialista) => {
    const s = statusEspecialista || status || 'pendiente';
    return s.toLowerCase();
  };

  const filtered = appointments
    .filter((apt) => {
      const st = getNormalizedStatus(apt.status, apt.status_especialista);
      return filterStatus === 'todos' || st === filterStatus;
    })
    .filter((apt) =>
      !searchTerm ||
      apt.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const completedCount = appointments.filter(a => getNormalizedStatus(a.status, a.status_especialista) === 'completada').length;
  const canceledCount  = appointments.filter(a => getNormalizedStatus(a.status, a.status_especialista) === 'cancelada').length;

  if (isLoading) return (
    <div className="historial-loading">
      <Loader2 className="animate-spin" size={40} />
      <p>Cargando historial...</p>
    </div>
  );

  if (error) return (
    <div className="historial-error">
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Reintentar</button>
    </div>
  );

  return (
    <div className="historial-view">
      {/* Header con stats y filtros – igual que antes */}
      <div className="historial-header-section">
        <div className="historial-stats-row">
          <div className="stat-box completed"><div className="stat-value">{completedCount}</div><div className="stat-title">Completadas</div></div>
          <div className="stat-box canceled"><div className="stat-value">{canceledCount}</div><div className="stat-title">Canceladas</div></div>
          <div className="stat-box total"><div className="stat-value">{appointments.length}</div><div className="stat-title">Total Citas</div></div>
        </div>

        <div className="historial-filters-row">
          <div className="search-box-historial">
            <Search size={20} />
            <input
              placeholder="Buscar cliente, email o servicio..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <Filter size={20} />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="completada">Completadas</option>
              <option value="confirmada">Confirmadas</option>
              <option value="pendiente">Pendientes</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>
      </div>

      <div className="historial-content-section">
        {filtered.length === 0 ? (
          <div className="empty-historial">
            <Calendar size={64} strokeWidth={1.5} />
            <h3>No hay citas</h3>
            <p>{searchTerm || filterStatus !== 'todos' ? 'Prueba otros filtros' : 'Aún no tienes historial'}</p>
          </div>
        ) : (
          <div className="historial-timeline">
            {filtered.map(apt => {
              const status = getNormalizedStatus(apt.status, apt.status_especialista);
              const fecha = new Date(apt.date);

              return (
                <div key={apt.id} className={`historial-item ${status}`}>
                  <div className="historial-date-marker">
                    <div className="date-circle" />
                    <div className="date-line" />
                  </div>

                  <div className="historial-card-content">
                    <div className="historial-card-header">
                      <div className="client-section">
                        <div className="client-avatar-historial"><User size={20} /></div>
                        <div className="client-info-historial">
                          <h4>{apt.clientName || '—'}</h4>
                          <p className="email">{apt.clientEmail || '—'}</p>
                          <p className="phone">{apt.clientPhone || '—'}</p>
                        </div>
                      </div>
                      <span className={`status-pill ${status}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>

                    <div className="historial-card-body">
                      <div className="info-row">
                        <Calendar size={16} />
                        <span>{fecha.toLocaleDateString('es-HN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="info-row">
                        <Clock size={16} />
                        <span>{apt.hour || '—'}</span>           {/* ← clave: usa hour */}
                      </div>
                      <div className="info-row service-row">
                        <span className="service-label">{apt.service || 'Servicio no especificado'}</span>
                        <span className="duration-badge">{apt.duration ? `${apt.duration} min` : '—'}</span>
                      </div>
                      <div className="info-row price-row">
                        <DollarSign size={16} />
                        <span className="price-value">L. {Number(apt.price || 0).toLocaleString('es-HN')}</span>
                        <span className={`payment-badge ${status === 'completada' ? 'paid' : 'pending'}`}>
                          {status === 'completada' ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>
                    </div>

                    {apt.notes?.trim() && (
                      <div className="historial-notes-section">
                        <strong><FileText size={14} /> Notas:</strong>
                        <p>{apt.notes}</p>
                      </div>
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

export default HistorialView;