
function TopContainerListItem({ symbol="MSFT",price="100",change="1.00" }) {
  return (
    <div className="list-item flex row">
      <div className="flex">
        <img
          src={`https://assets.parqet.com/logos/symbol/${symbol}?format=png`}
          alt={symbol}
          width={50}
          style={{ margin: -5 }}
        />
        <div className="flex column stock-name">
          <span className="companyName">Microsoft Corp</span>
          <span className="symbol">{symbol}</span>
        </div>
      </div>
      <div className="price flex column">
        <span>${price}</span>
        <span className="green">+{change}%</span>
      </div>
    </div>
  );
}
export default TopContainerListItem;
