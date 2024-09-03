import TopContainer from "../components/TopContainer";
import TopNav from "../components/TopNav";
import { useParams } from "react-router-dom";
import TradeViewChart from "../components/TradeViewChart";
import GaugeChart from "../components/GaugeChart";
import "../assets/css/stockpage.css";
function Stock() {
  const { symbol } = useParams();
  console.log(symbol);
  return (
    <div className="main-content">
      <TopNav />
      <div className="page">
        <div className="flex upper">
            <div className="tradingviewchart">
            <TradeViewChart symbol={symbol} />
            </div>

          <div className="gauge-chart">
            <div className=""></div>
            <div className=""></div>
            <h3>Technical analysis for {symbol}</h3>
            <GaugeChart />
            <p className="sell">Sell</p>
            <div className=""></div>
            <p className="last-updated">last updated 22-8-2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Stock;
