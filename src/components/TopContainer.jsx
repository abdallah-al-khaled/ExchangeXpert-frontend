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
  } = useSelector((state) => state.sentiment);

  const [companies, setCompanies] = useState({});
  const [stocks, setStocks] = useState({});
  const [topStocks, setTopStocks] = useState([]);
  const [topStocksTradeCount, setTopStocksTradeCount] = useState([]);

  // Fetch company data and stocks
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [dispatch, stocksLoaded]);

  // Fetch stock data by symbols
  useEffect(() => {
    const fetchStockData = async () => {
      if (
        bestStocks.length > 0 &&
        worstStocks.length > 0 &&
        topStocksByVolume.length > 0 &&
        topStocksByTrades.length > 0
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

        setStocks(response.data.bars);
      }
    };

    fetchStockData();
  }, [bestStocks, worstStocks, topStocksByVolume, topStocksByTrades, topStocks, topStocksTradeCount]);

  // Filter and set top S&P 500 stocks by volume
  useEffect(() => {
    if (companies && topStocksByVolume.length > 0) {
      const sp500Symbols = Object.keys(companies);
      const sp500TopStocks = topStocksByVolume.filter((stock) =>
        sp500Symbols.includes(stock.symbol)
      );
      const top5Stocks = sp500TopStocks.slice(0, 10);
      setTopStocks(top5Stocks);
    }
  }, [companies, topStocksByVolume]);

  // Filter and set top S&P 500 stocks by trade count
  useEffect(() => {
    if (companies && topStocksByTrades.length > 0) {
      const sp500Symbols = Object.keys(companies);
      const sp500TopStocks = topStocksByTrades.filter((stock) =>
        sp500Symbols.includes(stock.symbol)
      );
      const top5Stocks = sp500TopStocks.slice(0, 5);
      setTopStocksTradeCount(top5Stocks);
    }
  }, [companies, topStocksByTrades]);

  // Display loading or stock data
  return (
    <div className="page">
      <div className="top-containers">
        <div className="top-active stocks-container">
          <p className="title">Top 5 Market Leaders</p>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            bestStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.stock_symbol}
                data={stocks[stock.stock_symbol]}
                Security={companies[stock.stock_symbol]}
              />
            ))
          )}
        </div>

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Worst Sentiment Stocks</p>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            worstStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.stock_symbol}
                data={stocks[stock.stock_symbol]}
                Security={companies[stock.stock_symbol]}
              />
            ))
          )}
        </div>

        {/* <div className="top-losers stocks-container">
          <p className="title">Top 5 Most Active Stocks by Volume</p>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            topStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.symbol}
                data={stocks[stock.symbol]}
                Security={companies[stock.symbol]}
              />
            ))
          )}
        </div> */}

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Most Active Stocks</p>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            topStocksTradeCount.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.symbol}
                data={stocks[stock.symbol]}
                Security={companies[stock.symbol]}
              />
            ))
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
        ) : (
          topStocks.map((stock, index) => (
            <StocksList
              key={index}
              symbol={stock.symbol}
              sentiment={50}
              Security={companies[stock.symbol]}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TopContainer;
