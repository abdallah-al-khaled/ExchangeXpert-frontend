import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SettingsPage.css"; // Import CSS

function SettingsPage() {
  // Set states for user info and API key
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Function to handle API key update
  const handleUpdateKey = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to update the Alpaca API keys
      const response = await axios.post("/api/update-alpaca-keys", {
        api_key: apiKey,
        api_secret: apiSecret,
      });

      // Update the status message
      setStatusMessage("API keys updated successfully!");
    } catch (error) {
      setStatusMessage("Error updating API keys.");
    }
  };

  return (
<div className=""></div>
  );
}

export default SettingsPage;
