// API Route para crear eventos en Google Calendar
// Requiere configuración de Google Cloud Console

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Configuración de Google Calendar API (descomentar cuando tengas credenciales)
// import { google } from 'googleapis';

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// });

// const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      summary,
      description,
      startDate,
      endDate,
      location,
      attendees,
      clientName,
      clientPhone,
      clientEmail,
      serviceType,
    } = req.body;

    // Validación
    if (!summary || !startDate) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['summary', 'startDate'],
      });
    }

    // Construir descripción completa
    const fullDescription = `
${description || ''}

---
Client Information:
Name: ${clientName || 'N/A'}
Phone: ${clientPhone || 'N/A'}
Email: ${clientEmail || 'N/A'}
Service: ${serviceType || 'N/A'}

---
This appointment was booked through the CY Quality Paint website.
    `.trim();

    // Crear objeto de evento
    const event = {
      summary: summary || `Estimate - ${clientName || 'New Client'}`,
      description: fullDescription,
      start: {
        dateTime: new Date(startDate).toISOString(),
        timeZone: 'America/New_York', // Ajustar según tu zona horaria
      },
      end: {
        dateTime: endDate 
          ? new Date(endDate).toISOString()
          : new Date(new Date(startDate).getTime() + 60 * 60 * 1000).toISOString(), // 1 hora por defecto
        timeZone: 'America/New_York',
      },
      location: location || 'Tampa, FL',
      attendees: attendees || [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 día antes
          { method: 'popup', minutes: 30 }, // 30 minutos antes
        ],
      },
      colorId: '9', // Color azul en Google Calendar
    };

    // Crear evento en Google Calendar (descomentar cuando tengas credenciales)
    // const response = await calendar.events.insert({
    //   calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    //   requestBody: event,
    //   sendUpdates: 'all', // Enviar invitaciones a los asistentes
    // });

    // Simular respuesta exitosa
    const mockResponse = {
      id: 'mock-event-id-' + Date.now(),
      htmlLink: `https://calendar.google.com/calendar/event?eid=mock${Date.now()}`,
      summary: event.summary,
      start: event.start,
      end: event.end,
    };

    console.log('Calendar event created:', mockResponse);

    // Enviar confirmación al cliente (opcional)
    // if (clientEmail) {
    //   await sendCalendarConfirmation(clientEmail, {
    //     eventTitle: event.summary,
    //     eventDate: startDate,
    //     eventLink: response.data.htmlLink,
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: 'Event created successfully',
      event: mockResponse,
    });

  } catch (error) {
    console.error('Calendar API error:', error);
    return res.status(500).json({
      error: 'Failed to create calendar event',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Función para verificar disponibilidad
export async function checkAvailability(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, duration = 60 } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    // Consultar disponibilidad en Google Calendar (descomentar cuando tengas credenciales)
    // const response = await calendar.freebusy.query({
    //   requestBody: {
    //     timeMin: new Date(date as string).toISOString(),
    //     timeMax: new Date(new Date(date as string).getTime() + 24 * 60 * 60 * 1000).toISOString(),
    //     items: [{ id: process.env.GOOGLE_CALENDAR_ID || 'primary' }],
    //   },
    // });

    // Simular horarios disponibles
    const availableSlots = [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
    ];

    return res.status(200).json({
      success: true,
      date,
      availableSlots,
    });

  } catch (error) {
    console.error('Availability check error:', error);
    return res.status(500).json({
      error: 'Failed to check availability',
    });
  }
}

// Enviar confirmación por email (implementar con tu servicio de email)
async function sendCalendarConfirmation(email: string, eventData: any) {
  console.log('Sending calendar confirmation to:', email, eventData);
  // Implementar con SendGrid, Nodemailer, etc.
}
