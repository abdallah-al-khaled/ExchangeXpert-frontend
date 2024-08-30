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
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="top">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>ExchangeXpert</span>
        </div>
        <box-icon color="white" name="menu" id="btn" onClick={toggleSidebar}></box-icon>
      </div>

      <ul>
        <li>
          <Link to="/Markets" className="nav-link">
            <div className="icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 19L10 2.71191" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 19V4M17 16V9.5M17 5V1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0 8.99988H6V15.9999H0V8.99988ZM7 4.99988H13V11.9999H7V4.99988Z" fill="white"/>
<path d="M14 3.99988H20V10.4999H14V3.99988Z" fill="white"/>
</svg>
            </div>

            <span className="nav-item">Markets</span>
          </Link>
          <span className="tooltip">Markets</span>
        </li>
        
        <li>
          <Link to="/AI-bots" className="nav-link">
          <div className="icon">
            <box-icon color="white"  name="bot"></box-icon>
          </div>
            <span className="nav-item">AI Trading Bots</span>
          </Link>
          <span className="tooltip">AI Trading Bots</span>
        </li>

        <li>
          <Link to="/wallet" className="nav-link">
          <div className="icon">
            <box-icon color="white"  name="wallet"></box-icon>
          </div>
            <span className="nav-item">Wallet</span>
          </Link>
          <span className="tooltip">Wallet</span>
        </li>

        <li>
          <Link to="/Settings" className="nav-link">
          <div className="icon">
            <box-icon color="white"  name="cog" ></box-icon>
          </div>
            
            <span className="nav-item">Settings</span>
          </Link>
          <span className="tooltip">Settings</span>
        </li>

        <li>
          <Link to="/login" className="nav-link">
          <div className="icon">
            <box-icon color="white"  name="log-in"></box-icon>
          </div>
            
            <span className="nav-item">login</span>
          </Link>
          <span className="tooltip">login</span>
        </li>

      </ul>
    </div>

    <div className="main-content">
      <div className="">
        <h1>
          Code Commerce
        </h1>
      </div>
    </div>
    </>
  );
}
export default Sidebar;