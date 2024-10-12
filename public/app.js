const socket = io(); // Connect to the server

const cryptoSelector = document.getElementById('cryptoSelector');
const intervalSelector = document.getElementById('intervalSelector');
const chartElement = document.getElementById('chart').getContext('2d');

// Object to store candlestick data for each coin
let candlestickDataStore = {};

// Chart.js instance
let chartInstance;

// Function to create a candlestick chart
const createChart = (data, label) => {
    chartInstance = new Chart(chartElement, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: label,
                data: data
            }]
        },
        options: {
            responsive: true
        }
    });
};

// Function to update the chart with new candlestick data
const updateChart = (candlestick) => {
    if (chartInstance) {
        chartInstance.data.datasets[0].data.push(candlestick);
        chartInstance.update();
    }
};

// Function to handle chart updates and storage when switching coins
const switchCoin = () => {
    const selectedCoin = cryptoSelector.value;
    const selectedInterval = intervalSelector.value;

    // Save current chart data for the active coin
    if (chartInstance) {
        candlestickDataStore[`${cryptoSelector.value}_${intervalSelector.value}`] = chartInstance.data.datasets[0].data;
    }

    // Destroy the previous chart before switching
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Check if we have previous data stored for this coin and interval
    const storedData = candlestickDataStore[`${selectedCoin}_${selectedInterval}`];
    const chartLabel = `${cryptoSelector.options[cryptoSelector.selectedIndex].text} - ${intervalSelector.value} Interval`;

    if (storedData) {
        // If there is stored data, use it to initialize the chart
        createChart(storedData, chartLabel);
    } else {
        // No stored data, create an empty chart
        createChart([], chartLabel);
    }

    // Subscribe to new WebSocket data for the selected coin and interval
    socket.emit('subscribe', { symbol: selectedCoin, interval: selectedInterval });
};

// Listen for candlestick data from the server and update the chart
socket.on('candlestick', (candlestick) => {
    // Update the chart with the received candlestick data
    updateChart(candlestick);

    // Store the updated data in memory
    const selectedCoin = cryptoSelector.value;
    const selectedInterval = intervalSelector.value;
    if (!candlestickDataStore[`${selectedCoin}_${selectedInterval}`]) {
        candlestickDataStore[`${selectedCoin}_${selectedInterval}`] = [];
    }
    candlestickDataStore[`${selectedCoin}_${selectedInterval}`].push(candlestick);
});

// In switchCoin function after updating the chart:
localStorage.setItem(`chartData-<span class="math-inline">\{selectedCoin\}\_</span>{selectedInterval}`, JSON.stringify(candlestickDataStore[`<span class="math-inline">\{selectedCoin\}\_</span>{selectedInterval}`]));

// In window.onload function:
const storedData = JSON.parse(localStorage.getItem(`chartData-<span class="math-inline">\{cryptoSelector\.value\}\_</span>{intervalSelector.value}`));
if (storedData) {
    candlestickDataStore[`<span class="math-inline">\{cryptoSelector\.value\}\_</span>{intervalSelector.value}`] = storedData;
    createChart(storedData, chartLabel);
}


// Event listeners for cryptocurrency and interval selection
cryptoSelector.addEventListener('change', switchCoin);
intervalSelector.addEventListener('change', switchCoin);

// Initialize chart with the default cryptocurrency and interval on page load
window.onload = () => {
    switchCoin(); // Default chart setup
};
