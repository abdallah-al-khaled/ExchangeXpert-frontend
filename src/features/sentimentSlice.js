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

const sentimentSlice = createSlice({
  name: "sentiment",
  initialState: {
    bestStocks: [],
    worstStocks: [],
    loading: false,
    stocksLoaded: false,
    error: null,
  },
  reducers: {
    setStocksLoaded: (state, action) => {
      state.stocksLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    // For best stocks
    builder.addCase(fetchBestStocks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBestStocks.fulfilled, (state, action) => {
      state.loading = false;
      state.bestStocks = action.payload;
    });
    builder.addCase(fetchBestStocks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // For worst stocks
    builder.addCase(fetchWorstStocks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWorstStocks.fulfilled, (state, action) => {
      state.loading = false;
      state.worstStocks = action.payload;
    });
    builder.addCase(fetchWorstStocks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setStocksLoaded } = sentimentSlice.actions;
export default sentimentSlice.reducer;
