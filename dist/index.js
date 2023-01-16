"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./app-server/index");
require("dotenv/config");
require("./wss-server/index");
const APP_PORT = +process.env.APP_PORT || 3000;
const WSS_PORT = +process.env.WSS_PORT || 8080;
console.log(APP_PORT);
console.log(WSS_PORT);
index_1.httpServer.listen(APP_PORT, () => {
    console.log(`App Server running at http://localhost:${APP_PORT}/`);
});
