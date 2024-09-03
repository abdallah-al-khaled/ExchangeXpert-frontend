import "boxicons";
import logo from "../assets/images/logo.png";
import { Link,useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/css/sidebar.css";
import Topbar from "./Topbar";
import TradeViewChart from "./TradeViewChart";
import TopNav from "./TopNav";
import TopContainer from "./TopContainer";
import StocksList from "./StocksList";

function Sidebar() {
  const location = useLocation();
  
  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="top">
          <div className="logo">
            <img src={logo} alt="logo" />
            <span>ExchangeXpert</span>
          </div>
          <box-icon
            color="white"
            name="menu"
            id="btn"
            onClick={toggleSidebar}
          ></box-icon>
        </div>

        <ul>
          <li>
            <Link to="/Markets" className={`nav-link ${isActive("/Markets") ? "bg-blue" : isActive("/Stock") ? "bg-blue" :"" } `}>
              <div className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 19L10 2.71191"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 19V4M17 16V9.5M17 5V1"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M0 8.99988H6V15.9999H0V8.99988ZM7 4.99988H13V11.9999H7V4.99988Z"
                    fill="white"
                  />
                  <path d="M14 3.99988H20V10.4999H14V3.99988Z" fill="white" />
                </svg>
              </div>

              <span className="nav-item">Markets</span>
            </Link>
          </li>

          <li>
            <Link to="/AI-bots" className={`nav-link ${isActive("/AI-bots") ? "bg-blue" : ""}`}>
              <div className="icon">
                <box-icon color="white" name="bot"></box-icon>
              </div>
              <span className="nav-item">AI Trading Bots</span>
            </Link>
          </li>

          <li>
            <Link to="/Wallet" className={`nav-link ${isActive("/Wallet") ? "bg-blue" : ""}`}>
              <div className="icon">
                <box-icon color="white" name="wallet"></box-icon>
              </div>
              <span className="nav-item">Wallet</span>
            </Link>
          </li>

          <li>
            <Link to="/Settings" className={`nav-link ${isActive("/Settings") ? "bg-blue" : ""}`}>
              <div className="icon">
                <box-icon color="white" name="cog"></box-icon>
              </div>

              <span className="nav-item">Settings</span>
            </Link>
          </li>

          <li>
            <Link to="/login" className={`nav-link ${isActive("/login") ? "bg-blue" : ""}`}>
              <div className="icon">
                <box-icon color="white" name="log-in"></box-icon>
              </div>

              <span className="nav-item">login</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Sidebar;
