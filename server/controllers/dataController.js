import { sql } from "../config/db.js";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";

// Get all time series data from RDS.
export const getTimeSeries = async (req, res) => {
  try {
    const timeSeries = await sql`
			SELECT * FROM time_series
			ORDER BY date ASC
		`;
    console.log("Time series data set fetched succesfully");
    res.status(200).json({ success: true, data: timeSeries });
  } catch (error) {
    console.error("Error fetching data set", error);
  }
};

export const deleteTimeSeries = async (req, res) => {
  try {
    const timeSeries = await sql
      `DELETE FROM time_series RETURNING *`
    ;
    res.status(200).json({ success: true, data: timeSeries });
  } catch (error) {
    console.error("Error in deleteTimeSeries function", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create row in RDS.
export const createRow = async (req, res) => {
  const { date, price } = req.body;
  if (!date || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newRow = await sql
      `
      INSERT INTO time_series (date, price)
      VALUES (${date}, ${price})
      RETURNING *
      `;
    res.status(201).json({ success: true, data: newRow[0] });
  } catch (error) {
    console.log("Error in createRow function", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a single row from RDS.
export const getRow = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await 
      `
      SELECT * FROM time_series WHERE id = ${id}
      `;
    if (row.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Row not found" });
    }
    res.status(200).json({ success: true, data: row[0] });
  } catch (error) {
    console.error("Error in getRow function: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update row in RDS.
export const updateRow = async (req, res) => {
  const { id } = req.params;
  const { date, price } = req.body;

  try {
    const row = await sql
      `
      UPDATE time_series SET date=${date}, price=${price} WHERE id=${id} RETURNING *
      `;

    if (row.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Row not found",
      });
    }

    res.status(200).json({ success: true, data: row[0] });
  } catch (error) {
    console.log("Error in updateRow function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete row in RDS.
export const deleteRow = async (req, res) => {
  const { id } = req.params;

  try {
    const row = await sql
      `DELETE FROM time_series WHERE id=${id} RETURNING *`
    ;

    if (row.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Row not found",
      });
    }

    res.status(200).json({ success: true, data: row[0] });
  } catch (error) {
    console.log("Error in deleteRow function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const uploadMiddleware = multer({ dest: "uploads/" }).single("file");

// Replace existing time series.
export const replaceTimeSeries = async (req, res) => {
  console.log("Received request:", req.body);
  console.log("Received file:", req.file);
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (data.date && data.price) {
          rows.push(data);
        }
      })
      .on("end", async () => {
        try {
          await sql`DELETE FROM time_series`;

          // 2. Insert new rows
          const insertPromises = rows.map((row) =>
            sql
              `INSERT INTO time_series (date, price) VALUES (${row.date}, ${row.price})`
            )
          ;
          await Promise.all(insertPromises);

          // 3. Delete temporary file
          fs.unlinkSync(filePath);

          res.status(200).json({
            success: true,
            message: "Time series replaced successfully",
          });
        } catch (dbError) {
          console.error("Database error in replaceTimeSeries:", dbError);
          res
            .status(500)
            .json({ success: false, message: "Failed to replace time series" });
        }
      });
  } catch (err) {
    console.error("Error in replaceTimeSeries function:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
