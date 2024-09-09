import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Grid, Box, Typography, Switch } from '@mui/material';
import '../assets/css/tradingbot.css'; // Link to your CSS file for custom styling

// Sample data for the performance chart
const generateChartData = () => {
    return {
        labels: ['Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023'],
        datasets: [
            {
                label: 'Profit over time',
                data: [4000, 4200, 4300, 4500],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };
};

const TradingBot  = ({ botName }) => {

};

export default TradingBot;
