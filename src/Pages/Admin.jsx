import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Admin Component to Fetch and Display Bots, Users, and Trades
const AdminBotUserTrades = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedBot, setExpandedBot] = useState(null);
  const [botTrades, setBotTrades] = useState({}); // Store trades for each bot

  const token = sessionStorage.getItem("authToken"); // Assuming token is stored in session storage

  // Fetch all bots
  const fetchBots = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/bots", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setBots(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bots.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user trades for a specific bot
  const fetchUserTradesForBot = async (botId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/bots/${botId}/user-trades`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setBotTrades((prevState) => ({
        ...prevState,
        [botId]: response.data, // Store trades for the specific bot
      }));
    } catch (err) {
      console.error(`Failed to load user trades for bot ${botId}`, err);
      setError(`Failed to load user trades for bot ${botId}`);
    }
  };

  // Handle expanding a bot accordion to fetch trades
  const handleExpandBot = (botId) => {
    if (!botTrades[botId]) {
      fetchUserTradesForBot(botId); // Fetch trades if not already fetched
    }
    setExpandedBot(botId === expandedBot ? null : botId); // Toggle accordion
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return (
    <div className="main-content">
      <Container>
        <Typography variant="h4" gutterBottom>
          Admin: Bots, Users, and Trades
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          bots.map((bot) => (
            <Accordion
              key={bot.id}
              expanded={expandedBot === bot.id}
              onChange={() => handleExpandBot(bot.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{bot.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {botTrades[bot.id] ? (
                  botTrades[bot.id].map((userData) => (
                    <div key={userData.user.id}>
                      <Typography variant="h6">
                        {userData.user.name}'s Trades
                      </Typography>
                      {userData.trades.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Trade ID</TableCell>
                                <TableCell>Stock Symbol</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Buy At</TableCell>
                                <TableCell>Sold At</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {userData.trades.map((trade) => (
                                <TableRow key={trade.id}>
                                  <TableCell>{trade.id}</TableCell>
                                  <TableCell>{trade.stock_symbol}</TableCell>
                                  <TableCell>{trade.action}</TableCell>
                                  <TableCell>{trade.quantity}</TableCell>
                                  <TableCell>{trade.price}</TableCell>
                                  <TableCell>
                                    {trade.buy_at
                                      ? new Date(trade.buy_at).toLocaleString()
                                      : "N/A"}
                                  </TableCell>
                                  <TableCell>
                                    {trade.sold_at
                                      ? new Date(trade.sold_at).toLocaleString()
                                      : "N/A"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Typography>
                          No trades available for this user.
                        </Typography>
                      )}
                    </div>
                  ))
                ) : (
                  <Typography>Loading trades...</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Container>
    </div>
  );
};

export default AdminBotUserTrades;
