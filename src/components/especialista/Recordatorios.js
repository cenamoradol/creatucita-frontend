import React, { useState } from 'react';
import { Plus, Save, X, Check, Clock, AlertCircle, Calendar } from 'lucide-react';
import './Recordatorios.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

const Recordatorios = ({ recordatorios = [], appointments = [], token, onAddRecordatorio, onToggleRecordatorio }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'media',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (formData.date < today) {
      alert('No se pueden crear recordatorios en fechas pasadas.');
      return;
    }

    if (onAddRecordatorio) {
      onAddRecordatorio(formData);
      setFormData({ title: '', description: '', date: '', time: '', priority: 'media' });
      setShowForm(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/specialists/reminders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al crear recordatorio');

      setFormData({ title: '', description: '', date: '', time: '', priority: 'media' });
      setShowForm(false);
    } catch (err) {
      console.error('Error creando recordatorio:', err);
      alert('No se pudo guardar el recordatorio');
    }
  };

  const handleToggleCompletado = async (id, currentCompleted) => {
    const newCompleted = !currentCompleted;

    if (onToggleRecordatorio) {
      onToggleRecordatorio(id);
      return;
    }

    try {
      await fetch(`${API_URL}/specialists/reminders/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: newCompleted }),
      });
    } catch (err) {
      console.error('Error toggling completado:', err);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayRecordatorios = recordatorios.filter((r) => r.date === today);
  const todayAppointments = appointments.filter(
    (apt) => apt.date === today && (apt.status === 'pending' || apt.status === 'confirmed')
  );

  const getPriorityColor = (priority) => {
    return priority === 'alta' ? 'priority-high' : priority === 'media' ? 'priority-medium' : 'priority-low';
  };

  const getPriorityLabel = (p) => (p === 'alta' ? 'Alta' : p === 'media' ? 'Media' : 'Baja');

  return (
    <div className="recordatorios-container">
      <div className="recordatorios-header">
        <div>
          <h2>Recordatorios</h2>
          <p>{recordatorios.filter((r) => !r.completed).length} pendientes</p>
        </div>
        <button className="btn-add-recordatorio" onClick={() => setShowForm(true)}>
          <Plus size={20} /> Nuevo Recordatorio
        </button>
      </div>

      {showForm && (
        <div className="recordatorio-form-overlay">
          <div className="recordatorio-form-modal">
            <div className="recordatorio-form-header">
              <h3>Nuevo Recordatorio</h3>
              <button className="btn-close" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título del recordatorio"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción..."
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={today}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hora</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Prioridad</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  <Save size={18} /> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="recordatorios-content">
        <div className="today-section">
          <div className="section-header">
            <Calendar size={20} />
            <h3>Agenda de Hoy</h3>
          </div>
          <div className="today-summary">
            <div className="summary-card">
              <Clock size={24} />
              <div>
                <div className="summary-value">{todayRecordatorios.length}</div>
                <div className="summary-label">Recordatorios</div>
              </div>
            </div>
            <div className="summary-card">
              <Calendar size={24} />
              <div>
                <div className="summary-value">{todayAppointments.length}</div>
                <div className="summary-label">Citas</div>
              </div>
            </div>
          </div>

          {todayAppointments.length > 0 && (
            <div className="appointments-today">
              <h4>Citas de Hoy</h4>
            </div>
          )}
        </div>

        <div className="recordatorios-list">
          <h3>Todos los Recordatorios</h3>
          {recordatorios.length === 0 ? (
            <div className="no-recordatorios">
              <p>No hay recordatorios aún</p>
            </div>
          ) : (
            <div className="recordatorios-grid">
              {recordatorios.map((rec) => (
                <div
                  key={rec.id}
                  className={`recordatorio-card ${getPriorityColor(rec.priority)} ${
                    rec.completed ? 'completed' : ''
                  }`}
                >
                  <div className="recordatorio-header-card">
                    <div className={`priority-badge ${getPriorityColor(rec.priority)}`}>
                      <AlertCircle size={14} />
                      {getPriorityLabel(rec.priority)}
                    </div>
                    <button
                      className="btn-check"
                      onClick={() => handleToggleCompletado(rec.id, rec.completed)}
                      title={rec.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
                    >
                      <Check size={18} />
                    </button>
                  </div>
                  <h4>{rec.title}</h4>
                  <p className="recordatorio-description">{rec.description || '—'}</p>
                  <div className="recordatorio-footer-card">
                    <div className="recordatorio-datetime">
                      <span className="recordatorio-date">
                        {new Date(rec.date).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="recordatorio-time">
                        <Clock size={14} />
                        {rec.time?.substring(0, 5)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recordatorios;