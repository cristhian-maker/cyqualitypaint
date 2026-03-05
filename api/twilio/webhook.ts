// Webhook para recibir mensajes de WhatsApp/SMS desde Twilio
// Configurar esta URL en tu dashboard de Twilio

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Respuestas automáticas predefinidas
const AUTO_RESPONSES: Record<string, string> = {
  'hola': '¡Hola! Gracias por contactar a CY Quality Paint. ¿En qué podemos ayudarte hoy?',
  'hello': 'Hi! Thanks for contacting CY Quality Paint. How can we help you today?',
  'hi': 'Hi there! Welcome to CY Quality Paint. What service are you interested in?',
  'price': 'We offer free estimates! The price depends on your project size. Would you like to schedule a free consultation?',
  'precio': '¡Ofrecemos estimados gratuitos! El precio depende del tamaño de tu proyecto. ¿Te gustaría agendar una consulta gratuita?',
  'quote': 'I\'d be happy to help you get a free quote! Please visit https://cyqualitypaint.com/contact or share your project details here.',
  'cotizacion': '¡Con gusto te ayudo con una cotización gratuita! Visita https://cyqualitypaint.com/contact o comparte los detalles de tu proyecto aquí.',
  'book': 'You can book a free estimate at https://cyqualitypaint.com/contact or I can help you find a suitable time.',
  'cita': 'Puedes agendar una cita gratuita en https://cyqualitypaint.com/contact o puedo ayudarte a encontrar un horario conveniente.',
  'hours': 'Our business hours are Monday-Friday 8AM-6PM and Saturday 9AM-4PM.',
  'horario': 'Nuestro horario es Lunes a Viernes 8AM-6PM y Sábados 9AM-4PM.',
  'location': 'We\'re based in Tampa, FL and serve surrounding areas including Clearwater and St. Petersburg.',
  'ubicacion': 'Estamos ubicados en Tampa, FL y servimos áreas cercanas incluyendo Clearwater y St. Petersburg.',
  'services': 'We offer: Interior Painting, Exterior Painting, Cabinet Painting, Commercial Painting, and Wallpaper Services. Which one interests you?',
  'servicios': 'Ofrecemos: Pintura Interior, Pintura Exterior, Pintura de Gabinetes, Pintura Comercial, y Servicios de Papel Tapiz. ¿Cuál te interesa?',
  'warranty': 'We offer a 2-year warranty against blistering and peeling on all our work!',
  'garantia': '¡Ofrecemos una garantía de 2 años contra ampollas y descascarado en todo nuestro trabajo!',
  'call': 'You can reach us at (586) 382-1603. Would you like us to call you?',
  'llamar': 'Puedes llamarnos al (586) 382-1603. ¿Te gustaría que te llamemos?',
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Twilio envía datos como form-urlencoded
  const { Body, From, MessageSid, To } = req.body;

  console.log('Received message:', {
    from: From,
    body: Body,
    messageSid: MessageSid,
    to: To,
  });

  try {
    // Buscar respuesta automática
    const lowerBody = Body.toLowerCase().trim();
    let responseMessage = '';

    // Buscar coincidencias en palabras clave
    for (const [keyword, response] of Object.entries(AUTO_RESPONSES)) {
      if (lowerBody.includes(keyword)) {
        responseMessage = response;
        break;
      }
    }

    // Si no hay coincidencia, enviar respuesta genérica
    if (!responseMessage) {
      responseMessage = `Thank you for your message! Our team will review it and get back to you soon. For immediate assistance, please call us at (586) 382-1603 or visit https://cyqualitypaint.com/contact`;
    }

    // Si es WhatsApp, formatear el número
    const isWhatsApp = From.startsWith('whatsapp:');
    const fromNumber = isWhatsApp ? From : `whatsapp:${From}`;

    // Enviar respuesta (descomentar cuando configures Twilio)
    // await sendTwilioResponse(From, responseMessage);

    // Guardar conversación en base de datos (opcional)
    // await saveConversation({ from: From, message: Body, response: responseMessage });

    // Notificar al equipo si es necesario (para mensajes complejos)
    // if (shouldNotifyTeam(lowerBody)) {
    //   await notifyTeam({ from: From, message: Body });
    // }

    // Responder a Twilio con XML
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${responseMessage}</Message>
</Response>`;

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml);

  } catch (error) {
    console.error('Twilio webhook error:', error);
    
    // Responder con error genérico
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Sorry, we encountered an error. Please call us at (586) 382-1603 for immediate assistance.</Message>
</Response>`;

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml);
  }
}

// Función para enviar respuesta con Twilio (implementar cuando tengas credenciales)
async function sendTwilioResponse(to: string, message: string) {
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const client = require('twilio')(accountSid, authToken);
  
  // await client.messages.create({
  //   body: message,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: to,
  // });
  
  console.log('Would send Twilio response to:', to, 'Message:', message);
}

// Determinar si el mensaje requiere atención humana
function shouldNotifyTeam(message: string): boolean {
  const complexKeywords = [
    'urgent', 'emergency', 'complaint', 'problem', 'issue',
    'urgente', 'emergencia', 'queja', 'problema',
    'refund', 'cancel', 'dispute',
    'reembolso', 'cancelar', 'disputa',
  ];
  
  return complexKeywords.some(keyword => message.includes(keyword));
}

// Notificar al equipo (implementar con Slack, Email, etc.)
async function notifyTeam(data: { from: string; message: string }) {
  console.log('Notifying team about message from:', data.from);
  // Implementar con Slack webhook, email, o tu sistema de notificaciones
}
