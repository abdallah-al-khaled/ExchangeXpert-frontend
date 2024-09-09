import TopNav from "../components/TopNav";
import TradingBot from "../components/TradingBot";
import "../assets/css/topcontainer.css";
function TradingBots() {
  return (
    <div className="main-content">
      <TopNav />
      <div className="page">
        <TradingBot/>
        <TradingBot/>
        <TradingBot/>
      </div>
    </div>
  );
}
export default TradingBots;
