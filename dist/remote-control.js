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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteControl = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const position_handler_1 = require("./helpers/position-handler");
const jimp_1 = __importDefault(require("jimp"));
const print_screen_area_1 = require("./helpers/print-screen-area");
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
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.right)(px));
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.down)(px));
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.left)(px));
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.up)(px));
            yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            return command;
        });
    }
    draw_rectangle(command, px, py) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.right)(px));
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.down)(py));
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.left)(px));
            yield this.releasePressedButton();
            yield nut_js_1.mouse.move((0, nut_js_1.up)(py));
            yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            return command;
        });
    }
    draw_circle(command, px) {
        return __awaiter(this, void 0, void 0, function* () {
            const radius = px;
            const { x, y } = yield nut_js_1.mouse.getPosition();
            yield this.releasePressedButton();
            for (let i = 0; i < 360; i++) {
                const rad = (i / 180) * Math.PI;
                const cx = radius * Math.cos(rad) + x - radius;
                const cy = radius * Math.sin(rad) + y;
                yield (0, position_handler_1.checkCoordinates)(cx, cy);
                yield nut_js_1.mouse.move((0, nut_js_1.straightTo)(new nut_js_1.Point(cx, cy)));
            }
            yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            return command;
        });
    }
    prnt_scrn(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { left, top, width, height } = yield (0, print_screen_area_1.getScreenShotArea)();
            const image = yield (yield nut_js_1.screen.grabRegion(new nut_js_1.Region(left, top, width, height))).toRGB();
            const jimp = new jimp_1.default({
                data: image.data,
                width: image.width,
                height: image.height,
            });
            const base64buffer = yield jimp.getBufferAsync(jimp_1.default.MIME_PNG);
            const base64 = base64buffer.toString("base64");
            return `${command} ${base64}`;
        });
    }
    releasePressedButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
            yield nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
        });
    }
}
exports.RemoteControl = RemoteControl;
