"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_server_1 = require("./http-server");
require("dotenv/config");
const ws_server_1 = require("./ws-server");
const APP_PORT = +process.env.APP_PORT || 3000;
http_server_1.httpServer.listen(APP_PORT, () => {
    console.log(`App Server running at http://localhost:${APP_PORT}/`);
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    http_server_1.httpServer.close();
    ws_server_1.wss.close();
    process.exit();
}));
