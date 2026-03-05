# C&Y Quality Paint LLC - Integraciones y Configuración

## 📋 Resumen de Integraciones

Este sitio web está diseñado para integrarse con múltiples servicios para automatizar la atención al cliente y las operaciones comerciales de C&Y Quality Paint LLC.

**Empresa**: C&Y Quality Paint LLC  
**Ubicación**: Hillsborough, FL  
**Servicios**: Pintura residencial/comercial, Drywall, Remodelación, Pisos  
**Tarjeta Digital**: [HiHello Card](https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb)

---

## 🤖 Integraciones Configuradas

### 1. **Twilio** (Llamadas, WhatsApp, SMS)

#### Configuración Actual:
- **Botón de Llamada Flotante**: Acceso directo a opciones de contacto
- **Chat Widget**: Asistente virtual integrado (bilingüe: inglés/español)
- **Enlaces Configurados**:
  - Teléfono: `tel:+15863821603`
  - WhatsApp: `https://wa.me/15863821603`

#### Para Configurar Twilio:
1. Crear cuenta en [Twilio](https://www.twilio.com)
2. Obtener número de teléfono
3. Configurar Twilio Functions para:
   - Respuestas automáticas de SMS
   - Webhook para WhatsApp Business API
   - Sistema de IVR para llamadas

#### Variables de Entorno (Vercel):
```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+15863821603
TWILIO_WHATSAPP_NUMBER=+15863821603
```

#### API Endpoint para Twilio (ya creado en `api/twilio/webhook.ts`):
- Responde automáticamente en inglés y español
- Reconoce palabras clave: price, quote, services, drywall, remodeling, etc.
- Escalación automática para mensajes complejos

---

### 2. **Google Calendar / Gmail**

#### Configuración Actual:
- Formulario de contacto con campo de fecha preferida
- Enlaces para agendar citas
- API endpoint preparado para crear eventos

#### Para Integrar Google Calendar API:
1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear nuevo proyecto
3. Habilitar APIs:
   - Google Calendar API
   - Gmail API
4. Crear credenciales OAuth 2.0
5. Descargar `credentials.json`

#### Variables de Entorno:
```bash
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://cyqualitypaint.com/api/auth/callback
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_CALENDAR_ID=primary
```

#### Funcionalidades:
- **Crear eventos** cuando se recibe una solicitud de cita
- **Enviar confirmaciones** por email vía Gmail
- **Bloquear disponibilidad** automáticamente
- **Verificar disponibilidad** antes de confirmar

---

### 3. **QuickBooks**

#### Para Integrar QuickBooks Online:
1. Crear cuenta de desarrollador en [QuickBooks](https://developer.intuit.com)
2. Crear nueva aplicación
3. Obtener Client ID y Client Secret
4. Configurar redirect URI

#### Variables de Entorno:
```bash
QUICKBOOKS_CLIENT_ID=your_client_id
QUICKBOOKS_CLIENT_SECRET=your_client_secret
QUICKBOOKS_REDIRECT_URI=https://cyqualitypaint.com/api/quickbooks/callback
QUICKBOOKS_SANDBOX=false
QUICKBOOKS_COMPANY_ID=your_company_id
```

#### Funcionalidades:
- **Crear estimados** automáticamente desde el formulario web
- **Generar facturas** cuando se completa un proyecto
- **Sincronizar clientes** entre el sitio web y QuickBooks
- **Tracking de pagos**

#### API Endpoints Ya Creados:
```typescript
// Crear estimado desde formulario
POST /api/quickbooks/estimate

// Crear factura
POST /api/quickbooks/invoice

// Sincronizar cliente
POST /api/quickbooks/customer
```

---

### 4. **HiHello Digital Business Card**

#### Configuración Actual:
- Enlace en el footer del sitio
- Enlace en el menú móvil
- Enlace en el botón de contacto flotante

#### URL de la Tarjeta:
```
https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb
```

---

## 🔧 Configuración de Despliegue (Vercel)

### Paso 1: Preparar el Repositorio
```bash
# Inicializar Git
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit - C&Y Quality Paint LLC website"

# Conectar con GitHub
git remote add origin https://github.com/YOUR_USERNAME/cyqualitypaint.git
git push -u origin main
```

### Paso 2: Configurar en Vercel
1. Ir a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Importar desde GitHub
4. Seleccionar repositorio
5. Configurar:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Paso 3: Configurar Dominio Personalizado
1. En Vercel Dashboard → Project Settings → Domains
2. Agregar dominio: `cyqualitypaint.com`
3. Seguir instrucciones para configurar DNS en Squarespace:
   - Tipo: A → `76.76.21.21`
   - Tipo: CNAME → `cname.vercel-dns.com`

### Paso 4: Variables de Entorno
En Vercel Dashboard → Project Settings → Environment Variables:
```
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+15863821603
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
QUICKBOOKS_CLIENT_ID=xxx
QUICKBOOKS_CLIENT_SECRET=xxx
```

---

## 📁 Estructura de API Routes (Vercel)

Carpeta `api/` ya creada en el proyecto:

```
api/
├── twilio/
│   └── webhook.ts       # Webhook para mensajes entrantes (bilingüe)
├── google/
│   └── calendar.ts      # Crear eventos en Google Calendar
├── quickbooks/
│   └── estimate.ts      # Crear estimados en QuickBooks
└── contact.ts           # Formulario de contacto principal
```

---

## 🚀 Funcionalidades del Asistente Virtual

### Chatbot Integrado (React Component)
Ubicación: `src/components/ChatWidget.tsx`

#### Capacidades:
- ✅ **Respuestas bilingües** (inglés/español)
- ✅ Respuestas automáticas a preguntas frecuentes
- ✅ Enlaces directos a WhatsApp
- ✅ Botón para llamar
- ✅ Redirección al formulario de citas
- ✅ Información de todos los servicios:
  - Interior & Exterior Painting
  - Drywall Installation & Finishes
  - Remodeling Services
  - Flooring & Surface Coatings
  - Residential & Commercial

#### Palabras Clave Reconocidas:
- price, quote, services, drywall, remodeling, flooring
- precio, cotizacion, servicios, drywall-es, remodelacion, pisos
- warranty, hours, location, call, phone
- garantia, horario, ubicacion, llamar, telefono
- commercial, residential, cabinet, exterior, interior

---

## 📱 Integraciones Móviles

### Click-to-Call:
```html
<a href="tel:+15863821603">Call Now</a>
```

### WhatsApp Direct:
```html
<a href="https://wa.me/15863821603?text=Hi!%20I'm%20interested%20in%20your%20services">
  Chat on WhatsApp
</a>
```

### SMS Direct:
```html
<a href="sms:+15863821603?body=Hi!%20I'm%20interested%20in%20a%20quote">
  Send SMS
</a>
```

### HiHello Card:
```html
<a href="https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb">
  View Digital Card
</a>
```

---

## 📊 Tracking y Analytics

### Google Analytics 4:
Agregar en `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel:
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  ...
</script>
```

---

## 🔄 Flujo de Trabajo Automatizado

### Escenario 1: Cliente Solicita Cotización
1. Cliente llena formulario en el sitio
2. Datos se envían a `/api/contact`
3. API:
   - Crea lead en Google Sheets/CRM
   - Envía confirmación por email (Gmail)
   - Crea evento de seguimiento en Google Calendar
   - Opcional: Crea estimado en QuickBooks
   - Envía SMS de confirmación (Twilio)

### Escenario 2: Cliente Contacta por WhatsApp
1. Cliente envía mensaje a número Twilio
2. Twilio webhook recibe mensaje
3. API procesa mensaje:
   - Si es pregunta común → Responde automáticamente (bilingüe)
   - Si requiere atención → Notifica al equipo
   - Crea ticket en sistema de soporte

### Escenario 3: Agendamiento de Cita
1. Cliente selecciona fecha en formulario
2. API verifica disponibilidad (Google Calendar)
3. Si disponible:
   - Crea evento en calendario
   - Envía confirmación por email/SMS
   - Bloquea horario
4. Si no disponible:
   - Sugiere alternativas
   - Notifica al equipo

---

## 🛠️ Próximos Pasos

1. **Configurar Twilio Functions** para respuestas automáticas
2. **Crear cuenta de Google Cloud** y habilitar APIs
3. **Registrar aplicación en QuickBooks Developer**
4. **Configurar proyecto en Vercel** con variables de entorno
5. **Conectar dominio** de Squarespace a Vercel
6. **Probar todas las integraciones** antes del lanzamiento
7. **Configurar Google Analytics** para tracking
8. **Agregar Facebook Pixel** para remarketing

---

## 📞 Información de Contacto

**C&Y Quality Paint LLC**  
📍 Hillsborough, FL  
📞 (586) 382-1603  
✉️ info@cyqualitypaint.com  
🌐 https://cyqualitypaint.com  
💳 [Digital Business Card](https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb)

---

## 📚 Soporte

Para ayuda con las integraciones:
- Twilio: [support.twilio.com](https://support.twilio.com)
- Google Cloud: [cloud.google.com/support](https://cloud.google.com/support)
- QuickBooks: [developer.intuit.com/help](https://developer.intuit.com/help)
- Vercel: [vercel.com/support](https://vercel.com/support)
- HiHello: [hihello.com/support](https://hihello.com/support)
