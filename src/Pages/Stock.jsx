import TopContainer from "../components/TopContainer";
import TopNav from "../components/TopNav";
import { useParams } from 'react-router-dom';
import TradeViewChart from "../components/TradeViewChart";
import GaugeChart from "../components/GaugeChart";
function Stock() {
    const { symbol } = useParams();
    console.log(symbol);
  return (
    <div className="main-content">
      <TopNav />
      <div className="page">
        <div className="flex">
        <TradeViewChart symbol={symbol}/>
        <GaugeChart/>
        </div>
      </div>
    </div>
  )
}
export default Stock