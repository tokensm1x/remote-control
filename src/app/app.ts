import { mouse, left, right, down, up, Button } from "@nut-tree/nut-js";

export class RemoteControl {
    constructor() {}

    async mouse_left(command: string, px: number): Promise<string> {
        await mouse.move(left(px));
        return command;
    }

    async mouse_right(command: string, px: number): Promise<string> {
        await mouse.move(right(px));
        return command;
    }

    async mouse_down(command: string, px: number): Promise<string> {
        await mouse.move(down(px));
        return command;
    }

    async mouse_up(command: string, px: number): Promise<string> {
        await mouse.move(up(px));
        return command;
    }

    async mouse_position(command: string): Promise<string> {
        const position = await mouse.getPosition();
        return command + ` ${position.x},${position.y}`;
    }

    async draw_square(command: string, px: number): Promise<string> {
        await mouse.pressButton(Button.LEFT);
        await mouse.move(right(px));
        await mouse.move(down(px));
        await mouse.move(left(px));
        await mouse.move(up(px));
        await mouse.releaseButton(Button.LEFT);
        return command;
    }

    async draw_rectangle(command: string, px: number, py: number): Promise<string> {
        await mouse.pressButton(Button.LEFT);
        await mouse.move(right(px));
        await mouse.move(down(py));
        await mouse.move(left(px));
        await mouse.move(up(py));
        await mouse.releaseButton(Button.LEFT);
        return command;
    }

    // async draw_circle(command, px, py) {
    //     console.log(px, py);
    //     await mouse.pressButton(0);
    //     await mouse.move(right(px));
    //     await mouse.move(down(py));
    //     await mouse.move(left(px));
    //     await mouse.move(up(py));
    //     await mouse.releaseButton(0);
    //     return command;
    // }
}
