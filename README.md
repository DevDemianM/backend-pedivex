# 🏭 Backend-Pedivex - Sistema de Gestión Empresarial

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-blue.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.37.3-blue.svg)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-red.svg)](https://jwt.io/)

## 📋 Descripción

**Backend-Pedivex** es un sistema de gestión empresarial completo desarrollado en Node.js que maneja inventarios, ventas, compras, producción, usuarios y más. El sistema está diseñado con una arquitectura robusta siguiendo patrones de diseño MVC y principios de Clean Architecture.

## 🚀 Características Principales

- 🔐 **Autenticación JWT** - Sistema seguro de login y autorización
- 👥 **Gestión de Usuarios** - Roles y permisos granulares
- 📦 **Gestión de Productos** - Inventario, categorías y ficha técnica
- 🛒 **Ventas y Compras** - Control completo del ciclo comercial
- 🏭 **Órdenes de Producción** - Gestión de procesos productivos
- 📊 **Dashboard** - Reportes y métricas en tiempo real
- 🔄 **Devoluciones** - Sistema de devoluciones con motivos
- 📋 **Solicitudes** - Gestión de pedidos internos
- 🏪 **Proveedores** - Gestión de proveedores y compras
- 📈 **Estados y Reportes** - Seguimiento de estados y reportes

## 🏗️ Arquitectura del Proyecto

```
Backend-Pedivex/
├── 📁 src/
│   ├── 📁 config/          # Configuración de base de datos
│   ├── 📁 controllers/      # Controladores (Lógica de negocio)
│   ├── 📁 middlewares/      # Middlewares (Validación, Auth)
│   ├── 📁 models/          # Modelos de datos (Sequelize)
│   ├── 📁 repositories/    # Capa de acceso a datos
│   ├── 📁 routes/          # Definición de rutas API
│   ├── 📁 services/        # Servicios (Lógica de aplicación)
│   └── 📁 utils/           # Utilidades y helpers
├── 📁 uploads/             # Archivos subidos
├── 📄 index.js             # Punto de entrada de la aplicación
├── 📄 package.json         # Dependencias y scripts
└── 📄 sync.js             # Sincronización de base de datos
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MySQL** - Base de datos relacional
- **Sequelize** - ORM para Node.js
- **JWT** - Autenticación y autorización
- **bcrypt** - Encriptación de contraseñas
- **multer** - Manejo de archivos
- **nodemailer** - Enví de emails
- **cors** - Cross-Origin Resource Sharing

### Herramientas de Desarrollo
- **nodemon** - Reinicio automático del servidor
- **dotenv** - Variables de entorno
- **express-validator** - Validación de datos
- **joi** - Validación de esquemas

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18.x o superior)
- MySQL (versión 8.0 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/DevDemianM/backend-pedivex.git
   cd backend-pedivex
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear archivo `.env` en la raíz del proyecto:
   ```env
   # Configuración de Base de Datos
   DB_NAME=pedivex_db
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_HOST=localhost
   DB_DIALECT=mysql
   DB_PORT=3306

   # Configuración del Servidor
   SERVER_PORT=3000

   # Configuración JWT
   JWT_SECRET=tu_jwt_secret_key_muy_seguro
   JWT_EXPIRES_IN=24h

   # Configuración de Email (opcional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=tu_password_de_aplicacion
   ```

4. **Configurar la base de datos**
   ```bash
   # Crear la base de datos en MySQL
   CREATE DATABASE pedivex_db;
   
   # Sincronizar modelos (crear tablas)
   node sync.js
   ```

5. **Iniciar el servidor**
   ```bash
   npm start
   ```

## 🚀 Uso

### Scripts Disponibles

```bash
# Iniciar servidor en modo desarrollo
npm start

# Sincronizar base de datos
node sync.js

# Ejecutar tests (cuando estén implementados)
npm test
```

### Endpoints Principales

#### Autenticación
- `POST /auth/login` - Iniciar sesión

#### Usuarios
- `GET /user` - Obtener todos los usuarios
- `POST /user` - Crear usuario
- `PUT /user/:id` - Actualizar usuario
- `DELETE /user/:id` - Eliminar usuario

#### Productos
- `GET /product` - Obtener todos los productos
- `GET /product/:id` - Obtener producto por ID
- `POST /product` - Crear producto
- `PUT /product/:id` - Actualizar producto
- `PATCH /product/:id` - Cambiar estado del producto

#### Ventas
- `GET /sale` - Obtener todas las ventas
- `POST /sale` - Crear venta
- `GET /sale/:id` - Obtener venta por ID

#### Compras
- `GET /bought` - Obtener todas las compras
- `POST /bought` - Crear compra
- `GET /bought/:id` - Obtener compra por ID

#### Dashboard
- `GET /dashboard` - Obtener métricas del dashboard

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación. Para acceder a rutas protegidas, incluye el token en el header:

```
Authorization: tu_jwt_token
```

### Roles y Permisos

El sistema incluye un sistema de roles y permisos granulares:
- **Administrador** - Acceso completo al sistema
- **Vendedor** - Gestión de ventas y productos
- **Comprador** - Gestión de compras y proveedores
- **Producción** - Gestión de órdenes de producción

## 📊 Modelos de Datos

### Entidades Principales

- **Users** - Usuarios del sistema
- **Roles** - Roles de usuario
- **Permissions** - Permisos del sistema
- **Products** - Productos del inventario
- **Sales** - Ventas realizadas
- **Boughts** - Compras realizadas
- **ProductionOrders** - Órdenes de producción
- **Providers** - Proveedores
- **Devolutions** - Devoluciones de productos

### Relaciones

El sistema maneja relaciones complejas entre entidades:
- Usuarios ↔ Roles (Muchos a Uno)
- Productos ↔ Categorías (Muchos a Uno)
- Ventas ↔ Detalles de Venta (Uno a Muchos)
- Compras ↔ Detalles de Compra (Uno a Muchos)
- Órdenes de Producción ↔ Detalles (Uno a Muchos)

## 🔧 Configuración Avanzada

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `DB_NAME` | Nombre de la base de datos | `pedivex_db` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | - |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `SERVER_PORT` | Puerto del servidor | `3000` |
| `JWT_SECRET` | Clave secreta para JWT | - |
| `JWT_EXPIRES_IN` | Expiración del token | `24h` |

### Configuración de Base de Datos

El sistema utiliza Sequelize como ORM. La configuración se encuentra en `src/config/database.js`.

## 📁 Estructura de Archivos

### Controladores (`src/controllers/`)
Manejan las peticiones HTTP y la lógica de negocio.

### Servicios (`src/services/`)
Contienen la lógica de aplicación y validaciones.

### Repositorios (`src/repositories/`)
Acceso a datos y consultas complejas.

### Modelos (`src/models/`)
Definición de entidades y relaciones de la base de datos.

### Rutas (`src/routes/`)
Definición de endpoints de la API.

### Middlewares (`src/middlewares/`)
Validaciones, autenticación y procesamiento de peticiones.

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

## 📦 Despliegue

### Producción

1. **Configurar variables de entorno de producción**
2. **Configurar base de datos de producción**
3. **Ejecutar migraciones**
4. **Iniciar servidor con PM2**

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicación con PM2
pm2 start index.js --name "pedivex-api"

# Ver logs
pm2 logs pedivex-api

# Reiniciar aplicación
pm2 restart pedivex-api
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```


## 👥 Autores

- **Damian** - *Desarrollo* - [DemianDev](https://github.com/DevDemianM)
- **Jhonatan corrales** - *Desarrollo* 
- **Juan Pablo** - *Desarrollo* 
- **Miguel** - *Desarrollo* 
- **Andres corrales** - *Desarrollo* 


⭐ **¡No olvides dar una estrella al proyecto si te ha sido útil!**
