import dotenv from "dotenv";
import { Pool } from "pg";

// Load environment variables.
dotenv.config();

// Read environment variables.
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

// Establish connection to RDS server.
export const rdsConnection = new Pool({
  user: PGUSER,
  database: PGDATABASE,
  port: PGPORT,
  host: PGHOST,
  password: PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
