"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
exports.httpServer = http_1.default.createServer(function (req, res) {
    const __dirname = path_1.default.resolve(path_1.default.dirname(""));
    const file_path = __dirname + (req.url === "/" ? "/front/index.html" : "/front" + req.url);
    fs_1.default.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});
