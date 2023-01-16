import { createWebSocketStream, WebSocketServer } from "ws";
import { IWebSocket } from "../types";
import { IncomingMessage } from "http";

const WSS_PORT = +process.env.WSS_PORT || 8080;
const wss = new WebSocketServer({ port: WSS_PORT });

const interval = setInterval(function ping() {
    wss.clients.forEach((ws: any) => {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

wss.on("connection", async (ws: IWebSocket, req: IncomingMessage) => {
    const duplex = createWebSocketStream(ws, {
        encoding: "utf8",
        decodeStrings: false,
    });
    ws.on("close", () => {
        duplex.destroy();
    });
    ws.isAlive = true;
    ws.on("pong", () => {
        ws.isAlive = true;
    });
    // duplex.on("readable", readable(duplex));
});

wss.on("close", () => {
    clearInterval(interval);
});
