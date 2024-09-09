
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Switch, TextField, Button, Typography, Grid, Box } from '@mui/material';

const generateBotData = () => {
    return {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'Performance ($)',
                data: [1000, 1050, 1020, 1080, 1070, 1100, 1150],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };
};


const Bot = ({ botName }) => {
    const [botActive, setBotActive] = useState(false);
    const [investment, setInvestment] = useState(0);
    const [performanceData] = useState(generateBotData());

    const handleSwitchChange = () => {
        setBotActive(!botActive);
    };

    const handleInvestmentChange = (e) => {
        setInvestment(e.target.value);
    };

    return (
        <Box className="bot-container">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography className="bot-heading">{botName}</Typography>
                    <div className="bot-performance">
                        <Line data={performanceData} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Allocate Money</Typography>
                    <TextField
                        label="Amount ($)"
                        type="number"
                        value={investment}
                        onChange={handleInvestmentChange}
                        fullWidth
                        margin="normal"
                        className="bot-input"
                    />
                    <div className="bot-switch-container">
                        <Typography variant="subtitle1">Turn Bot {botActive ? 'Off' : 'On'}</Typography>
                        <Switch checked={botActive} onChange={handleSwitchChange} />
                    </div>
                    <Button 
                        className="bot-button" 
                        variant="contained" 
                        color="primary" 
                        disabled={!botActive}
                    >
                        {botActive ? 'Bot is Active' : 'Bot is Inactive'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Bot;