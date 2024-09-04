import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

function AccountHistoryChart() {
  const [chartData, setChartData] = useState([
    [1262304000000, 0.7537],
    [1262563200000, 0.6951],
    [1262649600000, 0.6925],
    [1262736000000, 0.697],
    [1262822400000, 0.6992],
    [1262908800000, 0.7007],
    [1263168000000, 0.6884],
    [1263254400000, 0.6907],
    [1263340800000, 0.6868],
    [1263427200000, 0.6904],
    [1263513600000, 0.6958],
    [1263772800000, 0.696],
    [1263859200000, 0.7004],
    [1263945600000, 0.7077],
    [1264032000000, 0.7111],
    [1264118400000, 0.7076],
    [1264377600000, 0.7068],
    [1264464000000, 0.7101],
    [1264550400000, 0.7107],
    [1264636800000, 0.7144],
    [1264723200000, 0.7161],
  ]);

  const options = {
    chart: {
      zooming: {
        type: "x",
      },
      height: 500,
      width: 1000,
    },
    title: {
      text: "Account Portfolio History",
      align: "left",
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in",
      align: "left",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Equity",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(199, 113, 243)"],
            [0.7, "rgb(76, 175, 254)"],
          ],
        },
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        type: "area",
        name: "Equity",
        data: chartData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
export default AccountHistoryChart;
