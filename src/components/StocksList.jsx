import { useEffect } from "react";
import "../assets/css/stockslist.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import ReactApexChart from "react-apexcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';
function StocksList({ symbol = "MSFT" }) {
  // var options = {
  //   series: [
  //     {
  //       data: [
  //         25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 33, 22, 77, 55, 33, 99, 55,
  //         33, 65, 36,
  //       ],
  //     },
  //   ],
  //   chart: {
  //     type: "area",
  //     height: 70,
  //     sparkline: {
  //       enabled: true,
  //     },
  //   },
  //   stroke: {
  //     curve: "straight",
  //   },
  // };



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
      color: 'rgb(255, 7, 77)',
      negativeColor: 'rgb(1, 127, 250)',
      accessibility: {
        exposeAsGroupOnly: true,
      },
    },
  },
  tooltip: {
    format: '<span style="color:{point.color}">\u25CF</span> <b>{series.name}: {point.y}</b>',
  },
  accessibility: {
    typeDescription: 'Stacked bar "force" chart. Positive forces are shown on the right side and negative on the left.',
    series: {
      descriptionFormat: 'Series {add series.index 1} of {chart.series.length}, Name: {series.name}, {#if (gt series.points.0.y 0)}accelerating{else}decelerating{/if} value of {series.points.0.y}.',
    },
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
      data: [60], // 60% for positive force
    },
    {
      name: 'Negative Forces',
      data: [-40], // -40% for negative force
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
            width={80}
          />
          <div className="flex column">
            <p>Microsoft Corp</p>
            <p className="symbol">{symbol}</p>
          </div>
        </div>

        <div className="price">
          <p>Price</p>
          <p>$123.45</p>
        </div>

        <div className="volume">
          <p>Volume</p>
          <p>123,456</p>
        </div>
        <div className="chart flex">
          {/* <ReactApexChart options={options} series={options.series} type="area" height={60}/> */}
          
          <Sparklines
            data={[
              25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 33, 22, 77, 55, 33, 99,
              55, 33, 65, 36,
            ]}
          >
            <SparklinesLine color="#77B900" style={{ strokeWidth: 3 }} />
          </Sparklines>
        </div>
        <div className="flex column sentiment-analysis">
          <p className="sentiment-text">Sentiment</p>
          <p className="buy-or-sell">Sell</p>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <p className="date">Based on data from 11-8-2024</p>
        </div>

      </div>

    </>
  );
}
export default StocksList;
