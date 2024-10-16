import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import required components
import { Switch, Button, TextField } from "@mui/material";
import axios from "axios";
import "../assets/css/tradingbot.css";

// Register the required components with Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TradingBot = ({ bot }) => {
  const [botData, setBotData] = useState({
    status: bot.status,
    allocated_amount: bot.allocated_amount || 0,
    latestTrades: bot.latestTrades || [],
    updated_at: bot.updated_at,
  });

  const [stockPrices, setStockPrices] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(0); 

  useEffect(() => {
    if (botData.allocated_amount !== undefined) {
      setNewBalance(botData.allocated_amount);
    }
  }, [botData.allocated_amount]);

  const timeAgoInHours = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    return Math.floor(diffInMs / (1000 * 60 * 60));
  };

  const fetchStockData = async (symbol) => {
    const today = new Date().toISOString().split("T")[0];
    const threeDaysAgo = new Date(new Date().setDate(new Date().getDate() - 3))
      .toISOString()
      .split("T")[0];

    try {
      const response = await axios.get(
        `https://data.alpaca.markets/v2/stocks/${symbol}/bars`,
        {
          params: {
            start: threeDaysAgo,
            end: today,
            timeframe: "30Min",
            feed: "iex",
          },
          headers: {
            "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
            "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
          },
        }
      );

      if (
        response.data &&
        response.data.bars &&
        response.data.bars.length > 0
      ) {
        const stockPrices = response.data.bars.map((bar) => bar.c); // Closing prices
        const labels = response.data.bars.map((bar) =>
          new Date(bar.t).toLocaleDateString()
        ); // Dates

        setStockPrices(stockPrices);
        setLabels(labels);
      } else {
        console.warn(`No data returned for symbol ${symbol}`);
      }
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
  };

  useEffect(() => {
    if (botData.latestTrades.length > 0) {
      const firstStockSymbol = botData.latestTrades[0].stock_symbol;
      fetchStockData(firstStockSymbol);
    }
  }, [botData.latestTrades]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Stock Price Over Last 3 Days",
        data: stockPrices,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const toggleBot = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      const newStatus = botData.status === "active" ? "inactive" : "active";
      await axios.put(
        `http://127.0.0.1:8000/api/user-bots/${bot.id}/toggle`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setBotData((prevData) => ({
        ...prevData,
        status: newStatus,
      }));
    } catch (error) {
      console.error("Error toggling bot", error);
    }
  };

  const handleEditBalance = () => {
    setIsEditingBalance(true);
  };

  const handleSaveBalance = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/user-bots/${bot.id}/update-balance`,
        { allocated_amount: newBalance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setBotData((prevData) => ({
        ...prevData,
        allocated_amount: newBalance,
      }));
      setIsEditingBalance(false); // Switch back to view mode
    } catch (error) {
      console.error("Error saving new balance", error);
    }
  };

  useEffect(() => {
    const fetchBotData = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user-bots/${bot.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          }
        );
        setBotData((prevData) => ({
          ...prevData,
          status: response.data.status,
          allocated_amount: response.data.allocated_amount,
          latestTrades: response.data.latestTrades || [],
          updated_at: response.data.updated_at,
        }));
      } catch (error) {
        console.error("Error fetching bot data", error);
      }
    };

    fetchBotData();
  }, [bot.id]);

  console.log(bot);

  return (
    <div className="bot-container">
      <h3>{bot.name}</h3>
      <div className="bot-card">
        <div className="bot-chart">
          {stockPrices.length > 0 ? (
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          ) : (
            <p>Loading stock data...</p>
          )}
        </div>

        <div className="bot-info">
          <p className="profit-gain flex column">Bot latest trade:</p>
          <div className="flex bot-symbols">
            <img
              src={`https://assets.parqet.com/logos/symbol/${bot.latestTrades[0].stock_symbol}?format=jpg`}
              alt={""}
              width={40}
              className="overlap-image"
            />
            {bot.latestTrades[1]?.stock_symbol && (
              <img
                src={`https://assets.parqet.com/logos/symbol/${bot.latestTrades[1]?.stock_symbol}?format=jpg`}
                alt={""}
                width={40}
                className="overlap-image"
              />
            )}
            {bot.latestTrades[2]?.stock_symbol && (
              <img
                src={`https://assets.parqet.com/logos/symbol/${bot.latestTrades[2]?.stock_symbol}?format=jpg`}
                alt={""}
                width={40}
                className="overlap-image"
              />
            )}
          </div>
        </div>
        <div className="bot-info flex column">
          <p>Working Time:</p>
          <p>{`${timeAgoInHours(botData.updated_at)} hours ago`}</p>
        </div>

        <div className="bot-info flex column">
          <p>Balance Per Trade: </p>
          {isEditingBalance ? (
            <>
              <TextField
                type="number"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveBalance}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <p>{botData.allocated_amount}$</p>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleEditBalance}
              >
                Edit
              </Button>
            </>
          )}
        </div>

        <div className="bot-switch">
          <p className="switch-label">
            {botData.status === "active" ? "ON" : "OFF"}
          </p>
          <Switch
            checked={botData.status === "active"}
            onChange={toggleBot}
            color="success"
          />
        </div>
      </div>
    </div>
  );
};

export default TradingBot;
