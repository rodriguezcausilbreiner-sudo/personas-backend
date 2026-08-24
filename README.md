# Personas Backend (Node.js + Express + Prisma + PostgreSQL)

API REST para la gestión de personas, soporte de paginación (`limit=10`), búsqueda avanzada y almacenamiento de fotos de perfil.

## 🚀 Guía para Ejecutar Localmente

### 1. Requisitos Previos
- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- Base de datos PostgreSQL (local o remota como Neon DB)

---

### 2. Instalación de Dependencias
Abre una terminal en la carpeta raíz del proyecto (`personas-backend`) y ejecuta:

```bash
npm install
```

---

### 3. Configuración de Variables de Entorno
Crea o verifica el archivo `.env` en la raíz del backend con el siguiente contenido:

```env
DATABASE_URL="postgresql://neondb_owner:npg_dcC8fqRPap4K@ep-falling-cloud-aygay66y.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"
PORT=3000
```

---

### 4. Generar Cliente y Sincronizar Base de Datos
Ejecuta los siguientes comandos para generar Prisma Client y verificar la sincronía del esquema con PostgreSQL:

```bash
npx prisma db push
npx prisma generate
```

---

### 5. Iniciar el Servidor Local
Para iniciar el servidor en modo desarrollo con recarga automática (`nodemon`), ejecuta:

```bash
npm run dev
```

El servidor estará activo y listo en:
👉 **`http://localhost:3000`**

- Endpoint principal: `http://localhost:3000/api/personas`
- Prueba de paginación: `http://localhost:3000/api/personas?page=1&limit=10`
