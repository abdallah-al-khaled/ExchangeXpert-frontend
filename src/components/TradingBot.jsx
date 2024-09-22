import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Switch } from "@mui/material";
import "../assets/css/tradingbot.css";
import axios from "axios";

const TradingBot = ({ bot }) => {
  const [botData, setBotData] = useState({
    status: bot.status,
    allocated_amount: bot.allocated_amount || 0,
    latestTrades: bot.latestTrades || [],
    updated_at: bot.updated_at,
  });

  // Memoize chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    const labels = botData.latestTrades.map((trade) => trade.symbol);
    const dataPoints = botData.latestTrades.map((trade) => trade.price);

    return {
      labels: labels,
      datasets: [
        {
          label: "Price over time",
          data: dataPoints,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  }, [botData.latestTrades]);

  // Function to calculate how long ago the bot was updated
  const timeAgoInHours = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    return Math.floor(diffInMs / (1000 * 60 * 60)); // Convert ms to hours
  };

  useEffect(() => {
    const fetchBotData = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user-bots/${bot.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
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

  return (
    <div className="bot-container">
      <h3>{bot.name}</h3>
      <div className="bot-card">
        <div className="bot-chart">
          <Line data={chartData} />
        </div>

        <div className="bot-info">
          <p className="profit-gain flex column">
            Profit gained: <p>{bot.profit}%</p>
          </p>
        </div>
        <div className="bot-info flex column">
          <p>Working Time:</p>
          <p>{`${timeAgoInHours(botData.updated_at)} hours ago`}</p>
        </div>

        <div className="bot-info flex column">
          <p>Balance Per Trade: </p>
          <p>{botData.allocated_amount}$</p>
        </div>

        {/* Toggle Switch */}
        <div className="bot-switch">
          <p className="switch-label">{botData.status === "active" ? "ON" : "OFF"}</p>
          <Switch checked={botData.status === "active"} onChange={toggleBot} color="success" />
        </div>
      </div>
    </div>
  );
};

export default TradingBot;
