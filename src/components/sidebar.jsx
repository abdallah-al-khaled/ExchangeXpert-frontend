import "boxicons";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {

  let btn = document.querySelector('#btn');
  let sidebar = document.querySelector('.sidebar');

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
      <div className="top">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <box-icon name="menu" id="btn"></box-icon>
        </div>

      <ul>
      <li>
          <Link to="/Markets">
            <box-icon name="stocks"></box-icon>
            <span className="nav-item">Markets</span>
          </Link>
          <span className="tooltip">Markets</span>
        </li>
        

      </ul>
    </div>
  );
}
export default Sidebar;
