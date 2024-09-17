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
  const { bestStocks, worstStocks, stocksLoaded, loading,topStocksByVolume,topStocksByTrades } = useSelector(
    (state) => state.sentiment
  );
  console.log(topStocksByTrades,"dfjgnidkfn");
  
  const [companies, setCompanies] = useState({});
  const [stocks, setStocks] = useState({});
  const [topStocks, setTopStocks] = useState([]);
  const [topStocksTradeCount, setTopStocksTradeCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!stocksLoaded) {
        dispatch(fetchBestStocks());
        dispatch(fetchWorstStocks());
        dispatch(fetchTopStocksByVolume());
        dispatch(fetchTopStocksByTrades());
        dispatch(setStocksLoaded(true)); // Mark stocks as loaded to avoid redundant API calls
      }

      const companiesData = await fetch("/sp500_companies.json");
      const companiesJson = await companiesData.json();
      setCompanies(companiesJson);
    };

    fetchData();
  }, [dispatch, stocksLoaded]);
  console.log(bestStocks);

  useEffect(() => {
    const fetchStockData = async () => {
      if (bestStocks.length > 0 || worstStocks.length > 0) {
        // Combine best and worst stock symbols into a single array
        const stockSymbols = [
          ...new Set([
            ...bestStocks.map((stock) => stock.stock_symbol),
            ...worstStocks.map((stock) => stock.stock_symbol),
            ...topStocks.map((stock) => stock.symbol),
            ...topStocksTradeCount.map((stock) => stock.symbol),
          ]),
        ];

        // Make a single API request for all the stock symbols
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

        setStocks(response.data.bars);
      }
    };

    if (
      bestStocks.length > 0 ||
      worstStocks.length > 0 ||
      topStocks.length > 0
    ) {
      fetchStockData();
    }

    const fetchTopStocksByTradeCount = async () => {
      try {
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
        const top100Stocks = response.data.most_actives;
        console.log("Top 100 Stocks: ", response.data.most_actives);

        const sp500Symbols = Object.keys(companies);

        const sp500TopStocks = top100Stocks.filter((stock) =>
          sp500Symbols.includes(stock.symbol)
        );

        const top10Stocks = sp500TopStocks
          .sort((a, b) => b.trade_count - a.trade_count)
          .slice(0, 10);
        console.log("Top 10 S&P 500 Stocks by trade_count: ", top10Stocks);
        setTopStocksTradeCount(top10Stocks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopStocksByTradeCount();

    const fetchTopStocks = async () => {
      try {
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
        const top100Stocks = response.data.most_actives;
        console.log("Top 100 Stocks: ", response.data.most_actives);

        const sp500Symbols = Object.keys(companies);

        const sp500TopStocks = top100Stocks.filter((stock) =>
          sp500Symbols.includes(stock.symbol)
        );

        const top5Stocks = sp500TopStocks
          .sort((a, b) => b.volume - a.volume)
          .slice(0, 5);
        console.log("Top 5 S&P 500 Stocks by Volume: ", top5Stocks);
        setTopStocks(top5Stocks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopStocks();
  }, [bestStocks, worstStocks]);

  // Display loading or stock data
  return (
    <div className="page">
      <div className="top-containers">
        <div className="top-active stocks-container">
          <p className="title">Top 5 Best Sentiment Stocks</p>
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

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Most Active Stocks</p>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            topStocksByTrades.map((stock, index) => (
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
        {companies && (
          <>
            <StocksList
              symbol="TSLA"
              sentiment={20}
              Security={companies.TSLA}
            />
            <StocksList
              symbol="NVDA"
              sentiment={50}
              Security={companies.NVDA}
            />
            <StocksList
              symbol="AAPL"
              sentiment={90}
              Security={companies.AAPL}
            />
            <StocksList
              symbol="AMZN"
              sentiment={70}
              Security={companies.AMZN}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TopContainer;
