import { useEffect, useState } from "react";
import AccountHistoryChart from "../components/AccountHistoryChart";
import Topbar from "../components/Topbar";
import TopNav from "../components/TopNav";
import axios from "axios";
import TopContainerListItem from "../components/TopContainerListItem";

function Wallet() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState({});
  const [companies, setCompanies] = useState({});

  // Fetch open positions
  useEffect(() => {
    const fetchOpenPositions = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/open-positions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setPositions(response.data);
        setLoading(true);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching open positions:", error);
      }

      const companiesData = await fetch("/sp500_companies.json");
      const companiesJson = await companiesData.json();
      setCompanies(companiesJson);
    };

    fetchOpenPositions();
  }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      if (positions.length === 0) {
        return;
      }
      const stockSymbols = [
        ...new Set([...positions.map((position) => position.symbol)]),
      ];

      const d = new Date();
      d.setDate(d.getDate() - 5);

      const response = await axios.get(
        "https://data.alpaca.markets/v2/stocks/bars",
        {
          params: {
            symbols: stockSymbols.join(","),
            timeframe: "1D",
            start: d.toISOString(),
            adjustment: "raw",
            feed: "sip",
            sort: "asc",
            limit: 10000,
          },
          headers: {
            "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
            "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
            accept: "application/json",
          },
        }
      );
      console.log("from slice hhhhhhhhhhhhhhhhh");
      console.log(response.data.bars);
      setStocks(response.data.bars);
    };
    fetchStockData();
  }, [positions]);

  return (
    <div className="main-content">
      <TopNav />
      <div className="page">
        <div className="topbar-container">
          <div className="Best-stocks">
            <h2>Best Stocks</h2>
          </div>
          <div className="stock-list-top-bar ">
            <Topbar symbol="NVDA" />
            <Topbar symbol="TSLA" />
            <Topbar symbol="AMD" />
            <Topbar symbol="META" />
            <Topbar symbol="AAPL" />
            <Topbar symbol="MSFT" />
          </div>
        </div>
        <div className="viewchart flex row">
          <AccountHistoryChart />
          <div className="trending-up">
            <div className="top-active stocks-container">
              <p className="trending">Open Positions</p>
              {loading ? (
                positions.length > 0 ? (
                  positions.map((position, index) => (
                    <TopContainerListItem
                      key={index}
                      symbol={position.symbol}
                      data={stocks[position.symbol]}
                      Security={companies[position.symbol]}
                    />
                  ))
                ) : (
                  <p>No open positions available</p>
                )
              ) : (
                <p>Loading positions...</p>
              )}
              <TopContainerListItem
                symbol={"NVDA"}
                data={[{ c: 117.06 }, { c: 116.0 }]}
                price="100"
                Security={"NVIDIA Corp"}
              />
              <TopContainerListItem
                symbol={"GOOGL"}
                data={[{ c: 163.50 }, { c: 163.59 }]}
                price="100"
                Security={"Alphabet Inc"}
              /><TopContainerListItem
              symbol={"META"}
              data={[{ c: 560.00 }, { c: 561.35 }]}
              price="100"
              Security={"NVIDIA Corp"}
            /><TopContainerListItem
            symbol={"UBER"}
            data={[{ c: 74.82 }, { c: 73.94 }]}
            price="100"
            Security={"NVIDIA Corp"}
          />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Wallet;
