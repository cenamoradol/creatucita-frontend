const serviceTypes = [
  { id: 1, name: 'Instalación' },
  { id: 2, name: 'Mecánico' },
  { id: 3, name: 'Jardinería' },
  { id: 4, name: 'Cocina' }
];

const specialties = [
  { id: 1, serviceTypeId: 1, name: 'Plomería' },
  { id: 2, serviceTypeId: 1, name: 'Electricidad' },
  { id: 3, serviceTypeId: 1, name: 'Aire Acondicionado' },
  { id: 4, serviceTypeId: 1, name: 'Gas' },
  { id: 5, serviceTypeId: 1, name: 'Carpintería' },

  { id: 6, serviceTypeId: 2, name: 'Mecánica Automotriz' },
  { id: 7, serviceTypeId: 2, name: 'Mecánica de Motos' },
  { id: 8, serviceTypeId: 2, name: 'Mecánica Diesel' },
  { id: 9, serviceTypeId: 2, name: 'Mecánica Eléctrica' },
  { id: 10, serviceTypeId: 2, name: 'Hojalatería y Pintura' },

  { id: 11, serviceTypeId: 3, name: 'Diseño de Jardines' },
  { id: 12, serviceTypeId: 3, name: 'Poda de Árboles' },
  { id: 13, serviceTypeId: 3, name: 'Mantenimiento de Césped' },
  { id: 14, serviceTypeId: 3, name: 'Sistemas de Riego' },
  { id: 15, serviceTypeId: 3, name: 'Paisajismo' },

  { id: 16, serviceTypeId: 4, name: 'Reparación de Cocinas' },
  { id: 17, serviceTypeId: 4, name: 'Instalación de Campanas' },
  { id: 18, serviceTypeId: 4, name: 'Mesones y Encimeras' },
  { id: 19, serviceTypeId: 4, name: 'Gabinetes de Cocina' },
  { id: 20, serviceTypeId: 4, name: 'Electrodomésticos' }
];

const popularSpecialties = [
  { id: 1, name: 'Plomería' },
  { id: 2, name: 'Electricidad' },
  { id: 6, name: 'Mecánica Automotriz' },
  { id: 13, name: 'Mantenimiento de Césped' },
  { id: 20, name: 'Electrodomésticos' }
];

const popularConsultations = [
  { id: 3, name: 'Aire Acondicionado' },
  { id: 10, name: 'Hojalatería y Pintura' },
  { id: 11, name: 'Diseño de Jardines' },
  { id: 16, name: 'Reparación de Cocinas' }
];

const providers = [
  {
    id: 1,
    name: 'Plomería Express 24/7',
    specialtyId: 1,
    description: 'Servicio de plomería de emergencia, reparaciones y mantenimiento preventivo',
    rating: 4.9,
    address: 'Servicio a Domicilio, San Salvador',
    city: 'Tegucigalpa',
    phone: '7700-1122',
    price: '$30 - $80',
    imageUrl: 'https://images.pexels.com/photos/834949/pexels-photo-834949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Plomeros Profesionales SV',
    specialtyId: 1,
    description: 'Instalación y reparación de tuberías, baños, cocinas y sistemas de agua',
    rating: 4.8,
    address: 'Zona Industrial, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7711-2233',
    price: '$35 - $90',
    imageUrl: 'https://images.pexels.com/photos/834949/pexels-photo-834949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Electricidad Segura',
    specialtyId: 2,
    description: 'Instalaciones eléctricas residenciales y comerciales, reparaciones urgentes',
    rating: 4.9,
    address: 'Cobertura Total, San Salvador',
    city: 'Tegucigalpa',
    phone: '7722-3344',
    price: '$40 - $100',
    imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Electricistas Certificados',
    specialtyId: 2,
    description: 'Expertos en paneles eléctricos, cableado y sistemas de iluminación',
    rating: 4.7,
    address: 'Boulevard Los Héroes, San Salvador',
    city: 'Tegucigalpa',
    phone: '7733-4455',
    price: '$45 - $120',
    imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Clima Confort',
    specialtyId: 3,
    description: 'Instalación, mantenimiento y reparación de aires acondicionados',
    rating: 4.8,
    address: 'Zona Comercial, Antiguo Cuscatlán',
    city: 'La Ceiba',
    phone: '7744-5566',
    price: '$50 - $150',
    imageUrl: 'https://images.pexels.com/photos/2231742/pexels-photo-2231742.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Refrigeración Total',
    specialtyId: 3,
    description: 'Sistemas de climatización para hogares, oficinas y locales comerciales',
    rating: 5.0,
    address: 'Centro Comercial, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7755-6677',
    price: '$60 - $180',
    imageUrl: 'https://images.pexels.com/photos/2231742/pexels-photo-2231742.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 7,
    name: 'Gas Seguro Instalaciones',
    specialtyId: 4,
    description: 'Instalación certificada de gas, tuberías y mantenimiento de equipos',
    rating: 4.9,
    address: 'Servicio Metropolitano, San Salvador',
    city: 'Tegucigalpa',
    phone: '7766-7788',
    price: '$40 - $120',
    imageUrl: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 8,
    name: 'Carpintería Creativa',
    specialtyId: 5,
    description: 'Muebles a medida, puertas, ventanas y trabajos de carpintería fina',
    rating: 4.8,
    address: 'Zona Industrial 101, Soyapango',
    city: 'Choluteca',
    phone: '7777-8899',
    price: '$50 - $200',
    imageUrl: 'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 9,
    name: 'Maestro Carpintero',
    specialtyId: 5,
    description: 'Especialistas en muebles de madera, reparaciones y restauración',
    rating: 4.9,
    address: 'Taller Principal 505, San Salvador',
    city: 'Tegucigalpa',
    phone: '7788-9900',
    price: '$60 - $250',
    imageUrl: 'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 10,
    name: 'Taller Mecánico El Experto',
    specialtyId: 6,
    description: 'Reparación integral de vehículos, mantenimiento preventivo y correctivo',
    rating: 4.9,
    address: 'Carretera Panamericana Km 5, San Salvador',
    city: 'Tegucigalpa',
    phone: '7799-0011',
    price: '$40 - $300',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 11,
    name: 'Mecánica Automotriz Pro',
    specialtyId: 6,
    description: 'Diagnóstico computarizado, transmisiones, frenos y suspensión',
    rating: 4.8,
    address: 'Boulevard del Ejército, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7700-1133',
    price: '$35 - $280',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 12,
    name: 'Motos Service Center',
    specialtyId: 7,
    description: 'Reparación y mantenimiento especializado de motocicletas de todas las marcas',
    rating: 4.7,
    address: 'Zona Industrial, Apopa',
    city: 'Roatan',
    phone: '7711-2244',
    price: '$25 - $150',
    imageUrl: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 13,
    name: 'Diesel Master',
    specialtyId: 8,
    description: 'Especialistas en motores diesel, camiones y vehículos pesados',
    rating: 5.0,
    address: 'Zona Franca, Colón',
    city: 'Comayagua',
    phone: '7722-3355',
    price: '$60 - $400',
    imageUrl: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 14,
    name: 'Electromecánica Automotriz',
    specialtyId: 9,
    description: 'Reparación de sistemas eléctricos, alternadores, baterías y arranques',
    rating: 4.8,
    address: 'Avenida España, San Salvador',
    city: 'Tegucigalpa',
    phone: '7733-4466',
    price: '$30 - $180',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 15,
    name: 'Hojalatería y Pintura Total',
    specialtyId: 10,
    description: 'Reparación de golpes, pintura automotriz y enderezado profesional',
    rating: 4.9,
    address: 'Boulevard Venezuela, San Salvador',
    city: 'Tegucigalpa',
    phone: '7744-5577',
    price: '$100 - $800',
    imageUrl: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 16,
    name: 'Jardines Paradise',
    specialtyId: 11,
    description: 'Diseño y creación de jardines personalizados, espacios verdes únicos',
    rating: 4.9,
    address: 'Escalón, San Salvador',
    city: 'Tegucigalpa',
    phone: '7755-6688',
    price: '$150 - $1000',
    imageUrl: 'https://images.pexels.com/photos/2898199/pexels-photo-2898199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 17,
    name: 'Poda Profesional Verde',
    specialtyId: 12,
    description: 'Poda de árboles, arbustos y mantenimiento de áreas verdes',
    rating: 4.7,
    address: 'Santa Elena, Antiguo Cuscatlán',
    city: 'La Ceiba',
    phone: '7766-7799',
    price: '$40 - $200',
    imageUrl: 'https://images.pexels.com/photos/2898199/pexels-photo-2898199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 18,
    name: 'Jardinería Verde Vida',
    specialtyId: 13,
    description: 'Mantenimiento regular de césped, fertilización y control de plagas',
    rating: 4.8,
    address: 'Área Metropolitana, San Salvador',
    city: 'Tegucigalpa',
    phone: '7777-8800',
    price: '$35 - $120',
    imageUrl: 'https://images.pexels.com/photos/2898199/pexels-photo-2898199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 19,
    name: 'Riego Automático SV',
    specialtyId: 14,
    description: 'Instalación de sistemas de riego automatizados y eficientes',
    rating: 5.0,
    address: 'Zona Residencial, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '7788-9911',
    price: '$200 - $1500',
    imageUrl: 'https://images.pexels.com/photos/2898199/pexels-photo-2898199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 20,
    name: 'Paisajismo Integral',
    specialtyId: 15,
    description: 'Transformación completa de espacios exteriores con diseño profesional',
    rating: 4.9,
    address: 'La Gran Vía, San Salvador',
    city: 'Tegucigalpa',
    phone: '7799-0022',
    price: '$300 - $2000',
    imageUrl: 'https://images.pexels.com/photos/2898199/pexels-photo-2898199.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 21,
    name: 'Cocinas Modernas SV',
    specialtyId: 16,
    description: 'Reparación y renovación de cocinas, instalación de mesones y lavaplatos',
    rating: 4.8,
    address: 'San Benito, San Salvador',
    city: 'Tegucigalpa',
    phone: '7700-2233',
    price: '$80 - $400',
    imageUrl: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 22,
    name: 'Instalación de Campanas Pro',
    specialtyId: 17,
    description: 'Especialistas en instalación de campanas extractoras y sistemas de ventilación',
    rating: 4.7,
    address: 'Multiplaza, Antiguo Cuscatlán',
    city: 'La Ceiba',
    phone: '7711-3344',
    price: '$60 - $250',
    imageUrl: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 23,
    name: 'Mesones y Encimeras Premium',
    specialtyId: 18,
    description: 'Fabricación e instalación de mesones de granito, cuarzo y materiales premium',
    rating: 5.0,
    address: 'Carretera a Santa Tecla, San Salvador',
    city: 'Tegucigalpa',
    phone: '7722-4455',
    price: '$200 - $1200',
    imageUrl: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 24,
    name: 'Gabinetes de Cocina Elite',
    specialtyId: 19,
    description: 'Diseño y fabricación de gabinetes a medida, instalación profesional',
    rating: 4.9,
    address: 'Zona Industrial, Soyapango',
    city: 'Choluteca',
    phone: '7733-5566',
    price: '$300 - $2500',
    imageUrl: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 25,
    name: 'Reparación de Electrodomésticos',
    specialtyId: 20,
    description: 'Servicio técnico para estufas, refrigeradoras, lavadoras y más',
    rating: 4.8,
    address: 'Servicio a Domicilio, San Salvador',
    city: 'Tegucigalpa',
    phone: '7744-6677',
    price: '$25 - $150',
    imageUrl: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
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
