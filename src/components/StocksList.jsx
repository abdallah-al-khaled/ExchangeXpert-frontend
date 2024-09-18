import { useEffect, useState } from "react";
import "../assets/css/stockslist.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function StocksList({
  symbol = "MSFT",
  price = "123.45",
  volume = "12345",
  sentiment = 60,
  Security = "",
}) 
{
  const [sentimentScore, setSentimentScore] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 3); 
        const startDate = yesterday.toISOString().split("T")[0];

        const response = await axios.get(
          `https://data.alpaca.markets/v2/stocks/${symbol}/bars`,
          {
            params: {
              timeframe: "5Min", 
              start: `${startDate}`,
              limit: 1000, 
              feed: "iex",
            },
            headers: {
              "APCA-API-KEY-ID": process.env.REACT_APP_APCA_API_KEY_ID,
              "APCA-API-SECRET-KEY": process.env.REACT_APP_APCA_API_SECRET_KEY,
              accept: "application/json",
            },
          }
        );
        const bars = response.data.bars;
        // Extract closing prices from the data and update state
        const closingPrices = bars.map((bar) => bar.c);
        setData(closingPrices);
        return response.data.bars;
      } catch (error) {
        console.error("Error fetching stock data from Alpaca:", error);
        return [];
      }
    };
    getData();

    const getSentimentScore = async () => {
      const {data} = await axios.get(`http://127.0.0.1:8000/api/sentiment-analysis/${symbol}`)
      setSentimentScore(Math.floor((parseFloat(data.sentiment_score) + 1) * 50))
      console.log((data))
      return data.sentiment_score
    };
    getSentimentScore()
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Stock/${symbol}`);
  }

  const options = {
    chart: {
      type: "bar",
      height: 35,
      width: 250,
    },
    title: {
      text: "",
    },
    plotOptions: {
      bar: {
        headSize: 6,
        stacking: "normal",
        dataLabels: {
          enabled: false,
          y: 20,
          verticalAlign: "bottom",
        },
        negativeColor: "rgb(255, 7, 77)",
        color: "rgb(1, 127, 250)",
        accessibility: {
          exposeAsGroupOnly: true,
        },
      },
    },
    tooltip: {
      format:
        '<span style="color:{point.color}">\u25CF</span> <b>{series.name}: {point.y}</b>',
    },

    yAxis: {
      reversedStacks: false,
      opposite: true,
      labels: {
        enabled: false,
      },
      title: "",
      stackLabels: {
        enabled: false,
        verticalAlign: "top",
        style: {
          fontSize: "1em",
        },
      },
      startOnTick: false,
      endOnTick: false,
    },
    xAxis: {
      visible: false,
      title: "",
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Positive Forces",
        data: [sentimentScore], // 60% for positive force
      },
      {
        name: "Negative Forces",
        data: [sentimentScore - 100], // -40% for negative force
      },
    ],
  };

  return (
    <>
      <div className="single-stock flex row" onClick={handleClick}>
        <div className="flex row logo-list">
          <img
            // src={`https://assets.parqet.com/logos/symbol/${symbol}?format=png`}
            src={`https://assets.parqet.com/logos/symbol/${symbol}?format=jpg`}
            alt={symbol}
            width={50}
          />
          <div className="flex column security">
            <p>{Security}</p>
            <p className="symbol">{symbol}</p>
          </div>
        </div>

        <div className="price">
          <p>Price</p>
          <p>{price}</p>
        </div>

        <div className="volume">
          <p>Volume</p>
          <p>{volume}</p>
        </div>
        <div className="chart flex">
          {/* <ReactApexChart options={options} series={options.series} type="area" height={60}/> */}
          {sentimentScore && sentimentScore > 0 ? (
            <Sparklines data={data}>
              <SparklinesLine color="#52B4FF" style={{ strokeWidth: 3 }} />
            </Sparklines>
          ): null}
          
        </div>
        <div className="flex column sentiment-analysis">
          <p className="sentiment-text">Sentiment</p>
          <p
            className={`buy-or-sell ${
              sentimentScore > 70 ? "blue" : sentimentScore < 30 ? "red" : "green"
            }`}
          >
            {sentimentScore > 70
              ? "Positive"
              : sentimentScore < 30
              ? "Negative"
              : "Neutral"}
          </p>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <p className="date">Based on data from 11-8-2024</p>
        </div>
      </div>
    </>
  );
}
export default StocksList;
