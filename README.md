# 🐾 PetHub Nigeria

**The Ultimate Pet Platform for Nigeria** - Combining Social Networking, E-commerce, and Marketplace

[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.3-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

PetHub Nigeria is a comprehensive platform designed to serve the growing Nigerian pet market. We combine three major features:

1. **Social Networking** - Connect with pet lovers, share photos, and build a community
2. **E-commerce** - Shop for pet products with fast delivery and secure payments
3. **Marketplace** - Buy, sell, and breed pets from verified breeders

**Market Opportunity:**
- Nigeria's pet food market: $5.3B (2024)
- Growing at 1.6% annually
- Limited organized competition in comprehensive pet platforms
- Rising middle class and pet humanization trend

---

## ✨ Features

### 🌐 Social Networking
- Pet profiles (separate from owner profiles)
- Photo and video sharing with filters
- Newsfeed tailored to pet preferences
- Follow system for users and pets
- Like, comment, and share functionality
- Discussion forums and groups
- Real-time messaging
- Pet contests and challenges

### 🛒 E-commerce
- Product catalog with advanced search and filters
- Shopping cart and wishlist
- Multiple payment methods (Paystack, Flutterwave)
- Cash on Delivery (COD)
- Order tracking with logistics integration (Kwik, GIG)
- Product reviews and ratings
- Dropshipping model support
- Bundle deals and discounts

### 🐕 Marketplace
- Buy/sell pets from verified breeders
- Pet listings with health certificates
- Breeding services marketplace
- Cross-breeding requests
- Pet services booking (vet, grooming, boarding)
- Escrow payment protection
- Breeder verification system

### 📱 Additional Features
- Pet health records and vaccination tracking
- Lost & found pet alerts
- Vet appointment booking
- Multi-pet profiles per user
- Notifications system
- Admin dashboard

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js 20.x
- **Framework:** Express 4.x
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL 15.x
- **ORM:** Prisma 5.x
- **Cache:** Redis 7.x
- **Authentication:** JWT
- **Real-time:** Socket.IO 4.x

### Frontend
- **Framework:** React 18.x
- **Language:** TypeScript 5.x
- **Build Tool:** Vite 5.x
- **Routing:** React Router 6.x
- **State Management:** Zustand + React Query
- **Styling:** Tailwind CSS 3.x
- **Forms:** React Hook Form
- **HTTP Client:** Axios

### Infrastructure
- **Version Control:** Git + GitHub
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Cloud Storage:** Cloudinary
- **Payment Gateways:** Paystack, Flutterwave
- **Logistics:** Kwik Delivery, GIG Logistics

---

## 📁 Project Structure

```
Petshub-naija/
├── backend/                 # Backend API (Node.js + Express)
│   ├── prisma/             # Database schema and migrations
│   │   └── schema.prisma   # Prisma schema file
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Frontend app (React + Vite)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── layout/   # Layout components
│   │   │   └── common/   # Common UI components
│   │   ├── pages/        # Page components
│   │   │   ├── auth/     # Authentication pages
│   │   │   ├── social/   # Social features
│   │   │   ├── shop/     # E-commerce pages
│   │   │   └── marketplace/  # Marketplace pages
│   │   ├── context/      # React context
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # Utilities
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── docs/                  # Documentation
│   ├── BUSINESS_PLAN.md  # Comprehensive business plan
│   ├── DATABASE_SCHEMA.md # Database documentation
│   ├── technical/        # Technical specs
│   └── api/              # API documentation
│
├── .env.example          # Environment variables template
├── .gitignore
├── package.json          # Root package.json (workspaces)
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **PostgreSQL** >= 15.0
- **Redis** >= 7.0 (optional but recommended)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/IamWheelze/Petshub-naija.git
cd Petshub-naija
```

2. **Install dependencies**

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up environment variables**

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**

```env
# Backend
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/pethub_nigeria"
JWT_SECRET=your-super-secret-jwt-key
REDIS_URL=redis://localhost:6379

# Payment Gateways
PAYSTACK_SECRET_KEY=sk_test_...
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST...

# Frontend
VITE_API_URL=http://localhost:5000
```

4. **Set up the database**

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database with sample data
npm run prisma:seed
```

5. **Start development servers**

```bash
# From root directory, start both servers
npm run dev

# Or start them separately:

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access the application**

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/health

---

## 💻 Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm test
```

### Database Management

```bash
cd backend

# View database in Prisma Studio
npx prisma studio

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset database (⚠️ Deletes all data)
npx prisma migrate reset
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Building for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build

# Build all
npm run build
```

---

## 🌍 Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Manual Deployment

**Backend (Railway, Render, AWS EC2, etc.):**

1. Set environment variables on your platform
2. Build: `npm run build`
3. Start: `npm start`

**Frontend (Vercel, Netlify, etc.):**

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set environment variables

**Database (Heroku Postgres, AWS RDS, etc.):**

1. Provision PostgreSQL database
2. Update `DATABASE_URL` in environment
3. Run migrations: `npx prisma migrate deploy`

### Environment-Specific Configuration

**Development:**
- Hot reload enabled
- Debug logging
- Verbose errors

**Staging:**
- Production build
- Test with real payment gateways (test mode)
- Monitor performance

**Production:**
- Minified build
- Error tracking (Sentry)
- Performance monitoring
- CDN for static assets
- Database backups automated

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Business Plan](docs/BUSINESS_PLAN.md)** - Market research and strategic implementation guide
- **[Technical Specification](docs/technical/TECHNICAL_SPECIFICATION.md)** - System architecture and design
- **[API Documentation](docs/api/API_DOCUMENTATION.md)** - Complete API reference
- **[Database Schema](docs/DATABASE_SCHEMA.md)** - Database structure and relationships

### Quick Links

- **API Base URL (Dev):** http://localhost:5000/api
- **API Base URL (Prod):** https://api.pethub.ng/api (Coming Soon)
- **Prisma Studio:** Run `npx prisma studio` in `/backend`

---

## 🎨 Design System

### Color Palette

- **Primary:** Green (#22c55e) - Trust, growth, nature
- **Secondary:** Gray (#6b7280)
- **Accent:** Orange (#f97316)
- **Success:** Green (#10b981)
- **Warning:** Yellow (#f59e0b)
- **Error:** Red (#ef4444)

### Typography

- **Font:** Inter (system font fallback)
- **Headings:** Bold, 2xl-5xl
- **Body:** Regular, base-lg

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 🔐 Security

### Reporting Vulnerabilities

If you discover a security vulnerability, please email security@pethub.ng instead of using the issue tracker.

### Security Features

- **Password Hashing:** Bcrypt with 10 rounds
- **JWT Authentication:** Secure token-based auth
- **CORS:** Configured for allowed origins
- **Rate Limiting:** Protection against brute force
- **Helmet.js:** Security headers
- **Input Validation:** All inputs sanitized
- **SQL Injection Prevention:** Prisma ORM
- **XSS Protection:** Output escaping

---

## 📈 Roadmap

### Phase 1: MVP (Months 1-3) ✅ CURRENT
- [x] User authentication
- [x] Basic social features
- [x] Product catalog
- [x] Shopping cart
- [x] Pet marketplace
- [ ] Payment integration
- [ ] Order management

### Phase 2: Growth (Months 4-6)
- [ ] Mobile app (React Native)
- [ ] Advanced social features (stories, reels)
- [ ] Breeding service bookings
- [ ] Vet directory integration
- [ ] Email notifications
- [ ] SMS notifications (Termii)

### Phase 3: Scale (Months 7-12)
- [ ] AI-powered recommendations
- [ ] Virtual try-on (AR)
- [ ] Live streaming shopping
- [ ] Subscription boxes
- [ ] Loyalty program
- [ ] Multi-language support

### Phase 4: Innovation (Year 2+)
- [ ] Blockchain-based pet records
- [ ] IoT device integration (smart collars)
- [ ] Telemedicine for pets
- [ ] Insurance partnerships
- [ ] Expansion to other African countries

---

## 📊 Performance Metrics

### Target KPIs

- **Page Load Time:** < 2 seconds
- **API Response Time:** < 200ms (p95)
- **Uptime:** 99.9%
- **Lighthouse Score:** > 90
- **Conversion Rate:** > 2%

### Monitoring

- **Application Logs:** Winston
- **Error Tracking:** Sentry (planned)
- **Performance:** New Relic (planned)
- **Uptime:** Pingdom (planned)

---

## 💬 Support

### Contact

- **Email:** support@pethub.ng
- **Developer:** dev@pethub.ng
- **Website:** https://pethub.ng (Coming Soon)

### Social Media

- **Instagram:** @pethubnaija
- **Twitter:** @pethubng
- **Facebook:** /pethubnaija

---

## 📄 License

Copyright © 2025 PetHub Nigeria. All rights reserved.

This project is proprietary software. Unauthorized copying, distribution, or use of this software is strictly prohibited.

---

## 🙏 Acknowledgments

- **Inspiration:** Petzbe, Purrch, and other international pet platforms
- **Payment Gateways:** Paystack & Flutterwave
- **Logistics Partners:** Kwik Delivery, GIG Logistics
- **Community:** Nigerian pet lovers and enthusiasts

---

## 📝 Changelog

### Version 1.0.0 (2025-11-06)
- ✨ Initial MVP release
- 🔐 User authentication system
- 🐕 Pet profiles and social feed
- 🛒 E-commerce with product catalog
- 🏪 Pet marketplace
- 💬 Real-time messaging
- 📱 Responsive design

---

## 🚧 Known Issues

- Payment gateway integration pending testing
- Mobile app not yet developed
- Email notifications not configured
- Search functionality needs optimization

See [Issues](https://github.com/IamWheelze/Petshub-naija/issues) for the complete list.

---

Made with ❤️ for Nigerian Pet Lovers
