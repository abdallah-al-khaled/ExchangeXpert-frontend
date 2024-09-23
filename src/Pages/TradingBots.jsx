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
        const botResponse = await axios.get("http://127.0.0.1:8000/api/bots", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
          }
        });
        const botsData = botResponse.data;

        console.log(botsData);

        // Fetch latest trades for each bot and attach to the bot object
        const botsWithTrades = await Promise.all(
          botsData.map(async (bot) => {
            const tradesResponse = await axios.get(`http://127.0.0.1:8000/api/bots/${bot.id}/latest-trades`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
              }
            });

            return {
              ...bot,
              latestTrades: tradesResponse.data || [],
            };
          })
        );

        setBots(botsWithTrades);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bots and trades:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchBots();
  }, []);
console.log(bots);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <div className="page">
        {bots.length > 0 ? (
          bots.map((bot) => <TradingBot key={bot.id} bot={bot} />)
        ) : (
          <p>No bots available at this time.</p>
        )}
      </div>
    </div>
  );
}

export default TradingBots;
