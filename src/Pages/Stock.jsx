import TopNav from "../components/TopNav";
import { useParams } from "react-router-dom";
import TradeViewChart from "../components/TradeViewChart";
import GaugeChart from "../components/GaugeChart";
import "../assets/css/stockpage.css";
import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import TradingViewTopStories from "../components/TradingViewTopStories";
function Stock() {
  const { symbol } = useParams();
  const [sentiment, setSentiment] = useState({});
  useEffect(() => {
    const request = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/sentiment-analysis/${symbol}`
        );
        console.log((parseFloat(data.sentiment_score) + 1) * 50);
        setSentiment(Math.floor((parseFloat(data.sentiment_score) + 1) * 50));
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, []);
  console.log(symbol);
  return (
    <div className="main-content">
      <TopNav />
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
                sentiment > 70 ? "green" : sentiment < 30 ? "red" : "yellow"
              }
              id={"sentiment"}
            >
              {sentiment > 70
                ? "Positive"
                : sentiment < 30
                ? "Negative"
                : "Neutral"}
            </p>
            <div className=""></div>
            <p className="last-updated">last updated 22-8-2024</p>
          </div>
        </div>
        <div className="flex lower">
          <div className="ml-prediction">
            <img
              src="http://127.0.0.1:8000/storage/images/mQOHY15IRMCV0b1j0FZ4OAFeEBdaVJXD7RNPirLh.png"
              alt=""
            />
          </div>
          <div className="news">
              <TradingViewTopStories/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Stock;
