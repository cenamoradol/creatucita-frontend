import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, Scissors, Wrench, Stethoscope, Star, Users, Calendar, Shield, CheckCircle, ArrowRight, Play, MapPin, Award, Clock, TrendingUp, Quote, Car, Home as HomeIcon } from 'lucide-react';
import '../pages/Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categorias = [
    {
      nombre: 'Salud',
      icono: <Stethoscope size={48} />,
      descripcion: 'Servicios médicos y de bienestar',
      ruta: '/salud',
      color: '#4CAF50'
    },
    {
      nombre: 'Estética',
      icono: <Scissors size={48} />,
      descripcion: 'Belleza y cuidado personal',
      ruta: '/estetica',
      color: '#E91E63'
    },
    {
      nombre: 'Legal',
      icono: <Scale size={48} />,
      descripcion: 'Asesoría y servicios legales',
      ruta: '/legal',
      color: '#2196F3'
    },
    {
      nombre: 'Hogar',
      icono: <HomeIcon size={48} />,
      descripcion: 'Reparaciones y mantenimiento del hogar',
      ruta: '/hogar',
      color: '#FF9800'
    },
    {
      nombre: 'Automotriz',
      icono: <Car size={48} />,
      descripcion: 'Servicios mecánicos y automotrices',
      ruta: '/automotriz',
      color: '#607D8B'
    },
    {
      nombre: 'Veterinaria',
      icono: <Heart size={48} />,
      descripcion: 'Cuidado de mascotas',
      ruta: '/veterinaria',
      color: '#9C27B0'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Profesionales' },
    { number: '50,000+', label: 'Citas Agendadas' },
    { number: '4.9/5', label: 'Calificación' }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Busca el Servicio',
      description: 'Explora nuestras categorías y encuentra el profesional que necesitas',
      icon: <Users size={32} />
    },
    {
      step: 2,
      title: 'Selecciona Fecha y Hora',
      description: 'Escoge el horario que mejor se ajuste a tu disponibilidad',
      icon: <Calendar size={32} />
    },
    {
      step: 3,
      title: 'Confirma tu Cita',
      description: 'Completa los datos y recibe confirmación instantánea',
      icon: <CheckCircle size={32} />
    },
    {
      step: 4,
      title: 'Asiste a tu Cita',
      description: 'Recibe recordatorios y disfruta de un servicio profesional',
      icon: <Award size={32} />
    }
  ];

  const testimonials = [
    {
      name: 'María Rodríguez',
      role: 'Clienta Frecuente',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'La mejor plataforma para agendar citas. He encontrado profesionales excelentes y el proceso es super rápido.'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Usuario Verificado',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'Increíble servicio. Agendé mi cita médica en menos de 2 minutos y todo salió perfecto. Muy recomendado.'
    },
    {
      name: 'Ana Gómez',
      role: 'Cliente Satisfecha',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'Excelente plataforma. Los profesionales son verificados y de alta calidad. Ya he agendado varias citas.'
    }
  ];

  const cities = [
    { name: 'San Pedro Sula', count: '2,500+ profesionales' },
    { name: 'Tegucigalpa', count: '3,200+ profesionales' },
    { name: 'La Ceiba', count: '1,800+ profesionales' },
    { name: 'Choloma', count: '1,200+ profesionales' },
    { name: 'El Progreso', count: '900+ profesionales' },
    { name: 'Comayagua', count: '750+ profesionales' }
  ];

  const featuredProfessionals = [
    {
      name: 'Dr. Roberto Fernández',
      specialty: 'Medicina General',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 234,
      city: 'San Pedro Sula',
      verified: true
    },
    {
      name: 'Dra. Patricia López',
      specialty: 'Dermatología',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5.0,
      reviews: 189,
      city: 'Tegucigalpa',
      verified: true
    },
    {
      name: 'Lic. Manuel Castro',
      specialty: 'Asesoría Legal',
      image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 156,
      city: 'San Pedro Sula',
      verified: true
    },
    {
      name: 'Estilista Laura Martínez',
      specialty: 'Belleza y Estética',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 312,
      city: 'La Ceiba',
      verified: true
    }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Shield size={16} />
              <span>Plataforma 100% Segura y Verificada</span>
            </div>

            <h1 className="hero-title">
              Agenda tus citas con
              <span className="hero-title-highlight"> profesionales certificados</span>
            </h1>

            <p className="hero-subtitle">
              Conectamos a miles de usuarios con los mejores profesionales en salud, estética, servicios legales y más. Agenda en minutos, confirma al instante.
            </p>

            <div className="hero-actions">
              <Link to="/busqueda" className="hero-button hero-button-primary">
                <span>Buscar Servicios</span>
                <ArrowRight size={20} />
              </Link>
              <button className="hero-button hero-button-secondary">
                <div className="play-icon">
                  <Play size={18} fill="currentColor" />
                </div>
                <span>Cómo Funciona</span>
              </button>
            </div>

            <div className="hero-features">
              <div className="hero-feature">
                <CheckCircle size={20} />
                <span>Sin costos ocultos</span>
              </div>
              <div className="hero-feature">
                <CheckCircle size={20} />
                <span>Confirmación instantánea</span>
              </div>
              <div className="hero-feature">
                <CheckCircle size={20} />
                <span>Cancela gratis</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-container">
              <img
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Profesional atendiendo cliente"
                className="hero-main-image"
              />
              <div className="hero-floating-card hero-card-1">
                <div className="floating-card-icon">
                  <Calendar size={24} />
                </div>
                <div className="floating-card-content">
                  <div className="floating-card-title">Cita Confirmada</div>
                  <div className="floating-card-subtitle">Hoy a las 3:00 PM</div>
                </div>
                <CheckCircle size={20} className="floating-card-check" />
              </div>
              <div className="hero-floating-card hero-card-2">
                <div className="floating-card-icon">
                  <Star size={24} fill="currentColor" />
                </div>
                <div className="floating-card-content">
                  <div className="floating-card-title">Calificación</div>
                  <div className="floating-card-subtitle">4.9/5 Promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map((stat, index) => (
            <div key={index} className="hero-stat">
              <div className="hero-stat-number">{stat.number}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">¿Cómo Funciona?</h2>
          <p className="section-subtitle">
            Agenda tu cita en 4 simples pasos
          </p>

          <div className="steps-grid">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-icon-wrapper">
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-number">Paso {step.step}</div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="professionals-section">
        <div className="container">
          <div className="section-header-with-action">
            <div>
              <h2 className="section-title">Profesionales Destacados</h2>
              <p className="section-subtitle">
                Conoce a algunos de nuestros mejores profesionales
              </p>
            </div>
            <Link to="/busqueda" className="view-all-link">
              Ver todos
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="professionals-grid">
            {featuredProfessionals.map((professional, index) => (
              <div key={index} className="professional-card">
                <div className="professional-image-wrapper">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="professional-image"
                  />
                  {professional.verified && (
                    <div className="verified-badge">
                      <CheckCircle size={16} />
                    </div>
                  )}
                </div>
                <div className="professional-info">
                  <h3 className="professional-name">{professional.name}</h3>
                  <p className="professional-specialty">{professional.specialty}</p>
                  <div className="professional-meta">
                    <div className="professional-rating">
                      <Star size={16} fill="currentColor" />
                      <span>{professional.rating}</span>
                      <span className="professional-reviews">({professional.reviews})</span>
                    </div>
                    <div className="professional-location">
                      <MapPin size={14} />
                      <span>{professional.city}</span>
                    </div>
                  </div>
                  <button className="professional-button">
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">¿Por qué CreaTuCita.com?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-modern">
                <Clock size={32} />
              </div>
              <h3>Ahorra Tiempo</h3>
              <p>Agenda tu cita en menos de 2 minutos desde cualquier dispositivo</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-modern">
                <Shield size={32} />
              </div>
              <h3>Profesionales Verificados</h3>
              <p>Todos nuestros profesionales están certificados y verificados</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-modern">
                <CheckCircle size={32} />
              </div>
              <h3>Confirmación Instantánea</h3>
              <p>Recibe confirmación inmediata y recordatorios de tu cita</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-modern">
                <Calendar size={32} />
              </div>
              <h3>Gestión Fácil</h3>
              <p>Modifica o cancela tus citas fácilmente desde tu panel</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Lo Que Dicen Nuestros Usuarios</h2>
          <p className="section-subtitle">
            Miles de personas confían en CreaTuCita.com
          </p>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote">
                  <Quote size={40} />
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-author-info">
                    <div className="testimonial-author-name">{testimonial.name}</div>
                    <div className="testimonial-author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cities-section">
        <div className="container">
          <h2 className="section-title">Disponible en Múltiples Ciudades</h2>
          <p className="section-subtitle">
            Encuentra profesionales en tu ciudad
          </p>

          <div className="cities-grid">
            {cities.map((city, index) => (
              <div key={index} className="city-card">
                <MapPin size={28} />
                <h3 className="city-name">{city.name}</h3>
                <p className="city-count">{city.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para Agendar tu Cita?</h2>
            <p className="cta-subtitle">
              Únete a miles de usuarios satisfechos que ya están usando CreaTuCita.com
            </p>
            <div className="cta-actions">
              <Link to="/busqueda" className="cta-button cta-button-primary">
                <span>Buscar Servicios</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="cta-button cta-button-secondary">
                <span>Crear Cuenta</span>
              </Link>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Gratis para usuarios</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Sin compromiso</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
