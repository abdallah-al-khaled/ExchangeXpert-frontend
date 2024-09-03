import AccountHistoryChart from "../components/AccountHistoryChart";
import GaugeChart from "../components/GaugeChart";
import Topbar from "../components/Topbar";
import TopContainer from "../components/TopContainer";
import TopContainerListItem from "../components/TopContainerListItem";
import TopNav from "../components/TopNav";
import TradeViewChart from "../components/TradeViewChart";

function Wallet() {
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
        <Topbar />
        <Topbar />
        <Topbar />
        <Topbar />
        <Topbar />
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

      <div className="open-positions">
        <GaugeChart/>
      </div>
      
      </div>
    </div>
  )
//           <Topbar/>
}
export default Wallet