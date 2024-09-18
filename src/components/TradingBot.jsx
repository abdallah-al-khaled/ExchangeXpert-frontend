import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {Switch } from "@mui/material";
import "../assets/css/tradingbot.css"; // Link to your CSS file for custom styling

// Sample data for the performance chart
const generateChartData = () => {
  return {
    labels: ["Aug 2023", "Sep 2023", "Oct 2023", "Nov 2023"],
    datasets: [
      {
        label: "Profit over time",
        data: [4000, 4200, 4300, 4500],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };
};

const TradingBot = ({ botName }) => {
  const [isActive, setIsActive] = useState(true);
  const chartData = generateChartData();

  const toggleBot = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bot-container">
        <h3>{botName}</h3>
    <div className="bot-card">
      <div className="bot-chart">
        <Line data={chartData} />
        
      </div>

      <div className="bot-info">
        <p className="profit-gain flex column">
          Profit gained: <p>13.24%</p>
        </p>
      </div>
      <div className="bot-info flex column">
        <p>Working Time:</p>
        <p> 5h 22m</p>
      </div>

      <div className="bot-info flex column">
        <p>Total Balanced: </p>
        <p> $1234</p>
      </div>

      {/* Toggle Switch */}
      <div className="bot-switch">
        <p className="switch-label">ON</p>
        <Switch checked={isActive} onChange={toggleBot} color="success" />
      </div>
    </div>
    </div>
  );
};

export default TradingBot;
