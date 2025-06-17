import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import corsOptions from "@/config/cors";
import routes from "@/routes";
import { errorHandler, notFound } from "@/middleware/error-handler";

const app = express();

app.use(helmet());

app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(morgan("combined"));

app.use("/api", routes);

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

app.use(notFound);

app.use(errorHandler);

export default app; 