import { useEffect, useState } from "react";
import "../assets/css/topcontainer.css";
import axios from "axios";
import qs from "qs";
function TopContainer({ title, filter = "active" }) {
  const [stocks, setStocks] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get('https://paper-api.alpaca.markets/v2/assets', {
  //           headers: {
  //             'APCA-API-KEY-ID': "",
  //             'APCA-API-SECRET-KEY': "",
  //           }
  //         });

  //         let filteredStocks;
  //         if (filter === 'active') {
  //           filteredStocks = response.data.slice(0, 10);  // Top 10 active stocks
  //         } else if (filter === 'gainers') {
  //           filteredStocks = response.data.filter(stock => stock.change_percent >= 0).slice(0, 10);  // Top gainers
  //         } else if (filter === 'losers') {
  //           filteredStocks = response.data.filter(stock => stock.change_percent < 0).slice(0, 10);  // Top losers
  //         }

  //         setStocks(filteredStocks);
  //         console.log(filteredStocks);

  //       } catch (error) {
  //         console.error("Error fetching stocks data:", error);
  //       }
  //     };
  //     fetchData();
  //   }, [filter])

  useEffect(() => {
    const fetchData = async () => {
      const symbols = ["AAPL", "TSLA"];
      try {
        const response = await axios.get(
          "https://data.alpaca.markets/v2/stocks/bars",
          {
            params: {
              symbols: symbols.join(','),
              timeframe: "1D",
              start: "2024-08-26",
              adjustment: "raw",
              feed: "sip",
              sort: "asc",
            },
            headers: {
              "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
              "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
              'accept': 'application/json',
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
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
    <div className="top-containers">
      <div className="top-active stocks-container"></div>
      <div className="top-gainers stocks-container"></div>
      <div className="top-losers stocks-container"></div>
    </div>
  );
}
export default TopContainer;
