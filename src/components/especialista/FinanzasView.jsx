import React from 'react';
import { DollarSign, Clock, Calendar, TrendingUp } from 'lucide-react';
import './FinanzasView.css';

const FinanzasView = ({ appointments = [], onUpdatePayment }) => {
  const completadas = appointments.filter(c => c.status === 'completed');
  const porCobrarList = appointments.filter(c => c.status === 'pending' || c.status === 'confirmed');

  const ingresosCobrados = completadas.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
  const porCobrar = porCobrarList.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
  const totalEsperado = ingresosCobrados + porCobrar;

  const getClientName = (apt) => {
    return apt.client?.name || apt.clientName || 'Cliente';
  };

  if (appointments.length === 0) {
    return (
      <div className="finanzas-view">
        <div className="empty-payments">
          <Calendar size={64} />
          <p>Aún no tienes citas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="finanzas-view">
      <div className="finanzas-summary-grid">
        <div className="finance-summary-card earned">
          <div className="finance-card-icon">
            <DollarSign size={32} />
          </div>
          <div className="finance-card-content">
            <div className="finance-amount">
              L. {ingresosCobrados.toLocaleString('es-HN')}
            </div>
            <div className="finance-label">Ingresos Cobrados</div>
            <div className="finance-detail">
              {completadas.length} citas completadas
            </div>
          </div>
        </div>

        <div className="finance-summary-card pending">
          <div className="finance-card-icon">
            <Clock size={32} />
          </div>
          <div className="finance-card-content">
            <div className="finance-amount">
              L. {porCobrar.toLocaleString('es-HN')}
            </div>
            <div className="finance-label">Por Cobrar</div>
            <div className="finance-detail">
              {porCobrarList.length} citas pendientes/confirmadas
            </div>
          </div>
        </div>

        <div className="finance-summary-card projected">
          <div className="finance-card-icon">
            <TrendingUp size={32} />
          </div>
          <div className="finance-card-content">
            <div className="finance-amount">
              L. {totalEsperado.toLocaleString('es-HN')}
            </div>
            <div className="finance-label">Total Esperado</div>
            <div className="finance-detail">Cobrados + Por cobrar</div>
          </div>
        </div>
      </div>

      <div className="payments-section-container">
        <div className="section-header">
          <h2>Citas Completadas</h2>
          <div className="header-stats">
            <span className="stat-chip paid">{completadas.length} Completadas</span>
          </div>
        </div>

        {completadas.length === 0 ? (
          <div className="empty-payments">
            <Calendar size={64} />
            <p>Aún no tienes citas completadas</p>
          </div>
        ) : (
          <div className="payments-list-grid">
            {completadas.map(cita => (
              <div key={cita.id} className="payment-item paid">
                <div className="payment-item-header">
                  <div className="client-name-section">
                    <h4>{getClientName(cita)}</h4>
                    <p className="service-name">{cita.service || '—'}</p>
                  </div>
                  <div className="payment-price">
                    L. {Number(cita.price || 0).toLocaleString('es-HN')}
                  </div>
                </div>

                <div className="payment-item-body">
                  <div className="payment-date-info">
                    <Calendar size={14} />
                    <span>
                      {new Date(cita.date).toLocaleDateString('es-HN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <Clock size={14} />
                    <span>{cita.startTime || '—'}</span>
                  </div>
                </div>

                <div className="payment-item-footer">
                  <span className="payment-status-label paid">Completada</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanzasView;