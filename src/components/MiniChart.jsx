import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MiniChart = ({ symbol }) => {
    const [price, setPrice] = useState(null);
    const [changePercentage, setChangePercentage] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchSymbolData = async () => {
            const apiKey = 'ZGSHY8P1ARG7GYXW';
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data['Time Series (5min)']) {
                    const timeSeries = data['Time Series (5min)'];
                    const timeLabels = [];
                    const priceHistory = [];

                    for (let key in timeSeries) {
                        timeLabels.push(key);
                        priceHistory.push(parseFloat(timeSeries[key]['4. close']));
                    }

                    // Reverse to get chronological order
                    timeLabels.reverse();
                    priceHistory.reverse();

                    const latestPrice = priceHistory[priceHistory.length - 1];
                    const previousPrice = priceHistory[0];
                    const change = ((latestPrice - previousPrice) / previousPrice) * 100;

                    setPrice(latestPrice.toFixed(2));
                    setChangePercentage(change.toFixed(2));
                    setChartData({
                        labels: timeLabels.slice(-20),  // Last 20 data points
                        datasets: [{
                            label: 'Price',
                            data: priceHistory.slice(-20),  // Last 20 data points
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            fill: true,
                            tension: 0.4  // Add tension for a smoother line
                        }]
                    });
                } else {
                    console.error("Error fetching data: ", data['Error Message'] || 'No data found');
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchSymbolData();
    }, [symbol]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>{price ? `$${price}` : 'Loading...'}</span>
                <span style={{ color: changePercentage >= 0 ? 'green' : 'red', marginLeft: '10px' }}>
                    {changePercentage ? `${changePercentage}%` : ''}
                </span>
            </div>
            <div style={{ width: '100%', height: '150px' }}>
                {chartData ? (
                    <Line
                        data={chartData}
                        options={{
                            scales: {
                                x: { display: false },
                                y: { display: false }
                            },
                            elements: {
                                point: { radius: 0 }
                            },
                            plugins: {
                                legend: { display: false }
                            }
                        }}
                    />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </div>
    );
};

export default MiniChart;
