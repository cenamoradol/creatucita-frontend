export const serviceTypes = [
  { id: '1', name: 'Doctor' },
  { id: '2', name: 'Examen de Laboratorio' },
  { id: '3', name: 'Estudio Medico' },
  { id: '4', name: 'Clinica' }
];

export const specialties = [
  { id: 's1', serviceTypeId: '1', name: 'Medicina General', isPopular: true },
  { id: 's2', serviceTypeId: '1', name: 'Cardiología', isPopular: true },
  { id: 's3', serviceTypeId: '1', name: 'Dermatología', isPopular: true },
  { id: 's4', serviceTypeId: '1', name: 'Pediatría', isPopular: true },
  { id: 's5', serviceTypeId: '1', name: 'Ginecología', isPopular: false },
  { id: 's6', serviceTypeId: '1', name: 'Psiquiatría', isPopular: false },
  { id: 's7', serviceTypeId: '1', name: 'Oftalmología', isPopular: false },
  { id: 's8', serviceTypeId: '1', name: 'Odontología', isPopular: true },
  { id: 's9', serviceTypeId: '1', name: 'Neurología', isPopular: false },
  { id: 's10', serviceTypeId: '1', name: 'Ortopedia', isPopular: false },

  { id: 's11', serviceTypeId: '2', name: 'Análisis de Sangre', isPopular: true },
  { id: 's12', serviceTypeId: '2', name: 'Examen de Orina', isPopular: true },
  { id: 's13', serviceTypeId: '2', name: 'Perfil Lipídico', isPopular: false },
  { id: 's14', serviceTypeId: '2', name: 'Glucosa', isPopular: true },
  { id: 's15', serviceTypeId: '2', name: 'Hemograma Completo', isPopular: false },
  { id: 's16', serviceTypeId: '2', name: 'Prueba de Tiroides', isPopular: false },

  { id: 's17', serviceTypeId: '3', name: 'Radiografía', isPopular: true },
  { id: 's18', serviceTypeId: '3', name: 'Tomografía', isPopular: true },
  { id: 's19', serviceTypeId: '3', name: 'Resonancia Magnética', isPopular: false },
  { id: 's20', serviceTypeId: '3', name: 'Ultrasonido', isPopular: true },
  { id: 's21', serviceTypeId: '3', name: 'Electrocardiograma', isPopular: false },
  { id: 's22', serviceTypeId: '3', name: 'Ecocardiograma', isPopular: false },

  { id: 's23', serviceTypeId: '4', name: 'Clínica General', isPopular: true },
  { id: 's24', serviceTypeId: '4', name: 'Clínica Especializada', isPopular: false },
  { id: 's25', serviceTypeId: '4', name: 'Hospital', isPopular: false },
  { id: 's26', serviceTypeId: '4', name: 'Centro de Salud', isPopular: true }
];

export const providers = [
  {
    id: 'p1',
    name: 'Dr. Carlos Méndez',
    serviceTypeId: '1',
    specialtyId: 's1',
    city: 'Tegucigalpa',
    address: 'Colonia Escalón, Calle Principal 123',
    rating: 4.8,
    price: '$50',
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2222-5555',
    description: 'Médico general con 15 años de experiencia'
  },
  {
    id: 'p2',
    name: 'Dra. María López',
    serviceTypeId: '1',
    specialtyId: 's2',
    city: 'San Pedro Sula',
    address: 'Centro Comercial La Gran Via, Local 205',
    rating: 4.9,
    price: '$80',
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2223-6666',
    description: 'Especialista en cardiología'
  },
  {
    id: 'p3',
    name: 'Dr. Roberto Fernández',
    serviceTypeId: '1',
    specialtyId: 's3',
    city: 'Tegucigalpa',
    address: 'Boulevard del Hipódromo 456',
    rating: 4.7,
    price: '$65',
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2224-7777',
    description: 'Dermatólogo certificado'
  },
  {
    id: 'p4',
    name: 'Dra. Ana Morales',
    serviceTypeId: '1',
    specialtyId: 's4',
    city: 'La Ceiba',
    address: 'Residencial Los Olivos, Casa 45',
    rating: 4.9,
    price: '$55',
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2225-8888',
    description: 'Pediatra con especialidad en neonatología'
  },
  {
    id: 'p5',
    name: 'Dr. Jorge Ramírez',
    serviceTypeId: '1',
    specialtyId: 's1',
    city: 'Tegucigalpa',
    address: 'Colonia San Benito, Avenida La Capilla 234',
    rating: 4.6,
    price: '$45',
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2226-9999',
    description: 'Medicina general y preventiva'
  },
  {
    id: 'p6',
    name: 'Dra. Patricia González',
    serviceTypeId: '1',
    specialtyId: 's8',
    city: 'San Pedro Sula',
    address: 'Paseo San Carlos, Edificio Médico 3er piso',
    rating: 4.8,
    price: '$70',
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2227-1111',
    description: 'Odontóloga especialista en estética dental'
  },

  {
    id: 'p7',
    name: 'Laboratorio Clínico Central',
    serviceTypeId: '2',
    specialtyId: 's11',
    city: 'Tegucigalpa',
    address: 'Avenida España 789',
    rating: 4.6,
    price: '$25',
    imageUrl: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2226-9999',
    description: 'Laboratorio con equipo de última generación'
  },
  {
    id: 'p8',
    name: 'LabMed El Salvador',
    serviceTypeId: '2',
    specialtyId: 's14',
    city: 'San Pedro Sula',
    address: 'Calle Libertad 321',
    rating: 4.7,
    price: '$20',
    imageUrl: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2227-1111',
    description: 'Resultados en 24 horas'
  },
  {
    id: 'p9',
    name: 'Laboratorios Médicos Unidos',
    serviceTypeId: '2',
    specialtyId: 's11',
    city: 'La Ceiba',
    address: 'Boulevard Sur, Plaza Comercial Local 12',
    rating: 4.8,
    price: '$30',
    imageUrl: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2228-2222',
    description: 'Análisis clínicos especializados'
  },
  {
    id: 'p10',
    name: 'Lab Express',
    serviceTypeId: '2',
    specialtyId: 's12',
    city: 'Tegucigalpa',
    address: 'Centro Histórico, 2da Calle Poniente',
    rating: 4.5,
    price: '$15',
    imageUrl: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2229-3333',
    description: 'Servicios rápidos y económicos'
  },

  {
    id: 'p11',
    name: 'Centro de Imagenología Avanzada',
    serviceTypeId: '3',
    specialtyId: 's17',
    city: 'Tegucigalpa',
    address: 'Paseo General Escalón 555',
    rating: 4.8,
    price: '$80',
    imageUrl: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2228-2222',
    description: 'Equipos de radiología digital'
  },
  {
    id: 'p12',
    name: 'Diagnóstico por Imagen SA',
    serviceTypeId: '3',
    specialtyId: 's18',
    city: 'La Ceiba',
    address: 'Multiplaza, Torre A, Piso 3',
    rating: 4.9,
    price: '$150',
    imageUrl: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2229-3333',
    description: 'Tomografía computarizada de alta resolución'
  },
  {
    id: 'p13',
    name: 'Imágenes Médicas del Pacífico',
    serviceTypeId: '3',
    specialtyId: 's20',
    city: 'San Pedro Sula',
    address: 'Urbanización Santa Elena, Edificio Médico Norte',
    rating: 4.7,
    price: '$90',
    imageUrl: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2230-4444',
    description: 'Ultrasonidos 4D y estudios especializados'
  },
  {
    id: 'p14',
    name: 'Centro de Diagnóstico Integral',
    serviceTypeId: '3',
    specialtyId: 's17',
    city: 'Tegucigalpa',
    address: 'Colonia Médica, Alameda Roosevelt',
    rating: 4.6,
    price: '$75',
    imageUrl: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2231-5555',
    description: 'Estudios de imagen completos'
  },

  {
    id: 'p15',
    name: 'Clínica Médica Escalón',
    serviceTypeId: '4',
    specialtyId: 's23',
    city: 'Tegucigalpa',
    address: 'Colonia Escalón, 85 Avenida Norte',
    rating: 4.7,
    price: '$40',
    imageUrl: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2230-4444',
    description: 'Atención médica integral'
  },
  {
    id: 'p16',
    name: 'Centro de Salud Santa Tecla',
    serviceTypeId: '4',
    specialtyId: 's26',
    city: 'San Pedro Sula',
    address: 'Avenida Los Próceres 100',
    rating: 4.5,
    price: '$35',
    imageUrl: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2231-5555',
    description: 'Servicios de salud comunitaria'
  },
  {
    id: 'p17',
    name: 'Hospital San Rafael',
    serviceTypeId: '4',
    specialtyId: 's25',
    city: 'Tegucigalpa',
    address: 'Boulevard Venezuela y 25 Calle Poniente',
    rating: 4.9,
    price: '$60',
    imageUrl: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2232-6666',
    description: 'Hospital privado con todas las especialidades'
  },
  {
    id: 'p18',
    name: 'Policlínica Familiar',
    serviceTypeId: '4',
    specialtyId: 's23',
    city: 'La Ceiba',
    address: 'Colonia Jardines de La Libertad',
    rating: 4.6,
    price: '$38',
    imageUrl: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '2233-7777',
    description: 'Atención médica familiar personalizada'
  }
];

export const getServiceTypes = () => serviceTypes;

export const getSpecialtiesByServiceType = (serviceTypeId) => {
  return specialties.filter(s => s.serviceTypeId === serviceTypeId);
};

export const getPopularSpecialties = (serviceTypeName) => {
  const serviceType = serviceTypes.find(st => st.name === serviceTypeName);
  if (!serviceType) return [];

  return specialties.filter(s =>
    s.serviceTypeId === serviceType.id && s.isPopular
  );
};

export const getPopularStudies = () => {
  const studyServiceTypes = serviceTypes.filter(st =>
    st.name === 'Estudio Medico' || st.name === 'Examen de Laboratorio'
  );
  const studyTypeIds = studyServiceTypes.map(st => st.id);

  return specialties.filter(s =>
    studyTypeIds.includes(s.serviceTypeId) && s.isPopular
  );
};

export const getProvidersByFilters = (filters) => {
  let results = [...providers];

  if (filters.city) {
    results = results.filter(p =>
      p.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  }

  if (filters.serviceTypeId) {
    results = results.filter(p =>
      p.serviceTypeId === filters.serviceTypeId
    );
  }

  if (filters.specialtyId) {
    results = results.filter(p =>
      p.specialtyId === filters.specialtyId
    );
  }

  return results.sort((a, b) => b.rating - a.rating);
};

export const getSpecialtyById = (specialtyId) => {
  return specialties.find(s => s.id === specialtyId);
};
