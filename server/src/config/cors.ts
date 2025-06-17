import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
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
  optionsSuccessStatus: 200,
};

export default corsOptions;
