const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const socketIo = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

// Function to establish a WebSocket connection to Binance
const connectToBinanceWebSocket = (symbol, interval, clientSocket) => {
    const ws = new WebSocket(`${BINANCE_WS_URL}/${symbol}@kline_${interval}`);

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        if (message.k.x) { // Process only closed candles
            const candlestick = {
                x: message.k.t, // timestamp
                o: message.k.o, // open
                h: message.k.h, // high
                l: message.k.l, // low
                c: message.k.c  // close
            };
            // Send candlestick data to the frontend
            clientSocket.emit('candlestick', candlestick);
        }
    });

    // Close the WebSocket when the client disconnects
    clientSocket.on('disconnect', () => {
        ws.close();
    });
};

// Handle WebSocket connections from the client
io.on('connection', (clientSocket) => {
    console.log('Client connected');
    
    clientSocket.on('subscribe', ({ symbol, interval }) => {
        connectToBinanceWebSocket(symbol, interval, clientSocket);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
