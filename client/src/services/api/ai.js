import { create } from "zustand";
import axios from "axios";
import { formatDate } from "../../utils/formatDate";
import { useDatabase } from "./db";

const BASE_URL = "http://localhost:8000";

export const useAi = create((set, get) => ({
  loading: false,
  error: null,
  forecast: [],

  fetchTransformer: async () => {
    set({ loading: true });
    try {
      // Time series data needed for forecast.
      await useDatabase.getState().fetchTimeSeries();
      const { timeSeries } = useDatabase.getState();

      // Post time series data as lists.
      const values = timeSeries.map((ts) => Number(ts.price));
      const dates = timeSeries.map((ts) => formatDate(ts.date));
      const response = await axios.post(`${BASE_URL}/transformer`, {
        date: dates,
        value: values,
      });

      // Store forecast data.
      set({ forecast: response.data, error: null });
    } catch (error) {
      console.log("Error in ML API", error);
    } finally {
      set({ loading: false });
    }
  },
}));
