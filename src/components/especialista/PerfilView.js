import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Edit3, Save, X, Upload, Camera, Trash2, FileText } from 'lucide-react';
import { useAuthEspecialista } from '../../context/AuthContextEspecialista';
import './PerfilView.css';

const PerfilView = () => {
  const { token } = useAuthEspecialista();
  const [especialista, setEspecialista] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    identificacion_tributaria: '',
    biografia: '',
    phoneCode: '+504'
  });
  const [pictureFile, setPictureFile] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const PAISES = [
    { code: 'HN', name: 'Honduras', phoneCode: '+504' },
    { code: 'PA', name: 'Panamá', phoneCode: '+507' },
    { code: 'SV', name: 'El Salvador', phoneCode: '+503' }
  ];

  const CIUDADES = {
    HN: ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba'],
    PA: ['Ciudad de Panamá', 'San Miguelito', 'Tocumen', 'David'],
    SV: ['San Salvador', 'Santa Ana', 'San Miguel', 'Soyapango']
  };

  const codigosPais = [
    { codigo: '+504', pais: 'Honduras', bandera: '🇭🇳' },
    { codigo: '+503', pais: 'El Salvador', bandera: '🇸🇻' },
    { codigo: '+507', pais: 'Panamá', bandera: '🇵🇦' },
  ];

  // Función para contar palabras
  const countWords = (text) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const buildImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    let fullUrl = imagePath;
    
    if (fullUrl.startsWith('http://') || fullUrl.startsWith('https://')) {
      return fullUrl;
    }
    
    if (fullUrl.startsWith('/')) {
      fullUrl = `http://localhost:3001${fullUrl}`;
      return fullUrl;
    }
    
    if (!fullUrl.startsWith('/')) {
      fullUrl = fullUrl.replace(/^(\/)?Uploads\/especialistas\//i, '');
      
      if (!fullUrl || fullUrl.includes('.')) {
        fullUrl = `/Uploads/especialistas/${fullUrl}`;
      } else {
        if (!fullUrl.startsWith('/')) {
          fullUrl = '/' + fullUrl;
        }
      }
      
      fullUrl = `http://localhost:3001${fullUrl}`;
      return fullUrl;
    }
    
    return fullUrl;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (!token) {
          throw new Error('No hay token de autenticación');
        }

        const profileResponse = await fetch('http://localhost:3001/especialista/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!profileResponse.ok) {
          const errorData = await profileResponse.json();
          throw new Error(errorData.error || 'Error al obtener el perfil');
        }

        const profileData = await profileResponse.json();
        
        setEspecialista(profileData);

        setFormData({
          name: profileData.especialista_name || '',
          phone: profileData.especialista_phone || '',
          address: profileData.especialista_direccion || '',
          country: profileData.especialista_pais || '',
          city: profileData.especialista_ciudad || '',
          identificacion_tributaria: profileData.identificacion_tributaria || '',
          biografia: profileData.especialista_biografia || '',
          phoneCode: profileData.especialista_pais === 'Honduras' ? '+504' : 
                    profileData.especialista_pais === 'Panamá' ? '+507' : 
                    profileData.especialista_pais === 'El Salvador' ? '+503' : '+504'
        });

        if (profileData.especialista_picture) {
          const pictureUrl = buildImageUrl(profileData.especialista_picture);
          setPicturePreview(pictureUrl);
        }

        const imagesResponse = await fetch('http://localhost:3001/especialista/images', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!imagesResponse.ok) {
          const errorData = await imagesResponse.json();
          throw new Error(errorData.error || 'Error al obtener las imágenes');
        }

        const imagesData = await imagesResponse.json();
        setImages(imagesData.images);

        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'biografia') {
      const wordCount = countWords(value);
      if (wordCount > 255) {
        setError('La biografía no puede exceder 255 palabras');
        return;
      }
      setError(null);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData(prev => ({
      ...prev,
      country: selectedCountry,
      city: '', 
      phoneCode: selectedCountry === 'Honduras' ? '+504' : 
                selectedCountry === 'Panamá' ? '+507' : 
                selectedCountry === 'El Salvador' ? '+503' : '+504'
    }));
  };

  const handlePhoneCodeChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCountry = codigosPais.find(c => c.codigo === selectedCode)?.pais;
    setFormData(prev => ({
      ...prev,
      phoneCode: selectedCode,
      country: selectedCountry || prev.country
    }));
  };

  const handleEditToggle = () => {
    if (editing) {
      if (JSON.stringify(formData) !== JSON.stringify({
        name: especialista.especialista_name,
        phone: especialista.especialista_phone,
        address: especialista.especialista_direccion,
        country: especialista.especialista_pais,
        city: especialista.especialista_ciudad,
        identificacion_tributaria: especialista.identificacion_tributaria,
        biografia: especialista.especialista_biografia,
        phoneCode: especialista.especialista_pais === 'Honduras' ? '+504' : 
                  especialista.especialista_pais === 'Panamá' ? '+507' : 
                  especialista.especialista_pais === 'El Salvador' ? '+503' : '+504'
      })) {
        if (!window.confirm('Tienes cambios sin guardar. ¿Deseas descartarlos?')) {
          return;
        }
      }
    }
    setEditing(!editing);
    setPictureFile(null);
    
    if (especialista?.especialista_picture) {
      const pictureUrl = buildImageUrl(especialista.especialista_picture);
      setPicturePreview(pictureUrl);
    } else {
      setPicturePreview(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validar límite de palabras antes de guardar
      const wordCount = countWords(formData.biografia);
      if (wordCount > 255) {
        setError('La biografía no puede exceder 255 palabras');
        setSaving(false);
        return;
      }

      if (pictureFile) {
        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('picture', pictureFile);
        
        const uploadResponse = await fetch('http://localhost:3001/especialista/upload-picture', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formDataUpload,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Error al subir la foto');
        }

        const uploadData = await uploadResponse.json();
        
        const newPicturePath = uploadData.profile.especialista_picture;
        setEspecialista(prev => ({ ...prev, especialista_picture: newPicturePath }));
        const fullUrl = buildImageUrl(newPicturePath);
        setPicturePreview(fullUrl);
        setPictureFile(null);
      }

      const response = await fetch('http://localhost:3001/especialista/edit-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.phoneCode} ${formData.phone}`.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el perfil');
      }

      const data = await response.json();
      setEspecialista(prev => ({
        ...prev,
        ...data.profile,
      }));
      
      setFormData({
        name: data.profile.especialista_name || '',
        phone: data.profile.especialista_phone?.replace(/^\+\d+\s*/, '') || '',
        address: data.profile.especialista_direccion || '',
        country: data.profile.especialista_pais || '',
        city: data.profile.especialista_ciudad || '',
        identificacion_tributaria: data.profile.identificacion_tributaria || '',
        biografia: data.profile.especialista_biografia || '',
        phoneCode: data.profile.especialista_pais === 'Honduras' ? '+504' : 
                  data.profile.especialista_pais === 'Panamá' ? '+507' : 
                  data.profile.especialista_pais === 'El Salvador' ? '+503' : '+504'
      });
      
      setEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: especialista.especialista_name || '',
      phone: especialista.especialista_phone?.replace(/^\+\d+\s*/, '') || '',
      address: especialista.especialista_direccion || '',
      country: especialista.especialista_pais || '',
      city: especialista.especialista_ciudad || '',
      identificacion_tributaria: especialista.identificacion_tributaria || '',
      biografia: especialista.especialista_biografia || '',
      phoneCode: especialista.especialista_pais === 'Honduras' ? '+504' : 
                especialista.especialista_pais === 'Panamá' ? '+507' : 
                especialista.especialista_pais === 'El Salvador' ? '+503' : '+504'
    });
    setEditing(false);
    setPictureFile(null);
    
    if (especialista?.especialista_picture) {
      const pictureUrl = buildImageUrl(especialista.especialista_picture);
      setPicturePreview(pictureUrl);
    } else {
      setPicturePreview(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Solo se permiten archivos PNG, JPG y JPEG');
        e.target.value = '';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo no debe exceder 5MB');
        e.target.value = '';
        return;
      }

      setPictureFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      setError(null);
    }
  };

  const handleDeleteProfilePicture = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar tu foto de perfil?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/especialista/picture', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar la foto de perfil');
      }

      const data = await response.json();
      
      setEspecialista(prev => ({ ...prev, especialista_picture: null }));
      setPicturePreview(null);
      setPictureFile(null);

      const fileInput = document.getElementById('picture-upload');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (err) {
      setError(err.message);
    }
  };

  const handleUploadImages = async () => {
    if (imageFiles.length === 0) return;

    setUploadingImages(true);
    try {
      const formDataImages = new FormData();
      imageFiles.forEach((file, index) => {
        formDataImages.append('images', file);
      });

      const uploadResponse = await fetch('http://localhost:3001/especialista/upload-images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataImages,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Error al subir las imágenes');
      }

      const uploadData = await uploadResponse.json();

      setImages(prevImages => [...prevImages, ...uploadData.images]);
      setImageFiles([]);

      const fileInput = document.getElementById('images-upload');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        setError(`Archivo ${file.name} no válido. Solo se permiten PNG, JPG y JPEG`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`Archivo ${file.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length !== files.length) {
      e.target.value = '';
    }

    setImageFiles(validFiles);
    setError(null);
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/especialista/image/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar la imagen');
      }

      const data = await response.json();

      setImages(prevImages => prevImages.filter(img => img.id !== imageId));
      
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Cargando perfil...</div>;
  }

  return (
    <div className="perfil-view">
      <div className="perfil-header-card">
        <div className="perfil-avatar-container">
          <div className={`perfil-avatar-large ${picturePreview ? 'with-image' : ''}`}>
            {picturePreview ? (
              <img 
                src={picturePreview} 
                alt="Foto de perfil" 
                className="perfil-avatar-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <User size={64} />
            )}
            {editing && (
              <label htmlFor="picture-upload" className="upload-overlay">
                <Camera size={24} />
                <input
                  id="picture-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
          {editing && pictureFile && (
            <p className="preview-note">Foto seleccionada. Se subirá al guardar.</p>
          )}
        </div>
        <div className="perfil-header-info">
          <h2>{especialista?.especialista_name || 'Especialista'}</h2>
          
          {/* Biografía en el header */}
          {editing ? (
            <div className="biografia-edit-container">
              <label className="biografia-label">Biografía (máx. 255 palabras)</label>
              <div className="biografia-input-wrapper">
                <textarea
                  name="biografia"
                  value={formData.biografia}
                  onChange={handleInputChange}
                  className="edit-biografia-textarea"
                  placeholder="Escribe tu biografía aquí (máximo 255 palabras)"
                  rows={3}
                  maxLength={1000} // Límite de caracteres para prevenir abuso, pero validamos por palabras
                />
                <div className="word-count">
                  {countWords(formData.biografia)} / 255 palabras
                </div>
              </div>
            </div>
          ) : (
            <div className="biografia-display">
              <p className="perfil-specialty">
                {especialista?.especialista_biografia ? 
                 especialista.especialista_biografia : 
                 'Sin Biografía Disponible'}
              </p>
            </div>
          )}
          
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
              <>
                <button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="save-button"
                >
                  {saving ? 'Guardando...' : <><Save size={20} /> Guardar</>}
                </button>
                {especialista?.especialista_picture && (
                  <button 
                    onClick={handleDeleteProfilePicture} 
                    disabled={saving}
                    className="delete-picture-button"
                  >
                    <Trash2 size={20} /> Eliminar Imagen
                  </button>
                )}
              </>
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
                <p>{especialista?.especialista_email || 'No especificado'}</p>
                {!editing && <small className="info-note">No editable</small>}
              </div>
            </div>

            {editing ? (
              <>
                <div className="info-item">
                  <div className="info-icon">
                    <User size={20} />
                  </div>
                  <div className="info-content">
                    <label>Nombre Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="info-content">
                    <label>Teléfono</label>
                    <div className="phone-input-container">
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handlePhoneCodeChange}
                        className="phone-code-select"
                      >
                        {codigosPais.map((codigo) => (
                          <option key={codigo.codigo} value={codigo.codigo}>
                            {codigo.bandera} {codigo.codigo} ({codigo.pais})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="phone-number-input"
                        placeholder="Número de teléfono"
                      />
                    </div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Tu dirección completa"
                    />
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <label>País</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleCountryChange}
                      className="edit-select"
                    >
                      <option value="">Selecciona un país</option>
                      {PAISES.map((pais) => (
                        <option key={pais.code} value={pais.name}>
                          {pais.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <label>Ciudad</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="edit-select"
                      disabled={!formData.country}
                    >
                      <option value="">Selecciona una ciudad</option>
                      {formData.country && CIUDADES[PAISES.find(p => p.name === formData.country)?.code || '']?.map((ciudad, index) => (
                        <option key={index} value={ciudad}>
                          {ciudad}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Briefcase size={20} />
                  </div>
                  <div className="info-content">
                    <label>Identificación Tributaria</label>
                    <input
                      type="text"
                      name="identificacion_tributaria"
                      value={formData.identificacion_tributaria}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Tu identificación tributaria"
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
                    <label>Nombre Completo</label>
                    <p>{especialista?.especialista_name}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="info-content">
                    <label>Teléfono</label>
                    <p>{especialista?.especialista_phone || 'No especificado'}</p>
                  </div>
                </div>

                {especialista?.especialista_direccion && (
                  <div className="info-item">
                    <div className="info-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="info-content">
                      <label>Dirección</label>
                      <p>{especialista?.especialista_direccion}</p>
                    </div>
                  </div>
                )}

                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <label>País</label>
                    <p>{especialista?.especialista_pais || 'No especificado'}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <label>Ciudad</label>
                    <p>{especialista?.especialista_ciudad || 'No especificado'}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Briefcase size={20} />
                  </div>
                  <div className="info-content">
                    <label>Identificación Tributaria</label>
                    <p>{especialista?.identificacion_tributaria || 'No especificado'}</p>
                  </div>
                </div>
              </>
            )}

            <div className="info-item">
              <div className="info-icon">
                <Briefcase size={20} />
              </div>
              <div className="info-content">
                <label>Especialidad</label>
                <p>{especialista?.specialty || 'No especificada'}</p>
                {!editing && <small className="info-note">No editable</small>}
              </div>
            </div>
          </div>
        </div>

        <div className="perfil-images-card">
          <h3>Imágenes ({images.length}/10)</h3>
          <div className="images-grid">
            {images.map((img) => (
              <div key={img.id} className="image-item">
                <img 
                  src={img.image_route} 
                  alt="Imagen del especialista" 
                  className="gallery-image"
                  onError={(e) => {
                    e.target.style.opacity = '0.5';
                  }}
                />
                {editing && (
                  <button 
                    onClick={() => handleDeleteImage(img.id)} 
                    className="delete-image-button"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {editing && images.length < 10 && (
            <div className="upload-images-section">
              <label htmlFor="images-upload" className="upload-images-label">
                <Upload size={24} />
                <span>Arrastra o selecciona imágenes (máx {10 - images.length})</span>
                <input
                  id="images-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  multiple
                  onChange={handleImageFilesChange}
                  style={{ display: 'none' }}
                />
              </label>
              {imageFiles.length > 0 && (
                <button 
                  onClick={handleUploadImages} 
                  disabled={uploadingImages}
                  className="upload-button"
                >
                  {uploadingImages ? 'Subiendo...' : <><Upload size={16} /> Subir Imágenes ({imageFiles.length})</>}
                </button>
              )}
            </div>
          )}
          {images.length >= 10 && editing && (
            <div className="limit-reached">
              <p>Has alcanzado el límite máximo de 10 imágenes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilView;