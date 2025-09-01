import express from "express";
import {
  createRow,
  deleteRow,
  deleteTimeSeries,
  getRow,
  getTimeSeries,
  updateRow,
} from "../controllers/data_controller.js";

// Build server router.
const router = express.Router();

// Routes to controllers.
router.get("/time-series", getTimeSeries);
router.get("/time-series/:id", getRow);
router.post("/time-series", createRow);
router.put("/time-series/:id", updateRow);
router.delete("/time-series/:id", deleteRow);
router.delete("/time-series", deleteTimeSeries);

export default router;
