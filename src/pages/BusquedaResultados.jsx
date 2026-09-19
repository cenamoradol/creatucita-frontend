import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './BusquedaResultados.css';

const BusquedaResultados = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [resultados, setResultados] = useState([]);

  const [filtros, setFiltros] = useState({
    ciudad: '',
    categoria: '',
    precioMin: '',
    precioMax: ''
  });

  const [ordenamiento, setOrdenamiento] = useState('relevancia');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [tempPrecioMin, setTempPrecioMin] = useState('');
  const [tempPrecioMax, setTempPrecioMax] = useState('');

  const ciudades = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choluteca'];
  const categorias = ['Salud', 'Estética', 'Legal', 'Hogar', 'Veterinaria', 'Automotriz'];

  const handleFiltroChange = (nombre, valor) => {
    setFiltros(prev => ({
      ...prev,
      [nombre]: valor
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      ciudad: '',
      categoria: '',
      precioMin: '',
      precioMax: ''
    });
  };

  const fetchResultados = async () => {
    const params = new URLSearchParams();
    if (query) params.append('search', query); // Mapea 'q' a 'search' para el nuevo backend
    
    // El backend nuevo todavía no soporta estos filtros exactamente así, pero los enviamos
    if (filtros.ciudad) params.append('ciudad', filtros.ciudad);
    if (filtros.categoria) params.append('categoria', filtros.categoria);
    if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
    if (filtros.precioMax) params.append('precioMax', filtros.precioMax);
    if (ordenamiento) params.append('orden', ordenamiento);

    // Agregar ubicación del usuario si está logueado
    if (user) {
      if (user.location_city) params.append('userCiudad', user.location_city);
      if (user.location_country) params.append('userPais', user.location_country);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/specialists?${params.toString()}`);
      if (!response.ok) throw new Error('Error en la respuesta');
      const data = await response.json();
      
      // Mapear el formato del nuevo backend al formato esperado por la UI
      const mappedResults = data.map(spec => {
        const categoryName = spec.subcategories && spec.subcategories.length > 0 && spec.subcategories[0].category
          ? spec.subcategories[0].category.name
          : 'Especialista';
        const subcategoriesList = spec.subcategories && spec.subcategories.length > 0
          ? spec.subcategories.map(sub => sub.name).join(', ') 
          : 'Servicio general';

        return {
          id: spec.id,
          nombre: spec.user ? spec.user.name : 'Usuario',
          foto: spec.profilePicture || (spec.user && spec.user.profilePicture) || null,
          categoria: categoryName,
          servicio: subcategoriesList,
          ciudad: spec.clinicAddress || 'Ubicación no especificada',
          precio: 'Precio a convenir',
          disponibilidad: 'A consultar',
        };
      });

      setResultados(mappedResults);
    } catch (err) {
      console.error(err);
      setResultados([]);
    }
  };

  useEffect(() => {
    fetchResultados();
  }, [query, filtros, ordenamiento]);

  useEffect(() => {
    setTempPrecioMin(filtros.precioMin);
    setTempPrecioMax(filtros.precioMax);
  }, [filtros.precioMin, filtros.precioMax]);

  const filtrosActivos = Object.values(filtros).filter(v => v !== '').length;

  return (
    <div className="busqueda-page">
      <div className="busqueda-container">
        <div className="busqueda-header">
          <h1>Resultados de búsqueda</h1>
          {query && (
            <p className="search-query">
              <Search size={18} />
              Mostrando resultados para: <strong>"{query}"</strong>
            </p>
          )}
          <div className="header-actions">
            <p className="resultados-count">{resultados.length} resultados encontrados</p>
            <div className="actions-right">
              <div className="ordenamiento-selector">
                <label>Ordenar por:</label>
                <select
                  value={ordenamiento}
                  onChange={(e) => setOrdenamiento(e.target.value)}
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="populares">Más Populares</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                </select>
              </div>
              <button
                className="btn-toggle-filtros"
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
              >
                <Filter size={18} />
                Filtros {filtrosActivos > 0 && `(${filtrosActivos})`}
              </button>
            </div>
          </div>
        </div>

        <div className="contenido-con-sidebar">
          {mostrarFiltros && (
            <div
              className="sidebar-overlay"
              onClick={() => setMostrarFiltros(false)}
            />
          )}

          <aside className={`sidebar-filtros ${mostrarFiltros ? 'mostrar' : ''}`}>
            <div className="filtros-header">
              <h3>
                <Filter size={20} />
                Filtros
              </h3>
              <div className="filtros-header-actions">
                {filtrosActivos > 0 && (
                  <button className="btn-limpiar" onClick={limpiarFiltros}>
                    <X size={16} />
                    Limpiar
                  </button>
                )}
                <button
                  className="btn-cerrar-sidebar"
                  onClick={() => setMostrarFiltros(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="filtro-grupo">
              <label>Ciudad</label>
              <select
                value={filtros.ciudad}
                onChange={(e) => handleFiltroChange('ciudad', e.target.value)}
              >
                <option value="">Todas las ciudades</option>
                {ciudades.map(ciudad => (
                  <option key={ciudad} value={ciudad}>{ciudad}</option>
                ))}
              </select>
            </div>

            <div className="filtro-grupo">
              <label>Rango de Precio</label>
              <div className="precio-inputs">
                <input
                  type="number"
                  placeholder="Mín"
                  value={tempPrecioMin}
                  onChange={(e) => setTempPrecioMin(e.target.value)} 
                  onBlur={() => handleFiltroChange('precioMin', tempPrecioMin)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleFiltroChange('precioMin', tempPrecioMin); 
                    }
                  }}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Máx"
                  value={tempPrecioMax}
                  onChange={(e) => setTempPrecioMax(e.target.value)} 
                  onBlur={() => handleFiltroChange('precioMax', tempPrecioMax)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleFiltroChange('precioMax', tempPrecioMax);
                    }
                  }}
                />
              </div>
            </div>
          </aside>

          <div className="resultados-contenido">
            {resultados.length > 0 ? (
              <div className="resultados-grid">
                {resultados.map((resultado) => (
                <div key={resultado.id} className="resultado-card">
                  <div className="resultado-imagen">
                    {resultado.foto ? (
                      <img
                        src={resultado.foto.startsWith('http') ? resultado.foto : `${import.meta.env.VITE_API_URL}${resultado.foto}`}
                        alt={resultado.nombre}
                        className="perfil-foto"
                      />
                    ) : (
                      <div className="perfil-foto-placeholder">
                        {resultado.nombre?.charAt(0) || '👤'}
                      </div>
                    )}
                    
                    {/* Badge superpuesto sobre la foto */}
                    <div className="resultado-badge">{resultado.categoria}</div>
                  </div>

                  <div className="resultado-contenido">
                    <h3 className="resultado-nombre">{resultado.nombre}</h3>
                    <p className="resultado-servicio">{resultado.servicio}</p>

                    <div className="resultado-info">
                      <div className="info-item">
                        <MapPin size={18} />
                        <span>{resultado.ciudad}</span>
                      </div>
                    </div>

                    <div className="resultado-footer">
                      <div className="precio-disponibilidad">
                        <span className="precio">{resultado.precio}</span>
                        <span className="disponibilidad">Disponible {resultado.disponibilidad}</span>
                      </div>
                      <button 
                        className="btn-agendar"
                        onClick={() => navigate(`/agendar-cita/${resultado.id}`)}
                      >
                        Agendar Cita
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="no-resultados">
                <Search size={64} />
                <h3>No se encontraron resultados</h3>
                <p>Intenta ajustar los filtros o términos de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusquedaResultados;