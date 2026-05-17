import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, Calendar, Loader2, TrendingUp } from 'lucide-react';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista';
import './FinanzasView.css';

const FinanzasView = () => {
  const { especialista, token } = useAuthEspecialista();

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!especialista?.especialistaid || !token) {
        setError('Sesión no válida');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
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
        setCitas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error al cargar finanzas:', err);
        setError('No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [especialista?.especialistaid, token]);

  // Normalizamos el estado 
  const getEstado = (cita) => {
    const estadoEsp = cita.status_especialista?.toLowerCase();
    const estadoGen = cita.status?.toLowerCase();
    return estadoEsp || estadoGen || 'pendiente';
  };
  const completadas = citas.filter(c => getEstado(c) === 'completada');
  const porCobrarList = citas.filter(c => {
    const est = getEstado(c);
    return est === 'confirmada' || est === 'pendiente';
  });

  // Cálculos en Lempiras (Honduras)
  const ingresosCobrados = completadas.reduce((sum, c) => sum + Number(c.price || 0), 0);
  const porCobrar = porCobrarList.reduce((sum, c) => sum + Number(c.price || 0), 0);

  const totalEsperado = ingresosCobrados + porCobrar;

  if (loading) {
    return (
      <div className="finanzas-loading">
        <Loader2 className="animate-spin" size={40} />
        <p>Cargando finanzas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="finanzas-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="finanzas-view">
      <div className="finanzas-summary-grid">
        {/* Ingresos Cobrados */}
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

        {/* Por Cobrar */}
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

        {/* Total Esperado */}
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

      {/* Lista de citas completadas */}
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
                    <h4>{cita.clientName || 'Cliente'}</h4>
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
                    <span>{cita.hour || '—'}</span>
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