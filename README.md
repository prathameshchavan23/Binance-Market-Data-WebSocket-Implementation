
# Binance Market Data WebSocket Implementation


This project displays live candlestick charts for selected cryptocurrencies using the Binance WebSocket API. Users can switch between different coins and time intervals while persisting the data and receiving real-time updates.





## Features



- Real-time Candlestick Chart: Displays a live chart using WebSocket data from Binance for ETH/USDT, BNB/USDT, and DOT/USDT pairs.

- Toggle Between Coins: Allows switching between ETH/USDT, BNB/USDT, and DOT/USDT with data persistence for each coin.

- Time Interval Selection: Users can choose between 1-minute, 3-minute, and 5-minute intervals for candlestick data.

- Data Persistence: Previous candlestick data is maintained in memory or local storage when toggling between coins.

- Modular Code: Codebase is organized for easy future modifications and additions.
## Tech Stack

- Backend: Node.js with WebSocket for server-side data processing

- Frontend: HTML5, CSS3, JavaScript (with Chart.js for rendering charts)

- Real-Time Data: Binance WebSocket API


## Getting Started

Make sure you have the following installed:

- Node.js

- npm (comes with Node.js)



## Contributions 

1. Clone the repository:

```bash
git clone https://github.com/your-username/crypto-candlestick-chart.git
cd crypto-candlestick-chart
```

2.Install dependencies:

```bash
npm install
```

3. Start the Server

```bash
npm start
```
4. Open your browser and navigate to:

```bash
http://localhost:3000
```

## Usage

1. On page load, the default candlestick chart for ETH/USDT with a 1-minute interval will be displayed.

2. Use the dropdown menus to select different cryptocurrencies and intervals.

3. The chart will update in real-time with candlestick data for the selected coin.

4. Switch between coins and intervals while maintaining previously fetched data.



## How it Works

1. The backend ```(server.js)``` connects to the Binance WebSocket API to fetch live candlestick data.

2. The client-side ```(app.js)``` listens for updates and renders the candlestick chart using Chart.js.

3. Candlestick data for each cryptocurrency and interval is stored in memory, ensuring that previously fetched data is maintained when switching between coins.

## Future Enhancements


- Add more cryptocurrency pairs to the toggle menu.
Implement local storage for data persistence between sessions.

- Add more chart customization options (colors, time frames, etc.).

- Add historical data fetching to load charts with a complete data range on page load.





## License
This project is licensed under the MIT License - see the LICENSE file for details.


