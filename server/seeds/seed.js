import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { sql } from "../config/db.js";

// Read and load apple data.
const appleData = parse(fs.readFileSync(path.resolve("seeds/data/test.csv")), {
  columns: true,
  skip_empty_lines: true,
});

// Seed RDS database.
async function seedDatabase() {
  try {
    await sql`TRUNCATE TABLE time_series RESTART IDENTITY`;

    for (const row of appleData) {
      await sql
        `INSERT INTO time_series (date, price) VALUES (${row.date}, ${row.price})`
      ;
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database: ", error);
  }
}

seedDatabase();
