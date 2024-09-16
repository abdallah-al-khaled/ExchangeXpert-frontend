import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBestStocks = createAsyncThunk(
  "sentiment/fetchBestStocks",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/top-sentiment-stocks"
    );
    return response.data;
  }
);

export const fetchWorstStocks = createAsyncThunk(
  "sentiment/fetchWorstStocks",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/worst-sentiment-stocks"
    );
    return response.data;
  }
);
