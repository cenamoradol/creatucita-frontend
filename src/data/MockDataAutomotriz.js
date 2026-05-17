const serviceTypes = [
  { id: 1, name: 'Mecánica General' },
  { id: 2, name: 'Mecánica Especializada' },
  { id: 3, name: 'Carrocería y Pintura' }
];

const specialties = [
  { id: 1, serviceTypeId: 1, name: 'Mecánica Automotriz' },
  { id: 2, serviceTypeId: 1, name: 'Mecánica de Motos' },
  { id: 3, serviceTypeId: 1, name: 'Mantenimiento Preventivo' },

  { id: 4, serviceTypeId: 2, name: 'Mecánica Diesel' },
  { id: 5, serviceTypeId: 2, name: 'Mecánica Eléctrica' },
  { id: 6, serviceTypeId: 2, name: 'Transmisiones' },
  { id: 7, serviceTypeId: 2, name: 'Frenos y Suspensión' },

  { id: 8, serviceTypeId: 3, name: 'Hojalatería y Pintura' },
  { id: 9, serviceTypeId: 3, name: 'Enderezado' },
  { id: 10, serviceTypeId: 3, name: 'Detallado Automotriz' }
];

const popularSpecialties = [
  { id: 1, name: 'Mecánica Automotriz' },
  { id: 8, name: 'Hojalatería y Pintura' },
  { id: 3, name: 'Mantenimiento Preventivo' },
  { id: 5, name: 'Mecánica Eléctrica' }
];

const popularConsultations = [
  { id: 2, name: 'Mecánica de Motos' },
  { id: 4, name: 'Mecánica Diesel' },
  { id: 7, name: 'Frenos y Suspensión' },
  { id: 10, name: 'Detallado Automotriz' }
];

const providers = [
  {
    id: 1,
    name: 'Taller Mecánico El Experto',
    specialtyId: 1,
    description: 'Reparación integral de vehículos, mantenimiento preventivo y correctivo',
    rating: 4.9,
    address: 'Carretera Panamericana Km 5, San Salvador',
    city: 'Tegucigalpa',
    phone: '7799-0011',
    price: '$40 - $300',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Mecánica Automotriz Pro',
    specialtyId: 1,
    description: 'Diagnóstico computarizado, transmisiones, frenos y suspensión',
    rating: 4.8,
    address: 'Boulevard del Ejército, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7700-1133',
    price: '$35 - $280',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Auto Center Express',
    specialtyId: 1,
    description: 'Servicio rápido de mecánica general, cambio de aceite y revisión completa',
    rating: 4.7,
    address: 'Zona Industrial, Apopa',
    city: 'La Ceiba',
    phone: '7711-2244',
    price: '$30 - $200',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Motos Service Center',
    specialtyId: 2,
    description: 'Reparación y mantenimiento especializado de motocicletas de todas las marcas',
    rating: 4.7,
    address: 'Zona Industrial, Apopa',
    city: 'Roatan',
    phone: '7711-2244',
    price: '$25 - $150',
    imageUrl: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Taller de Motos Ramírez',
    specialtyId: 2,
    description: 'Expertos en reparación de motos deportivas, scooters y motos de alto cilindraje',
    rating: 4.9,
    address: 'Boulevard del Sur, San Salvador',
    city: 'Tegucigalpa',
    phone: '7722-3355',
    price: '$30 - $180',
    imageUrl: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Mantenimiento Vehicular Total',
    specialtyId: 3,
    description: 'Servicio completo de mantenimiento preventivo según manual del fabricante',
    rating: 5.0,
    address: 'Multiplaza, Antiguo Cuscatlán',
    city: 'San Pedro Sula',
    phone: '7733-4466',
    price: '$50 - $250',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 7,
    name: 'Diesel Master',
    specialtyId: 4,
    description: 'Especialistas en motores diesel, camiones y vehículos pesados',
    rating: 5.0,
    address: 'Zona Franca, Colón',
    city: 'Comayagua',
    phone: '7722-3355',
    price: '$60 - $400',
    imageUrl: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 8,
    name: 'Taller Diesel Profesional',
    specialtyId: 4,
    description: 'Reparación de bombas de inyección, turbos y sistemas diesel completos',
    rating: 4.8,
    address: 'Carretera Norte, San Salvador',
    city: 'Tegucigalpa',
    phone: '7744-5577',
    price: '$70 - $450',
    imageUrl: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 9,
    name: 'Electromecánica Automotriz',
    specialtyId: 5,
    description: 'Reparación de sistemas eléctricos, alternadores, baterías y arranques',
    rating: 4.8,
    address: 'Avenida España, San Salvador',
    city: 'Tegucigalpa',
    phone: '7733-4466',
    price: '$30 - $180',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 10,
    name: 'Auto Eléctrico Especializado',
    specialtyId: 5,
    description: 'Diagnóstico y reparación de problemas eléctricos complejos en vehículos',
    rating: 4.9,
    address: 'Colonia Escalón, San Salvador',
    city: 'San Pedro Sula',
    phone: '7755-6688',
    price: '$35 - $200',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 11,
    name: 'Transmisiones y Clutch',
    specialtyId: 6,
    description: 'Especialistas en reparación de transmisiones automáticas y manuales',
    rating: 4.9,
    address: 'Boulevard Venezuela, San Salvador',
    city: 'Tegucigalpa',
    phone: '7766-7799',
    price: '$150 - $800',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 12,
    name: 'Centro de Frenos y Suspensión',
    specialtyId: 7,
    description: 'Reparación de sistemas de frenos, amortiguadores y alineación',
    rating: 4.8,
    address: 'Carretera a Santa Tecla, San Salvador',
    city: 'La Ceiba',
    phone: '7777-8800',
    price: '$40 - $250',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 13,
    name: 'Hojalatería y Pintura Total',
    specialtyId: 8,
    description: 'Reparación de golpes, pintura automotriz y enderezado profesional',
    rating: 4.9,
    address: 'Boulevard Venezuela, San Salvador',
    city: 'Tegucigalpa',
    phone: '7744-5577',
    price: '$100 - $800',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 14,
    name: 'Auto Body Shop Premium',
    specialtyId: 8,
    description: 'Reparación de carrocería, pintura al horno y restauración de vehículos',
    rating: 5.0,
    address: 'Zona Industrial, Soyapango',
    city: 'San Pedro Sula',
    phone: '7788-9911',
    price: '$120 - $1000',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 15,
    name: 'Enderezado y Estructuras',
    specialtyId: 9,
    description: 'Especialistas en enderezado de bastidores y reparación estructural',
    rating: 4.8,
    address: 'Carretera de Oro, San Salvador',
    city: 'Choluteca',
    phone: '7799-0022',
    price: '$200 - $1500',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 16,
    name: 'Detail Pro Automotriz',
    specialtyId: 10,
    description: 'Detallado completo, pulido, encerado y restauración de pintura',
    rating: 5.0,
    address: 'San Benito, San Salvador',
    city: 'Tegucigalpa',
    phone: '7700-2233',
    price: '$60 - $350',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 17,
    name: 'Lavado y Detallado Express',
    specialtyId: 10,
    description: 'Servicio rápido de lavado, pulido y protección de pintura',
    rating: 4.7,
    address: 'Multiplaza, Antiguo Cuscatlán',
    city: 'San Pedro Sula',
    phone: '7711-3344',
    price: '$40 - $200',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
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
