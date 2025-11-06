# PetHub Nigeria - Database Schema Documentation

## Overview

This document describes the database schema for PetHub Nigeria, a comprehensive pet platform supporting social networking, e-commerce, and marketplace features.

**Database**: PostgreSQL 15+
**ORM**: Prisma 5.x
**Schema Location**: `backend/prisma/schema.prisma`

---

## Table of Contents

1. [User & Authentication](#user--authentication)
2. [Pets & Social Features](#pets--social-features)
3. [Messaging](#messaging)
4. [E-commerce](#e-commerce)
5. [Marketplace](#marketplace)
6. [Health Records](#health-records)
7. [Notifications](#notifications)
8. [Relationships Diagram](#relationships-diagram)

---

## 1. User & Authentication

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| email | String | UNIQUE, NOT NULL | User email address |
| phone | String | UNIQUE | Phone number |
| password | String | NOT NULL | Hashed password (bcrypt) |
| firstName | String | NOT NULL | First name |
| lastName | String | NOT NULL | Last name |
| avatar | String | | Profile picture URL |
| bio | String | | User biography |
| location | String | | User location |
| verified | Boolean | DEFAULT false | Email verification status |
| role | Enum | DEFAULT USER | USER, BREEDER, VET, ADMIN, MODERATOR |
| status | Enum | DEFAULT ACTIVE | ACTIVE, SUSPENDED, BANNED, DELETED |
| createdAt | DateTime | DEFAULT now() | Account creation timestamp |
| updatedAt | DateTime | AUTO UPDATE | Last update timestamp |
| lastLoginAt | DateTime | | Last login timestamp |

**Indexes:**
- `email` (unique)
- `phone` (unique)

**Relationships:**
- One-to-Many: Pets, Posts, Comments, Likes, Orders, PetListings
- Many-to-Many: Followers/Following (self-referential)

---

## 2. Pets & Social Features

### Pets Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | String | NOT NULL | Pet name |
| species | Enum | NOT NULL | DOG, CAT, BIRD, RABBIT, etc. |
| breed | String | NOT NULL | Pet breed |
| gender | Enum | NOT NULL | MALE, FEMALE, UNKNOWN |
| birthDate | DateTime | | Date of birth |
| avatar | String | | Pet profile picture |
| bio | String | | Pet bio |
| color | String | | Pet color |
| weight | Float | | Pet weight (kg) |
| microchipId | String | UNIQUE | Microchip ID |
| ownerId | UUID | FOREIGN KEY | References Users(id) |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `ownerId`
- `microchipId` (unique)

### Posts Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| caption | String | | Post caption |
| images | String[] | | Array of image URLs |
| videos | String[] | | Array of video URLs |
| type | Enum | DEFAULT POST | POST, STORY, REEL |
| userId | UUID | FOREIGN KEY | References Users(id) |
| petId | UUID | FOREIGN KEY | References Pets(id), nullable |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `userId`
- `petId`
- `createdAt`

### Comments Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| content | String | NOT NULL | Comment text |
| userId | UUID | FOREIGN KEY | References Users(id) |
| postId | UUID | FOREIGN KEY | References Posts(id) |
| parentId | UUID | FOREIGN KEY | References Comments(id), for replies |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `postId`
- `userId`
- `parentId`

### Likes Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FOREIGN KEY | References Users(id) |
| postId | UUID | FOREIGN KEY | References Posts(id) |
| createdAt | DateTime | DEFAULT now() | |

**Unique Constraint:** (userId, postId)

**Indexes:**
- `postId`

### Follows Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| followerId | UUID | FOREIGN KEY | User who follows |
| followingId | UUID | FOREIGN KEY | User being followed |
| createdAt | DateTime | DEFAULT now() | |

**Unique Constraint:** (followerId, followingId)

**Indexes:**
- `followerId`
- `followingId`

### PetFollows Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | String | | User ID |
| petId | UUID | FOREIGN KEY | References Pets(id) |
| createdAt | DateTime | DEFAULT now() | |

**Unique Constraint:** (userId, petId)

---

## 3. Messaging

### Conversations Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | String | | Conversation name (for groups) |
| isGroup | Boolean | DEFAULT false | Is group conversation |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

### ConversationParticipants Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| conversationId | UUID | FOREIGN KEY | References Conversations(id) |
| userId | UUID | FOREIGN KEY | References Users(id) |
| joinedAt | DateTime | DEFAULT now() | |
| lastReadAt | DateTime | | Last message read timestamp |

**Unique Constraint:** (conversationId, userId)

**Indexes:**
- `userId`

### Messages Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| content | String | NOT NULL | Message text |
| attachments | String[] | | Array of attachment URLs |
| conversationId | UUID | FOREIGN KEY | References Conversations(id) |
| senderId | UUID | FOREIGN KEY | References Users(id) |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `conversationId`
- `senderId`
- `createdAt`

---

## 4. E-commerce

### Categories Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | String | UNIQUE, NOT NULL | Category name |
| slug | String | UNIQUE, NOT NULL | URL-friendly slug |
| description | String | | Category description |
| image | String | | Category image URL |
| parentId | UUID | FOREIGN KEY | References Categories(id), nullable |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `slug` (unique)

### Products Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | String | NOT NULL | Product name |
| slug | String | UNIQUE, NOT NULL | URL-friendly slug |
| description | String | NOT NULL | Full description |
| shortDescription | String | | Brief description |
| images | String[] | | Array of image URLs |
| price | Float | NOT NULL | Selling price (NGN) |
| comparePrice | Float | | Original price for comparison |
| cost | Float | | Cost price (internal) |
| sku | String | UNIQUE | Stock keeping unit |
| barcode | String | | Product barcode |
| trackInventory | Boolean | DEFAULT false | Track inventory |
| stockQuantity | Int | DEFAULT 0 | Available stock |
| lowStockAlert | Int | | Low stock threshold |
| categoryId | UUID | FOREIGN KEY | References Categories(id) |
| tags | String[] | | Product tags |
| petSpecies | Enum[] | | Applicable pet species |
| status | Enum | DEFAULT DRAFT | DRAFT, ACTIVE, ARCHIVED, OUT_OF_STOCK |
| featured | Boolean | DEFAULT false | Featured product |
| supplierName | String | | Dropshipping supplier |
| supplierUrl | String | | Supplier product URL |
| supplierPrice | Float | | Supplier price |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `slug` (unique)
- `categoryId`
- `status`

### CartItems Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| quantity | Int | DEFAULT 1 | Quantity |
| userId | UUID | FOREIGN KEY | References Users(id) |
| productId | UUID | FOREIGN KEY | References Products(id) |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Unique Constraint:** (userId, productId)

**Indexes:**
- `userId`

### WishlistItems Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FOREIGN KEY | References Users(id) |
| productId | UUID | FOREIGN KEY | References Products(id) |
| createdAt | DateTime | DEFAULT now() | |

**Unique Constraint:** (userId, productId)

### Orders Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| orderNumber | String | UNIQUE, NOT NULL | Order reference number |
| userId | UUID | FOREIGN KEY | References Users(id) |
| status | Enum | DEFAULT PENDING | Order status |
| paymentStatus | Enum | DEFAULT PENDING | Payment status |
| paymentMethod | Enum | NOT NULL | Payment method |
| subtotal | Float | NOT NULL | Subtotal amount |
| shippingCost | Float | NOT NULL | Shipping cost |
| tax | Float | DEFAULT 0 | Tax amount |
| discount | Float | DEFAULT 0 | Discount amount |
| total | Float | NOT NULL | Total amount |
| shippingAddress | JSON | NOT NULL | Shipping address object |
| billingAddress | JSON | | Billing address object |
| trackingNumber | String | | Logistics tracking number |
| logisticsPartner | String | | Logistics partner name |
| estimatedDelivery | DateTime | | Estimated delivery date |
| deliveredAt | DateTime | | Actual delivery date |
| notes | String | | Order notes |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Order Status Enum:** PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED
**Payment Status Enum:** PENDING, PAID, FAILED, REFUNDED
**Payment Method Enum:** CARD, BANK_TRANSFER, USSD, MOBILE_WALLET, CASH_ON_DELIVERY, CARD_ON_DELIVERY

**Indexes:**
- `userId`
- `orderNumber` (unique)
- `status`
- `createdAt`

### OrderItems Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| quantity | Int | NOT NULL | Quantity ordered |
| price | Float | NOT NULL | Price at time of order |
| orderId | UUID | FOREIGN KEY | References Orders(id) |
| productId | UUID | FOREIGN KEY | References Products(id) |

**Indexes:**
- `orderId`

### Payments Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| amount | Float | NOT NULL | Payment amount |
| currency | String | DEFAULT NGN | Currency code |
| status | Enum | NOT NULL | Payment status |
| paymentMethod | Enum | NOT NULL | Payment method |
| orderId | UUID | UNIQUE, FOREIGN KEY | References Orders(id) |
| gateway | String | NOT NULL | Payment gateway (paystack, flutterwave) |
| gatewayRef | String | UNIQUE | Gateway transaction reference |
| gatewayResponse | JSON | | Full gateway response |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `orderId` (unique)
- `gatewayRef` (unique)

### Addresses Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| fullName | String | NOT NULL | Recipient name |
| phone | String | NOT NULL | Phone number |
| street | String | NOT NULL | Street address |
| city | String | NOT NULL | City |
| state | String | NOT NULL | State |
| country | String | DEFAULT Nigeria | Country |
| zipCode | String | | Postal code |
| isDefault | Boolean | DEFAULT false | Is default address |
| userId | UUID | FOREIGN KEY | References Users(id) |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `userId`

### Reviews Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| rating | Int | NOT NULL | Rating (1-5) |
| title | String | | Review title |
| comment | String | NOT NULL | Review text |
| images | String[] | | Review images |
| userId | UUID | FOREIGN KEY | References Users(id) |
| productId | UUID | FOREIGN KEY | References Products(id) |
| helpful | Int | DEFAULT 0 | Helpful vote count |
| verified | Boolean | DEFAULT false | Verified purchase |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `productId`
- `userId`

---

## 5. Marketplace

### PetListings Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| title | String | NOT NULL | Listing title |
| description | String | NOT NULL | Full description |
| species | Enum | NOT NULL | Pet species |
| breed | String | NOT NULL | Breed |
| gender | Enum | NOT NULL | Gender |
| age | String | NOT NULL | Age description |
| price | Float | NOT NULL | Price (NGN) |
| images | String[] | | Image URLs |
| videos | String[] | | Video URLs |
| sellerId | UUID | FOREIGN KEY | References Users(id) |
| location | String | NOT NULL | Location |
| healthCertificate | String | | Certificate URL |
| vaccinated | Boolean | DEFAULT false | Vaccination status |
| microchipped | Boolean | DEFAULT false | Microchip status |
| status | Enum | DEFAULT ACTIVE | DRAFT, ACTIVE, SOLD, ARCHIVED |
| featured | Boolean | DEFAULT false | Featured listing |
| views | Int | DEFAULT 0 | View count |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `sellerId`
- `species`
- `status`

### BreedingServices Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| title | String | NOT NULL | Service title |
| description | String | NOT NULL | Service description |
| studPetId | UUID | FOREIGN KEY | References Pets(id) |
| breederId | UUID | FOREIGN KEY | References Users(id) |
| price | Float | NOT NULL | Service price |
| location | String | NOT NULL | Service location |
| terms | String | | Service terms |
| healthCertificate | String | | Certificate URL |
| pedigree | String | | Pedigree document URL |
| status | Enum | DEFAULT ACTIVE | Service status |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `breederId`
- `studPetId`
- `status`

### BreedingRequests Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| serviceId | UUID | FOREIGN KEY | References BreedingServices(id) |
| requesterId | UUID | FOREIGN KEY | References Users(id) |
| femalePetId | UUID | FOREIGN KEY | References Pets(id) |
| message | String | | Request message |
| status | Enum | DEFAULT PENDING | PENDING, CONFIRMED, COMPLETED, CANCELLED |
| scheduledDate | DateTime | | Scheduled date |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `serviceId`
- `requesterId`

### Bookings Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| type | Enum | NOT NULL | VET, GROOMING, BOARDING, TRAINING, PHOTOGRAPHY |
| userId | UUID | FOREIGN KEY | References Users(id) |
| serviceDetails | JSON | NOT NULL | Service details object |
| scheduledDate | DateTime | NOT NULL | Scheduled date/time |
| status | Enum | DEFAULT PENDING | Booking status |
| price | Float | NOT NULL | Service price |
| paymentStatus | Enum | DEFAULT PENDING | Payment status |
| notes | String | | Booking notes |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `userId`
- `type`
- `status`

---

## 6. Health Records

### HealthRecords Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| petId | UUID | FOREIGN KEY | References Pets(id) |
| type | String | NOT NULL | Record type |
| description | String | NOT NULL | Description |
| diagnosis | String | | Diagnosis |
| treatment | String | | Treatment |
| vetName | String | | Veterinarian name |
| documents | String[] | | Document URLs |
| date | DateTime | NOT NULL | Record date |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `petId`

### Vaccinations Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| petId | UUID | FOREIGN KEY | References Pets(id) |
| name | String | NOT NULL | Vaccine name |
| date | DateTime | NOT NULL | Vaccination date |
| nextDue | DateTime | | Next due date |
| vetName | String | | Veterinarian name |
| certificate | String | | Certificate URL |
| createdAt | DateTime | DEFAULT now() | |
| updatedAt | DateTime | AUTO UPDATE | |

**Indexes:**
- `petId`

---

## 7. Notifications

### Notifications Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FOREIGN KEY | References Users(id) |
| type | Enum | NOT NULL | Notification type |
| title | String | NOT NULL | Notification title |
| message | String | NOT NULL | Notification message |
| data | JSON | | Additional data |
| read | Boolean | DEFAULT false | Read status |
| createdAt | DateTime | DEFAULT now() | |

**Notification Types:** ORDER, PAYMENT, MESSAGE, FOLLOW, LIKE, COMMENT, BREEDING, BOOKING, SYSTEM

**Indexes:**
- `userId`
- `read`

---

## 8. Relationships Diagram

```
Users
├── One-to-Many: Pets
├── One-to-Many: Posts
├── One-to-Many: Comments
├── One-to-Many: Likes
├── One-to-Many: Orders
├── One-to-Many: CartItems
├── One-to-Many: WishlistItems
├── One-to-Many: Reviews
├── One-to-Many: PetListings
├── One-to-Many: BreedingServices
├── One-to-Many: Bookings
├── One-to-Many: Notifications
├── Many-to-Many: Followers (self-referential)
└── Many-to-Many: Conversations (via ConversationParticipants)

Pets
├── Many-to-One: User (owner)
├── One-to-Many: Posts
├── One-to-Many: HealthRecords
├── One-to-Many: Vaccinations
└── One-to-Many: BreedingServices (as stud)

Products
├── Many-to-One: Category
├── One-to-Many: CartItems
├── One-to-Many: WishlistItems
├── One-to-Many: OrderItems
└── One-to-Many: Reviews

Orders
├── Many-to-One: User
├── One-to-Many: OrderItems
└── One-to-One: Payment
```

---

## Database Migrations

**Location**: `backend/prisma/migrations/`

To create a new migration:
```bash
cd backend
npx prisma migrate dev --name description_of_change
```

To apply migrations:
```bash
npx prisma migrate deploy
```

To reset database (⚠️ WARNING: Deletes all data):
```bash
npx prisma migrate reset
```

---

## Seeding Data

Seed file location: `backend/prisma/seed.ts`

To seed the database:
```bash
cd backend
npm run prisma:seed
```

---

## Performance Considerations

1. **Indexes**: All foreign keys and frequently queried fields are indexed
2. **Cascade Deletes**: Proper cascade rules to maintain referential integrity
3. **UUID Primary Keys**: Better for distributed systems and security
4. **JSON Fields**: Flexible for addresses and dynamic data
5. **Array Fields**: For images, tags, and attachments (PostgreSQL native)

---

## Backup & Restore

### Backup
```bash
pg_dump -U username -d pethub_nigeria > backup.sql
```

### Restore
```bash
psql -U username -d pethub_nigeria < backup.sql
```

---

## Support

For database-related questions, contact: dev@pethub.ng
