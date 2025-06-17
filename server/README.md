# Product Management System - Backend API

A robust RESTful API built with Express.js and TypeScript for managing products, featuring comprehensive validation, security middleware, and clean architecture.

## 🚀 Features

- **Modern Stack**: Express.js with TypeScript for type safety
- **Security**: Helmet for security headers, CORS configuration
- **Validation**: Zod schemas for request/response validation
- **Architecture**: Clean separation of concerns (Controllers, Services, Routes)
- **Logging**: Morgan for HTTP request logging
- **Error Handling**: Centralized error handling with custom error types
- **Development**: Hot reload with nodemon and ts-node

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd pms/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   API_PREFIX=/api
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Verify the server is running:**
   - API Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)
   - API Documentation: [http://localhost:5000/](http://localhost:5000/)

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix linting issues automatically
```

## 📁 Project Structure

```
src/
├── controllers/         # Request handlers
│   └── product-controller.ts
│
├── services/           # Business logic layer
│   └── product-service.ts
│
├── routes/            # API route definitions
│   ├── index.ts       # Main router
│   └── product-routes.ts
│
├── middleware/        # Custom middleware
│   ├── error-handler.ts
│   └── validation.ts
│
├── schemas/          # Zod validation schemas
│   └── product-schemas.ts
│
├── types/           # TypeScript type definitions
│   └── index.ts
│
├── config/          # Configuration files
│   └── cors.ts      # CORS configuration
│
├── data/           # Mock data (development)
│   └── mockProducts.ts
│
├── utils/          # Utility functions
│   └── module-alias.ts
│
├── app.ts          # Express app setup
└── index.ts        # Server entry point
```

## 🌐 API Endpoints

### Products

| Method | Endpoint              | Description                    | Query Parameters |
|--------|-----------------------|--------------------------------|------------------|
| GET    | `/api/products`       | Get all products (with filters) | `search`, `status`, `tags`, `minPrice`, `maxPrice`, `sortBy`, `sortOrder`, `page`, `limit` |
| GET    | `/api/products/:id`   | Get product by ID              | - |
| POST   | `/api/products`       | Create new product             | - |
| PUT    | `/api/products/:id`   | Update product                 | - |
| DELETE | `/api/products/:id`   | Delete product                 | - |
| GET    | `/api/products/tags`  | Get all unique tags            | - |

### System

| Method | Endpoint        | Description    |
|--------|-----------------|----------------|
| GET    | `/api/health`   | Health check   |
| GET    | `/`             | API information |

## 📊 Query Parameters for GET /api/products

- **search**: Search in name, description, and tags
- **status**: Filter by status (`active`, `archived`)
- **tags**: Filter by tags (array)
- **minPrice**: Minimum price filter (number)
- **maxPrice**: Maximum price filter (number)
- **sortBy**: Sort by field (`name`, `price`, `status`, `createdAt`)
- **sortOrder**: Sort order (`asc`, `desc`)
- **page**: Page number (default: 1)
- **limit**: Items per page (default: 10, max: 100)

### Example Requests

```bash
# Get all products
curl http://localhost:5000/api/products

# Search products
curl "http://localhost:5000/api/products?search=laptop"

# Filter by status and sort
curl "http://localhost:5000/api/products?status=active&sortBy=price&sortOrder=desc"

# Pagination
curl "http://localhost:5000/api/products?page=2&limit=5"

# Complex query
curl "http://localhost:5000/api/products?search=tech&minPrice=100&maxPrice=1000&sortBy=name&limit=20"
```

## 📋 Request/Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Optional error details"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

## 🏗️ Data Models

### Product Schema

```typescript
interface IProduct {
  id: string;                    // UUID
  name: string;                  // Required, min 1 char
  description?: string;          // Optional
  price: number;                 // Required, positive number
  status: "active" | "archived"; // Required enum
  tags: string[];               // Array of strings
  imageUrl?: string;            // Optional URL
  createdAt?: string;           // ISO date string
  updatedAt?: string;           // ISO date string
}
```

### Validation Rules

```typescript
// Create Product
{
  name: string (min: 1, max: 255),
  description?: string (max: 1000),
  price: number (positive),
  status: "active" | "archived",
  tags: string[] (max 10 items),
  imageUrl?: string (valid URL)
}

// Update Product
{
  name?: string (min: 1, max: 255),
  description?: string (max: 1000),
  price?: number (positive),
  status?: "active" | "archived",
  tags?: string[] (max 10 items),
  imageUrl?: string (valid URL)
}
```

## 🔧 Environment Configuration

### Environment Variables

```env
# Server Configuration
PORT=5000                          # Server port (default: 5000)
NODE_ENV=development              # Environment (development/production)

# CORS Configuration
CORS_ORIGIN=http://localhost:3000 # Allowed frontend origin

# API Configuration
API_PREFIX=/api                   # API route prefix
```

### CORS Settings

The server is configured to accept requests from:
- `http://localhost:3000` (Next.js dev server)
- `http://localhost:3001` (Alternative port)
- `http://127.0.0.1:3000`

For production, add your domain to the CORS origins in `src/config/cors.ts`.

## 🔒 Security Features

- **Helmet**: Security headers middleware
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Zod schema validation for all inputs
- **Error Handling**: Sanitized error responses
- **Request Logging**: Morgan HTTP request logging

## 🛠️ Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **Express.js** | Web framework | ^4.18.2 |
| **TypeScript** | Type safety | ^5.3.3 |
| **Zod** | Schema validation | ^3.22.4 |
| **Helmet** | Security headers | ^7.1.0 |
| **CORS** | Cross-origin requests | ^2.8.5 |
| **Morgan** | HTTP request logger | ^1.10.0 |
| **UUID** | Unique ID generation | ^9.0.1 |
| **Nodemon** | Development hot reload | ^3.0.2 |

## 🚀 Production Deployment

### Build for Production

```bash
# Install dependencies
npm install --production

# Build TypeScript
npm run build

# Start production server
npm start
```

### Production Environment Variables

```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
API_PREFIX=/api
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

## 🐛 Error Handling

The API implements comprehensive error handling:

### Error Types
- **Validation Errors** (400): Invalid request data
- **Not Found Errors** (404): Resource not found
- **Server Errors** (500): Internal server errors

### Error Response Format
```json
{
  "success": false,
  "error": "Detailed error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

## 📊 Logging

### Development Logging
- HTTP requests logged with Morgan
- Error stack traces in console
- Request/response details

### Production Logging
- HTTP requests logged
- Sanitized error messages
- No sensitive data exposure

## 🧪 Testing

### Current Status
- **Unit Tests**: Not implemented yet
- **Integration Tests**: Not implemented yet
- **API Tests**: Not implemented yet

### Future Testing Plans
```bash
# When implemented
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   
   # Or change port in .env
   PORT=5001
   ```

2. **CORS Errors**
   - Check `CORS_ORIGIN` in `.env`
   - Verify frontend URL matches CORS configuration
   - Update `src/config/cors.ts` for additional origins

3. **TypeScript Build Errors**
   ```bash
   # Clean build
   rm -rf dist/
   npm run build
   
   # Check TypeScript version
   npx tsc --version
   ```

4. **Module Resolution Issues**
   - Ensure path aliases are configured in `tsconfig.json`
   - Check `src/utils/module-alias.ts` setup

### Development Tips
- Use `npm run dev` for hot reload during development
- Check `http://localhost:5000/api/health` to verify server status
- Monitor console logs for request/response debugging
- Use tools like Postman or curl for API testing

## 📚 API Documentation

### Interactive Testing
Use tools like:
- **Postman**: Import API collection
- **curl**: Command-line testing
- **Thunder Client**: VS Code extension
- **Insomnia**: REST client

### Example API Collection
```json
{
  "name": "PMS API",
  "requests": [
    {
      "name": "Get All Products",
      "method": "GET",
      "url": "http://localhost:5000/api/products"
    },
    {
      "name": "Create Product",
      "method": "POST",
      "url": "http://localhost:5000/api/products",
      "body": {
        "name": "New Product",
        "price": 99.99,
        "status": "active",
        "tags": ["tag1", "tag2"]
      }
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run linting: `npm run lint`
5. Build the project: `npm run build`
6. Test your changes thoroughly
7. Commit changes: `git commit -m 'Add new feature'`
8. Push to branch: `git push origin feature/new-feature`
9. Create a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Zod for all input validation
- Implement proper error handling
- Add comprehensive documentation
- Follow existing code style

## 📝 License

This project is licensed under the ISC License. 