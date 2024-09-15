import { useEffect, useState } from "react";
import "../assets/css/topcontainer.css";
import axios from "axios";
import qs from "qs";
import TopContainerListItem from "./TopContainerListItem";
import StocksList from "./StocksList";

function TopContainer({ title, filter = "active" }) {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(false);
  const symbols = [
    "AAPL", "TSLA", "MSFT", "AMZN", "GOOGL", "META", "NVDA", 
    "JPM", "JNJ", "UNH", "HD", "PG", "V", "MA", "NIO"
  ];
  const [companies, setCompanies] = useState({});
  const [stockList, setStockList] = useState();
  const fetchTopSentimentStocks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/top-sentiment-stocks');
      setStockList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/sp500_companies.json');
        const request = await data.json();
        setCompanies(request);
        var d = new Date();
        d.setDate(d.getDate() - 5);

        const response = await axios.get(
          "https://data.alpaca.markets/v2/stocks/bars",
          {
            params: {
              symbols: symbols.join(","),
              timeframe: "1D",
              start: d.toISOString(),  // Convert date to ISO format
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
        setStocks(response.data.bars);  // Update the stock data
        setLoading(true);  // Set loading to true after data is fetched
      } catch (error) {
        console.error("Error fetching stocks data:", error);
      }
    };
    
    fetchData();  // Fetch data once when the component mounts
    fetchTopSentimentStocks();
  }, []);  // Pass an empty array as the dependency to run useEffect only once
  console.log(companies, "dfijughdfurythtdtijbnyur");
  console.log(stockList, "dfijughdfurythtdtijbnyur");

  // Display loading or the stock list based on loading state
  return (
    <div className="page">
      <div className="top-containers">
        <div className="top-active stocks-container">
          <p className="title">Top 5 Active</p>
          {/* Conditionally render items based on loading state */}
          {loading ? (
            <>
              <TopContainerListItem symbol={symbols[0]} data={stocks[symbols[0]]}/>
              <TopContainerListItem symbol={symbols[1]} data={stocks[symbols[1]]}/>
              <TopContainerListItem symbol={symbols[2]} data={stocks[symbols[2]]}/>
              <TopContainerListItem symbol={symbols[3]} data={stocks[symbols[3]]}/>
              <TopContainerListItem symbol={symbols[4]} data={stocks[symbols[4]]}/>
            </>
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        <div className="top-gainers stocks-container">
          <p className="title">Top 5 Gainers</p>
          {loading ? (
            <>
              <TopContainerListItem symbol={symbols[5]} data={stocks[symbols[5]]}/>
              <TopContainerListItem symbol={symbols[6]} data={stocks[symbols[6]]}/>
              <TopContainerListItem symbol={symbols[7]} data={stocks[symbols[7]]}/>
              <TopContainerListItem symbol={symbols[8]} data={stocks[symbols[8]]}/>
              <TopContainerListItem symbol={symbols[9]} data={stocks[symbols[9]]}/>
            </>
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Losers</p>
          {loading ? (
            <>
              <TopContainerListItem symbol={symbols[10]} data={stocks[symbols[10]]}/>
              <TopContainerListItem symbol={symbols[11]} data={stocks[symbols[11]]}/>
              <TopContainerListItem symbol={symbols[12]} data={stocks[symbols[12]]}/>
              <TopContainerListItem symbol={symbols[13]} data={stocks[symbols[13]]}/>
              <TopContainerListItem symbol={symbols[14]} data={stocks[symbols[14]]}/>
            </>
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        <div className="flex column">
          <div className="stockList flex column">
            <div className="list-container">
              <h1 className="stockslist">StocksList</h1>
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
