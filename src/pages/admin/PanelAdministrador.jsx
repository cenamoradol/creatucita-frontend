import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  UserPlus, 
  Settings, 
  LogOut,
  Shield,
  Briefcase,
  FileText,
  LayoutDashboard,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  FolderPlus,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import './PanelAdministrador.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const PanelAdministrador = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [pendingSpecialists, setPendingSpecialists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  
  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  
  // Form states
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    name: '',
    role: 'client',
    telephone: '',
    locationCountry: '',
    locationCity: ''
  });
  
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });
  
  const [subcategoryForm, setSubcategoryForm] = useState({
    name: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    const token = user?.access_token;
    if (!token) return;

    setLoading(true);
    try {
      if (activeTab === 'users' || activeTab === 'dashboard') {
        const response = await fetch(`${API_URL}/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) setUsers(await response.json());
        
        const deletedResponse = await fetch(`${API_URL}/users/deleted`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (deletedResponse.ok) {
          const allUsers = await deletedResponse.json();
          setDeletedUsers(allUsers.filter(u => u.deletedAt));
        }
      }
      
      if (activeTab === 'specialists' || activeTab === 'dashboard') {
        const response = await fetch(`${API_URL}/specialists/admin/pending`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) setPendingSpecialists(await response.json());
      }
      
      if (activeTab === 'categories' || activeTab === 'dashboard') {
        const response = await fetch(`${API_URL}/categories`);
        if (response.ok) setCategories(await response.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreUser = async (id) => {
    if (!window.confirm('¿Restaurar este usuario?')) return;
    
    const token = user?.access_token;
    try {
      const response = await fetch(`${API_URL}/users/${id}/restore`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = user?.access_token;
    
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userForm)
      });
      
      if (response.ok) {
        setShowUserModal(false);
        setUserForm({ email: '', password: '', name: '', role: 'client', telephone: '', locationCountry: '', locationCity: '' });
        fetchData();
      } else {
        alert('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = user?.access_token;
    
    try {
      const response = await fetch(`${API_URL}/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userForm)
      });
      
      if (response.ok) {
        setEditingUser(null);
        setShowUserModal(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    const token = user?.access_token;
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleApproveSpecialist = async (id) => {
    const token = user?.access_token;
    try {
      const response = await fetch(`${API_URL}/specialists/admin/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRejectSpecialist = async (id) => {
    const token = user?.access_token;
    try {
      const response = await fetch(`${API_URL}/specialists/admin/${id}/reject`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });
      
      if (response.ok) {
        setShowCategoryModal(false);
        setCategoryForm({ name: '', description: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/categories/${editingCategory.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });
      
      if (response.ok) {
        setEditingCategory(null);
        setShowCategoryModal(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/categories/${selectedCategoryId}/subcategories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subcategoryForm)
      });
      
      if (response.ok) {
        setShowSubcategoryModal(false);
        setSubcategoryForm({ name: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteSubcategory = async (id) => {
    if (!window.confirm('¿Eliminar esta subcategoría?')) return;
    try {
      await fetch(`${API_URL}/categories/subcategories/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openEditUser = (userData) => {
    setUserForm({
      email: userData.email,
      password: '',
      name: userData.name,
      role: userData.role,
      telephone: userData.telephone || '',
      locationCountry: userData.locationCountry || '',
      locationCity: userData.locationCity || ''
    });
    setEditingUser(userData);
    setShowUserModal(true);
  };

  const openEditCategory = (cat) => {
    setCategoryForm({ name: cat.name, description: cat.description || '' });
    setEditingCategory(cat);
    setShowCategoryModal(true);
  };

  const openSubcategoryModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowSubcategoryModal(true);
  };

  const getRoleLabel = (role) => {
    const labels = { admin: 'Administrador', specialist: 'Especialista', client: 'Cliente' };
    return labels[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = { admin: '#dc2626', specialist: '#059669', client: '#2563eb' };
    return colors[role] || '#6b7280';
  };

  if (!user || user.role !== 'admin') {
    return <div>Acceso denegado</div>;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'specialists', label: 'Solicitudes', icon: Briefcase },
    { id: 'categories', label: 'Categorías', icon: FolderPlus },
  ];

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <Shield size={32} />
          <span>Admin</span>
        </div>
        
        <nav className="admin-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="admin-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
          <div className="admin-user">
            <span>{user.name}</span>
            <small>{getRoleLabel(user.role)}</small>
          </div>
        </header>

        <div className="admin-content">
          {loading && <div className="loading">Cargando...</div>}
          
          {!loading && activeTab === 'dashboard' && (
            <div className="dashboard-grid">
              <div className="stat-card">
                <Users size={32} />
                <div>
                  <h3>{users.length}</h3>
                  <p>Total Usuarios</p>
                </div>
              </div>
              <div className="stat-card">
                <Briefcase size={32} />
                <div>
                  <h3>{pendingSpecialists.length}</h3>
                  <p>Solicitudes Pendientes</p>
                </div>
              </div>
              <div className="stat-card">
                <FolderPlus size={32} />
                <div>
                  <h3>{categories.length}</h3>
                  <p>Categorías</p>
                </div>
              </div>
            </div>
          )}

          {!loading && activeTab === 'users' && (
            <div className="section">
              <div className="section-header">
                <h2>Gestión de Usuarios</h2>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <button className="btn-secondary" onClick={() => setShowDeleted(!showDeleted)}>
                    {showDeleted ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showDeleted ? 'Ocultar eliminados' : 'Ver eliminados'} ({deletedUsers.length})
                  </button>
                  <button className="btn-primary" onClick={() => { setEditingUser(null); setShowUserModal(true); }}>
                    <UserPlus size={20} /> Nuevo Usuario
                  </button>
                </div>
              </div>
              
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Teléfono</th>
                    <th>País</th>
                    <th>Ciudad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="badge" style={{background: getRoleColor(u.role)}}>{getRoleLabel(u.role)}</span></td>
                      <td>{u.telephone || '-'}</td>
                      <td>{u.locationCountry || '-'}</td>
                      <td>{u.locationCity || '-'}</td>
                      <td><span className="badge" style={{background: '#10b981'}}>Activo</span></td>
                      <td>
                        <button className="btn-icon" onClick={() => openEditUser(u)}><Edit size={16} /></button>
                        <button className="btn-icon btn-danger" onClick={() => handleDeleteUser(u.id)}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {showDeleted && deletedUsers.map(u => (
                    <tr key={u.id} className="deleted-row">
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="badge" style={{background: getRoleColor(u.role)}}>{getRoleLabel(u.role)}</span></td>
                      <td>{u.telephone || '-'}</td>
                      <td>{u.locationCountry || '-'}</td>
                      <td>{u.locationCity || '-'}</td>
                      <td><span className="badge" style={{background: '#dc2626'}}>Eliminado</span></td>
                      <td>
                        <button className="btn-icon btn-restore" onClick={() => handleRestoreUser(u.id)}><RotateCcw size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && activeTab === 'specialists' && (
            <div className="section">
              <div className="section-header">
                <h2>Solicitudes de Especialistas</h2>
              </div>
              
              {pendingSpecialists.length === 0 ? (
                <p className="empty-state">No hay solicitudes pendientes</p>
              ) : (
                <div className="cards-grid">
                  {pendingSpecialists.map(sp => (
                    <div key={sp.id} className="specialist-card">
                      <div className="sp-header">
                        <h3>{sp.user?.name || 'Sin nombre'}</h3>
                        <span className="badge pending">Pendiente</span>
                      </div>
                      <p className="sp-email">{sp.user?.email}</p>
                      <p className="sp-bio">{sp.bio || 'Sin biografía'}</p>
                      <div className="sp-actions">
                        <button className="btn-success" onClick={() => handleApproveSpecialist(sp.id)}>
                          <CheckCircle size={16} /> Aprobar
                        </button>
                        <button className="btn-danger" onClick={() => handleRejectSpecialist(sp.id)}>
                          <XCircle size={16} /> Rechazar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === 'categories' && (
            <div className="section">
              <div className="section-header">
                <h2>Categorías y Subcategorías</h2>
                <button className="btn-primary" onClick={() => { setEditingCategory(null); setShowCategoryModal(true); }}>
                  <Plus size={20} /> Nueva Categoría
                </button>
              </div>
              
              <div className="categories-grid">
                {categories.map(cat => (
                  <div key={cat.id} className="category-card">
                    <div className="cat-header">
                      <h3>{cat.name}</h3>
                      <div className="cat-actions">
                        <button className="btn-icon" onClick={() => openEditCategory(cat)}><Edit size={16} /></button>
                        <button className="btn-icon btn-danger" onClick={() => handleDeleteCategory(cat.id)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <p className="cat-desc">{cat.description}</p>
                    <div className="subcategories">
                      <h4>Subcategorías ({cat.subcategories?.length || 0})</h4>
                      {cat.subcategories?.map(sub => (
                        <div key={sub.id} className="sub-item">
                          <span>{sub.name}</span>
                          <button className="btn-icon btn-danger" onClick={() => handleDeleteSubcategory(sub.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <button className="btn-sm" onClick={() => openSubcategoryModal(cat.id)}>
                        <Plus size={14} /> Agregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
              <input type="text" placeholder="Nombre" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} required />
              <input type="email" placeholder="Email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} required />
              {!editingUser && <input type="password" placeholder="Contraseña" value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} required />}
              <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})}>
                <option value="client">Cliente</option>
                <option value="specialist">Especialista</option>
                <option value="admin">Administrador</option>
              </select>
              <input type="text" placeholder="Teléfono" value={userForm.telephone} onChange={e => setUserForm({...userForm, telephone: e.target.value})} />
              <input type="text" placeholder="País" value={userForm.locationCountry} onChange={e => setUserForm({...userForm, locationCountry: e.target.value})} />
              <input type="text" placeholder="Ciudad" value={userForm.locationCity} onChange={e => setUserForm({...userForm, locationCity: e.target.value})} />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowUserModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">{editingUser ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}>
              <input type="text" placeholder="Nombre" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} required />
              <textarea placeholder="Descripción" value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCategoryModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">{editingCategory ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subcategory Modal */}
      {showSubcategoryModal && (
        <div className="modal-overlay" onClick={() => setShowSubcategoryModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Nueva Subcategoría</h3>
            <form onSubmit={handleCreateSubcategory}>
              <input type="text" placeholder="Nombre" value={subcategoryForm.name} onChange={e => setSubcategoryForm({...subcategoryForm, name: e.target.value})} required />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowSubcategoryModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelAdministrador;