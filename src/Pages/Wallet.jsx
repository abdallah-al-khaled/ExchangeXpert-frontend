import { useEffect, useState } from "react";
import AccountHistoryChart from "../components/AccountHistoryChart";
import Topbar from "../components/Topbar";
import TopContainerListItem from "../components/TopContainerListItem";
import TopNav from "../components/TopNav";
import axios from "axios";

function Wallet() {
  const [stocks, setStocks] = useState({});
  const symbols = ["AAPL", "TSLA", "MSFT", "AMZN", "GOOGL", "META"];
  const [loading,setLoading] = useState(false)
  

  return (
    <div className="main-content">
      <TopNav />
      <div className="page">

      <div className="topbar-container">
      <div className="Best-stocks">
          <h2>Best Stocks</h2>
        </div>
      <div className="stock-list-top-bar ">
        <Topbar symbol="NVDA"/>
        <Topbar symbol="TSLA"/>
        <Topbar symbol="AMD"/>
        <Topbar symbol="META"/>
        <Topbar symbol="AAPL"/>
        <Topbar symbol="MSFT"/>
        </div>
        </div>
      <div className="viewchart flex row">
       <AccountHistoryChart/>
       <div className="trending-up">
       <div className="top-active stocks-container">
          <p className="trending">Trending Up</p>

          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          <TopContainerListItem />
          
        </div>
       </div>
      </div>
      
      </div>
    </div>
  )
//           <Topbar/>
}
export default Wallet