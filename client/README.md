# Product Management System - Frontend

A modern React frontend built with Next.js 15, featuring a responsive UI for managing products with advanced search, filtering, and CRUD operations.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, React 19, TypeScript
- **UI/UX**: Responsive design with Tailwind CSS 4
- **State Management**: React Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Search & Filter**: Advanced product search and filtering
- **View Modes**: Toggle between table and card views
- **Testing**: Comprehensive test coverage with Jest and React Testing Library
- **Performance**: Optimized with Next.js features (SSG, ISR, Image optimization)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd pms/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables in `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NODE_ENV=development
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Feature-level testing
- **Test Location**: `src/features/products/pages/__tests__/`

### Test Coverage
- ✅ ProductsPage component
- ✅ Product search functionality
- ✅ CRUD operations
- ✅ View toggle functionality
- ✅ Error handling

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start          # Start production server

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix linting issues automatically

# Testing
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── products/         # Products page
│       └── page.tsx
│
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   └── index.tsx
│
├── features/             # Feature-specific components
│   └── products/
│       ├── components/   # Product-specific components
│       ├── pages/       # Product pages
│       └── __tests__/   # Product tests
│
├── hooks/               # Custom React hooks
│   ├── use-products.ts  # Product API hooks
│   └── use-view-preference.ts
│
├── services/           # API service layer
│   └── products/
│
├── schemas/           # Zod validation schemas
│   └── product.schema.ts
│
├── types/            # TypeScript type definitions
│   └── index.ts
│
├── config/           # Configuration files
│   └── axios.ts      # API client configuration
│
└── constants/        # Application constants
    ├── api-routes.ts
    └── query-keys.ts
```

## 🔌 API Integration

### Backend Connection
The frontend connects to the backend API using:
- **Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable
- **HTTP Client**: Axios with request/response interceptors
- **State Management**: React Query for caching and synchronization

### API Endpoints Used
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🎨 UI Components

### Core Components
- **Button**: Reusable button with variants
- **Input**: Form input with validation support
- **Modal**: Overlay modal component
- **Navbar**: Application navigation

### Product Components
- **ProductCard**: Product card view
- **ProductTable**: Product table view
- **ProductForm**: Product creation/editing form
- **ProductSlider**: Side panel for product operations
- **ViewToggle**: Switch between table/card views

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Development
NODE_ENV=development
```

### Key Dependencies
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React version
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Query**: Server state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Axios**: HTTP client

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```

### Production Server
```bash
npm start
```

### Deployment Options
- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Static site hosting
- **Docker**: Container deployment
- **AWS/Google Cloud**: Cloud platform deployment

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend server is running on port 5000
   - Verify `NEXT_PUBLIC_API_URL` in `.env.local`
   - Check browser console for CORS errors

2. **Build Failures**
   - Run `npm run lint` to check for linting issues
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript errors: `npm run build`

3. **Test Failures**
   - Ensure Jest configuration is correct
   - Check if all test dependencies are installed
   - Run tests individually: `npm test -- --testNamePattern="test name"`

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check `postcss.config.mjs` and `tailwind.config.js`
   - Verify CSS imports in components

### Development Tips
- Use React DevTools for debugging components
- Use React Query DevTools for API state inspection
- Enable development mode for detailed error messages
- Use Next.js built-in performance metrics

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Source code and examples

### React Resources
- [React Documentation](https://react.dev) - React concepts and API
- [React Query Documentation](https://tanstack.com/query) - Server state management
- [React Hook Form](https://react-hook-form.com) - Form handling

### Testing Resources
- [Jest Documentation](https://jestjs.io) - JavaScript testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - React component testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Commit changes: `git commit -m 'Add new feature'`
7. Push to branch: `git push origin feature/new-feature`
8. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.
