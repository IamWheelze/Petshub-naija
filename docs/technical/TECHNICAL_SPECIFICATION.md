# PetHub Nigeria - Technical Specification

## Version 1.0 | Last Updated: November 2025

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Database Design](#database-design)
4. [API Architecture](#api-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Security](#security)
7. [Scalability](#scalability)
8. [Deployment](#deployment)

---

## 1. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Load Balancer (Nginx)                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
┌───────▼────────┐              ┌──────▼───────┐
│  Frontend (CDN) │              │   Backend    │
│  React + Vite   │◄────────────►│  Node.js +   │
│                 │   REST API   │   Express    │
└─────────────────┘              └──────┬───────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
            ┌───────▼────────┐  ┌──────▼────────┐  ┌──────▼───────┐
            │   PostgreSQL    │  │     Redis     │  │  Cloudinary  │
            │   (Database)    │  │    (Cache)    │  │  (Storage)   │
            └─────────────────┘  └───────────────┘  └──────────────┘
```

### Component Breakdown

1. **Frontend Layer**
   - React 18 with TypeScript
   - Vite for build tooling
   - Zustand for state management
   - React Query for server state
   - Tailwind CSS for styling
   - Socket.IO client for real-time features

2. **Backend Layer**
   - Node.js with Express
   - TypeScript for type safety
   - Prisma ORM for database access
   - JWT for authentication
   - Socket.IO for real-time messaging
   - Winston for logging

3. **Data Layer**
   - PostgreSQL for primary database
   - Redis for caching and sessions
   - Cloudinary for media storage

4. **External Services**
   - Paystack & Flutterwave (Payments)
   - Kwik & GIG Logistics (Delivery)
   - Termii (SMS)
   - SendGrid/Mailgun (Email)

---

## 2. Technology Stack

### Backend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Runtime | Node.js | 20.x | JavaScript runtime |
| Framework | Express | 4.x | Web framework |
| Language | TypeScript | 5.x | Type safety |
| ORM | Prisma | 5.x | Database access |
| Database | PostgreSQL | 15.x | Primary database |
| Cache | Redis | 7.x | Caching & sessions |
| Auth | JWT | 9.x | Authentication |
| Validation | express-validator | 7.x | Input validation |
| Real-time | Socket.IO | 4.x | WebSocket communication |
| Security | Helmet | 7.x | Security headers |
| Logging | Winston | 3.x | Application logging |

### Frontend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | React | 18.x | UI library |
| Language | TypeScript | 5.x | Type safety |
| Build Tool | Vite | 5.x | Build tooling |
| Routing | React Router | 6.x | Client-side routing |
| State | Zustand | 4.x | Global state |
| Server State | React Query | 3.x | Server state management |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Forms | React Hook Form | 7.x | Form management |
| HTTP Client | Axios | 1.x | API requests |
| Icons | Lucide React | 0.x | Icon library |

### DevOps & Tools

- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Orchestration**: Docker Compose (dev), Kubernetes (prod)
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **Testing**: Jest + React Testing Library

---

## 3. Database Design

### Entity Relationship Overview

**Core Entities:**
- Users, Pets, Posts, Comments, Likes
- Products, Categories, Orders, Cart
- PetListings, BreedingServices
- Messages, Conversations, Notifications

### Key Database Features

1. **User Management**
   - User authentication with bcrypt
   - Role-based access control (USER, BREEDER, VET, ADMIN)
   - Profile management with pets

2. **Social Features**
   - Pet profiles independent from user profiles
   - Follow system for users and pets
   - Posts with images/videos
   - Comments with nested replies
   - Like system

3. **E-commerce**
   - Product catalog with categories
   - Shopping cart
   - Order management with status tracking
   - Payment integration
   - Review and rating system

4. **Marketplace**
   - Pet listings with verification
   - Breeding services
   - Booking system for services

5. **Messaging**
   - One-to-one conversations
   - Group conversations
   - Real-time message delivery
   - Read receipts

### Database Optimization

- **Indexes**: Strategic indexes on frequently queried fields
- **Relationships**: Proper foreign keys with cascade rules
- **Enums**: Type-safe enumerations for status fields
- **JSON Fields**: Flexible storage for dynamic data
- **UUID**: Primary keys for security and distribution

---

## 4. API Architecture

### RESTful API Design

**Base URL**: `https://api.pethub.ng/api/v1`

### API Modules

1. **Authentication** (`/auth`)
   - POST /register
   - POST /login
   - GET /me
   - POST /logout
   - POST /refresh-token

2. **Users** (`/users`)
   - GET /:id
   - PUT /:id
   - GET /:id/pets
   - GET /:id/posts
   - POST /:id/follow

3. **Pets** (`/pets`)
   - POST /
   - GET /:id
   - PUT /:id
   - DELETE /:id
   - GET /:id/posts

4. **Posts** (`/posts`)
   - POST /
   - GET / (feed)
   - GET /:id
   - PUT /:id
   - DELETE /:id
   - POST /:id/like
   - POST /:id/comment

5. **Products** (`/products`)
   - GET /
   - GET /:id
   - POST /:id/review

6. **Cart** (`/cart`)
   - GET /
   - POST /
   - PUT /:id
   - DELETE /:id

7. **Orders** (`/orders`)
   - POST /
   - GET /
   - GET /:id
   - PUT /:id/status

8. **Marketplace** (`/listings`)
   - GET /
   - GET /:id
   - POST /
   - PUT /:id
   - DELETE /:id

9. **Breeding** (`/breeding`)
   - GET /
   - GET /:id
   - POST /
   - POST /:id/request

10. **Messages** (`/messages`)
    - GET /conversations
    - POST /conversations
    - GET /conversations/:id/messages
    - POST /conversations/:id/messages

### API Response Format

**Success Response:**
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Error message",
  "errors": [ /* validation errors */ ]
}
```

### Authentication

- **Method**: JWT (JSON Web Tokens)
- **Storage**: Bearer token in Authorization header
- **Expiry**: 7 days (configurable)
- **Refresh**: Refresh token for extended sessions

### Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Auth Endpoints**: 5 requests per 15 minutes

---

## 5. Frontend Architecture

### Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── layout/       # Layout components
│   │   ├── common/       # Common UI components
│   │   └── features/     # Feature-specific components
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── social/       # Social features
│   │   ├── shop/         # E-commerce pages
│   │   └── marketplace/  # Marketplace pages
│   ├── services/         # API services
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context providers
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   └── assets/           # Static assets
├── public/               # Public assets
└── index.html            # Entry HTML
```

### State Management Strategy

1. **Global State** (Zustand)
   - User authentication state
   - Shopping cart
   - UI state (modals, notifications)

2. **Server State** (React Query)
   - API data caching
   - Automatic refetching
   - Optimistic updates

3. **Local State** (useState)
   - Component-specific state
   - Form inputs
   - UI interactions

### Routing Structure

```
/                       → Home
/login                  → Login
/register               → Register
/feed                   → Social Feed (protected)
/profile/:id            → User Profile (protected)
/shop                   → Product Catalog
/shop/:id               → Product Detail
/cart                   → Shopping Cart (protected)
/checkout               → Checkout (protected)
/marketplace            → Pet Marketplace
/marketplace/:id        → Pet Listing Detail
/breeding               → Breeding Services
/messages               → Messages (protected)
/orders                 → Order History (protected)
```

---

## 6. Security

### Authentication & Authorization

1. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Minimum 6 characters
   - Strong password recommendations

2. **JWT Security**
   - Secret key rotation
   - Short expiration (7 days)
   - Refresh token mechanism
   - Secure HTTP-only cookies (optional)

3. **Authorization**
   - Role-based access control
   - Resource ownership verification
   - Admin-only endpoints protected

### Data Protection

1. **Input Validation**
   - Express-validator for all inputs
   - XSS protection
   - SQL injection prevention (Prisma)

2. **CORS**
   - Whitelisted origins
   - Credentials support

3. **Rate Limiting**
   - IP-based limiting
   - Endpoint-specific limits
   - DDoS protection

4. **Headers**
   - Helmet.js security headers
   - CSP (Content Security Policy)
   - HSTS enforcement

### Payment Security

- **PCI Compliance**: Use Paystack/Flutterwave (PCI-compliant)
- **No Card Storage**: Never store card details
- **Webhook Verification**: Verify all payment webhooks
- **Secure Callbacks**: HTTPS-only callbacks

---

## 7. Scalability

### Horizontal Scaling

1. **Stateless Backend**
   - No server-side sessions (JWT)
   - Redis for shared state
   - Load balancer ready

2. **Database Scaling**
   - Read replicas for queries
   - Write master for mutations
   - Connection pooling

3. **Caching Strategy**
   - Redis for hot data
   - CDN for static assets
   - API response caching

### Performance Optimization

1. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Minification & compression

2. **Backend**
   - Database query optimization
   - N+1 query prevention
   - Pagination for lists
   - Eager loading with Prisma

3. **Infrastructure**
   - CDN for frontend assets
   - Image CDN (Cloudinary)
   - Geographic distribution

---

## 8. Deployment

### Development Environment

```bash
# Start backend
cd backend
npm install
npm run dev

# Start frontend
cd frontend
npm install
npm run dev
```

### Production Deployment

**Option 1: Docker Compose**
```bash
docker-compose up -d
```

**Option 2: Cloud Platform**
- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Render / AWS EC2
- **Database**: Heroku Postgres / AWS RDS
- **Cache**: Redis Cloud / AWS ElastiCache

### Environment Variables

- `.env.example` files provided
- Secrets managed via platform-specific solutions
- Never commit sensitive data

### CI/CD Pipeline

1. **On Push to Main**
   - Run tests
   - Build application
   - Deploy to staging

2. **On Tag/Release**
   - Build production
   - Run integration tests
   - Deploy to production
   - Notify team

### Monitoring

- **Application Logs**: Winston → CloudWatch/ELK
- **Error Tracking**: Sentry
- **Performance**: New Relic / Datadog
- **Uptime**: Pingdom / UptimeRobot

---

## Appendix

### Development Guidelines

1. **Code Style**
   - ESLint + Prettier
   - TypeScript strict mode
   - Consistent naming conventions

2. **Git Workflow**
   - Feature branches
   - Pull request reviews
   - Conventional commits

3. **Testing**
   - Unit tests for utilities
   - Integration tests for APIs
   - E2E tests for critical flows

### Future Enhancements

- Mobile applications (React Native)
- AI-powered pet recommendations
- Augmented reality pet try-ons
- Blockchain-based pet records
- Advanced analytics dashboard
- Multi-language support
