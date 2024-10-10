import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/sidebar.css";
import logo from "../assets/images/logo.png";
import "boxicons";
import TopNav from "./TopNav";

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false); // To track if user is admin
  const [reload, setReload] = useState();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close
  };

  useEffect(() => {
    // Make an API call to check if the user is an admin
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });

        // Check if the user is an admin
        if (response.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [isAdmin]);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="">
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
              <Link
                to="/Markets"
                className={`nav-link ${
                  isActive("/Markets")
                    ? "bg-blue"
                    : isActive("/Stock/")
                    ? "bg-blue"
                    : ""
                }`}
              >
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 19V4M17 16V9.5M17 5V1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
              <Link
                to="/AI-bots"
                className={`nav-link ${isActive("/AI-bots") ? "bg-blue" : ""}`}
              >
                <div className="icon">
                  <box-icon color="white" name="bot"></box-icon>
                </div>
                <span className="nav-item">Trading Bots</span>
              </Link>
            </li>

            <li>
              <Link
                to="/Wallet"
                className={`nav-link ${isActive("/Wallet") ? "bg-blue" : ""}`}
              >
                <div className="icon">
                  <box-icon color="white" name="wallet"></box-icon>
                </div>
                <span className="nav-item">Wallet</span>
              </Link>
            </li>

            <li>
              <Link
                to="/Settings"
                className={`nav-link ${isActive("/Settings") ? "bg-blue" : ""}`}
              >
                <div className="icon">
                  <box-icon color="white" name="cog"></box-icon>
                </div>

                <span className="nav-item">Settings</span>
              </Link>
            </li>

            {isAdmin && ( // Conditionally render the "Admin" link if the user is an admin
              <li>
                <Link
                  to="/admin"
                  className={`nav-link ${isActive("/admin") ? "bg-blue" : ""}`}
                >
                  <div className="icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="nav-item">Admin</span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        {!sessionStorage.getItem("authToken") ? (
          <ul className="logout">
            <li className="login-logout">
              <Link
                to="/login"
                className={`nav-link ${isActive("/login") ? "bg-blue" : ""}`}
              >
                <div className="icon">
                  <box-icon color="white" name="log-in"></box-icon>
                </div>

                <span className="nav-item">Login</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul
            className="logout"
            onClick={() => {
              sessionStorage.clear();
              setReload(!reload);
            }}
          >
            <li className="login-logout">
              <div className="nav-link bg-blue">
                <div className="icon">
                  <box-icon color="white" name="log-in"></box-icon>
                </div>
                <span className="nav-item">Logout</span>
              </div>
            </li>
          </ul>
        )}
      </div>
      <div className={`top-nav ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <TopNav />
      </div>
    </>
  );
}

export default Sidebar;
