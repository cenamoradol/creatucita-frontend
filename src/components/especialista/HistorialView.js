import React, { useState } from 'react';
import { Calendar, Clock, User, DollarSign, Filter, Search, FileText } from 'lucide-react';
import './HistorialView.css';

const HistorialView = ({ appointments = [] }) => {
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const getClientName = (apt) => {
    return apt.client?.name || apt.clientName || 'Cliente';
  };

  const getClientEmail = (apt) => {
    return apt.client?.email || apt.clientEmail || '';
  };

  const getClientPhone = (apt) => {
    return apt.client?.phone || apt.clientPhone || '';
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmada',
      'completed': 'Completada',
      'cancelled': 'Cancelada'
    };
    return statusMap[status] || status;
  };

  const filtered = appointments
    .filter((apt) => {
      const status = apt.status?.toLowerCase();
      if (filterStatus === 'todos') return true;
      return status === filterStatus;
    })
    .filter((apt) =>
      !searchTerm ||
      getClientName(apt).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientEmail(apt).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.service || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const canceledCount = appointments.filter(a => a.status === 'cancelled').length;

  if (appointments.length === 0) {
    return (
      <div className="historial-view">
        <div className="empty-historial">
          <Calendar size={64} strokeWidth={1.5} />
          <h3>No hay citas</h3>
          <p>Aún no tienes historial</p>
        </div>
      </div>
    );
  }

  return (
    <div className="historial-view">
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
              <option value="completed">Completadas</option>
              <option value="confirmed">Confirmadas</option>
              <option value="pending">Pendientes</option>
              <option value="cancelled">Canceladas</option>
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
              const status = apt.status?.toLowerCase() || 'pending';
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
                          <h4>{getClientName(apt)}</h4>
                          <p className="email">{getClientEmail(apt) || '—'}</p>
                          <p className="phone">{getClientPhone(apt) || '—'}</p>
                        </div>
                      </div>
                      <span className={`status-pill ${status}`}>
                        {getStatusLabel(status)}
                      </span>
                    </div>

                    <div className="historial-card-body">
                      <div className="info-row">
                        <Calendar size={16} />
                        <span>{fecha.toLocaleDateString('es-HN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="info-row">
                        <Clock size={16} />
                        <span>{apt.startTime || '—'}</span>
                      </div>
                      <div className="info-row service-row">
                        <span className="service-label">{apt.service || 'Servicio no especificado'}</span>
                      </div>
                      <div className="info-row price-row">
                        <DollarSign size={16} />
                        <span className="price-value">L. {Number(apt.price || 0).toLocaleString('es-HN')}</span>
                        <span className={`payment-badge ${status === 'completed' ? 'paid' : 'pending'}`}>
                          {status === 'completed' ? 'Pagado' : 'Pendiente'}
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