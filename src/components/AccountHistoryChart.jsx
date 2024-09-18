import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

function AccountHistoryChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Function to fetch account history data from your API
    const fetchAccountHistory = async () => {
      try {
        // Replace the URL with your backend endpoint that fetches the Alpaca data
        const response = await axios.get("http://127.0.0.1:8000/api/get-portfolio-history", {
          headers : {
            Authorization: 'Bearer ' + localStorage.getItem('authToken'),
          }
        });

        // Assuming the response data is an array of objects with timestamp and equity values
        const { equity, timestamp } = response.data;

        // Format the data to fit Highcharts (timestamp in ms and equity value)
        const formattedData = timestamp.map((time, index) => [new Date(time).getTime(), equity[index]]);
        console.log(response);
        
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching account history:", error);
      }
    };

    fetchAccountHistory(); // Call the API on component mount
  }, []);

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
        data: chartData, // Dynamically populated data
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
