import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000", // Next.js dev server
    "http://localhost:3001", // Alternative port
    "http://127.0.0.1:3000",
    // Add production URLs here when deploying
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

export default corsOptions; 