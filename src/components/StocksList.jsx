import { useEffect } from "react";
import "../assets/css/stockslist.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import ReactApexChart from "react-apexcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';
import { BorderAllRounded } from "@mui/icons-material";
function StocksList({ symbol = "MSFT",price="123.45",volume="12345",sentiment=60,
  data=[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 33, 22, 77, 55, 33, 99,
  55, 33, 65, 36,48,25, 66, 41, 79, 63, 35, 44, 12, 36,]}) {

 const options = {
  chart: {
    type: 'bar',
    height: 35,
    width: 250,
  },
  title: {
    text: '',
  },
  plotOptions: {
    bar: {
      headSize: 6,
      stacking: 'normal',
      dataLabels: {
        enabled: false,
        y: 20,
        verticalAlign: 'bottom',
      },
      negativeColor: 'rgb(255, 7, 77)',
      color: 'rgb(1, 127, 250)',
      accessibility: {
        exposeAsGroupOnly: true,
      },
    },
  },
  tooltip: {
    format: '<span style="color:{point.color}">\u25CF</span> <b>{series.name}: {point.y}</b>',
  },
 
  yAxis: {
    reversedStacks: false,
    opposite: true,
    labels: {
      enabled: false,
    },
    title: '',
    stackLabels: {
      enabled: false,
      verticalAlign: 'top',
      style: {
        fontSize: '1em',
      },
    },
    startOnTick: false,
    endOnTick: false,
  },
  xAxis: {
    visible: false,
    title: '',
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: 'Positive Forces',
      data: [sentiment], // 60% for positive force
    },
    {
      name: 'Negative Forces',
      data: [sentiment-100], // -40% for negative force
    },
  ],
};

  return (
    <>
      <div className="single-stock flex row">
        <div className="flex row logo-list">
          <img
            src={`https://assets.parqet.com/logos/symbol/${symbol}?format=png`}
            alt={symbol}
            width={50}
            
          />
          <div className="flex column">
            <p>Microsoft Corp</p>
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
          
          <Sparklines
            data={data}
          >
            <SparklinesLine color="#52B4FF" style={{ strokeWidth: 3 }} />
          </Sparklines>
        </div>
        <div className="flex column sentiment-analysis">
          <p className="sentiment-text">Sentiment</p>
          <p className={`buy-or-sell ${sentiment>=70?"Buy":"Sell"}`}>{sentiment>=70?"Buy":"Sell"}</p>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <p className="date">Based on data from 11-8-2024</p>
        </div>

      </div>

    </>
  );
}
export default StocksList;
