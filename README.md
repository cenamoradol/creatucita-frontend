# CreaTuCita - Frontend

Aplicacion web para la gestion de citas medicas, construida con **React** + **Vite** y **React Router**.

## Requisitos

- Node.js >= 18
- npm >= 9
- Backend de CreaTuCita corriendo en `http://localhost:3002`

## Instalacion rapida

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd creatucita-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raiz del proyecto:

```env
VITE_API_URL=http://localhost:3002
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### 4. Iniciar el servidor de desarrollo

```bash
npm start
```

La aplicacion estara disponible en `http://localhost:5173`.

### 5. Compilar para produccion

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

## Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Header.js       # Barra de navegacion
│   ├── Footer.js       # Pie de pagina
│   └── especialista/   # Componentes del panel especialista
├── pages/              # Paginas de la aplicacion
│   ├── Home.js         # Pagina principal
│   ├── Login.js        # Inicio de sesion
│   ├── Perfil.js       # Perfil de usuario
│   ├── AgendarCita.js  # Agendar cita
│   ├── admin/          # Panel de administrador
│   └── especialista/   # Panel de especialista
├── context/            # Contextos de React (Auth)
│   ├── AuthContext.js
│   └── AuthContextEspecialista.js
├── App.js              # Componente principal y rutas
└── index.js            # Punto de entrada
```

## Roles de usuario

### Cliente
- Buscar especialistas por categoria/subcategoria
- Agendar citas
- Ver citas pendientes
- Gestionar perfil personal

### Especialista
- Panel de control con dashboard
- Gestionar citas (aceptar, rechazar, completar)
- Ver historial de citas
- Gestionar finanzas
- Notas y recordatorios
- Configurar horarios y servicios
- Gestionar perfil (biografia, telefono)

### Administrador
- Panel de administracion (`/admin`)
- Crear, editar y eliminar usuarios (cliente, especialista, admin)
- Aprobar o rechazar solicitudes de especialistas
- Gestionar categorias y subcategorias
- Ver usuarios eliminados y restaurarlos

## Credenciales de prueba

### Administrador
- Email: `admin@creatucita.com`
- Password: `Admin123@`

### Especialista
- Email: `isaaceverywere@gmail.com`
- Password: `Ciel1997@`

### Especialista 2
- Email: `test2@admin.com`
- Password: `Ciel1997@`

## Rutas principales

| Ruta | Descripcion | Acceso |
|------|-------------|--------|
| `/` | Pagina principal | Publico |
| `/login` | Inicio de sesion | Publico |
| `/perfil` | Perfil del usuario | Autenticado |
| `/citas-pendientes` | Citas pendientes | Autenticado |
| `/agendar-cita/:id` | Agendar cita | Autenticado |
| `/busqueda` | Busqueda de especialistas | Publico |
| `/admin` | Panel de administrador | Solo admin |
| `/especialista/panel` | Panel de especialista | Solo especialista |

## Tecnologias

- **React 18** - Biblioteca de UI
- **React Router 7** - Enrutamiento
- **Lucide React** - Iconos
- **React Hot Toast** - Notificaciones
- **Bootstrap 5** - Estilos base
- **Tailwind CSS 4** - Utilidades CSS
- **GSAP** - Animaciones
- **Stripe** - Procesamiento de pagos
- **jwt-decode** - Decodificacion de tokens JWT

## Dependencias principales

```json
{
  "react": "^18",
  "react-router-dom": "^7.6.3",
  "lucide-react": "^0.525.0",
  "react-hot-toast": "^2.6.0",
  "bootstrap": "^5.3.3",
  "tailwindcss": "^4.1.11",
  "gsap": "^3.13.0",
  "@stripe/react-stripe-js": "^3.10.0"
}
```

## Notas

- El backend debe estar corriendo antes de iniciar el frontend
- La URL del backend se configura en la variable `REACT_APP_API_URL`
- Las sesiones se manejan con JWT almacenado en `localStorage`
- Los datos del usuario se persisten en `localStorage` para mantener la sesion
