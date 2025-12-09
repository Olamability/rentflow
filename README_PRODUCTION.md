# RentFlow - Production-Ready Property Management Platform

<div align="center">
  <img src="./public/placeholder.svg" alt="RentFlow Logo" width="200"/>
  
  **Modern, Scalable Property & Tenant Management Platform**
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4-purple)](https://vitejs.dev/)
</div>

## 🎯 Overview

RentFlow is an enterprise-grade property management platform designed to streamline landlord-tenant relationships through digital rent collection, maintenance tracking, and automated communication. Built with modern web technologies and production-ready features.

## ✨ Key Features

### For Landlords
- 🏢 **Property Management** - Manage multiple properties and units
- 💰 **Rent Collection** - Digital payments with Paystack integration
- 📊 **Analytics Dashboard** - Real-time insights and reporting
- 🔔 **Automated Reminders** - SMS/Email notifications for rent due
- 🔧 **Maintenance Tracking** - Handle requests from submission to completion
- 📝 **Digital Agreements** - Auto-generate tenancy agreements

### For Tenants
- 🏠 **Property Search** - Find and apply for rental properties
- 💳 **Easy Payments** - Pay rent via card, bank transfer, or USSD
- 📄 **Digital Receipts** - Automatic receipt generation
- 🛠️ **Maintenance Requests** - Submit and track repair requests
- 📱 **Mobile-Friendly** - Access from any device

### For Administrators
- 👥 **User Management** - Manage landlords and tenants
- 📈 **Platform Analytics** - Monitor platform health and growth
- 🎫 **Support Tickets** - Handle user inquiries
- ⚙️ **System Configuration** - Platform-wide settings
- 📋 **Audit Logs** - Track all system activities

## 🚀 Production-Ready Features

### Security
- ✅ Role-based access control (RBAC)
- ✅ JWT authentication with session management
- ✅ Automatic session timeout (30 minutes)
- ✅ Protected routes for all user roles
- ✅ XSS and CSRF protection
- ✅ Secure environment variable management
- 🔜 Two-factor authentication (2FA)
- 🔜 Rate limiting

### Error Handling
- ✅ Global error boundary
- ✅ API retry logic with exponential backoff
- ✅ Request timeout handling
- ✅ User-friendly error messages
- ✅ Error logging (ready for Sentry integration)

### User Experience
- ✅ Real-time notifications
- ✅ Loading states and skeleton loaders
- ✅ Offline detection
- ✅ Form validation with Zod
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Accessibility features

### Performance
- ✅ Code splitting
- ✅ Lazy loading
- ✅ React Query for data caching
- ✅ Optimized bundle size
- 🔜 Image optimization
- 🔜 PWA capabilities

## 🛠️ Tech Stack

**Frontend:**
- React 18.3
- TypeScript 5.8
- Vite 5.4
- TailwindCSS 3.4
- shadcn/ui components
- React Router 6
- React Query (TanStack Query)
- React Hook Form + Zod validation

**Backend Ready For:**
- Node.js / Express / Supabase
- PostgreSQL / MongoDB
- AWS S3 / Cloudinary (file storage)
- Paystack (payments)
- Termii (SMS)
- SendGrid (emails)

## 📦 Installation

### Prerequisites
- Node.js >= 18.x
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/rentflow.git
cd rentflow
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.development
```

Edit `.env.development` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_key
VITE_APP_NAME=RentFlow
VITE_APP_URL=http://localhost:8080
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
rentflow/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── auth/         # Authentication components
│   │   ├── errors/       # Error handling components
│   │   ├── landing/      # Landing page sections
│   │   ├── landlord/     # Landlord-specific components
│   │   ├── tenant/       # Tenant-specific components
│   │   ├── admin/        # Admin-specific components
│   │   ├── shared/       # Shared components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # shadcn/ui components
│   ├── contexts/         # React contexts (Auth, Notifications)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   │   ├── api.ts        # API client with retry logic
│   │   ├── utils.ts      # Utility functions
│   │   └── validations.ts # Zod schemas
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── landlord/     # Landlord portal pages
│   │   ├── tenant/       # Tenant portal pages
│   │   └── admin/        # Admin portal pages
│   ├── services/         # API service layers
│   ├── types/            # TypeScript type definitions
│   ├── data/             # Mock data (development)
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── .env.example          # Environment variables template
├── .env.development      # Development environment
└── package.json          # Dependencies
```

## 🔐 Authentication Flow

1. User logs in with email/password and role selection
2. Backend validates credentials and returns JWT token
3. Token is stored in localStorage with timestamp
4. All API requests include Authorization header
5. Session expires after 30 minutes of inactivity
6. User activity updates session timestamp
7. Expired sessions redirect to login

## 🎨 Theming

RentFlow supports light/dark mode out of the box. The theme is managed through TailwindCSS and shadcn/ui's theming system.

```tsx
// Toggle theme
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme(theme === 'dark' ? 'light' : 'dark');
```

## 🔌 API Integration

The app includes a robust API client with:
- Automatic retry on failure
- Timeout handling
- Error handling
- Request/response interceptors

```tsx
import { api } from '@/lib/api';

// GET request
const { data, error } = await api.get('/properties');

// POST request
const { data, error } = await api.post('/payments', {
  amount: 1500,
  method: 'card'
});
```

## 📱 Progressive Web App (PWA)

To enable PWA features:

1. Install vite-plugin-pwa
```bash
npm install -D vite-plugin-pwa
```

2. Update vite.config.ts
```ts
import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  react(),
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'RentFlow',
      short_name: 'RentFlow',
      description: 'Property Management Platform',
      theme_color: '#6366f1',
    }
  })
]
```

## 🧪 Testing

```bash
# Run unit tests (when implemented)
npm run test

# Run E2E tests (when implemented)
npm run test:e2e
```

## 📊 Performance Monitoring

Integrate with monitoring services:

**Sentry (Error Tracking)**
```bash
npm install @sentry/react
```

**LogRocket (Session Replay)**
```bash
npm install logrocket
```

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

## 🔒 Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use environment variables for secrets
3. ✅ Validate all user inputs
4. ✅ Sanitize data before displaying
5. ✅ Use HTTPS in production
6. ✅ Implement rate limiting
7. ✅ Regular security audits
8. ✅ Keep dependencies updated

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API URL | Yes | `/api` |
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public key | Yes | - |
| `VITE_MAX_FILE_SIZE` | Max upload size (bytes) | No | `10485760` |
| `VITE_ENABLE_2FA` | Enable 2FA | No | `false` |
| `VITE_APP_NAME` | Application name | No | `RentFlow` |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@rentflow.com
- 💬 Discord: [Join our community](https://discord.gg/rentflow)
- 📚 Documentation: [docs.rentflow.com](https://docs.rentflow.com)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [TailwindCSS](https://tailwindcss.com/) for the styling system

---

<div align="center">
  Made with ❤️ by the RentFlow Team
  
  **[Website](https://rentflow.com)** • **[Documentation](https://docs.rentflow.com)** • **[Demo](https://demo.rentflow.com)**
</div>
