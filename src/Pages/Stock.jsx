import TopNav from "../components/TopNav";
import { useParams } from "react-router-dom";
import TradeViewChart from "../components/TradeViewChart";
import GaugeChart from "../components/GaugeChart";
import "../assets/css/stockpage.css";
import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import TradingViewTopStories from "../components/TradingViewTopStories";
import {
  fetchBestStocks,
  fetchWorstStocks,
  setStocksLoaded,
} from "../features/sentimentSlice";
import { useDispatch, useSelector } from "react-redux";
function Stock() {
  const dispatch = useDispatch();
  const { bestStocks, worstStocks, stocksLoaded } = useSelector(
    (state) => state.sentiment
  );
  const { symbol } = useParams();
  const [sentiment, setSentiment] = useState({});
  const [img, setImg] = useState({});
  const [date, setDate] = useState('');

  const getSentimentScore = (symbol) => {
    const bestStock = bestStocks.find((stock) => stock.stock_symbol === symbol);
    if (bestStock) {
      return bestStock.sentiment_score;
    }
    const worstStock = worstStocks.find(
      (stock) => stock.stock_symbol === symbol
    );
    if (worstStock) {
      return worstStock.sentiment_score;
    }
    return null; // Return null if the symbol is not found
  };

  useEffect(() => {
    const request = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/sentiment-analysis/${symbol}`
        );
        console.log(parseFloat(data.sentiment_score));
        setSentiment(Math.floor((parseFloat(data.sentiment_score) + 1) * 50));
        setDate(data.analysis_date)
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    request();

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/ml-predictions?stock_symbol=${symbol}`
        );
        setImg(data[0].image_path.replace("public", "storage"));
        console.log(data[0].image_path.replace("public", "storage"));
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(sentiment);
  return (
    <div className="main-content">
      <div className="page">
        <div className="flex upper">
          <div className="tradingviewchart">
            <TradeViewChart symbol={symbol} />
          </div>

          <div className="gauge-chart">
            <div className=""></div>
            <div className=""></div>
            <h3>Technical analysis for {symbol}</h3>
            <GaugeChart value={sentiment} />
            <p
              className={
                sentiment > 60 ? "green" : sentiment < 40 ? "red" : "yellow"
              }
              id={"sentiment"}
            >
              {sentiment > 60
                ? "Positive"
                : sentiment < 40
                ? "Negative"
                : "Neutral"}
            </p>
            <div className=""></div>
            <p className="last-updated">
              last updated {date.split(" ")[0]}
              </p>
          </div>
        </div>
        <div className="flex lower">
          <div className="ml-prediction">
            <img
              src={'http://127.0.0.1:8000/' + img}
              alt=""
              width={1000}
            />
          </div>
          <div className="news">
            <TradingViewTopStories symbol={symbol} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Stock;
