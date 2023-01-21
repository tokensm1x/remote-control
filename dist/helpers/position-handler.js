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
exports.checkCoordinates = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
function checkCoordinates(x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        const screenWidth = yield nut_js_1.screen.width();
        const screenHeight = yield nut_js_1.screen.height();
        if (x < 0 || y < 0 || x > screenWidth || y > screenHeight) {
            nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            throw Error("Incorrect coordinates");
        }
    });
}
exports.checkCoordinates = checkCoordinates;
