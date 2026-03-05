// API Route para crear estimados en QuickBooks
// Requiere configuración de QuickBooks Developer Account

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Configuración de QuickBooks API (descomentar cuando tengas credenciales)
// QuickBooks requiere OAuth2 para autenticación

// const QUICKBOOKS_API_URL = 'https://quickbooks.api.intuit.com/v3/company';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      serviceType,
      projectDescription,
      estimatedAmount,
      estimatedDate,
      expirationDate,
      lineItems,
    } = req.body;

    // Validación
    if (!customerName || !serviceType) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['customerName', 'serviceType'],
      });
    }

    // 1. Crear o buscar cliente en QuickBooks
    // const customer = await createOrFindCustomer({
    //   name: customerName,
    //   email: customerEmail,
    //   phone: customerPhone,
    //   address: customerAddress,
    // });

    // 2. Crear estimado
    const estimateData = {
      // CustomerRef: {
      //   value: customer.Id,
      //   name: customerName,
      // },
      Line: lineItems || [
        {
          Description: projectDescription || `${serviceType} services`,
          Amount: estimatedAmount || 0,
          DetailType: 'SalesItemLineDetail',
          SalesItemLineDetail: {
            // ItemRef: {
            //   value: '1', // ID del servicio en QuickBooks
            //   name: serviceType,
            // },
            UnitPrice: estimatedAmount || 0,
            Qty: 1,
          },
        },
      ],
      TxnDate: estimatedDate || new Date().toISOString().split('T')[0],
      ExpirationDate: expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días
      PrivateNote: `Created from website contact form. Service: ${serviceType}`,
      // BillEmail: {
      //   Address: customerEmail,
      // },
      // ShipAddr: customerAddress ? formatAddress(customerAddress) : undefined,
    };

    // Enviar a QuickBooks API (descomentar cuando tengas credenciales)
    // const response = await fetch(
    //   `${QUICKBOOKS_API_URL}/${process.env.QUICKBOOKS_COMPANY_ID}/estimate?minorversion=65`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${await getQuickBooksToken()}`,
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify(estimateData),
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error(`QuickBooks API error: ${response.statusText}`);
    // }

    // const result = await response.json();

    // Simular respuesta exitosa
    const mockEstimate = {
      Id: 'mock-estimate-' + Date.now(),
      DocNumber: 'EST-' + Math.floor(Math.random() * 10000),
      TxnDate: estimateData.TxnDate,
      TotalAmt: estimatedAmount || 0,
      CustomerRef: {
        name: customerName,
      },
      status: 'Pending',
    };

    console.log('QuickBooks estimate created:', mockEstimate);

    // 3. Enviar estimado al cliente por email (opcional)
    // if (customerEmail) {
    //   await sendEstimateEmail(customerEmail, {
    //     estimateNumber: mockEstimate.DocNumber,
    //     amount: estimatedAmount,
    //     service: serviceType,
    //     expirationDate: estimateData.ExpirationDate,
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: 'Estimate created successfully',
      estimate: mockEstimate,
    });

  } catch (error) {
    console.error('QuickBooks API error:', error);
    return res.status(500).json({
      error: 'Failed to create estimate',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Función para crear o buscar cliente
async function createOrFindCustomer(customerData: {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  // Implementar lógica para:
  // 1. Buscar cliente por email
  // 2. Si no existe, crear nuevo cliente
  // 3. Retornar objeto de cliente

  console.log('Creating/finding customer:', customerData);
  
  return {
    Id: 'mock-customer-' + Date.now(),
    DisplayName: customerData.name,
    PrimaryEmailAddr: customerData.email ? { Address: customerData.email } : undefined,
    PrimaryPhone: customerData.phone ? { FreeFormNumber: customerData.phone } : undefined,
  };
}

// Obtener token de acceso de QuickBooks (implementar OAuth2)
async function getQuickBooksToken(): Promise<string> {
  // Implementar flujo de OAuth2 para obtener token válido
  // 1. Verificar si el token actual es válido
  // 2. Si no, refrescar usando refresh_token
  // 3. Retornar token válido

  return 'mock-token';
}

// Formatear dirección para QuickBooks
function formatAddress(address: string) {
  // Parsear dirección y formatear según requisitos de QuickBooks
  return {
    City: 'Tampa',
    Country: 'USA',
    CountrySubDivisionCode: 'FL',
    PostalCode: '33605',
    Line1: address,
  };
}

// Enviar estimado por email
async function sendEstimateEmail(email: string, estimateData: any) {
  console.log('Sending estimate email to:', email, estimateData);
  // Implementar con tu servicio de email
}
