import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Edit3, Save, X, Camera, Trash2 } from 'lucide-react';
import './PerfilView.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const PerfilView = ({ especialista, token, appointments = [], onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: ''
  });
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const buildImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `${API_URL}${imagePath}`;
  };

  useEffect(() => {
    if (especialista) {
      const name = especialista.user?.name || especialista.name || '';
      const phone = especialista.phone || '';
      const bio = especialista.bio || '';
      
      setFormData({ name, phone, bio });
    }
  }, [especialista]);

  const handleEditToggle = () => {
    if (editing) {
      setFormData({
        name: especialista?.name || '',
        phone: especialista?.phone || '',
        bio: especialista?.bio || ''
      });
    }
    setEditing(!editing);
  };

  const handleSave = async () => {
    console.log('Guardando perfil:', { token: !!token, formData });
    
    if (!token) {
      setError('No hay token de autenticación');
      return;
    }
    
    setSaving(true);
    setError(null);
    try {
      console.log('Haciendo petición a:', `${API_URL}/specialists/profile`);
      const response = await fetch(`${API_URL}/specialists/profile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          bio: formData.bio
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', response.status, errorText);
        const errorData = JSON.parse(errorText).catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Error al actualizar el perfil (${response.status})`);
      }

      console.log('Perfil actualizado correctamente');
      
      // Actualizar datos en el padre
      if (onUpdate) {
        onUpdate({
          ...especialista,
          user: {
            ...especialista?.user,
            name: formData.name
          },
          phone: formData.phone,
          bio: formData.bio
        });
      }
      
      setEditing(false);
    } catch (err) {
      console.error('Error guardando perfil:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 3 MB');
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile || !token) return;
    setUploadingAvatar(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('avatar', avatarFile);
      const r = await fetch(`${API_URL}/specialists/me/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.message || 'Error al subir la foto');
      const newUrl = data.profilePicture;
      setAvatarFile(null);
      setAvatarPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (onUpdate) {
        onUpdate({ ...especialista, profilePicture: newUrl });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  const totalAppointments = appointments.length;

  if (loading) {
    return <div className="loading">Cargando perfil...</div>;
  }

  const pictureUrl = avatarPreview
    || (especialista?.profilePicture ? buildImageUrl(especialista.profilePicture) : null);

  return (
    <div className="perfil-view">
      <div className="perfil-header-card">
        <div className="perfil-avatar-container">
          <label
            htmlFor="specialist-avatar-input"
            className="perfil-avatar-large"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current?.click();
            }}
          >
            {pictureUrl ? (
              <img
                src={pictureUrl}
                alt="Foto de perfil"
                className="perfil-avatar-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <User size={64} />
            )}
            <span className="upload-overlay" title="Cambiar foto">
              <Camera size={20} />
            </span>
          </label>
          <input
            ref={fileInputRef}
            id="specialist-avatar-input"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          {avatarFile && (
            <button
              type="button"
              className="upload-button"
              onClick={handleAvatarUpload}
              disabled={uploadingAvatar}
            >
              {uploadingAvatar ? 'Subiendo...' : <><Camera size={16} /> Guardar foto</>}
            </button>
          )}
        </div>
        <div className="perfil-header-info">
          <h2>{especialista?.user?.name || especialista?.name || 'Especialista'}</h2>
          
          <div className="biografia-display">
            <p className="perfil-specialty">
              {especialista?.bio || 'Sin biografía'}
            </p>
          </div>
          
          <div className="edit-buttons">
            <button 
              onClick={handleEditToggle} 
              className="edit-toggle-button"
              disabled={saving}
            >
              {editing ? <X size={20} /> : <Edit3 size={20} />}
              {editing ? 'Cancelar' : 'Editar'}
            </button>
            {editing && (
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="save-button"
              >
                {saving ? 'Guardando...' : <><Save size={20} /> Guardar</>}
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      <div className="perfil-content-grid">
        <div className="perfil-info-card">
          <h3>Información Personal</h3>

          <div className="info-list">
            <div className="info-item">
              <div className="info-icon">
                <Mail size={20} />
              </div>
              <div className="info-content">
                <label>Correo Electrónico</label>
                <p>{especialista?.user?.email || 'No especificado'}</p>
                <small className="info-note">No editable</small>
              </div>
            </div>

            {editing ? (
              <>
                <div className="info-item">
                  <div className="info-icon">
                    <User size={20} />
                  </div>
                  <div className="info-content">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="info-content">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Briefcase size={20} />
                  </div>
                  <div className="info-content">
                    <label>Biografía</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Tu biografía"
                      rows={3}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="info-item">
                  <div className="info-icon">
                    <User size={20} />
                  </div>
                  <div className="info-content">
                    <label>Nombre</label>
                    <p>{especialista?.user?.name || especialista?.name || 'No especificado'}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="info-content">
                    <label>Teléfono</label>
                    <p>{especialista?.phone || 'No especificado'}</p>
                  </div>
                </div>
              </>
            )}

            <div className="info-item">
              <div className="info-icon">
                <Briefcase size={20} />
              </div>
              <div className="info-content">
                <label>Estadísticas</label>
                <p>{completedAppointments} de {totalAppointments} citas completadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilView;