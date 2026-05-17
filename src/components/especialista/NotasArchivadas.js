import React, { useState, useEffect } from 'react';
import { Archive, ArchiveRestore, Trash2, Search } from 'lucide-react';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista'; 
import './NotasArchivadas.css';

const NotasArchivadas = () => {
  const { especialista, token } = useAuthEspecialista();
  const [notas, setNotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (especialista && token) {
      fetchArchivedNotas();
    } else {
      setLoading(false);
    }
  }, [especialista, token]);

  const fetchArchivedNotas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/notas/archived/${especialista.especialistaid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al cargar notas archivadas');
      }
      const data = await response.json();
      // Mapear datos del backend al formato esperado en frontend
      const mappedNotas = data.map(nota => ({
        id: nota.idnotas,
        title: nota.titulo,
        content: nota.nota_contenido,
        category: nota.nota_categoria,
        createdAt: nota.created_by, 
        archived: true,
        status: nota.nota_status
      }));
      setNotas(mappedNotas);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await fetch(`${API_URL}/notas/restore/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al restaurar nota');
      }
      fetchArchivedNotas(); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota permanentemente?')) {
      try {
        const response = await fetch(`${API_URL}/notas/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al eliminar nota');
        }
        fetchArchivedNotas();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const archivedNotas = notas;

  const filteredNotas = archivedNotas.filter(nota => {
    const matchesSearch = nota.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nota.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'todas' || nota.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div>Cargando notas archivadas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="notas-archivadas-container">
      <div className="notas-archivadas-header">
        <div>
          <div className="header-icon-title">
            <Archive size={28} />
            <h2>Notas Archivadas</h2>
          </div>
          <p>{archivedNotas.length} notas archivadas</p>
        </div>
      </div>

      <div className="notas-archivadas-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar en archivadas..."
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

      {archivedNotas.length === 0 ? (
        <div className="no-archived">
          <Archive size={64} />
          <h3>No hay notas archivadas</h3>
          <p>Las notas que archives aparecerán aquí</p>
        </div>
      ) : (
        <div className="notas-archivadas-grid">
          {filteredNotas.length === 0 ? (
            <div className="no-results">
              <p>No se encontraron notas con los filtros seleccionados</p>
            </div>
          ) : (
            filteredNotas.map(nota => (
              <div key={nota.id} className={`nota-archivada-card ${nota.category.toLowerCase()}`}>
                <div className="nota-category-badge">{nota.category}</div>
                <h3>{nota.title}</h3>
                <p className="nota-content">{nota.content}</p>
                <div className="nota-footer">
                  <div className="nota-dates">
                    <span className="nota-date">
                      Creada: {new Date(nota.createdAt).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="nota-actions">
                    <button
                      className="btn-icon restore"
                      onClick={() => handleRestore(nota.id)}
                      title="Restaurar nota"
                    >
                      <ArchiveRestore size={16} />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDelete(nota.id)}
                      title="Eliminar permanentemente"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotasArchivadas;