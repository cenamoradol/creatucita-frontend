import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import './AgendarCita.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RnmpxQshHvC6Zy5Ei1JaVU6OejVuu9QnHL1MTccG7hdBmC6nEGgtGajAR1ZK4OsTBi1afjzgvfUzyfw78timoRx00ffkqrRqP');

const AgendarCita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardError, setCardError] = useState('');
  const [cardComplete, setCardComplete] = useState(false);
  
  // Estados para el formulario
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [notas, setNotas] = useState('');
  const [availableDays, setAvailableDays] = useState([]); 
  const [availableTimes, setAvailableTimes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showCalendar, setShowCalendar] = useState(false);
  const [monthAvailability, setMonthAvailability] = useState({}); 
  const [loadingAvailability, setLoadingAvailability] = useState(false); 
  
  // Obtener fecha actual para validaciones
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Estado para el modal de imágenes
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    currentImage: null,
    currentIndex: 0
  });

  // Refs
  const stripeFormRef = useRef(null);
  const calendarRef = useRef(null);
  const cardElementRef = useRef(null);
  
  // Iniciar Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripeInstance = await stripePromise;
        if (stripeInstance) {
          setStripe(stripeInstance);
        }
      } catch (error) {
        console.error('Error al iniciar Stripe:', error);
      }
    };

    initializeStripe();
  }, []);

  // Obtener información del especialista
  useEffect(() => {
    if (!id) {
      setError('ID de especialista no válido');
      setLoading(false);
      return;
    }

    const fetchEspecialista = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/specialists/${id}`);
        const spec = response.data;

        // Also fetch booking-info to get appointmentDuration and minAdvanceBooking
        let appointmentDuration = 30;
        let minAdvanceBooking = 4;
        try {
          const bookingRes = await axios.get(`${import.meta.env.VITE_API_URL}/specialists/${id}/booking-info`);
          if (bookingRes.data) {
            appointmentDuration = bookingRes.data.appointmentDuration || 30;
            minAdvanceBooking = bookingRes.data.minAdvanceBooking || 4;
          }
        } catch (e) {
          console.warn('Could not load booking-info, using defaults');
        }

        const mappedServicio = {
          especialistaid: spec.id,
          especialista_name: spec.user?.name || 'Especialista',
          especialista_specialty: spec.subcategories && spec.subcategories.length > 0 && spec.subcategories[0].category
            ? spec.subcategories[0].category.name
            : 'Especialista General',
          especialista_ciudad: spec.clinicAddress || 'No especificada',
          especialista_pais: spec.user?.location_country || '',
          especialista_picture: spec.user?.picture ? `/Uploads/${spec.user.picture}` : null,
          imagenes: [spec.user?.picture ? `/Uploads/${spec.user.picture}` : null].filter(Boolean),
          descripcion: spec.bio || 'Sin descripción.',
          schedules: spec.schedules || [],
          offeredServices: spec.offeredServices || [],
          appointmentDuration,
          minAdvanceBooking,
        };

        setServicio(mappedServicio);

        // Auto-seleccionar el primer servicio si solo hay uno
        if (spec.offeredServices && spec.offeredServices.length === 1) {
          setSelectedService(spec.offeredServices[0]);
        }

        // Procesar días disponibles
        const diasDisponibles = processAvailableDays(spec.schedules);
        setAvailableDays(diasDisponibles);

      } catch (err) {
        console.error('Error al cargar especialista:', err);
        setError('No se pudo cargar la información del especialista');
        setLoading(false);
      }
    };

    fetchEspecialista();
  }, [id]);

  // [TEMPORAL] Integración de Stripe deshabilitada hasta que el backend la soporte
  useEffect(() => {
    /*
    const createPaymentIntent = async () => { ... }
    createPaymentIntent();
    */
  }, [selectedDate, selectedTime, servicio, stripe]);
  
  // PROCESAR DÍAS DISPONIBLES
  const processAvailableDays = (schedules) => {
    if (!schedules || schedules.length === 0) {
      console.log('No hay horarios disponibles');
      return [];
    }
    
    // Extraer días únicos (0=Domingo, 1=Lunes, etc. según el backend y JavaScript)
    const uniqueDays = [...new Set(schedules.filter(s => s.isActive !== false).map(s => s.dayOfWeek))];
    
    // Mapeo de JavaScript day a nuestro adjustedDayNumber (0=Lunes, 6=Domingo)
    const jsDayToAdjustedDay = {
      1: 0, // Lunes
      2: 1, // Martes
      3: 2, // Miércoles
      4: 3, // Jueves
      5: 4, // Viernes
      6: 5, // Sábado
      0: 6  // Domingo
    };
    
    // Mapeo para mostrar al usuario (Lunes=0, Domingo=6)
    const displayNamesAdjusted = {
      0: { name: 'Lunes', short: 'L', number: 0 },
      1: { name: 'Martes', short: 'M', number: 1 },
      2: { name: 'Miércoles', short: 'M', number: 2 },
      3: { name: 'Jueves', short: 'J', number: 3 },
      4: { name: 'Viernes', short: 'V', number: 4 },
      5: { name: 'Sábado', short: 'S', number: 5 },
      6: { name: 'Domingo', short: 'D', number: 6 }
    };

    const diasDisponibles = uniqueDays.map(jsDay => {
      const adjustedDayNumber = jsDayToAdjustedDay[jsDay];
      if (adjustedDayNumber === undefined) return null;
      
      return {
        adjustedDayNumber: adjustedDayNumber,
        dayNumber: adjustedDayNumber, 
        spanishName: displayNamesAdjusted[adjustedDayNumber].name,
        shortName: displayNamesAdjusted[adjustedDayNumber].short,
        displayNumber: displayNamesAdjusted[adjustedDayNumber].number,
      };
    }).filter(Boolean);
    
    return diasDisponibles;
  };

  // Obtener días del mes actual
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Obtener el primer día de la semana del mes
  const getFirstDayOfMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    
    let adjustedDay;
    if (firstDay === 0) {
      adjustedDay = 6;
    } else {
      adjustedDay = firstDay - 1;
    }
    
    return adjustedDay;
  };

  const isPastDate = (dayObj) => {
    if (!dayObj) return false;

    const selectedDate = new Date(currentYear, currentMonth, dayObj.day);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate < today;
  };

  // Check if a day has enough advance time per specialist's minAdvanceBooking
  const isBeforeAdvanceDate = (dayObj) => {
    if (!dayObj || !servicio) return false;
    const hours = servicio.minAdvanceBooking || 4;
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + hours);
    const selectedDate = new Date(currentYear, currentMonth, dayObj.day);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
  };

  const isPastMonth = () => {
    const currentDate = new Date();
    return currentYear < currentDate.getFullYear() || 
           (currentYear === currentDate.getFullYear() && currentMonth < currentDate.getMonth());
  };

  // Generar matriz de días para el calendario
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayAdjusted = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    for (let i = 0; i < firstDayAdjusted; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const jsDayOfWeek = date.getDay(); 
      
      // Convertir el día de JavaScript a  formato ajustado (Lunes=0, Domingo=6)
      let adjustedDayOfWeek;
      if (jsDayOfWeek === 0) {
        adjustedDayOfWeek = 6; // Domingo = 6
      } else {
        adjustedDayOfWeek = jsDayOfWeek - 1; 
      }
            
      // Verificar si este día está disponible 
      let isAvailable = availableDays.some(availableDay => 
        availableDay.adjustedDayNumber === adjustedDayOfWeek
      );
      
      // Verificar si el día es pasado
      const isPast = isPastDate({ day });
      // Verificar si no tiene suficiente anticipación
      const isBeforeAdvance = isBeforeAdvanceDate({ day });

      // Si monthAvailability ya cargó para esta fecha, usarlo para refinar
      // Si aún no cargó (undefined), dejar el día disponible según el horario del especialista
      const dateKey = date.toISOString().split('T')[0];
      if (monthAvailability[dateKey] === false) {
        isAvailable = false; // Solo bloquear si sabemos con certeza que no hay slots
      }
      const isSelectable = isAvailable && !isPast && !isBeforeAdvance;

      // Mapeo para mostrar al usuario (ajustado para Lunes=0)
      const displayNamesAdjusted = {
        0: 'Lunes', 1: 'Martes', 2: 'Miércoles', 3: 'Jueves',
        4: 'Viernes', 5: 'Sábado', 6: 'Domingo'
      };

      const dayNameSpanish = displayNamesAdjusted[adjustedDayOfWeek];

      const dayObj = {
        day,
        date: date.toISOString().split('T')[0],
        isAvailable,
        isPast,
        isSelectable,
        jsDayOfWeek,
        adjustedDayOfWeek,
        dayOfWeekSpanish: dayNameSpanish,
        isToday: date.toDateString() === today.toDateString()
      };
      days.push(dayObj);
    }
    
    // Completar con días del siguiente mes si es necesario (para 6x7 grid)
    while (days.length < 42) {
      days.push(null);
    }
    return days;
  };

  // Fetch de disponibilidad para el mes completo (al cambiar mes/año)
  useEffect(() => {
    if (servicio?.especialistaid && availableDays.length > 0) {
      const fetchMonthAvailability = async () => {
        setLoadingAvailability(true);
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const potentialDates = [];
        for (let day = 1; day <= daysInMonth; day++) {
          const dateObj = new Date(currentYear, currentMonth, day);
          if (dateObj < today) continue; 

          const jsDayOfWeek = dateObj.getDay(); // 0=Domingo, 1=Lunes, ...
          const adjustedDayOfWeek = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1; // Lunes=0, Domingo=6

          if (availableDays.some(d => d.adjustedDayNumber === adjustedDayOfWeek)) {
            const dateStr = dateObj.toISOString().split('T')[0];
            potentialDates.push(dateStr);
          }
        }

        // Fetch en paralelo usando el nuevo backend
        const responses = await Promise.all(
          potentialDates.map(date =>
            axios.get(`${import.meta.env.VITE_API_URL}/specialists/${servicio.especialistaid}/availability?date=${date}`)
              .then(res => ({ date, hasAvailableSlots: res.data && res.data.length > 0 }))
              .catch(() => ({ date, hasAvailableSlots: false }))
          )
        );

        const availabilityMap = responses.reduce((acc, { date, hasAvailableSlots }) => {
          acc[date] = hasAvailableSlots;
          return acc;
        }, {});

        setMonthAvailability(availabilityMap);
        setLoadingAvailability(false);
      };

      fetchMonthAvailability();
    }
  }, [currentMonth, currentYear, servicio?.especialistaid, availableDays]);

  // Actualizar horas disponibles cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate && servicio?.especialistaid) {      
      const fetchAvailableTimes = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/specialists/${servicio.especialistaid}/availability?date=${selectedDate}`);
          
          // Mapear del formato [{start: "08:00:00", end: "08:30:00"}] a solo la hora de inicio en string para el select
          const times = response.data.map(slot => {
            const timeWithoutSeconds = slot.start.substring(0, 5); // ej. "08:00"
            return timeWithoutSeconds;
          });
          
          setAvailableTimes(times);

          if (times.length === 0) {
            alert('No hay horas disponibles para este día (todas ocupadas). Por favor selecciona otro.');
            setSelectedDate('');
            setSelectedTime('');
          }
        } catch (err) {
          console.error('Error al obtener horas disponibles:', err);
          setAvailableTimes([]);
          alert('Error al cargar horas disponibles. Intenta de nuevo.');
        }
      };

      fetchAvailableTimes();
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, servicio?.especialistaid]);

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      const currentDate = new Date();
      let newMonth = currentMonth;
      let newYear = currentYear;
      
      if (currentMonth === 0) {
        newMonth = 11;
        newYear = currentYear - 1;
      } else {
        newMonth = currentMonth - 1;
      }
      
      // Solo permitir navegación hacia atrás si el nuevo mes no es pasado
      const isNewMonthPast = newYear < currentDate.getFullYear() || 
                            (newYear === currentDate.getFullYear() && newMonth < currentDate.getMonth());
      
      if (isNewMonthPast) {
        return;
      }
      
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Manejar selección de fecha
  const handleDateSelect = (day) => {    
    if (day && day.isSelectable && monthAvailability[day.date]) {
      setSelectedDate(day.date);
      setShowCalendar(false);
    } else if (day && !monthAvailability[day.date]) {
      alert('Este día no tiene horas disponibles (todas ocupadas). Selecciona otro.');
    }
  };

  // Formatear nombre del mes
  const getMonthName = (month) => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[month];
  };
  
  // Convertir hora de 12h a 24h para el backend
  const convertTo24Hour = (time12h) => {
    const [time, period] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'pm' && hours !== 12) {
      hours += 12;
    }
    if (period === 'am' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Montar elementos de Stripe
  useEffect(() => {
    if (elements && stripe && cardElementRef.current) {
      const cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
          },
          complete: {
            iconColor: '#66bb6a',
          },
          invalid: {
            color: '#9e2146',
          },
        },
        hidePostalCode: true,
      });

      cardElement.mount(cardElementRef.current);

      // Manejar cambios en el elemento de tarjeta
      cardElement.on('change', (event) => {
        setCardError(event.error ? event.error.message : '');
        setCardComplete(event.complete);
        setPaymentMethod(event.complete ? 'card' : null);
        
        const displayError = document.getElementById('card-errors');
        if (displayError) {
          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = '';
          }
        }
      });

      // Manejar foco en el elemento de tarjeta
      cardElement.on('focus', () => {
        setCardError('');
      });

      return () => {
        cardElement.unmount();
      };
    }
  }, [elements, stripe]);

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Funciones para el modal de imágenes
  const openImageModal = (image, index) => {
    setImageModal({
      isOpen: true,
      currentImage: image,
      currentIndex: index
    });
  };
  
  const closeImageModal = () => {
    setImageModal({
      isOpen: false,
      currentImage: null,
      currentIndex: 0
    });
  };
  
  const navigateImages = (direction) => {
    if (!servicio?.imagenes) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = imageModal.currentIndex + 1;
      if (newIndex >= servicio.imagenes.length) {
        newIndex = 0;
      }
    } else {
      newIndex = imageModal.currentIndex - 1;
      if (newIndex < 0) {
        newIndex = servicio.imagenes.length - 1;
      }
    }
    
    setImageModal({
      ...imageModal,
      currentImage: servicio.imagenes[newIndex],
      currentIndex: newIndex
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Debes estar logueado para agendar una cita');
      navigate('/login');
      return;
    }
    
    if (!selectedDate || !selectedTime) {
      toast.error('Debes seleccionar fecha y hora');
      return;
    }

    if (!selectedService) {
      toast.error('Debes seleccionar un servicio');
      return;
    }

    try {
      setPaymentLoading(true);
      const token = user?.access_token || localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments`, 
        {
          specialistId: servicio.especialistaid,
          date: selectedDate,
          startTime: `${selectedTime}:00`,
          notes: notas || motivo,
          serviceId: selectedService.id,
          price: parseFloat(selectedService.price)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data) {
        toast.success('¡Cita agendada exitosamente!');
        navigate('/citas-pendientes');
      }
    } catch (err) {
      console.error('Error al agendar cita:', err);
      toast.error(err.response?.data?.message || 'Error al agendar la cita. Por favor intenta de nuevo.');
    } finally {
      setPaymentLoading(false);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!imageModal.isOpen) return;
      
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImages('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImages('next');
      }
    };
    
    if (imageModal.isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [imageModal.isOpen, imageModal.currentIndex, servicio?.imagenes]);

  if (loading) {
    return (
      <div className="agendar-cita-container">
        <div className="loading">Cargando información del servicio...</div>
      </div>
    );
  }
  
  if (error || !servicio) {
    return (
      <div className="agendar-cita-container">
        <div className="error">{error || 'No se pudo cargar la información'}</div>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();
  
  let displayDate = '';
  if (selectedDate) {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    displayDate = localDate.toLocaleDateString('es-ES');
  }
  
  const isCurrentMonthPast = isPastMonth();
  const shouldShowPayment = selectedDate && selectedTime;
  
  return (
    <div className="agendar-cita-container">
      <div className="agendar-cita-header">
        <h1>Agendar Cita</h1>
        <button 
          onClick={() => navigate(-1)} 
          className="btn-cancelar-cita"
        >
          ← Volver
        </button>
      </div>
      
      <div className="agendar-cita-content">
        <div className="especialista-info">
          <div className="especialista-header">
            <img 
              src={`${import.meta.env.VITE_API_URL}${servicio.especialista_picture}`} 
              alt={servicio.especialista_name}
              className="especialista-picture"
              onError={(e) => {
                e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadJ-YmNxJTg6v9iO22fzR_65KenYJHFB5zg&se';
              }}
            />
            <div className="especialista-details">
              <h2>{servicio.especialista_name}</h2>
              <p className="specialty">{servicio.especialista_specialty}</p>
              <p className="location">
                {servicio.especialista_ciudad}, {servicio.especialista_pais}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                {servicio.appointmentDuration ? (
                  <span style={{ fontSize: 11, backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: 12, fontWeight: 600 }}>
                    Citas de {servicio.appointmentDuration} min
                  </span>
                ) : null}
                {servicio.minAdvanceBooking ? (
                  <span style={{ fontSize: 11, backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: 12, fontWeight: 600 }}>
                    {servicio.minAdvanceBooking >= 24
                      ? `Reservar con ${servicio.minAdvanceBooking / 24} día(s)`
                      : `Reservar con ${servicio.minAdvanceBooking}h de anticipación`}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          
          <div className="biografia">
            <h3>Biografía</h3>
            <p>{servicio.especialista_biografia || 'No hay biografía disponible.'}</p>
          </div>
          
          {/* Imágenes adicionales */}
          {servicio.imagenes && servicio.imagenes.length > 0 ? (
            <div className="imagenes-container">
              <h3>Imágenes</h3>
              <div className="imagenes-grid">
                {servicio.imagenes.map((image, index) => (
                  <div 
                    key={index} 
                    className="imagen-wrapper"
                    onClick={() => openImageModal(image, index)}
                  >
                    <img 
                      src={`${import.meta.env.VITE_API_URL}${image}`}
                      alt={`Imagen ${index + 1}`}
                      className="imagen-adicional"
                      onError={(e) => {
                        e.target.src = '/default-image.png';
                      }}
                    />
                    <div className="imagen-overlay">
                      <span className="zoom-icon">🔍</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="sin-imagenes">
              <p>Sin imágenes disponibles</p>
            </div>
          )}
        </div>
        
        <div className="servicio-info-agendar">
          <h3>Detalles del Especialista</h3>
          <div className="servicio-details">
            <div className="detail-item">
              <strong>Días Disponibles:</strong> 
              {availableDays.length > 0 ? (
                availableDays.map((dia, index) => (
                  <span key={index} className="available-day-tag">
                    {dia.spanishName}
                  </span>
                ))
              ) : (
                <span className="no-availability">No hay horarios disponibles</span>
              )}
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="agendar-form" ref={stripeFormRef}>
          {/* SELECTOR DE SERVICIO */}
          <div className="form-group">
            <label htmlFor="servicio-select">Servicio a Agendar: <span style={{color:'red'}}>*</span></label>
            {servicio.offeredServices && servicio.offeredServices.length > 0 ? (
              <div className="service-cards-selector">
                {servicio.offeredServices.map(svc => (
                  <div
                    key={svc.id}
                    className={`service-card-option ${selectedService?.id === svc.id ? 'selected' : ''}`}
                    onClick={() => setSelectedService(svc)}
                  >
                    <span className="svc-name">{svc.specialties}</span>
                    <span className="svc-price">L.{parseFloat(svc.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-services-msg">⚠️ Este especialista aún no tiene servicios publicados.</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="fecha">Fecha de la Cita:</label>
            <div className="date-input-container" ref={calendarRef}>
              <input
                type="text"
                id="fecha"
                value={displayDate}
                onClick={() => setShowCalendar(!showCalendar)}
                placeholder="Selecciona una fecha"
                readOnly
                className="date-input"
                required
              />
              <span className="calendar-icon">📅</span>
              
              {showCalendar && (
                <div className="calendar-container">
                  {loadingAvailability ? (
                    <div className="loading">Cargando disponibilidad de días...</div>
                  ) : (
                    <>
                      <div className="calendar-header">
                        <button 
                          type="button" 
                          className={`nav-btn month-nav ${isCurrentMonthPast ? 'disabled' : ''}`} 
                          onClick={() => navigateMonth('prev')}
                          disabled={isCurrentMonthPast}
                          title={isCurrentMonthPast ? 'No se pueden navegar meses pasados' : 'Mes anterior'}
                        >
                          ‹
                        </button>
                        <div className="month-year">
                          {getMonthName(currentMonth)} {currentYear}
                        </div>
                        <button 
                          type="button" 
                          className="nav-btn month-nav" 
                          onClick={() => navigateMonth('next')}
                        >
                          ›
                        </button>
                      </div>
                      
                      <div className="calendar-weekdays">
                        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                          <div key={index} className="weekday">{day}</div>
                        ))}
                      </div>
                      
                      <div className="calendar-days">
                        {calendarDays.map((day, index) => (
                          <div
                            key={index}
                            className={`
                              calendar-day
                              ${day ? '' : 'empty'}
                              ${day?.isPast ? 'past' : ''}
                              ${day?.isAvailable ? 'available' : 'unavailable'}
                              ${day?.isToday ? 'today' : ''}
                              ${selectedDate === day?.date ? 'selected' : ''}
                              ${!day?.isSelectable ? 'disabled' : ''}
                            `}
                            onClick={() => handleDateSelect(day)}
                            title={day ? 
                              (day.isPast ? 
                                `Día pasado: ${day.dayOfWeekSpanish}` : 
                                (day.isSelectable ? 
                                  `Disponible: ${day.dayOfWeekSpanish}` : 
                                  `No disponible: ${day.dayOfWeekSpanish}`
                                )
                              ) : 
                              'Sin día'
                            }
                          >
                            {day ? day.day : ''}
                          </div>
                        ))}
                      </div>
                      
                      <div className="calendar-legend">
                        <div className="legend-item">
                          <span className="legend-dot available"></span>
                          <span>Día disponible</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot past"></span>
                          <span>Día pasado</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot unavailable"></span>
                          <span>Día no disponible</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="hora">Hora:</label>
            <select 
              id="hora" 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={!selectedDate}
              required
            >
              <option value="">Selecciona una hora</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="motivo">Motivo de la Consulta:</label>
            <textarea
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Describe el motivo de tu consulta..."
              rows="3"
              required
            />
          </div>

          {/* NOTA DE PAGO - Sin Stripe temporalmente */}
          {shouldShowPayment && (
            <div className="form-group payment-section">
              <div className="payment-summary">
                <div className="summary-item">
                  <span>Servicio:</span>
                  <strong>{selectedService ? selectedService.specialties : 'No seleccionado'}</strong>
                </div>
                <div className="summary-item">
                  <span>Fecha:</span>
                  <strong>{displayDate}</strong>
                </div>
                <div className="summary-item">
                  <span>Hora:</span>
                  <strong>{selectedTime || 'Pendiente'}</strong>
                </div>
                <div className="summary-item total">
                  <span>Total a pagar:</span>
                  <strong className="price">
                    L.{selectedService ? parseFloat(selectedService.price).toLocaleString() : '--'}
                  </strong>
                </div>
              </div>
              <p className="pago-seguro-nota" style={{marginTop: '15px'}}>
                <span role="img" aria-label="info">ℹ️</span> 
                El pago de L.{selectedService ? parseFloat(selectedService.price).toLocaleString() : '--'} se realizará directamente con el especialista al momento de ser atendido.
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="form-buttons">
            <button 
              type="button" 
              className="btn-cancelar-cita"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            {shouldShowPayment ? (
              <button 
                type="submit" 
                className="btn-confirmar ready"
                disabled={!selectedDate || !selectedTime || !user || !selectedService || paymentLoading}
              >
                {paymentLoading ? (
                  <span className="loading-spinner">⏳ Agendando...</span>
                ) : (
                  <>
                    <span className="confirm-text">Confirmar Cita</span>
                  </>
                )}
              </button>
            ) : (
              <button 
                type="button" 
                className="btn-confirmar disabled"
                disabled
              >
                Selecciona fecha y hora para continuar
              </button>
            )}
          </div>
        </form>
      </div>
      
      {imageModal.isOpen && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeImageModal}>
              ×
            </button>
            
            <div className="modal-navigation">
              <button 
                className="nav-btn prev-btn" 
                onClick={() => navigateImages('prev')}
              >
                ‹
              </button>
              <div className="image-counter">
                {imageModal.currentIndex + 1} / {servicio.imagenes.length}
              </div>
              <button 
                className="nav-btn next-btn" 
                onClick={() => navigateImages('next')}
              >
                ›
              </button>
            </div>
            
            <div className="modal-image-container">
              <img 
                src={`${import.meta.env.VITE_API_URL}${imageModal.currentImage}`}
                alt="Imagen en detalle"
                className="modal-image"
                onError={(e) => {
                  e.target.src = '/default-image.png';
                }}
              />
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancelar-cita modal-btn" onClick={closeImageModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendarCita;