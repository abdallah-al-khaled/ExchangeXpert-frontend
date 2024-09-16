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
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>

      {/* User Information Section */}
      <div className="user-info-section">
        <h3>User Information</h3>
        <div className="user-details">
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      </div>

      {/* Alpaca API Key Section */}
      <div className="api-section">
        <h3>Alpaca API Settings</h3>
        <form onSubmit={handleUpdateKey} className="api-form">
          <label htmlFor="api-key">API Key</label>
          <input
            type="text"
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Alpaca API Key"
          />

          <label htmlFor="api-secret">API Secret</label>
          <input
            type="password"
            id="api-secret"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            placeholder="Enter your Alpaca API Secret"
          />

          <button type="submit" className="update-btn">
            Update API Keys
          </button>
        </form>

        {/* Display status message */}
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
}

export default SettingsPage;
