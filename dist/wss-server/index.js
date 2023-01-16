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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const ws_1 = require("ws");
const app_1 = require("../app/app");
const WSS_PORT = +process.env.WSS_PORT || 8080;
exports.wss = new ws_1.WebSocketServer({ port: WSS_PORT });
const remoteControl = new app_1.RemoteControl();
const interval = setInterval(function ping() {
    exports.wss.clients.forEach((ws) => {
        if (!ws.isAlive)
            return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);
const readData = (duplex) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, duplex_1 = __asyncValues(duplex), duplex_1_1; duplex_1_1 = yield duplex_1.next(), _a = duplex_1_1.done, !_a;) {
                _c = duplex_1_1.value;
                _d = false;
                try {
                    let chunk = _c;
                    const [command, ...params] = chunk.split(" ");
                    const [x, y] = params.map(Number);
                    if (remoteControl[command]) {
                        const result = yield remoteControl[command](command, x, y);
                        duplex.write(`${result}`);
                    }
                    else {
                        console.log(command);
                    }
                    try {
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = duplex_1.return)) yield _b.call(duplex_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
};
exports.wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    const duplex = (0, ws_1.createWebSocketStream)(ws, {
        encoding: "utf8",
        decodeStrings: false,
    }).setMaxListeners(0);
    ws.on("close", () => {
        duplex.destroy();
    });
    ws.isAlive = true;
    ws.on("pong", () => {
        ws.isAlive = true;
    });
    duplex.on("readable", readData(duplex));
}));
exports.wss.on("close", () => {
    clearInterval(interval);
});
