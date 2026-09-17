# Series Tracker API

API REST desarrollada para una aplicación web full-stack que permite a los usuarios descubrir, seguir y gestionar series de TV.

El backend se encarga de la autenticación, usuarios, series, categorías, seguimiento de progreso, calificaciones y favoritos. También integra servicios externos para obtener información adicional sobre series y generar recomendaciones personalizadas.

## Funcionalidades

- Registro e inicio de sesión de usuarios con JWT
- Hash de contraseñas con bcrypt
- Autorización basada en roles (`viewer` / `admin`)
- Gestión de series de TV
- Gestión de categorías
- Seguimiento de series por usuario
- Progreso por episodios y temporadas
- Favoritos y calificaciones
- Estadísticas de usuario
- Recomendaciones personalizadas con Google Gemini
- Integración con la API de TVMaze
- Subida y gestión de imágenes con Cloudinary
- Validación de requests con Joi
- Persistencia en MongoDB usando Mongoose

## Tecnologías

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **Joi**
- **Multer**
- **Cloudinary**
- **Google Gemini API**
- **TVMaze API**

## Arquitectura

El proyecto sigue una estructura por capas para separar responsabilidades.

```text
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── validators/
└── ...
```

- **Routes** define los endpoints de la API.
- **Controllers** manejan las solicitudes y respuestas HTTP.
- **Services** contienen la lógica de aplicación y de negocio.
- **Models** definen los esquemas de MongoDB usando Mongoose.
- **Middlewares** manejan autenticación, autorización y otras responsabilidades transversales.
- **Validators** validan los datos recibidos en las solicitudes.

## Autenticación

La API utiliza JSON Web Tokens (JWT) para la autenticación.

Las rutas protegidas requieren incluir un token válido en los headers de la solicitud.

```http
Authorization: Bearer <token>
```

También se utiliza middleware de autorización para restringir ciertas operaciones según el rol del usuario.

## APIs externas

### TVMaze

TVMaze se utiliza para obtener información adicional sobre series de TV y apoyar funcionalidades relacionadas con recomendaciones.

### Google Gemini

Google Gemini se utiliza para generar recomendaciones personalizadas de series en base a la información del usuario y su actividad de visualización.

### Cloudinary

Cloudinary se utiliza para el almacenamiento y la gestión de imágenes.

## Instalación

Clonar el repositorio:

```bash
git clone <repository-url>
cd <repository-folder>
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto y configurar las variables de entorno requeridas por la aplicación.

Ejemplo:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

Iniciar la aplicación:

```bash
npm start
```

Para desarrollo:

```bash
npm run dev
```

## API

La API REST provee recursos para:

- Autenticación
- Usuarios
- Series
- Categorías
- Seguimiento y progreso de series
- Favoritos
- Calificaciones
- Estadísticas
- Recomendaciones

## Deploy

El backend está desplegado en **Vercel**.

La persistencia de datos se gestiona con **MongoDB** usando **Mongoose**.

## Frontend

La aplicación incluye un frontend separado desarrollado con:

- React
- Vite
- Redux Toolkit
- React Router
- Axios
- Chart.js

El frontend se comunica con esta API REST y se mantiene en un repositorio separado.

## Contexto del proyecto

Este proyecto fue desarrollado como una aplicación full-stack académica, con foco en desarrollo de APIs REST, autenticación y autorización, persistencia, integración con APIs externas y separación de responsabilidades.

## Autores

- Diego de Brun
- Karina Krysztal

## Licencia

Este proyecto fue desarrollado con fines académicos.
