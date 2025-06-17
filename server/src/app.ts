import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import corsOptions from "@/config/cors";
import routes from "@/routes";
import { errorHandler, notFound } from "@/middleware/error-handler";

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
app.use(morgan("combined"));

// API routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Product Management System API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      products: "/api/products",
      tags: "/api/products/tags",
    },
  });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app; 