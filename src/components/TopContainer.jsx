import { useEffect, useState } from "react";
import "../assets/css/topcontainer.css"
import axios from "axios";
function TopContainer({ title, filter="active" }) {
    
  return (
    <div className="top-containers">
        <div className="top-active stocks-container">

        </div>
        <div className="top-gainers stocks-container">

        </div>
        <div className="top-losers stocks-container">

        </div>
    </div>
  )
}
export default TopContainer