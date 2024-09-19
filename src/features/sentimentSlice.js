import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBestStocks = createAsyncThunk(
  "sentiment/fetchBestStocks",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/sentiment-analysis/top"
    );
    return response.data;
  }
);

export const fetchWorstStocks = createAsyncThunk(
  "sentiment/fetchWorstStocks",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/sentiment-analysis/worst"
    );
    return response.data;
  }
);

export const fetchTopStocksByVolume = createAsyncThunk(
  "sentiment/fetchTopStocksByVolume",
  async () => {
    const response = await axios.get(
      "https://data.alpaca.markets/v1beta1/screener/stocks/most-actives?by=volume&top=100",
      {
        headers: {
          "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
          "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
          accept: "application/json",
        },
      }
    );
    return response.data.most_actives; 
  }
);

export const fetchTopStocksByTrades = createAsyncThunk(
  "sentiment/fetchTopStocksByTrades",
  async () => {
    const response = await axios.get(
      "https://data.alpaca.markets/v1beta1/screener/stocks/most-actives?by=trades&top=100",
      {
        headers: {
          "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
          "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
          accept: "application/json",
        },
      }
    );
    console.log("from slice", response.data.most_actives);
    
    return response.data.most_actives; 
  }
);

const sentimentSlice = createSlice({
  name: "sentiment",
  initialState: {
    bestStocks: [],
    worstStocks: [],
    topStocksByVolume: [],
    topStocksByTrades: [],
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

    // For top stocks by volume
    builder.addCase(fetchTopStocksByVolume.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopStocksByVolume.fulfilled, (state, action) => {
      state.loading = false;
      state.topStocksByVolume = action.payload;
    });
    builder.addCase(fetchTopStocksByVolume.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // For top stocks by trades
    builder.addCase(fetchTopStocksByTrades.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopStocksByTrades.fulfilled, (state, action) => {
      state.loading = false;
      state.topStocksByTrades = action.payload;
    });
    builder.addCase(fetchTopStocksByTrades.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Export actions and reducer
export const { setStocksLoaded } = sentimentSlice.actions;
export default sentimentSlice.reducer;
