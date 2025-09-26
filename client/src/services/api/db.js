import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

// Custom hook to connect to API.
export const useDatabase = create((set, get) => ({
  timeSeries: [],
  loading: false,
  error: null,
  currentRow: null,

  formData: {
    id: null,
    date: "",
    price: "",
  },

  setFormData: (formData) => set({ formData }),

  resetForm: () => set({ formData: { date: "", price: "" } }),

  addRow: async (event) => {
    event.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/time-series`, formData);
      await get().fetchTimeSeries();
      toast.success("Vendor added successfully");
    } catch (error) {
      console.log("Error in addRow function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchTimeSeries: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/time-series`);
      set({ timeSeries: response.data.data, error: null });
    } catch (error) {
      if (error.status === 429) set({ error: "Rate limit exceeded" });
      else set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  removeTimeSeries: async () => {
    set({ loading: true });
    try {
      const response = await axios.delete(`${BASE_URL}/api/time-series`);
      set((prev) => ({
        ...prev,
        timeSeries: [],
      }));
      toast.success("Deleted entire time series");
    } catch (error) {
      console.log("Error in removeTimeSeries function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  deleteRow: async (id) => {
    console.log("Deleting row:", `${BASE_URL}/api/time-series/${id}`);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/time-series/${id}`);
      set((prev) => ({
        ...prev,
        timeSeries: prev.timeSeries.filter((row) => row.id !== id),
      }));
      toast.success("Row deleted successfully");
    } catch (error) {
      console.log("Error in deleteRow function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchRow: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/time-series/${id}`);
      set({
        currentRow: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchRow function", error);
      set({ error: "Something went wrong", currentRow: null });
    } finally {
      set({ loading: false });
    }
  },

  updateRow: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/time-series/${id}`,
        formData
      );
      set({ currentRow: response.data.data });
      toast.success("Row updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateRow function", error);
    } finally {
      set({ loading: false });
    }
  },

  newTimeSeries: async (file) => {
    set({ loading: true });
    try {
      if (!file) {
        toast.error("No file selected");
        return;
      }

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file); // 'file' must match multer.single('file')

      // POST to backend
      await axios.post(`${BASE_URL}/api/time-series/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Fetch updated time series
      await get().fetchTimeSeries();

      toast.success("Time series uploaded successfully!");
    } catch (error) {
      console.log("Error uploading new time series:", error);
      toast.error("Failed to upload file");
    } finally {
      set({ loading: false });
    }
  },
}));
