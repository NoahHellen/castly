import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Export a function that applies all global middleware
export function coreMiddleware(app) {
  // Middleware for JSON parsing
  app.use(express.json());

  // Middleware for CORS
  app.use(cors());

  // Middleware for security
  app.use(helmet({ contentSecurityPolicy: false }));

  // Middleware to log HTTP requests
  app.use(morgan("dev"));
}
