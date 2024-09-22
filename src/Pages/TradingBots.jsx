import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNav from "../components/TopNav";
import TradingBot from "../components/TradingBot";
import "../assets/css/topcontainer.css";

function TradingBots() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        // Fetch all bots
        const botResponse = await axios.get("http://127.0.0.1:8000/api/bots");
        const botsData = botResponse.data;

        console.log(botsData);
        
        // For each bot, fetch the latest trades and attach them to the bot
        const botsWithTrades = await Promise.all(
          botsData.map(async (bot) => {
            const tradesResponse = await axios.get(`http://127.0.0.1:8000/api/bots/${bot.id}/latest-trades`);
            return {
              ...bot,
              latestTrades: tradesResponse.data,
            };
          })
        );

        setBots(botsWithTrades);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bots and trades", error);
      }
    };

    fetchBots();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <TopNav />
      <div className="page">
        {bots.map((bot) => (
          <TradingBot key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  );
}

export default TradingBots;
