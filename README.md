# Product Management System (PMS)

A full-stack web application for managing products with a modern React frontend and Express.js backend API.

## 🚀 Features

### Frontend (Next.js + React)
- 📱 Modern responsive UI with Tailwind CSS
- 🔍 Advanced search and filtering
- 📊 Multiple view modes (Table/Card view)
- ✅ Form validation with React Hook Form & Zod
- 🔄 Real-time data with React Query
- 🧪 Comprehensive test coverage with Jest

### Backend (Express.js + TypeScript)
- 🛡️ RESTful API with TypeScript
- 🔒 Security middleware (Helmet, CORS)
- ✨ Input validation with Zod schemas
- 📝 Request logging with Morgan
- 🏗️ Clean architecture (Controllers, Services, Routes)
- 🚦 Proper error handling

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Quick Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd pms
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
npm run build
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
cp .env.example .env.local
npm run build
npm run dev
```

### 4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health Check: http://localhost:5000/api/health

## 🧪 Running Tests

### Frontend Tests
```bash
cd client
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
```

### Backend Tests
```bash
cd server
# Tests not implemented yet
```

## 🔧 Development Commands

### Backend Commands
```bash
cd server
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run lint:fix    # Fix linting issues
```

### Frontend Commands
```bash
cd client
npm run dev         # Start development server
npm run build       # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

## 📁 Project Structure

```
pms/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-specific components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   └── types/         # TypeScript type definitions
│   └── package.json
│
├── server/                # Express.js Backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── schemas/       # Zod validation schemas
│   │   └── types/         # TypeScript type definitions
│   └── package.json
│
└── README.md
```

## 🌐 API Endpoints

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/products`       | Get all products (with filters) |
| GET    | `/api/products/:id`   | Get product by ID              |
| POST   | `/api/products`       | Create new product             |
| PUT    | `/api/products/:id`   | Update product                 |
| DELETE | `/api/products/:id`   | Delete product                 |
| GET    | `/api/health`         | Health check                   |

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
API_PREFIX=/api
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=development
```

## 🚀 Deployment

### Backend Deployment
1. Build the project: `npm run build`
2. Set environment variables
3. Start the server: `npm start`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   - Backend: Change `PORT` in `.env` file
   - Frontend: Use `npm run dev -- -p 3001` to run on different port

2. **CORS errors**
   - Ensure backend `CORS_ORIGIN` matches frontend URL
   - Update `NEXT_PUBLIC_API_URL` in frontend `.env.local`

3. **Build failures**
   - Run `npm run lint` to check for linting issues
   - Ensure all dependencies are installed: `npm install`

For more help, please open an issue in the repository.
