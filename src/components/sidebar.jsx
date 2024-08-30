import "boxicons";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/sidebar.css";

function Sidebar() {
  let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close
  };

  return (
    <>
    <div className={`sidebar ${isOpen ? "open" : ""}`} onClick={toggleSidebar}>
      <div className="top">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <box-icon name="menu" id="btn"></box-icon>
      </div>

      <ul>
        <li>
          <Link to="/Markets">
            <box-icon color="white" name="stocks"></box-icon>
            <span className="nav-item">Markets</span>
          </Link>
          <span className="tooltip">Markets</span>
        </li>
        
        <li>
          <Link to="/AI-bots">
            <box-icon color="white"  name="bot"></box-icon>
            <span className="nav-item">AI Trading Bots</span>
          </Link>
          <span className="tooltip">AI Trading Bots</span>
        </li>

        <li>
          <Link to="/wallet">
            <box-icon color="white"  name="wallet"></box-icon>
            <span className="nav-item">Wallet</span>
          </Link>
          <span className="tooltip">Wallet</span>
        </li>

        <li>
          <Link to="/Settings">
            <box-icon color="white"  name="cog"></box-icon>
            <span className="nav-item">Settings</span>
          </Link>
          <span className="tooltip">Settings</span>
        </li>

        <li>
          <Link to="/login">
            <box-icon color="white"  name="log-in"></box-icon>
            <span className="nav-item">login</span>
          </Link>
          <span className="tooltip">login</span>
        </li>

      </ul>
    </div>
    <div className="main-content">
      <div className="container">
        <h1>
          wellcome
        </h1>
      </div>
    </div>
    </>
  );
}
export default Sidebar;
