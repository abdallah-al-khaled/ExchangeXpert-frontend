import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/settings.css";
import TopNav from "../components/TopNav";

function SettingsPage() {
  // Set states for user info and API key
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [configurations, setConfigurations] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch Alpaca account configurations on component mount
  useEffect(() => {
    const fetchConfigurations = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/alpaca-configurations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConfigurations(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConfigurations();
  }, []);

  // Function to handle API key update
  const handleUpdateKey = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/store-alpaca-key",
        { api_key: apiKey, api_secret: apiSecret },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setStatusMessage("API keys updated successfully!");
      if (response.status === 401) {
        setStatusMessage("Unauthorized: Please login again.");
      }
    } catch (error) {
      console.log(error);
      setStatusMessage("Unauthorized: Please login again.");
    }
  };

  // Function to handle Alpaca configuration update
  const handleUpdateConfig = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");

    try {
      console.log({ ...configurations });

      const response = await axios.post(
        "http://127.0.0.1:8000/api/alpaca-configurations",
        { ...configurations },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setStatusMessage("Configurations updated successfully!");
    } catch (error) {
      console.log(error);
      setStatusMessage("Failed to update configurations.");
    }
  };

  // Handle input change for Alpaca configurations
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfigurations({
      ...configurations,
      [name]: value,
    });
  };

  return (
    <div className="main-content">
      <div className="page">
        <div className="settings-page fade-in">
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
                className="animated-input"
              />

              <label htmlFor="api-secret">API Secret</label>
              <input
                type="password"
                id="api-secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Enter your Alpaca API Secret"
                className="animated-input"
              />

              <button type="submit" className="update-btn animated-btn">
                Update API Keys
              </button>
            </form>
          </div>

          {/* Alpaca Configuration Section */}
          <div className="api-section">
            <h3>Alpaca Account Configurations</h3>
            <form onSubmit={handleUpdateConfig} className="config-form">
              <label htmlFor="fractional-trading">Fractional Trading</label>
              <select
                name="fractional_trading"
                value={configurations.fractional_trading || ""}
                onChange={handleConfigChange}
                className="show"
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>

              <label htmlFor="max_margin_multiplier">
                Max Margin Multiplier
              </label>
              <input
                type="number"
                name="max_margin_multiplier"
                value={configurations.max_margin_multiplier || ""}
                onChange={handleConfigChange}
                className="show"
              />

              <label htmlFor="no_shorting">Shorting Allowed</label>
              <select
                name="no_shorting"
                value={configurations.no_shorting || ""}
                onChange={handleConfigChange}
                className="show"
              >
                <option value="false">Yes</option>
                <option value="true">No</option>
              </select>

              <label htmlFor="no_shorting">Suspend Trade</label>
              <select
                name="suspend_trade"
                value={configurations.suspend_trade || ""}
                onChange={handleConfigChange}
                className="show"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>

              <button type="submit" className="update-btn animated-btn">
                Update Configurations
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
