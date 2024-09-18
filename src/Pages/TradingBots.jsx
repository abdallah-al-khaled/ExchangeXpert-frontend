import TopNav from "../components/TopNav";
import TradingBot from "../components/TradingBot";
import "../assets/css/topcontainer.css";
function TradingBots() {
  return (
    <div className="main-content">
      <TopNav />
      <div className="page">
        <TradingBot botName={'Bot1'}/>
        <TradingBot botName={'Bot2'}/>
        <TradingBot botName={'Bot3'}/>
      </div>
    </div>
  );
}
export default TradingBots;
