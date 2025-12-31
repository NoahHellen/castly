import axios from 'axios';
import { create } from 'zustand';
import { formatDate } from '../../utils/formatDate';
import { useDatabase } from './db';

const BASE_URL = 'http://localhost:8000';

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

      console.log('Posting to transformer', { dates, values });

      const response = await axios.post(`${BASE_URL}/transformer`, {
        dates: dates,
        values: values,
        n_forecast: 20,
        epochs: 100,
        history: 20,
        seq_len: 5,
        batch_size: 2,
      });

      console.log('Received response from transformer:', response.data);

      // Store forecast data.
      set({ forecast: response.data, error: null });
    } catch (error) {
      console.log('Error in ML API', error);
    } finally {
      set({ loading: false });
    }
  },
}));
