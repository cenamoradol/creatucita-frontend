const serviceTypes = [
  { id: 1, name: 'Abogado' },
  { id: 2, name: 'Contador' },
  { id: 3, name: 'Agente Aduanero' },
  { id: 4, name: 'Agente Migratorio' }
];

const specialties = [
  { id: 1, serviceTypeId: 1, name: 'Derecho Civil' },
  { id: 2, serviceTypeId: 1, name: 'Derecho Penal' },
  { id: 3, serviceTypeId: 1, name: 'Derecho Laboral' },
  { id: 4, serviceTypeId: 1, name: 'Derecho Familiar' },
  { id: 5, serviceTypeId: 1, name: 'Derecho Mercantil' },

  { id: 6, serviceTypeId: 2, name: 'Contabilidad General' },
  { id: 7, serviceTypeId: 2, name: 'Auditoría' },
  { id: 8, serviceTypeId: 2, name: 'Declaraciones Fiscales' },
  { id: 9, serviceTypeId: 2, name: 'Contabilidad de Empresas' },
  { id: 10, serviceTypeId: 2, name: 'Consultoría Fiscal' },

  { id: 11, serviceTypeId: 3, name: 'Importaciones' },
  { id: 12, serviceTypeId: 3, name: 'Exportaciones' },
  { id: 13, serviceTypeId: 3, name: 'Trámites Aduaneros' },
  { id: 14, serviceTypeId: 3, name: 'Clasificación Arancelaria' },
  { id: 15, serviceTypeId: 3, name: 'Desaduanaje' },

  { id: 16, serviceTypeId: 4, name: 'Visas de Trabajo' },
  { id: 17, serviceTypeId: 4, name: 'Visas de Turismo' },
  { id: 18, serviceTypeId: 4, name: 'Residencias' },
  { id: 19, serviceTypeId: 4, name: 'Ciudadanía' },
  { id: 20, serviceTypeId: 4, name: 'Reunificación Familiar' }
];

const popularSpecialties = [
  { id: 1, name: 'Derecho Civil' },
  { id: 3, name: 'Derecho Laboral' },
  { id: 8, name: 'Declaraciones Fiscales' },
  { id: 11, name: 'Importaciones' },
  { id: 16, name: 'Visas de Trabajo' }
];

const popularConsultations = [
  { id: 4, name: 'Derecho Familiar' },
  { id: 6, name: 'Contabilidad General' },
  { id: 13, name: 'Trámites Aduaneros' },
  { id: 18, name: 'Residencias' }
];

const providers = [
  {
    id: 1,
    name: 'Bufete Jurídico Martínez & Asociados',
    specialtyId: 1,
    description: 'Especialistas en litigios civiles, contratos y resolución de conflictos patrimoniales',
    rating: 4.9,
    address: 'Centro Jurídico 101, San Salvador',
    city: 'Tegucigalpa',
    phone: '2222-3344',
    price: '$80 - $150',
    imageUrl: 'https://images.pexels.com/photos/8111849/pexels-photo-8111849.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Defensa Legal Especializada',
    specialtyId: 2,
    description: 'Abogados penalistas con más de 20 años de experiencia en defensa criminal',
    rating: 4.8,
    address: 'Torre Legal 505, San Salvador',
    city: 'Tegucigalpa',
    phone: '2233-4455',
    price: '$100 - $200',
    imageUrl: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Asesoría Laboral Integral',
    specialtyId: 3,
    description: 'Expertos en derecho laboral, despidos, indemnizaciones y contratos de trabajo',
    rating: 4.7,
    address: 'Edificio Corporativo 202, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '2244-5566',
    price: '$70 - $130',
    imageUrl: 'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Abogados Familia y Sucesiones',
    specialtyId: 4,
    description: 'Especialistas en divorcios, custodia de menores, herencias y testamentos',
    rating: 5.0,
    address: 'Plaza Familiar 303, San Salvador',
    city: 'Tegucigalpa',
    phone: '2255-6677',
    price: '$75 - $140',
    imageUrl: 'https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Grupo Legal Empresarial',
    specialtyId: 5,
    description: 'Asesoría en constitución de empresas, fusiones y derecho corporativo',
    rating: 4.9,
    address: 'Torre Empresarial 404, San Salvador',
    city: 'Tegucigalpa',
    phone: '2266-7788',
    price: '$120 - $250',
    imageUrl: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Contadores Asociados López',
    specialtyId: 6,
    description: 'Servicios de contabilidad general para pequeñas y medianas empresas',
    rating: 4.8,
    address: 'Centro de Negocios 567, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '2277-8899',
    price: '$40 - $80',
    imageUrl: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 7,
    name: 'Auditoría y Control Financiero',
    specialtyId: 7,
    description: 'Auditorías internas y externas, revisión de estados financieros',
    rating: 4.9,
    address: 'Boulevard Financiero 890, San Salvador',
    city: 'Tegucigalpa',
    phone: '2288-9900',
    price: '$150 - $300',
    imageUrl: 'https://images.pexels.com/photos/7688665/pexels-photo-7688665.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 8,
    name: 'Asesoría Fiscal Moderna',
    specialtyId: 8,
    description: 'Preparación y presentación de declaraciones de IVA, ISR y municipales',
    rating: 5.0,
    address: 'Plaza Fiscal 234, San Salvador',
    city: 'Tegucigalpa',
    phone: '2299-0011',
    price: '$50 - $100',
    imageUrl: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 9,
    name: 'Contabilidad Empresarial Pro',
    specialtyId: 9,
    description: 'Contabilidad especializada para medianas y grandes empresas',
    rating: 4.8,
    address: 'Torre Contable 456, Antiguo Cuscatlán',
    city: 'La Ceiba',
    phone: '2200-1122',
    price: '$80 - $200',
    imageUrl: 'https://images.pexels.com/photos/7735676/pexels-photo-7735676.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 10,
    name: 'Consultores Fiscales Expertos',
    specialtyId: 10,
    description: 'Planificación fiscal, optimización de impuestos y consultoría tributaria',
    rating: 4.9,
    address: 'Centro Fiscal 789, San Salvador',
    city: 'Tegucigalpa',
    phone: '2211-2233',
    price: '$100 - $180',
    imageUrl: 'https://images.pexels.com/photos/7688341/pexels-photo-7688341.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 11,
    name: 'Agencia Aduanera Global Import',
    specialtyId: 11,
    description: 'Gestión completa de importaciones con experiencia en diversos productos',
    rating: 4.9,
    address: 'Puerto de Acajutla, Zona Industrial',
    city: 'Puerto Cortes',
    phone: '2222-4455',
    price: '$200 - $500',
    imageUrl: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 12,
    name: 'Export Solutions SV',
    specialtyId: 12,
    description: 'Especialistas en exportaciones, documentación y logística internacional',
    rating: 4.8,
    address: 'Zona Franca 345, San Salvador',
    city: 'Tegucigalpa',
    phone: '2233-5566',
    price: '$180 - $450',
    imageUrl: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 13,
    name: 'Servicios Aduaneros Rápidos',
    specialtyId: 13,
    description: 'Trámites aduaneros expeditos, nacionalización de mercancías',
    rating: 4.7,
    address: 'Aeropuerto Internacional 678, San Luis Talpa',
    city: 'Tela',
    phone: '2244-6677',
    price: '$150 - $350',
    imageUrl: 'https://images.pexels.com/photos/4246238/pexels-photo-4246238.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 14,
    name: 'Clasificación Arancelaria Experta',
    specialtyId: 14,
    description: 'Asesoría en clasificación de mercancías y optimización de aranceles',
    rating: 5.0,
    address: 'Centro Aduanero 901, San Salvador',
    city: 'Tegucigalpa',
    phone: '2255-7788',
    price: '$100 - $250',
    imageUrl: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 15,
    name: 'Desaduanaje Total',
    specialtyId: 15,
    description: 'Servicio completo de desaduanaje, almacenamiento y distribución',
    rating: 4.8,
    address: 'Boulevard Industrial 234, Soyapango',
    city: 'Danli',
    phone: '2266-8899',
    price: '$180 - $400',
    imageUrl: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 16,
    name: 'Visas Laborales Internacional',
    specialtyId: 16,
    description: 'Gestión de visas de trabajo para Estados Unidos, Canadá y Europa',
    rating: 4.9,
    address: 'Torre Migratoria 567, San Salvador',
    city: 'Tegucigalpa',
    phone: '2277-9900',
    price: '$300 - $800',
    imageUrl: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 17,
    name: 'Asesoría en Visas de Turismo',
    specialtyId: 17,
    description: 'Tramitación de visas turísticas con alta tasa de aprobación',
    rating: 4.8,
    address: 'Plaza Turística 890, San Salvador',
    city: 'Tegucigalpa',
    phone: '2288-0011',
    price: '$150 - $400',
    imageUrl: 'https://images.pexels.com/photos/5669603/pexels-photo-5669603.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 18,
    name: 'Residencias y Permisos Migratorios',
    specialtyId: 18,
    description: 'Especialistas en residencias permanentes y temporales',
    rating: 5.0,
    address: 'Centro Migratorio 123, San Salvador',
    city: 'Tegucigalpa',
    phone: '2299-1122',
    price: '$400 - $1000',
    imageUrl: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 19,
    name: 'Ciudadanía y Naturalización',
    specialtyId: 19,
    description: 'Asesoría completa en procesos de ciudadanía y naturalización',
    rating: 4.9,
    address: 'Boulevard Internacional 456, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '2200-2233',
    price: '$500 - $1200',
    imageUrl: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 20,
    name: 'Reunificación Familiar Legal',
    specialtyId: 20,
    description: 'Tramitación de visas y permisos para reunificación familiar',
    rating: 4.8,
    address: 'Torre Familiar 789, San Salvador',
    city: 'Tegucigalpa',
    phone: '2211-3344',
    price: '$350 - $900',
    imageUrl: 'https://images.pexels.com/photos/5669603/pexels-photo-5669603.jpeg?auto=compress&cs=tinysrgb&w=400'
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
