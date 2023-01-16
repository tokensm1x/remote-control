"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws) {
    console.log("connect");
    ws.on("pong", () => {
        ws.isAlive = true;
    });
});
const interval = setInterval(function ping() {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false)
            return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);
wss.on("close", function close() {
    clearInterval(interval);
});
