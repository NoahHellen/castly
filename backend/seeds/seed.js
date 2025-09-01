import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { rdsConnection } from "../config/database.js";
import { formatDate } from "../utils/date.js";

// Read and load apple data.
const appleData = parse(fs.readFileSync(path.resolve("seeds/apple.csv")), {
  columns: true,
  skip_empty_lines: true,
});

// Seed RDS database.
async function seedDatabase() {
  try {
    await rdsConnection.query(`TRUNCATE TABLE time_series RESTART IDENTITY`);

    for (const row of appleData) {
      await rdsConnection.query(
        `INSERT INTO time_series (date, price) VALUES ($1, $2)`,
        [formatDate(row.date), row.price]
      );
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database: ", error);
  }
}

seedDatabase();
