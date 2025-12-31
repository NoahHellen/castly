import dotenv from 'dotenv';
import express from 'express';
import { rdsConnection } from './config/db.js';
import { arcjectMiddleware } from './middlewares/arcjetMiddleware.js';
import { coreMiddleware } from './middlewares/coreMiddleware.js';
import router from './routes/routes.js';

// Load environment variables
dotenv.config();

// Build the server.
const app = express();

// Configure server port.
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing.
coreMiddleware(app);

// Arcjet middleware for rate limiting and bot detection.
app.use(arcjectMiddleware);

// Base url for API routes.
app.use('/api', router);

// Initialise RDS database.
async function initDatabase() {
  try {
    await rdsConnection.query(`
			CREATE TABLE IF NOT EXISTS time_series (
        id SERIAL PRIMARY KEY,
				date TIMESTAMP,
				price NUMERIC(8,2)
			)
		`);
    console.log('Database initialised successfully');
  } catch (error) {
    console.log('Error in initDatabase function', error);
  }
}

// Start server once database initialised.
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
});
