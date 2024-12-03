# 🤖 Product Price Tracker - Next.js Web Scraper

## 🌐 Introducción

Desarrollado utilizando Next.js y el desbloquedor web de Bright Data, este sitio de scraping de productos de comercio electrónico está diseñado para usarse con Amazon . 

## 🛠 Tech Stack

- **Frontend & Framework**: Next.js 14
- **Web Scraping**: Bright Data
- **HTML Parsing**: Cheerio
- **Email Service**: Nodemailer
- **Database**: MongoDB
- **UI Components**: Headless UI
- **Styling**: Tailwind CSS

## ✨ Características

### 1. 🎠 Header con Carrusel
- Encabezado visualmente atractivo con un carrusel que muestra características y beneficios clave

### 2. 🔍 Scraping de Productos
- Barra de búsqueda que permite a los usuarios ingresar enlaces de productos de Amazon para hacer scraping

### 3. 📦 Proyectos Scrapeados
- Muestra los detalles de los productos scrapeados hasta el momento
- Ofrece información detallada sobre los artículos rastreados

### 4. 🏷️ Detalles de Productos Scrapeados
- Muestra:
  - Imagen del producto
  - Título
  - Precios
  - Detalles relevantes
  - Información extraída del sitio web original

### 5. 🔔 Opción de Seguimiento
- Modal para que los usuarios proporcionen direcciones de correo electrónico
- Opción de suscribirse para recibir seguimiento de productos

### 6. 📧 Notificaciones por Correo Electrónico
- Envío de alertas por correo electrónico en diversos escenarios:
  - Alertas de producto disponible
  - Notificaciones de precio más bajo

### 7. ⏰ Trabajos Cron Automatizados
- Utiliza trabajos cron para realizar scraping periódico
- Garantiza que los datos estén actualizados

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (versión 18 o superior)
- Cuenta de Bright Data
- Cuenta de MongoDB
- Cuenta de servicio de correo electrónico

### Pasos de Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/scraper-price-amazon.git
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
- Crear un archivo `.env.local` con las siguientes variables:
  - `MONGO_URI`
  - `BRIGHT_DATA_USERNAME`
  - `BRIGHT_DATA_PASSWORD`
  - `GMAIL`
  - `GMAIL_PASSWORD`

4. Ejecutar la aplicación en modo desarrollo
```bash
npm run dev
```



