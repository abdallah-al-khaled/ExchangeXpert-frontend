import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import SolidGauge from 'highcharts/modules/solid-gauge';
import * as ChartModuleMore from 'highcharts/highcharts-more.js';
import HCSoldGauge from 'highcharts/modules/solid-gauge';

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);

const GaugeChart = ({ value = 10 }) => {
    // Basic validation for the value
    const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  
    const gaugeOptions = {
      chart: {
        type: 'solidgauge',
        height: '250px',
      },
      title: null,
      pane: {
        center: ['50%', '85%'],
        size: '150%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#fafafa',
          borderRadius: 5,
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      yAxis: {
        stops: [
          [0.1, '#DF5353'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#55BF3B'], // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70,
        },
        labels: {
          y: 16,
        },
        min: 0,
        max: 100, // Adjust max value as needed
      },
      plotOptions: {
        solidgauge: {
          borderRadius: 3,
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      series: [
        {
          name: 'Technical Analysis',
          data: [safeValue],
          dataLabels: {
            format: '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}</span><br/>' +
              '<span style="font-size:12px;opacity:0.4">Score</span>' +
              '</div>',
          },
          tooltip: {
            valueSuffix: ' Score',
          },
        },
      ],
    };
  
    return (
      <div id="container-gauge">
        <HighchartsReact highcharts={Highcharts} options={gaugeOptions} />
      </div>
    );
  };
  
  export default GaugeChart;