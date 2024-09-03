import AccountHistoryChart from "../components/AccountHistoryChart";
import Topbar from "../components/Topbar";
import TopContainer from "../components/TopContainer";
import TopNav from "../components/TopNav";
import TradeViewChart from "../components/TradeViewChart";

function Wallet() {
  return (
    <div className="main-content">
      <TopNav />
      <div className="topbar-container">
      <div className="Best-stocks">
          <h2>Best Stocks</h2>
        </div>
      <div className="stock-list-top-bar ">
        <Topbar symbol="NVDA"/>
        <Topbar />
        <Topbar />
        <Topbar />
        <Topbar />
        <Topbar />
        </div>
        </div>
      <div className="viewchart">
       <AccountHistoryChart/>
      </div>
      
    </div>
  )
//           <Topbar/>
}
export default Wallet