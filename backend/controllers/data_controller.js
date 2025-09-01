import { rdsConnection } from "../config/database.js";

// Get all time series data from RDS.
export const getTimeSeries = async (req, res) => {
  try {
    const timeSeries = await rdsConnection.query(`
			SELECT * FROM time_series
			ORDER BY date ASC
		`);
    console.log("Time series data set fetched succesfully");
    res.status(200).json({ success: true, data: timeSeries.rows });
  } catch (error) {
    console.error("Error fetching data set", error);
  }
};

export const deleteTimeSeries = async (req, res) => {
  try {
    const timeSeries = await rdsConnection.query(
      `DELETE FROM time_series RETURNING *`
    );
    res.status(200).json({ success: true, data: timeSeries.rows });
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
    const newRow = await rdsConnection.query(
      `
      INSERT INTO time_series (date, price)
      VALUES ($1, $2)
      RETURNING *`,
      [date, price]
    );
    res.status(201).json({ success: true, data: newRow.rows[0] });
  } catch (error) {
    console.log("Error in createRow function", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a single row from RDS.
export const getRow = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await rdsConnection.query(
      `
      SELECT * FROM time_series WHERE id = $1`,
      [id]
    );
    if (row.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Row not found" });
    }
    res.status(200).json({ success: true, data: row.rows[0] });
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
    const row = await rdsConnection.query(
      `UPDATE time_series SET date=$1, price=$2 WHERE id=$3 RETURNING *`,
      [date, price, id]
    );

    if (row.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Row not found",
      });
    }

    res.status(200).json({ success: true, data: row.rows[0] });
  } catch (error) {
    console.log("Error in updateRow function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete row in RDS.
export const deleteRow = async (req, res) => {
  const { id } = req.params;

  try {
    const row = await rdsConnection.query(
      `DELETE FROM time_series WHERE id=$1 RETURNING *`,
      [id]
    );

    if (row.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Row not found",
      });
    }

    res.status(200).json({ success: true, data: row.rows[0] });
  } catch (error) {
    console.log("Error in deleteRow function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
