import React, { useState, useEffect } from "react";
import axios from "axios";
import profilePic from "../assets/images/Ellipse 81.png";
import "../assets/css/topnav.css";

function TopNav() {
  const [accountData, setAccountData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-account", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
          },
        });
        setAccountData(response.data); 
        setLoading(false); 
      } catch (err) {
        setError("Failed to load account data.");
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main-bar">
    <div className="topnav flex">
      <div className="search">
        <input type="text" placeholder="Search for stocks and more" />
      </div>
      <div className="flex profile">
        <img src={profilePic} alt="profile" />
        <div className="flex column username">
          <p className="name">John Doe</p>
          <p className="email">johndoe@gmail.com</p>
        </div>

        <div className="dash"></div>
        <div className="profileBalance flex column">
          <p>Profile Balance</p>
          <p>${parseFloat(accountData.portfolio_value).toLocaleString()}</p> {/* Display portfolio value */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default TopNav;
