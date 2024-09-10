import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function TopContainerListItem({ symbol="MSFT",price="100",change="1.00", data=[1,2]}) {
  const length = data.length
  // const price_change = ((price-data[length-1])/data[length-1])*100
  let price_change = data[length-1].c-data[length-2].c
  price = data[length-1].c
  let price_change_percent = (price_change/data[length-2].c)*100
  price_change_percent = Number((price_change_percent).toFixed(2))

  price_change = Number((price_change).toFixed(2))
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Stock/${symbol}`);
  }
  return (
    <div className="list-item flex row" onClick={handleClick}>
      <div className="flex item">
        <img
          src={`https://assets.parqet.com/logos/symbol/${symbol}?format=png`}
          alt={symbol}
          width={50}
          style={{ margin: -0 }}
        />
        <div className="flex column stock-name">
          <span className="companyName">Microsoft Corp</span>
          <span className="symbol">{symbol}</span>
        </div>
      </div>
      <div className="price flex column">
        <span>${price}</span>
        <span className={`${price_change>0?"green":"red"}`}>{price_change>0?"+":""}({price_change}) {price_change_percent<0?price_change_percent*-1:price_change_percent}%</span>
      </div>
    </div>
  );
}
export default TopContainerListItem;
