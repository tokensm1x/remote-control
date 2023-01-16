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
exports.RemoteControl = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
class RemoteControl {
    constructor() { }
    mouse_left(command, px) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nut_js_1.mouse.move((0, nut_js_1.left)(px));
            return command;
        });
    }
    mouse_right(command, px) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nut_js_1.mouse.move((0, nut_js_1.right)(px));
            return command;
        });
    }
    mouse_down(command, px) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nut_js_1.mouse.move((0, nut_js_1.down)(px));
            return command;
        });
    }
    mouse_up(command, px) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nut_js_1.mouse.move((0, nut_js_1.up)(px));
            return command;
        });
    }
    mouse_position(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const position = yield nut_js_1.mouse.getPosition();
            return command + ` ${position.x},${position.y}`;
        });
    }
    draw_square(command, px) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
            yield nut_js_1.mouse.move((0, nut_js_1.right)(px));
            yield nut_js_1.mouse.move((0, nut_js_1.down)(px));
            yield nut_js_1.mouse.move((0, nut_js_1.left)(px));
            yield nut_js_1.mouse.move((0, nut_js_1.up)(px));
            yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            return command;
        });
    }
    draw_rectangle(command, px, py) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
            yield nut_js_1.mouse.move((0, nut_js_1.right)(px));
            yield nut_js_1.mouse.move((0, nut_js_1.down)(py));
            yield nut_js_1.mouse.move((0, nut_js_1.left)(px));
            yield nut_js_1.mouse.move((0, nut_js_1.up)(py));
            yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            return command;
        });
    }
}
exports.RemoteControl = RemoteControl;
