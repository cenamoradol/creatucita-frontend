import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Users,
  Settings,
  Clock,
  LogOut,
  DollarSign,
  History,
  LayoutDashboard,
  FileText,
  Bell,
  Archive,
  Briefcase
} from 'lucide-react';
import './PanelEspecialista.css';

import CalendarioView from '../../components/especialista/CalendarioView';
import CitasView from '../../components/especialista/CitasView';
import HistorialView from '../../components/especialista/HistorialView';
import FinanzasView from '../../components/especialista/FinanzasView';
import PerfilView from '../../components/especialista/PerfilView';
import Notas from '../../components/especialista/Notas';
import Recordatorios from '../../components/especialista/Recordatorios';
import NotasArchivadas from '../../components/especialista/NotasArchivadas';
import HorarioYCobros from '../../components/especialista/HorarioYCobros';

const PanelEspecialista = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [notas, setNotas] = useState([]);
  const [recordatorios, setRecordatorios] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [specialistData, setSpecialistData] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'specialist') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = user?.access_token;
        if (!token) {
          setLoadingDashboard(false);
          return;
        }

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
        const response = await fetch(`${API_URL}/specialists/dashboard`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error al cargar dashboard:', response.status, errorText);
          setLoadingDashboard(false);
          return;
        }

        const data = await response.json();

        // Normalizar appointments (ya viene listo del backend)
        setAppointments(data.appointments || []);

        // Notas 
        setNotas(data.notas || []);

        // Recordatorios
        const normalizedRecordatorios = (data.recordatorios || []).map(rec => ({
          ...rec,
          completed: rec.completed === true || rec.completed === 1
        }));
        setRecordatorios(normalizedRecordatorios);

      } catch (error) {
        console.error('Error de conexión al cargar dashboard:', error);
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  useEffect(() => {
    const fetchSpecialistData = async () => {
      try {
        const token = user?.access_token;
        if (!token) return;

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
        const response = await fetch(`${API_URL}/specialists/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSpecialistData(data);
        }
      } catch (error) {
        console.error('Error al obtener datos del especialista:', error);
      }
    };

    fetchSpecialistData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const updateAppointmentPayment = (id, paid) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, paid } : apt
    ));
  };

  const handleCreateAppointment = (newApt) => {
    const serviciosDisponibles = [
      { id: 1, name: 'Consulta General', duration: 60, price: 500 },
      { id: 2, name: 'Revisión', duration: 30, price: 350 },
      { id: 3, name: 'Consulta Especializada', duration: 90, price: 750 },
      { id: 4, name: 'Seguimiento', duration: 45, price: 400 }
    ];

    const selectedService = serviciosDisponibles.find(s => s.name === newApt.service);
    const appointment = {
      id: appointments.length + 1,
      ...newApt,
      status: 'confirmada',
      price: selectedService?.price || 0,
      paid: false
    };

    setAppointments([...appointments, appointment]);
  };

  const handleAddNote = (noteData) => {
    const newNote = {
      id: notas.length + 1,
      ...noteData,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotas([...notas, newNote]);
  };

  const handleUpdateNote = (id, updatedData) => {
    setNotas(notas.map(nota =>
      nota.id === id ? { ...nota, ...updatedData, updatedAt: new Date().toISOString() } : nota
    ));
  };

  const handleArchiveNote = (id) => {
    setNotas(notas.map(nota =>
      nota.id === id ? { ...nota, archived: true, updatedAt: new Date().toISOString() } : nota
    ));
  };

  const handleRestoreNote = (id) => {
    setNotas(notas.map(nota =>
      nota.id === id ? { ...nota, archived: false, updatedAt: new Date().toISOString() } : nota
    ));
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota permanentemente?')) {
      setNotas(notas.filter(nota => nota.id !== id));
    }
  };

  const handleAddRecordatorio = (recordatorioData) => {
    const newRecordatorio = {
      id: recordatorios.length + 1,
      ...recordatorioData,
      completed: false
    };
    setRecordatorios([...recordatorios, newRecordatorio]);
  };

  const handleToggleRecordatorio = (id) => {
    setRecordatorios(recordatorios.map(rec =>
      rec.id === id ? { ...rec, completed: !rec.completed } : rec
    ));
  };

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  const activeNotas = notas.filter(nota => !nota.archived);
  const pendingRecordatorios = recordatorios.filter(rec => !rec.completed);
  const today = new Date().toISOString().split('T')[0];
  const todayRecordatorios = recordatorios.filter(r => r.date === today && !r.completed);
  const recentNotas = activeNotas.slice(0, 3);
  const activeRecordatorios = recordatorios.filter(r => !r.completed);

  const renderDashboard = () => (
    <div className="dashboard-content">
      {loadingDashboard && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          Cargando datos del dashboard...
        </div>
      )}

      <div className="dashboard-welcome">
        <h2>Bienvenido, {user?.name}</h2>
        <p>Panel de control para gestionar tus citas y finanzas</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card pending">
          <div className="stat-icon"><Clock size={32} /></div>
          <div className="stat-info">
            <h3>{pendingAppointments.length}</h3>
            <p>Citas Pendientes</p>
          </div>
        </div>

        <div className="stat-card confirmed">
          <div className="stat-icon"><Calendar size={32} /></div>
          <div className="stat-info">
            <h3>{confirmedAppointments.length}</h3>
            <p>Citas Confirmadas</p>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon"><DollarSign size={32} /></div>
          <div className="stat-info">
            <h3>{completedAppointments.length}</h3>
            <p>Citas Completadas</p>
          </div>
        </div>

        <div className="stat-card total">
          <div className="stat-icon"><Users size={32} /></div>
          <div className="stat-info">
            <h3>{appointments.length}</h3>
            <p>Total de Citas</p>
          </div>
        </div>
      </div>

      <div className="dashboard-quick-stats">
        <div className="quick-stat-card">
          <h4>Próximas Citas</h4>
          <div className="quick-stat-value">
            {[...pendingAppointments, ...confirmedAppointments]
              .filter(apt => new Date(apt.date) >= new Date())
              .length}
          </div>
        </div>

        <div className="quick-stat-card">
          <h4>Ingresos del Mes</h4>
          <div className="quick-stat-value">
            ${appointments
              .filter(apt => {
                const aptDate = new Date(apt.date);
                const now = new Date();
                return apt.status === 'completed' &&
                  aptDate.getMonth() === now.getMonth() &&
                  aptDate.getFullYear() === now.getFullYear();
              })
              .reduce((sum, apt) => sum + (parseFloat(apt.price) || 0), 0)
              .toLocaleString()}
          </div>
        </div>

        <div className="quick-stat-card">
          <h4>Tasa de Completado</h4>
          <div className="quick-stat-value">
            {appointments.length > 0
              ? ((completedAppointments.length / appointments.length) * 100).toFixed(0)
              : 0}%
          </div>
        </div>
      </div>
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header-dashboard">
            <div className="section-title-dashboard">
              <Clock size={20} />
              <h3>Recordatorios Hoy</h3>
            </div>
            <button className="section-link" onClick={() => setActiveTab('reminders')}>Ver todos</button>
          </div>
          <div className="recordatorios-dashboard">
            {todayRecordatorios.length === 0 ? (
              <div className="empty-message"><p>No hay recordatorios para hoy</p></div>
            ) : (
              todayRecordatorios.map(rec => (
                <div key={rec.id} className={`recordatorio-item priority-${rec.priority}`}>
                  <div className="recordatorio-item-header">
                    <span className="recordatorio-item-time">{rec.time}</span>
                    <span className={`priority-indicator priority-${rec.priority}`}>{rec.priority}</span>
                  </div>
                  <h4>{rec.title}</h4>
                  <p>{rec.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header-dashboard">
            <div className="section-title-dashboard">
              <FileText size={20} />
              <h3>Notas Recientes</h3>
            </div>
            <button className="section-link" onClick={() => setActiveTab('notes')}>Ver todas</button>
          </div>
          <div className="notas-dashboard">
            {activeNotas.length === 0 ? (
              <div className="empty-message"><p>No hay notas recientes</p></div>
            ) : (
              activeNotas.slice(0, 5).map(nota => (
                <div key={nota.id} className={`nota-item category-${nota.category.toLowerCase()}`}>
                  <div className="nota-item-header">
                    <span className="nota-category-label">{nota.category}</span>
                    <span className="nota-date-label">{new Date(nota.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4>{nota.title}</h4>
                  <p>{nota.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="panel-especialista">
      <aside className="panel-sidebar">
        <div className="sidebar-header">
          <h2>Panel de Control</h2>
          <p>Bienvenido, {user?.name}</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button
            className={activeTab === 'calendario' ? 'active' : ''}
            onClick={() => setActiveTab('calendario')}
          >
            <Calendar size={20} />
            Calendario
          </button>
          <button
            className={activeTab === 'appointments' ? 'active' : ''}
            onClick={() => setActiveTab('appointments')}
          >
            <Users size={20} />
            Citas
          </button>
          <button
            className={activeTab === 'historial' ? 'active' : ''}
            onClick={() => setActiveTab('historial')}
          >
            <History size={20} />
            Historial
          </button>
          <button
            className={activeTab === 'finanzas' ? 'active' : ''}
            onClick={() => setActiveTab('finanzas')}
          >
            <DollarSign size={20} />
            Finanzas
          </button>
          <button
            className={activeTab === 'horarioCobros' ? 'active' : ''}
            onClick={() => setActiveTab('horarioCobros')}
          >
            <Briefcase size={20} />
            Horario y Cobros
          </button>
          <button
            className={activeTab === 'notas' ? 'active' : ''}
            onClick={() => setActiveTab('notas')}
          >
            <FileText size={20} />
            Notas
          </button>
          <button
            className={activeTab === 'recordatorios' ? 'active' : ''}
            onClick={() => setActiveTab('recordatorios')}
          >
            <Bell size={20} />
            Recordatorios
          </button>
          <button
            className={activeTab === 'notasArchivadas' ? 'active' : ''}
            onClick={() => setActiveTab('notasArchivadas')}
          >
            <Archive size={20} />
            Notas Archivadas
          </button>
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            <Settings size={20} />
            Perfil
          </button>
        </nav>

        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </aside>

      <main className="panel-main">
        <div className="panel-header">
          <h1>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'calendario' && 'Calendario'}
            {activeTab === 'appointments' && 'Gestión de Citas'}
            {activeTab === 'historial' && 'Historial de Citas'}
            {activeTab === 'finanzas' && 'Finanzas'}
            {activeTab === 'horarioCobros' && 'Horario y Cobross'}
            {activeTab === 'notas' && 'Notas'}
            {activeTab === 'recordatorios' && 'Recordatorios'}
            {activeTab === 'notasArchivadas' && 'Notas Archivadas'}
            {activeTab === 'profile' && 'Mi Perfil'}
          </h1>
        </div>

        <div className="panel-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'calendario' && (
            <CalendarioView />
          )}
          {activeTab === 'appointments' && (
            <CitasView />
          )}
          {activeTab === 'historial' && (
            <HistorialView appointments={appointments} />
          )}
          {activeTab === 'finanzas' && (
            <FinanzasView
              appointments={appointments}
              onUpdatePayment={updateAppointmentPayment}
            />
          )}
          {activeTab === 'horarioCobros' && (
            <HorarioYCobros />
          )}
          {activeTab === 'notas' && (
            <Notas
              notas={notas}
              token={user?.access_token}
              onAddNote={handleAddNote}
              onUpdateNote={handleUpdateNote}
              onArchiveNote={handleArchiveNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
          {activeTab === 'recordatorios' && (
            <Recordatorios
              recordatorios={recordatorios}
              appointments={appointments}
              token={user?.access_token}
              onAddRecordatorio={handleAddRecordatorio}
              onToggleRecordatorio={handleToggleRecordatorio}
            />
          )}
          {activeTab === 'notasArchivadas' && (
            <NotasArchivadas
              notas={notas}
              token={user?.access_token}
              onRestoreNote={handleRestoreNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
          {activeTab === 'profile' && (
            <PerfilView
              especialista={specialistData}
              token={user?.access_token}
              appointments={appointments}
              onUpdate={(updatedData) => setSpecialistData(updatedData)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PanelEspecialista;