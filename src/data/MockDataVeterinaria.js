const serviceTypes = [
  { id: 1, name: 'Veterinario' },
  { id: 2, name: 'Estética' },
  { id: 3, name: 'Cuidado' },
  { id: 4, name: 'Examen' }
];

const specialties = [
  { id: 1, serviceTypeId: 1, name: 'Consulta General' },
  { id: 2, serviceTypeId: 1, name: 'Cirugía Veterinaria' },
  { id: 3, serviceTypeId: 1, name: 'Emergencias 24/7' },
  { id: 4, serviceTypeId: 1, name: 'Medicina Interna' },
  { id: 5, serviceTypeId: 1, name: 'Vacunación y Desparasitación' },

  { id: 6, serviceTypeId: 2, name: 'Peluquería Canina' },
  { id: 7, serviceTypeId: 2, name: 'Peluquería Felina' },
  { id: 8, serviceTypeId: 2, name: 'Baño y Corte' },
  { id: 9, serviceTypeId: 2, name: 'Spa para Mascotas' },
  { id: 10, serviceTypeId: 2, name: 'Estética Completa' },

  { id: 11, serviceTypeId: 3, name: 'Guardería Diurna' },
  { id: 12, serviceTypeId: 3, name: 'Hotel para Mascotas' },
  { id: 13, serviceTypeId: 3, name: 'Adiestramiento Básico' },
  { id: 14, serviceTypeId: 3, name: 'Adiestramiento Avanzado' },
  { id: 15, serviceTypeId: 3, name: 'Paseo y Ejercicio' },

  { id: 16, serviceTypeId: 4, name: 'Análisis Clínicos' },
  { id: 17, serviceTypeId: 4, name: 'Rayos X y Ultrasonido' },
  { id: 18, serviceTypeId: 4, name: 'Examen Dermatológico' },
  { id: 19, serviceTypeId: 4, name: 'Chequeo Geriátrico' },
  { id: 20, serviceTypeId: 4, name: 'Examen Pre-quirúrgico' }
];

const popularSpecialties = [
  { id: 1, name: 'Consulta General' },
  { id: 5, name: 'Vacunación y Desparasitación' },
  { id: 6, name: 'Peluquería Canina' },
  { id: 13, name: 'Adiestramiento Básico' },
  { id: 16, name: 'Análisis Clínicos' }
];

const popularConsultations = [
  { id: 3, name: 'Emergencias 24/7' },
  { id: 8, name: 'Baño y Corte' },
  { id: 12, name: 'Hotel para Mascotas' },
  { id: 17, name: 'Rayos X y Ultrasonido' }
];

const providers = [
  {
    id: 1,
    name: 'Veterinaria Mascotas Felices',
    specialtyId: 1,
    description: 'Atención veterinaria integral, diagnóstico y tratamiento para todas las razas',
    rating: 4.9,
    address: 'Boulevard Norte 789, San Salvador',
    city: 'Tegucigalpa',
    phone: '7700-1234',
    price: '$35 - $80',
    imageUrl: 'https://images.pexels.com/photos/6235/man-person-people-white.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Clínica Veterinaria Integral',
    specialtyId: 1,
    description: 'Consultas veterinarias con especialistas certificados y tecnología avanzada',
    rating: 4.8,
    address: 'Clínica Central 505, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7711-2345',
    price: '$40 - $90',
    imageUrl: 'https://images.pexels.com/photos/6235/man-person-people-white.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Centro Quirúrgico Veterinario',
    specialtyId: 2,
    description: 'Cirugías especializadas con equipo de última generación y quirófano certificado',
    rating: 5.0,
    address: 'Hospital Veterinario 101, San Salvador',
    city: 'Tegucigalpa',
    phone: '7722-3456',
    price: '$150 - $500',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Veterinaria Especializada SV',
    specialtyId: 2,
    description: 'Cirugías de rutina y emergencia, esterilizaciones y procedimientos avanzados',
    rating: 4.9,
    address: 'Zona Médica Veterinaria, Antiguo Cuscatlán',
    city: 'El Progreso',
    phone: '7733-4567',
    price: '$180 - $600',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Urgencias Veterinarias 24/7',
    specialtyId: 3,
    description: 'Servicio de emergencia las 24 horas, atención inmediata para casos críticos',
    rating: 4.9,
    address: 'Carretera Panamericana Km 8, San Salvador',
    city: 'Tegucigalpa',
    phone: '7744-5678',
    price: '$60 - $200',
    imageUrl: 'https://images.pexels.com/photos/4269698/pexels-photo-4269698.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Clínica de Medicina Interna',
    specialtyId: 4,
    description: 'Diagnóstico y tratamiento de enfermedades internas, cardiología y endocrinología',
    rating: 5.0,
    address: 'Centro Veterinario Especializado, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7755-6789',
    price: '$50 - $150',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 7,
    name: 'Centro de Vacunación Animal',
    specialtyId: 5,
    description: 'Plan completo de vacunación y desparasitación para todas las edades',
    rating: 4.8,
    address: 'Avenida Veterinaria 202, San Salvador',
    city: 'Tegucigalpa',
    phone: '7766-7890',
    price: '$25 - $60',
    imageUrl: 'https://images.pexels.com/photos/4269698/pexels-photo-4269698.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 8,
    name: 'Vacunas y Prevención SV',
    specialtyId: 5,
    description: 'Programas de vacunación personalizados y control de parásitos',
    rating: 4.7,
    address: 'Boulevard Los Próceres, Soyapango',
    city: 'Siguatepeque',
    phone: '7777-8901',
    price: '$20 - $55',
    imageUrl: 'https://images.pexels.com/photos/4269698/pexels-photo-4269698.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 9,
    name: 'Peluquería Canina Deluxe',
    specialtyId: 6,
    description: 'Corte de pelo especializado, estilizado y cuidado estético para perros',
    rating: 4.9,
    address: 'Plaza Pet Center 303, San Salvador',
    city: 'Tegucigalpa',
    phone: '7788-9012',
    price: '$25 - $60',
    imageUrl: 'https://images.pexels.com/photos/6131614/pexels-photo-6131614.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 10,
    name: 'Estética Canina Premium',
    specialtyId: 6,
    description: 'Servicio completo de peluquería con productos naturales y técnicas profesionales',
    rating: 4.8,
    address: 'Centro Comercial, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7799-0123',
    price: '$30 - $70',
    imageUrl: 'https://images.pexels.com/photos/6131614/pexels-photo-6131614.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 11,
    name: 'Gatos Glamurosos',
    specialtyId: 7,
    description: 'Peluquería especializada en gatos, con técnicas suaves y ambiente tranquilo',
    rating: 5.0,
    address: 'Escalón, San Salvador',
    city: 'Tegucigalpa',
    phone: '7700-2345',
    price: '$35 - $80',
    imageUrl: 'https://images.pexels.com/photos/6131614/pexels-photo-6131614.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 12,
    name: 'Baño y Corte Express',
    specialtyId: 8,
    description: 'Servicio rápido de baño, corte y secado para mascotas de todos los tamaños',
    rating: 4.7,
    address: 'Zona Comercial, Antiguo Cuscatlán',
    city: 'El Progreso',
    phone: '7711-3456',
    price: '$20 - $50',
    imageUrl: 'https://images.pexels.com/photos/6131614/pexels-photo-6131614.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 13,
    name: 'Spa para Mascotas Paradise',
    specialtyId: 9,
    description: 'Tratamientos de spa, masajes, aromaterapia y relajación para tu mascota',
    rating: 4.9,
    address: 'La Gran Vía, San Salvador',
    city: 'Tegucigalpa',
    phone: '7722-4567',
    price: '$40 - $100',
    imageUrl: 'https://images.pexels.com/photos/6131614/pexels-photo-6131614.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 14,
    name: 'Estética Completa Pet Care',
    specialtyId: 10,
    description: 'Servicio integral de estética: baño, corte, uñas, limpieza dental y más',
    rating: 4.8,
    address: 'Multiplaza, San Salvador',
    city: 'Tegucigalpa',
    phone: '7733-5678',
    price: '$45 - $120',
    imageUrl: 'https://images.pexels.com/photos/6131614/pexels-photo-6131614.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 15,
    name: 'Guardería Diurna Happy Pets',
    specialtyId: 11,
    description: 'Cuidado diurno para mascotas, socialización y actividades supervisadas',
    rating: 4.9,
    address: 'Zona Residencial, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7744-6789',
    price: '$15 - $30 por día',
    imageUrl: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 16,
    name: 'Hotel para Mascotas Luxury',
    specialtyId: 12,
    description: 'Alojamiento premium con suites privadas, atención 24/7 y servicios incluidos',
    rating: 5.0,
    address: 'Carretera a La Libertad Km 15, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7755-7890',
    price: '$25 - $50 por noche',
    imageUrl: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 17,
    name: 'Escuela de Adiestramiento Canino',
    specialtyId: 13,
    description: 'Entrenamiento básico de obediencia, socialización y modales',
    rating: 4.8,
    address: 'Centro de Entrenamiento 404, San Salvador',
    city: 'Tegucigalpa',
    phone: '7766-8901',
    price: '$60 - $120 por sesión',
    imageUrl: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 18,
    name: 'Academia Canina Pro',
    specialtyId: 14,
    description: 'Adiestramiento avanzado, corrección de conductas y entrenamiento deportivo',
    rating: 5.0,
    address: 'Zona de Entrenamiento, Antiguo Cuscatlán',
    city: 'El Progreso',
    phone: '7777-9012',
    price: '$80 - $200 por sesión',
    imageUrl: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 19,
    name: 'Paseadores Profesionales',
    specialtyId: 15,
    description: 'Servicio de paseo personalizado, ejercicio y actividades al aire libre',
    rating: 4.7,
    address: 'Servicio a Domicilio, San Salvador',
    city: 'Tegucigalpa',
    phone: '7788-0123',
    price: '$10 - $25 por paseo',
    imageUrl: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 20,
    name: 'Laboratorio Clínico Veterinario',
    specialtyId: 16,
    description: 'Análisis de sangre, orina, heces y pruebas diagnósticas especializadas',
    rating: 4.9,
    address: 'Centro de Diagnóstico, San Salvador',
    city: 'Tegucigalpa',
    phone: '7799-1234',
    price: '$30 - $100',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 21,
    name: 'Centro de Imagenología',
    specialtyId: 17,
    description: 'Rayos X digitales, ultrasonido y estudios de diagnóstico por imagen',
    rating: 5.0,
    address: 'Hospital Veterinario, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7700-3456',
    price: '$50 - $150',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 22,
    name: 'Dermatología Veterinaria',
    specialtyId: 18,
    description: 'Diagnóstico y tratamiento de enfermedades de la piel, alergias y parásitos',
    rating: 4.8,
    address: 'Clínica Especializada, San Salvador',
    city: 'Tegucigalpa',
    phone: '7711-4567',
    price: '$40 - $120',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 23,
    name: 'Geriátrico para Mascotas',
    specialtyId: 19,
    description: 'Chequeos completos para mascotas mayores, prevención y control de enfermedades',
    rating: 4.9,
    address: 'Centro Geriátrico Veterinario, Antiguo Cuscatlán',
    city: 'El Progreso',
    phone: '7722-5678',
    price: '$60 - $150',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 24,
    name: 'Evaluación Pre-quirúrgica',
    specialtyId: 20,
    description: 'Examen completo antes de cirugías, análisis de riesgo y preparación',
    rating: 5.0,
    address: 'Centro Quirúrgico, San Salvador',
    city: 'Tegucigalpa',
    phone: '7733-6789',
    price: '$50 - $120',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 25,
    name: 'Chequeo General Veterinario',
    specialtyId: 16,
    description: 'Examen físico completo, análisis básicos y evaluación de salud general',
    rating: 4.8,
    address: 'Clínica Veterinaria Central, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7744-7890',
    price: '$35 - $80',
    imageUrl: 'https://images.pexels.com/photos/6235199/pexels-photo-6235199.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const getServiceTypes = () => {
  return serviceTypes;
};

export const getSpecialtiesByServiceType = (serviceTypeId) => {
  return specialties.filter(s => s.serviceTypeId === serviceTypeId);
};

export const getPopularSpecialties = () => {
  return popularSpecialties;
};

export const getPopularConsultations = () => {
  return popularConsultations;
};

export const getProvidersByFilters = (filters) => {
  let results = [...providers];

  if (filters.city) {
    results = results.filter(p =>
      p.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  }

  if (filters.specialtyId) {
    results = results.filter(p => p.specialtyId === filters.specialtyId);
  }

  if (filters.serviceTypeId) {
    const serviceTypeSpecialties = specialties
      .filter(s => s.serviceTypeId === filters.serviceTypeId)
      .map(s => s.id);

    results = results.filter(p => serviceTypeSpecialties.includes(p.specialtyId));
  }

  return results;
};

export const getSpecialtyById = (specialtyId) => {
  return specialties.find(s => s.id === specialtyId);
};
