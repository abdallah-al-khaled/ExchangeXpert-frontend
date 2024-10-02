import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import StocksList from "./StocksList";
import "../assets/css/topcontainer.css";
import TopContainerListItem from "./TopContainerListItem";

import {
  fetchBestStocks,
  fetchWorstStocks,
  setStocksLoaded,
  fetchTopStocksByVolume,
  fetchTopStocksByTrades,
} from "../features/sentimentSlice";

function TopContainer({ title, filter = "active" }) {
  const dispatch = useDispatch();
  const {
    bestStocks,
    worstStocks,
    stocksLoaded,
    loading,
    topStocksByVolume,
    topStocksByTrades,
    error,
  } = useSelector((state) => state.sentiment);

  const [companies, setCompanies] = useState({});
  const [stocks, setStocks] = useState({});
  const [topStocks, setTopStocks] = useState([]);
  const [topStocksTradeCount, setTopStocksTradeCount] = useState([]);

  // Fetch company data and stocks
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!stocksLoaded) {
          dispatch(fetchBestStocks());
          dispatch(fetchWorstStocks());
          dispatch(fetchTopStocksByVolume());
          dispatch(fetchTopStocksByTrades());
          dispatch(setStocksLoaded(true));
        }
        const companiesData = await fetch("/sp500_companies.json");
        const companiesJson = await companiesData.json();
        setCompanies(companiesJson);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchData();
  }, [dispatch, stocksLoaded]);

  // Filter and set top S&P 500 stocks by volume
  useEffect(() => {
    try {
      if (companies && topStocksByVolume.length > 0) {
        const sp500Symbols = Object.keys(companies);
        const sp500TopStocks = topStocksByVolume.filter((stock) =>
          sp500Symbols.includes(stock.symbol)
        );
        const top5Stocks = sp500TopStocks.slice(0, 10);
        setTopStocks(top5Stocks);
      }
    } catch (error) {
      console.error("Error filtering top stocks by volume:", error);
    }
  }, [companies, topStocksByVolume]);

  // Filter and set top S&P 500 stocks by trade count
  useEffect(() => {
    try {
      if (companies && topStocksByTrades.length > 0) {
        const sp500Symbols = Object.keys(companies);
        const sp500TopStocks = topStocksByTrades.filter((stock) =>
          sp500Symbols.includes(stock.symbol)
        );
        const top5Stocks = sp500TopStocks.slice(0, 5);
        setTopStocksTradeCount(top5Stocks);
      }
    } catch (error) {
      console.error("Error filtering top stocks by trades:", error);
    }
  }, [companies, topStocksByTrades]);

  // Fetch stock data by symbols
  useEffect(() => {
    const fetchStockData = async () => {
      if (
        topStocksTradeCount.length > 0
      ) {
        const stockSymbols = [
          ...new Set([
            ...bestStocks.map((stock) => stock.stock_symbol),
            ...worstStocks.map((stock) => stock.stock_symbol),
            ...topStocks.map((stock) => stock.symbol),
            ...topStocksTradeCount.map((stock) => stock.symbol),
          ]),
        ];

        const d = new Date();
        d.setDate(d.getDate() - 5);

        try {
          const response = await axios.get(
            "https://data.alpaca.markets/v2/stocks/bars",
            {
              params: {
                symbols: stockSymbols.join(","),
                timeframe: "1D",
                start: d.toISOString(),
                adjustment: "raw",
                feed: "sip",
                sort: "asc",
                limit: 10000,
              },
              headers: {
                "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
                "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
                accept: "application/json",
              },
            }
          );

          console.log("from slice", stockSymbols);
          console.log("response", response);
          setStocks(response.data.bars);
          console.log("oncifjrnhjrbvhf");
          
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }

        console.log(bestStocks, loading, topStocks, topStocksTradeCount, worstStocks);
      }
    };
    fetchStockData();
  }, [bestStocks, loading, topStocks, topStocksTradeCount, worstStocks]);

  // Display loading, error, or stock data
  return (
    <div className="page">
      {error && <p>Error loading data: {error}</p>}
      <div className="top-containers">
        <div className="top-active stocks-container">
          <p className="title">Top 5 Market Leaders</p>
          {loading ? (
            <p>Loading data...</p>
          ) : bestStocks && bestStocks.length > 0 ? (
            bestStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.stock_symbol}
                data={stocks[stock.stock_symbol]}
                Security={companies[stock.stock_symbol]}
              />
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Market Laggards</p>
          {loading ? (
            <p>Loading data...</p>
          ) : worstStocks && worstStocks.length > 0 ? (
            worstStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.stock_symbol}
                data={stocks[stock.stock_symbol]}
                Security={companies[stock.stock_symbol]}
              />
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Active Market Players</p>
          {loading ? (
            <p>Loading data...</p>
          ) : topStocksTradeCount && topStocksTradeCount.length > 0 ? (
            topStocksTradeCount.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.symbol}
                data={stocks[stock.symbol]}
                Security={companies[stock.symbol]}
              />
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>

        <div className="flex column">
          <div className="stockList flex column">
            <div className="list-container">
              <h1 className="stockslist">Stocks List</h1>
            </div>
            <div className="test"></div>
            <div className="test"></div>
          </div>
        </div>
      </div>
      <div className="flex column gap">
        {loading ? (
          <p>Loading data...</p>
        ) : topStocks && topStocks.length > 0 ? (
          topStocks.map((stock, index) => (
            <StocksList
              key={index}
              symbol={stock.symbol}
              sentiment={50}
              Security={companies[stock.symbol]}
            />
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}

export default TopContainer;
