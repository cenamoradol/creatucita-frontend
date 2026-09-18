import React, { useState } from 'react';
import { Plus, Save, X, Archive, Trash2, Edit2, Search } from 'lucide-react';
import './Notas.css';

const Notas = ({ notas = [], token, onAddNote, onUpdateNote, onArchiveNote, onDeleteNote }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todas');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Paciente'
  });
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNote) {
        if (onUpdateNote) {
          onUpdateNote(editingNote.id, formData);
        } else {
          const response = await fetch(`${API_URL}/specialists/notes/${editingNote.id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (!response.ok) throw new Error('Error al actualizar nota');
        }
        setEditingNote(null);
      } else {
        if (onAddNote) {
          onAddNote(formData);
        } else {
          const response = await fetch(`${API_URL}/specialists/notes`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (!response.ok) throw new Error('Error al crear nota');
        }
      }
      setFormData({ title: '', content: '', category: 'Paciente' });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (nota) => {
    setEditingNote(nota);
    setFormData({
      title: nota.title,
      content: nota.content,
      category: nota.category
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
    setFormData({ title: '', content: '', category: 'Paciente' });
  };

  const handleArchive = async (id) => {
    if (onArchiveNote) {
      onArchiveNote(id);
    } else {
      try {
        await fetch(`${API_URL}/specialists/notes/${id}/archive`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (onDeleteNote) {
      onDeleteNote(id);
    } else {
      try {
        await fetch(`${API_URL}/specialists/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const activeNotas = notas.filter(nota => !nota.archived);

  const filteredNotas = activeNotas.filter(nota => {
    const matchesSearch = nota.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nota.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'todas' || nota.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="notas-container">
      <div className="notas-header">
        <div className="notas-header-left">
          <h2>Mis Notas</h2>
          <p>{activeNotas.length} notas activas</p>
        </div>
        <button className="btn-add-nota" onClick={() => setShowForm(true)}>
          <Plus size={20} />
          Nueva Nota
        </button>
      </div>

      {showForm && (
        <div className="nota-form-overlay">
          <div className="nota-form-modal">
            <div className="nota-form-header">
              <h3>{editingNote ? 'Editar Nota' : 'Nueva Nota'}</h3>
              <button className="btn-close" onClick={handleCancel}>
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
                  placeholder="Título de la nota"
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Paciente">Paciente</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              <div className="form-group">
                <label>Contenido</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Escribe el contenido de tu nota..."
                  rows="6"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  <Save size={18} />
                  {editingNote ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="notas-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filters">
          <button
            className={filterCategory === 'todas' ? 'active' : ''}
            onClick={() => setFilterCategory('todas')}
          >
            Todas
          </button>
          <button
            className={filterCategory === 'Paciente' ? 'active' : ''}
            onClick={() => setFilterCategory('Paciente')}
          >
            Paciente
          </button>
          <button
            className={filterCategory === 'Administrativo' ? 'active' : ''}
            onClick={() => setFilterCategory('Administrativo')}
          >
            Administrativo
          </button>
          <button
            className={filterCategory === 'Personal' ? 'active' : ''}
            onClick={() => setFilterCategory('Personal')}
          >
            Personal
          </button>
        </div>
      </div>

      <div className="notas-grid">
        {filteredNotas.length === 0 ? (
          <div className="no-notas">
            <p>No hay notas que mostrar</p>
          </div>
        ) : (
          filteredNotas.map(nota => (
            <div key={nota.id} className={`nota-card ${nota.category.toLowerCase()}`}>
              <div className="nota-category-badge">{nota.category}</div>
              <h3>{nota.title}</h3>
              <p className="nota-content">{nota.content}</p>
              <div className="nota-footer">
                <span className="nota-date">
                  {new Date(nota.createdAt).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                <div className="nota-actions">
                  <button
                    className="btn-icon edit"
                    onClick={() => handleEdit(nota)}
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn-icon archive"
                    onClick={() => handleArchive(nota.id)}
                    title="Archivar"
                  >
                    <Archive size={16} />
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={() => handleDelete(nota.id)}
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notas;