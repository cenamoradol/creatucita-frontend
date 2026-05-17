export const citasEspecialista = [
  {
    id: 1,
    clientName: 'María González',
    clientEmail: 'maria@email.com',
    clientPhone: '555-0101',
    date: '2026-01-10',
    time: '10:00',
    service: 'Consulta General',
    status: 'pendiente',
    price: 500,
    paid: false,
    notes: 'Primera consulta'
  },
  {
    id: 2,
    clientName: 'Carlos Ramírez',
    clientEmail: 'carlos@email.com',
    clientPhone: '555-0102',
    date: '2026-01-12',
    time: '14:30',
    service: 'Revisión',
    status: 'confirmada',
    price: 350,
    paid: false,
    notes: 'Seguimiento'
  },
  {
    id: 3,
    clientName: 'Ana Martínez',
    clientEmail: 'ana@email.com',
    clientPhone: '555-0103',
    date: '2026-01-08',
    time: '09:00',
    service: 'Consulta General',
    status: 'completada',
    price: 500,
    paid: true,
    notes: 'Consulta completada sin observaciones'
  },
  {
    id: 4,
    clientName: 'Roberto Silva',
    clientEmail: 'roberto@email.com',
    clientPhone: '555-0104',
    date: '2026-01-15',
    time: '21:00',
    service: 'Consulta Especializada',
    status: 'confirmada',
    price: 750,
    paid: false,
    notes: 'Caso especial'
  },
  {
    id: 5,
    clientName: 'Laura Pérez',
    clientEmail: 'laura@email.com',
    clientPhone: '555-0105',
    date: '2026-01-05',
    time: '11:00',
    service: 'Consulta General',
    status: 'completada',
    price: 500,
    paid: true,
    notes: ''
  },
  {
    id: 6,
    clientName: 'Diego Torres',
    clientEmail: 'diego@email.com',
    clientPhone: '555-0106',
    date: '2026-01-03',
    time: '16:00',
    service: 'Revisión',
    status: 'completada',
    price: 350,
    paid: true,
    notes: ''
  },
  {
    id: 7,
    clientName: 'Sofia Morales',
    clientEmail: 'sofia@email.com',
    clientPhone: '555-0107',
    date: '2026-01-18',
    time: '10:00',
    service: 'Consulta General',
    status: 'pendiente',
    price: 500,
    paid: false,
    notes: ''
  }
];

export const serviciosDisponibles = [
  { id: 1, name: 'Consulta General', duration: 60, price: 500 },
  { id: 2, name: 'Revisión', duration: 30, price: 350 },
  { id: 3, name: 'Consulta Especializada', duration: 90, price: 750 },
  { id: 4, name: 'Seguimiento', duration: 45, price: 400 }
];

export const horariosDisponibles = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00'
];
