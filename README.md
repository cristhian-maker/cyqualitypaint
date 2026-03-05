# C&Y Quality Paint LLC - Website

Professional painting, drywall, and remodeling services website built with React, TypeScript, and Tailwind CSS.

![C&Y Quality Paint](https://img.shields.io/badge/C%26Y-Quality%20Paint-0eafff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)

## 🚀 Live Website

**URL**: https://cyqualitypaint.com

**Digital Business Card**: https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb

## ✨ Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive**: Fully responsive across all devices
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Fast Performance**: Optimized with Vite for lightning-fast load times
- **Bilingual Support**: English and Spanish content
- **Interactive Elements**: 
  - Animated service cards
  - Project gallery with before/after
  - Testimonial carousel
  - Contact form with validation
- **Chat Widget**: Built-in bilingual customer support chat
- **Click-to-Call**: Direct phone integration
- **WhatsApp Integration**: One-click WhatsApp messaging
- **HiHello Card**: Digital business card integration

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React

## 📁 Project Structure

```
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── ChatWidget.tsx
│   │   └── PhoneButton.tsx
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── api/                   # API routes for Vercel
│   ├── twilio/
│   │   └── webhook.ts
│   ├── google/
│   │   └── calendar.ts
│   ├── quickbooks/
│   │   └── estimate.ts
│   └── contact.ts
├── public/                # Static assets
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
├── INTEGRATIONS.md        # Integration guide
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/cyqualitypaint.git
cd cyqualitypaint
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables (see below)
5. Deploy!

### Environment Variables

Create a `.env` file or configure in Vercel Dashboard:

```env
# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+15863821603

# Google (Calendar & Gmail)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALENDAR_ID=primary

# QuickBooks
QUICKBOOKS_CLIENT_ID=your_client_id
QUICKBOOKS_CLIENT_SECRET=your_client_secret

# OpenAI (for chatbot)
OPENAI_API_KEY=your_api_key
```

## 🔗 Integrations

### Twilio
- Phone calls
- WhatsApp messaging
- SMS notifications
- Bilingual auto-responses (English/Spanish)

### Google APIs
- Calendar booking
- Gmail notifications

### QuickBooks
- Estimate creation
- Invoice generation
- Customer management

### HiHello
- Digital business card
- Contact sharing

See [INTEGRATIONS.md](./INTEGRATIONS.md) for detailed setup instructions.

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  brand: {
    blue: '#0eafff',    // Primary
    orange: '#ff8a01',  // Secondary
    black: '#000000',
    white: '#ffffff',
    gray: '#f8f8f8',
  }
}
```

### Content

Update text in respective section files:
- `src/sections/Hero.tsx` - Hero section
- `src/sections/Services.tsx` - Services list
- `src/sections/About.tsx` - Company info
- `src/sections/Contact.tsx` - Contact details

### Images

Replace images in components with your own:
```tsx
<img src="/path/to/your/image.jpg" alt="Description" />
```

## 📱 Contact Information

Update contact details in:
- `src/sections/Contact.tsx`
- `src/sections/Footer.tsx`
- `src/components/PhoneButton.tsx`

## 🔒 SEO

Meta tags are configured in `index.html`:
- Title and description (bilingual)
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Geo tags for local SEO

## 📄 License

© 2024 C&Y Quality Paint LLC. All rights reserved.

## 🤝 Support

For questions or support:
- Email: info@cyqualitypaint.com
- Phone: (586) 382-1603
- Digital Card: https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb

---

Built with ❤️ for C&Y Quality Paint LLC
