import { useEffect, useState } from "react";
import "../assets/css/topcontainer.css";
import axios from "axios";
import TopContainerListItem from "./TopContainerListItem";
import StocksList from "./StocksList";

function TopContainer({ title, filter = "active" }) {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState({});
  const [bestStocks, setBestStocks] = useState([]);
  const [worstStocks, setWorstStocks] = useState([]);

  // Function to fetch both best and worst sentiment stocks
  const fetchTopAndWorstSentimentStocks = async () => {
    try {
      const bestResponse = await axios.get(
        "http://127.0.0.1:8000/api/top-sentiment-stocks"
      );
      const worstResponse = await axios.get(
        "http://127.0.0.1:8000/api/worst-sentiment-stocks"
      );

      setBestStocks(bestResponse.data);
      setWorstStocks(worstResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/sp500_companies.json");
        const request = await data.json();
        setCompanies(request);
        await fetchTopAndWorstSentimentStocks();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        if (bestStocks.length > 0 || worstStocks.length > 0) {
          // Merge best and worst stock symbols into a single array
          const stockSymbols = [
            // ...new Set([
              ...bestStocks.map((stock) => stock.stock_symbol),
              ...worstStocks.map((stock) => stock.stock_symbol),
            // ]),
          ];

          // Make a single API request for all the stocks
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
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching stock data from Alpaca:", error);
      }
    };

    if (bestStocks.length > 0 || worstStocks.length > 0) {
      fetchStockData();
    }
  }, [bestStocks, worstStocks]); // Trigger fetch when best/worst stocks are fetched

  // Display loading or the stock list based on loading state
  return (
    <div className="page">
      <div className="top-containers">
        <div className="top-active stocks-container">
          <p className="title">Top 5 Best Sentiment Stocks</p>
          {loading && bestStocks ? (
            bestStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.stock_symbol}
                data={stocks[stock.stock_symbol]}
                Security={companies[stock.stock_symbol]}
              />
            ))
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Worst Sentiment Stocks</p>
          {loading && worstStocks ? (
            worstStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.stock_symbol}
                data={stocks[stock.stock_symbol]}
                Security={companies[stock.stock_symbol]}
              />
            ))
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Worst Sentiment Stocks</p>
          {loading && worstStocks ? (
            worstStocks.map((stock, index) => (
              <TopContainerListItem
                key={index}
                symbol={stock.stock_symbol}
                data={stocks[stock.stock_symbol]}
              />
            ))
          ) : (
            <p>Loading data...</p>
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
