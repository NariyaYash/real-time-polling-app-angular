
// server.js
const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const port = 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

const frameworks = {
    "0": { votes: 0, label: "react" },
    "1": { votes: 0, label: "Angular"},
    "2": { votes: 0, label: "VueJs" },
    "3": { votes: 0, label: "EmberJs"},
    "4": { votes: 0, label: "Svelte"}
};

io.on("connection", (socket) => {
 
    io.emit("update", frameworks);
 
    socket.on("vote", (index) => {  
        if (frameworks[index]) {
          frameworks[index].votes += 1;
        }
        io.emit("update", frameworks);
    });
});

server.listen(port, () =>
    console.log(`Listening at http://localhost:${port}`)
);