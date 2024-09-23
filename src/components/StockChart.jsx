import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StockChart = ({ stockData, stockSymbols }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = Highcharts.chart(chartRef.current, {
        chart: {
          type: 'area'
        },
        title: {
          text: 'Stock Prices Over Time',
          align: 'left'
        },
        subtitle: {
          text: 'Source: API',
          align: 'left'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        },
        yAxis: [{
          title: {
            text: 'Closing Price'
          },
        }],
        plotOptions: {
          series: {
            animation: {
              duration: 1000
            },
            marker: {
              enabled: false
            },
            lineWidth: 2
          }
        },
        series: stockData.map((data, index) => ({
          name: stockSymbols[index],
          data: data, // Data should be in the format of [[timestamp, closingPrice], ...]
          yAxis: 0
        })),
        responsive: {
          rules: [{
            condition: {
              maxWidth: 100,
              maxHeight: 100
            },
            chartOptions: {
              yAxis: [{
                tickAmount: 2,
                title: {
                  x: 15,
                  reserveSpace: false
                }
              }]
            }
          }]
        }
      });

      return () => {
        chart.destroy();
      };
    }
  }, [stockData, stockSymbols]);

  return (
    <div ref={chartRef}></div>
  );
};

export default StockChart;
