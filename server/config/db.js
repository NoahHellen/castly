import dotenv from "dotenv";
import { neon } from '@neondatabase/serverless';

// Load environment variables.
dotenv.config();

// Read environment variables.
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

// Establish connection to Neon server.
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)
