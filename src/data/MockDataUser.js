export const mockUser = {
  id: 1,
  nombre: 'Isabel Sofia',
  email: 'isabel@example.com',
  password: '123',
  telefono: '9876 5432',
  codigoPais: '+504',
  fechaRegistro: '2024-01-15',
  avatar: 'https://i.ibb.co/6cBDDxVn/Whats-App-Image-2025-12-29-at-16-47-12.jpg',
  direccion: 'San Pedro Sula, Honduras',
  citasPendientes: 3,
  citasCompletadas: 12,
  serviciosFavoritos: ['Salud', 'Legal', 'Veterinaria']
};

export const validateUser = (email, password) => {
  if (email === mockUser.email && password === mockUser.password) {
    const { password: _, ...userWithoutPassword } = mockUser;
    return userWithoutPassword;
  }
  return null;
};

let appointmentIdCounter = 4;
let mockAppointments = [
  {
    id: 1,
    userId: 1,
    providerName: 'Dr. Juan Pérez',
    providerSpecialty: 'Medicina General',
    categoria: 'Salud',
    city: 'San Pedro Sula',
    address: 'Calle Principal 123',
    phone: '+504 9876-5432',
    appointmentDate: '2024-12-28',
    appointmentTime: '10:00 AM',
    reason: 'Consulta Médica General',
    notes: 'Primera consulta',
    status: 'confirmed'
  },
  {
    id: 2,
    userId: 1,
    providerName: 'María González',
    providerSpecialty: 'Estilista',
    categoria: 'Estética',
    city: 'Tegucigalpa',
    address: 'Avenida Central 456',
    phone: '+504 8765-4321',
    appointmentDate: '2024-12-29',
    appointmentTime: '3:00 PM',
    reason: 'Corte de Cabello',
    notes: '',
    status: 'pending'
  },
  {
    id: 3,
    userId: 1,
    providerName: 'Dra. Ana Martínez',
    providerSpecialty: 'Veterinaria General',
    categoria: 'Veterinaria',
    city: 'La Ceiba',
    address: 'Boulevard Norte 789',
    phone: '+504 7654-3210',
    appointmentDate: '2024-12-30',
    appointmentTime: '11:30 AM',
    reason: 'Consulta Veterinaria',
    notes: 'Vacunación anual',
    status: 'confirmed'
  }
];

export const getUserAppointments = (userId) => {
  return mockAppointments.filter(apt => apt.userId === userId);
};

export const addAppointment = (appointmentData) => {
  const newAppointment = {
    id: appointmentIdCounter++,
    userId: appointmentData.userId,
    providerName: appointmentData.providerName,
    providerSpecialty: appointmentData.providerSpecialty,
    categoria: appointmentData.categoria,
    city: appointmentData.city,
    address: appointmentData.address || '',
    phone: appointmentData.phone || '',
    appointmentDate: appointmentData.appointmentDate,
    appointmentTime: appointmentData.appointmentTime,
    reason: appointmentData.reason,
    notes: appointmentData.notes || '',
    status: 'pending'
  };

  mockAppointments.push(newAppointment);
  return newAppointment;
};

export const updateAppointmentStatus = (appointmentId, newStatus) => {
  const appointment = mockAppointments.find(apt => apt.id === appointmentId);
  if (appointment) {
    appointment.status = newStatus;
    return appointment;
  }
  return null;
};

export const deleteAppointment = (appointmentId) => {
  const index = mockAppointments.findIndex(apt => apt.id === appointmentId);
  if (index !== -1) {
    mockAppointments.splice(index, 1);
    return true;
  }
  return false;
};
