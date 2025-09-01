import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { rdsConnection } from "./config/database.js";
import router from "./routes/routes.js";
import { aj } from "./lib/arcjet.js";

// Load environment variables
dotenv.config();

// Build the server.
const app = express();

// Configure server port.
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing.
app.use(express.json());

// Middleware for CORS.
app.use(cors());

// Middleware for security.
app.use(helmet({ contentSecurityPolicy: false }));

// Middleware to log HTTP requests.
app.use(morgan("dev"));

// Arcjet middleware for rate limiting and bot detection.
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

// Base url for API routes.
app.use("/api", router);

// Initialise RDS database.
async function initDatabase() {
  try {
    await rdsConnection.query(`
			CREATE TABLE IF NOT EXISTS time_series (
        id SERIAL PRIMARY KEY,
				date TIMESTAMP,
				price NUMERIC(5,2)
			)
		`);
    console.log("Database initialised successfully");
  } catch (error) {
    console.log("Error in initDatabase function", error);
  }
}

// Start server once database initialised.
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
