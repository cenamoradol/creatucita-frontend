const serviceTypes = [
  { id: 1, name: 'Cuidado Personal' },
  { id: 2, name: 'Spa y Masajes' },
  { id: 3, name: 'Maquillaje' },
  { id: 4, name: 'Depilación' }
];

const specialties = [
  { id: 1, serviceTypeId: 1, name: 'Peluquería y Corte' },
  { id: 2, serviceTypeId: 1, name: 'Coloración y Tintes' },
  { id: 3, serviceTypeId: 1, name: 'Manicure y Pedicure' },
  { id: 4, serviceTypeId: 1, name: 'Tratamientos Capilares' },
  { id: 5, serviceTypeId: 1, name: 'Barbería' },

  { id: 6, serviceTypeId: 2, name: 'Masajes Relajantes' },
  { id: 7, serviceTypeId: 2, name: 'Masajes Terapéuticos' },
  { id: 8, serviceTypeId: 2, name: 'Spa Facial' },
  { id: 9, serviceTypeId: 2, name: 'Tratamientos Corporales' },
  { id: 10, serviceTypeId: 2, name: 'Sauna y Baños' },

  { id: 11, serviceTypeId: 3, name: 'Maquillaje Social' },
  { id: 12, serviceTypeId: 3, name: 'Maquillaje de Novia' },
  { id: 13, serviceTypeId: 3, name: 'Maquillaje Artístico' },
  { id: 14, serviceTypeId: 3, name: 'Cejas y Pestañas' },
  { id: 15, serviceTypeId: 3, name: 'Micropigmentación' },

  { id: 16, serviceTypeId: 4, name: 'Depilación con Cera' },
  { id: 17, serviceTypeId: 4, name: 'Depilación Láser' },
  { id: 18, serviceTypeId: 4, name: 'Depilación Definitiva' },
  { id: 19, serviceTypeId: 4, name: 'Diseño de Cejas' },
  { id: 20, serviceTypeId: 4, name: 'Depilación Facial' }
];

const popularSpecialties = [
  { id: 1, name: 'Peluquería y Corte' },
  { id: 3, name: 'Manicure y Pedicure' },
  { id: 6, name: 'Masajes Relajantes' },
  { id: 11, name: 'Maquillaje Social' },
  { id: 17, name: 'Depilación Láser' }
];

const popularTreatments = [
  { id: 8, name: 'Spa Facial' },
  { id: 4, name: 'Tratamientos Capilares' },
  { id: 14, name: 'Cejas y Pestañas' },
  { id: 9, name: 'Tratamientos Corporales' }
];

const providers = [
  {
    id: 1,
    name: 'Salón de Belleza Elegance',
    specialtyId: 1,
    description: 'Especialistas en cortes modernos y clásicos con más de 15 años de experiencia',
    rating: 4.9,
    address: 'Avenida Central 456, San Salvador',
    city: 'Tegucigalpa',
    phone: '2222-3344',
    price: '$15 - $35',
    imageUrl: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Studio Color & Style',
    specialtyId: 2,
    description: 'Expertos en coloración y técnicas de tinte avanzadas',
    rating: 4.8,
    address: 'Boulevard Los Héroes 789, San Salvador',
    city: 'Tegucigalpa',
    phone: '2233-4455',
    price: '$25 - $80',
    imageUrl: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Nails & Beauty Studio',
    specialtyId: 3,
    description: 'Servicio completo de manicure, pedicure y uñas decoradas',
    rating: 4.9,
    address: 'Calle Fashion 321, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '2244-5566',
    price: '$15 - $35',
    imageUrl: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Hair Care Professional',
    specialtyId: 4,
    description: 'Tratamientos capilares de recuperación y fortalecimiento',
    rating: 5.0,
    address: 'Plaza Merliot 567, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '2255-6677',
    price: '$30 - $60',
    imageUrl: 'https://images.pexels.com/photos/3993450/pexels-photo-3993450.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Barber Kings',
    specialtyId: 5,
    description: 'Barbería moderna con servicios de corte, afeitado y arreglo de barba',
    rating: 4.8,
    address: 'Avenida Masferrer 234, San Salvador',
    city: 'Tegucigalpa',
    phone: '2266-7788',
    price: '$10 - $25',
    imageUrl: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Spa Relajación Total',
    specialtyId: 6,
    description: 'Masajes relajantes con aceites aromáticos y técnicas especializadas',
    rating: 5.0,
    address: 'Plaza Wellness 123, San Salvador',
    city: 'Tegucigalpa',
    phone: '2277-8899',
    price: '$40 - $90',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 7,
    name: 'Centro Terapéutico Balance',
    specialtyId: 7,
    description: 'Masajes terapéuticos para alivio de dolor muscular y estrés',
    rating: 4.9,
    address: 'Calle Principal 678, Antiguo Cuscatlán',
    city: 'La Ceiba',
    phone: '2288-9900',
    price: '$45 - $85',
    imageUrl: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 8,
    name: 'Facial Luxury Spa',
    specialtyId: 8,
    description: 'Tratamientos faciales personalizados con productos premium',
    rating: 4.9,
    address: 'Paseo General Escalón 890, San Salvador',
    city: 'Tegucigalpa',
    phone: '2299-0011',
    price: '$50 - $120',
    imageUrl: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 9,
    name: 'Body Care Center',
    specialtyId: 9,
    description: 'Tratamientos corporales reductores, reafirmantes y exfoliantes',
    rating: 4.7,
    address: 'Multiplaza 456, San Salvador',
    city: 'Tegucigalpa',
    phone: '2200-1122',
    price: '$55 - $100',
    imageUrl: 'https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 10,
    name: 'Zen Wellness Spa',
    specialtyId: 10,
    description: 'Sauna, baños de vapor y experiencias de relajación completa',
    rating: 4.8,
    address: 'Boulevard del Hipódromo 789, San Salvador',
    city: 'Tegucigalpa',
    phone: '2211-2233',
    price: '$35 - $75',
    imageUrl: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 11,
    name: 'Makeup Pro Studio',
    specialtyId: 11,
    description: 'Maquillaje profesional para eventos sociales y ocasiones especiales',
    rating: 4.9,
    address: 'Boulevard Beauty 456, San Salvador',
    city: 'Tegucigalpa',
    phone: '2222-3344',
    price: '$35 - $60',
    imageUrl: 'https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 12,
    name: 'Bridal Beauty Studio',
    specialtyId: 12,
    description: 'Especialistas en maquillaje de novia con pruebas personalizadas',
    rating: 5.0,
    address: 'Zona Rosa 234, San Salvador',
    city: 'Tegucigalpa',
    phone: '2233-4455',
    price: '$80 - $150',
    imageUrl: 'https://images.pexels.com/photos/3992860/pexels-photo-3992860.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 13,
    name: 'Art Makeup & Design',
    specialtyId: 13,
    description: 'Maquillaje artístico y efectos especiales para fotografía y eventos',
    rating: 4.8,
    address: 'Avenida Las Camelias 567, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '2244-5566',
    price: '$50 - $120',
    imageUrl: 'https://images.pexels.com/photos/3997983/pexels-photo-3997983.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 14,
    name: 'Brow & Lash Studio',
    specialtyId: 14,
    description: 'Diseño de cejas, extensiones y lifting de pestañas',
    rating: 4.9,
    address: 'Centro Comercial La Skina 890, San Salvador',
    city: 'Tegucigalpa',
    phone: '2255-6677',
    price: '$20 - $45',
    imageUrl: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 15,
    name: 'Permanent Beauty Center',
    specialtyId: 15,
    description: 'Micropigmentación de cejas, labios y delineado de ojos',
    rating: 4.7,
    address: 'Colonia Escalón 123, San Salvador',
    city: 'Tegucigalpa',
    phone: '2266-7788',
    price: '$150 - $300',
    imageUrl: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 16,
    name: 'Depilación Express',
    specialtyId: 16,
    description: 'Depilación con cera de alta calidad y sin dolor',
    rating: 4.6,
    address: 'Paseo Escalón 456, San Salvador',
    city: 'Tegucigalpa',
    phone: '2277-8899',
    price: '$15 - $40',
    imageUrl: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 17,
    name: 'Centro de Depilación Láser',
    specialtyId: 17,
    description: 'Depilación láser con tecnología de última generación',
    rating: 4.9,
    address: 'Avenida Moderna 321, Antiguo Cuscatlán',
    city: 'La Ceiba',
    phone: '2288-9900',
    price: '$50 - $150',
    imageUrl: 'https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 18,
    name: 'Beauty Laser Clinic',
    specialtyId: 18,
    description: 'Depilación definitiva con garantía de resultados permanentes',
    rating: 4.8,
    address: 'Torre Futura 789, San Salvador',
    city: 'Tegucigalpa',
    phone: '2299-0011',
    price: '$80 - $200',
    imageUrl: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 19,
    name: 'Perfect Brows',
    specialtyId: 19,
    description: 'Especialistas en diseño y depilación de cejas con técnicas precisas',
    rating: 4.9,
    address: 'Galerías Escalón 234, San Salvador',
    city: 'Tegucigalpa',
    phone: '2200-1122',
    price: '$8 - $20',
    imageUrl: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 20,
    name: 'Facial Care Studio',
    specialtyId: 20,
    description: 'Depilación facial delicada con productos hipoalergénicos',
    rating: 4.7,
    address: 'Plaza Mundo 567, Santa Tecla',
    city: 'San Pedro Sula',
    phone: '2211-2233',
    price: '$10 - $25',
    imageUrl: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=400'
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

export const getPopularTreatments = () => {
  return popularTreatments;
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
