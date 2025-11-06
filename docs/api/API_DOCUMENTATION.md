# PetHub Nigeria - API Documentation

## Version 1.0

**Base URL**: `http://localhost:5000/api` (Development)

**Production**: `https://api.pethub.ng/api` (Coming Soon)

---

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## API Endpoints

### 1. Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+234800000000"
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "createdAt": "2025-11-06T10:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "avatar": "https://..."
    },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "https://...",
      "bio": "Pet lover",
      "location": "Lagos, Nigeria",
      "role": "USER",
      "verified": true,
      "createdAt": "2025-11-06T10:00:00.000Z"
    }
  }
}
```

#### Logout
```http
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

### 2. Users

#### Get User Profile
```http
GET /users/:id
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "https://...",
      "bio": "Pet lover",
      "location": "Lagos",
      "createdAt": "2025-11-06T10:00:00.000Z",
      "petsCount": 2,
      "followersCount": 150,
      "followingCount": 200
    }
  }
}
```

#### Update User Profile
```http
PUT /users/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Proud dog owner",
  "location": "Lagos, Nigeria"
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "user": { /* updated user object */ }
  }
}
```

---

### 3. Pets

#### Create Pet
```http
POST /pets
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Max",
  "species": "DOG",
  "breed": "Golden Retriever",
  "gender": "MALE",
  "birthDate": "2022-01-15T00:00:00.000Z",
  "bio": "Friendly and energetic"
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "message": "Pet created successfully",
  "data": {
    "pet": {
      "id": "uuid",
      "name": "Max",
      "species": "DOG",
      "breed": "Golden Retriever",
      "gender": "MALE",
      "birthDate": "2022-01-15T00:00:00.000Z",
      "avatar": null,
      "bio": "Friendly and energetic",
      "ownerId": "user_uuid",
      "createdAt": "2025-11-06T10:00:00.000Z"
    }
  }
}
```

#### Get Pet Details
```http
GET /pets/:id
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "pet": {
      "id": "uuid",
      "name": "Max",
      "species": "DOG",
      "breed": "Golden Retriever",
      "gender": "MALE",
      "age": "2 years",
      "avatar": "https://...",
      "bio": "Friendly and energetic",
      "owner": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "https://..."
      },
      "followersCount": 50,
      "postsCount": 30
    }
  }
}
```

---

### 4. Posts (Social Feed)

#### Create Post
```http
POST /posts
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
caption: "Beautiful day at the park!"
images: [file1, file2]
petId: "pet_uuid" (optional)
type: "POST" (POST, STORY, REEL)
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "message": "Post created successfully",
  "data": {
    "post": {
      "id": "uuid",
      "caption": "Beautiful day at the park!",
      "images": ["https://...", "https://..."],
      "videos": [],
      "type": "POST",
      "userId": "user_uuid",
      "petId": "pet_uuid",
      "createdAt": "2025-11-06T10:00:00.000Z",
      "likesCount": 0,
      "commentsCount": 0
    }
  }
}
```

#### Get Feed
```http
GET /posts?page=1&limit=20
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": "uuid",
        "caption": "Beautiful day at the park!",
        "images": ["https://..."],
        "user": {
          "id": "uuid",
          "firstName": "John",
          "lastName": "Doe",
          "avatar": "https://..."
        },
        "pet": {
          "id": "uuid",
          "name": "Max",
          "avatar": "https://..."
        },
        "likesCount": 25,
        "commentsCount": 5,
        "isLiked": false,
        "createdAt": "2025-11-06T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

#### Like Post
```http
POST /posts/:id/like
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "message": "Post liked",
  "data": {
    "likesCount": 26
  }
}
```

#### Add Comment
```http
POST /posts/:id/comment
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "content": "So cute! 😍"
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "message": "Comment added",
  "data": {
    "comment": {
      "id": "uuid",
      "content": "So cute! 😍",
      "userId": "user_uuid",
      "postId": "post_uuid",
      "createdAt": "2025-11-06T10:00:00.000Z"
    }
  }
}
```

---

### 5. Products (E-commerce)

#### Get All Products
```http
GET /products?category=food&page=1&limit=20
```

**Query Parameters:**
- `category` (optional): Filter by category slug
- `search` (optional): Search products
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `petSpecies` (optional): Filter by pet species (DOG, CAT, etc.)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Premium Dog Food",
        "slug": "premium-dog-food",
        "description": "High-quality nutrition for your dog",
        "shortDescription": "Premium nutrition",
        "images": ["https://...", "https://..."],
        "price": 15000,
        "comparePrice": 20000,
        "category": {
          "id": "uuid",
          "name": "Pet Food",
          "slug": "food"
        },
        "tags": ["dog", "food", "premium"],
        "petSpecies": ["DOG"],
        "status": "ACTIVE",
        "featured": true,
        "stockQuantity": 100,
        "averageRating": 4.5,
        "reviewCount": 23
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

#### Get Product Details
```http
GET /products/:id
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "product": {
      "id": "uuid",
      "name": "Premium Dog Food",
      "slug": "premium-dog-food",
      "description": "Detailed product description...",
      "shortDescription": "Premium nutrition",
      "images": ["https://...", "https://..."],
      "price": 15000,
      "comparePrice": 20000,
      "sku": "PDF-001",
      "category": { /* category object */ },
      "tags": ["dog", "food", "premium"],
      "petSpecies": ["DOG"],
      "status": "ACTIVE",
      "stockQuantity": 100,
      "reviews": [
        {
          "id": "uuid",
          "rating": 5,
          "title": "Great product!",
          "comment": "My dog loves it",
          "user": {
            "firstName": "Jane",
            "lastName": "Doe"
          },
          "createdAt": "2025-11-05T10:00:00.000Z"
        }
      ],
      "averageRating": 4.5,
      "reviewCount": 23
    }
  }
}
```

---

### 6. Shopping Cart

#### Get Cart
```http
GET /cart
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "cart": {
      "items": [
        {
          "id": "uuid",
          "quantity": 2,
          "product": {
            "id": "uuid",
            "name": "Premium Dog Food",
            "images": ["https://..."],
            "price": 15000
          },
          "subtotal": 30000
        }
      ],
      "subtotal": 30000,
      "itemCount": 2
    }
  }
}
```

#### Add to Cart
```http
POST /cart
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": "product_uuid",
  "quantity": 2
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "message": "Product added to cart",
  "data": {
    "cartItem": { /* cart item object */ }
  }
}
```

---

### 7. Orders

#### Create Order
```http
POST /orders
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_uuid",
      "quantity": 2,
      "price": 15000
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "+234800000000",
    "street": "123 Main St",
    "city": "Lagos",
    "state": "Lagos",
    "country": "Nigeria"
  },
  "paymentMethod": "CARD",
  "shippingCost": 2000
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "message": "Order created successfully",
  "data": {
    "order": {
      "id": "uuid",
      "orderNumber": "ORD-20251106-001",
      "status": "PENDING",
      "paymentStatus": "PENDING",
      "subtotal": 30000,
      "shippingCost": 2000,
      "total": 32000,
      "items": [ /* order items */ ],
      "createdAt": "2025-11-06T10:00:00.000Z"
    }
  }
}
```

#### Get User Orders
```http
GET /orders?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "orders": [
      {
        "id": "uuid",
        "orderNumber": "ORD-20251106-001",
        "status": "DELIVERED",
        "paymentStatus": "PAID",
        "total": 32000,
        "itemCount": 2,
        "createdAt": "2025-11-06T10:00:00.000Z"
      }
    ],
    "pagination": { /* pagination object */ }
  }
}
```

---

### 8. Pet Marketplace

#### Get Pet Listings
```http
GET /listings?species=DOG&page=1&limit=20
```

**Query Parameters:**
- `species` (optional): Filter by species
- `breed` (optional): Filter by breed
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `location` (optional): Filter by location
- `page`, `limit`: Pagination

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "listings": [
      {
        "id": "uuid",
        "title": "Beautiful Golden Retriever Puppy",
        "species": "DOG",
        "breed": "Golden Retriever",
        "gender": "MALE",
        "age": "3 months",
        "price": 150000,
        "images": ["https://...", "https://..."],
        "location": "Lagos",
        "seller": {
          "id": "uuid",
          "firstName": "John",
          "lastName": "Doe"
        },
        "vaccinated": true,
        "microchipped": false,
        "status": "ACTIVE",
        "views": 120,
        "createdAt": "2025-11-05T10:00:00.000Z"
      }
    ],
    "pagination": { /* pagination object */ }
  }
}
```

---

### 9. Breeding Services

#### Get Breeding Services
```http
GET /breeding?species=DOG
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "services": [
      {
        "id": "uuid",
        "title": "Golden Retriever Stud Service",
        "description": "Pedigreed Golden Retriever available",
        "studPet": {
          "id": "uuid",
          "name": "Champion Max",
          "breed": "Golden Retriever",
          "avatar": "https://..."
        },
        "breeder": {
          "id": "uuid",
          "firstName": "John",
          "lastName": "Doe"
        },
        "price": 50000,
        "location": "Lagos",
        "pedigree": "https://...",
        "status": "ACTIVE"
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "statusCode": 403,
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Auth Endpoints**: 5 requests per 15 minutes

When rate limit is exceeded:
```json
{
  "status": "error",
  "statusCode": 429,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Pagination

All list endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes pagination metadata:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## Webhooks (For Payment Integration)

### Paystack Webhook
```http
POST /webhooks/paystack
```

### Flutterwave Webhook
```http
POST /webhooks/flutterwave
```

Both webhooks verify signatures and update order payment status.

---

## Testing the API

### Using cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get current user (replace TOKEN)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

Import the provided Postman collection (coming soon) for easy testing.

---

## Support

For API support, contact: dev@pethub.ng
