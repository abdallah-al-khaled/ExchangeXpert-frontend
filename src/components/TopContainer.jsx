import { useEffect, useState } from "react";
import "../assets/css/topcontainer.css";
import axios from "axios";
import qs from "qs";
import TopContainerListItem from "./TopContainerListItem";
import StocksList from "./StocksList";
function TopContainer({ title, filter = "active" }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const symbols = ["AAPL", "TSLA"];
      try {
        const response = await axios.get(
          "https://data.alpaca.markets/v2/stocks/bars",
          {
            params: {
              symbols: symbols.join(","),
              timeframe: "1D",
              start: "2024-08-26",
              adjustment: "raw",
              feed: "sip",
              sort: "asc",
            },
            headers: {
              "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
              "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
              accept: "application/json",
            },
            paramsSerializer: (params) => {
              return qs.stringify(params);
            },
          }
        );
        console.log(response.data.bars);
      } catch (error) {
        console.error("Error fetching stocks data:", error);
        console.log(process.env.APCA_API_KEY_ID, "REGJKHBNFUIJERTGBHJRTUEDFGB");
      }
    };
    fetchData();
  }, [filter]);
  return (
    <div className="page">
      <div className="top-containers">
        <div className="top-active stocks-container">
          <p className="title">Top 5 Active</p>

          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
        </div>

        <div className="top-gainers stocks-container">
          <p className="title">Top 5 Gainers</p>
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
        </div>

        <div className="top-losers stocks-container">
          <p className="title">Top 5 Losers</p>
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
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
      <StocksList />

    </div>
  );
}
export default TopContainer;
