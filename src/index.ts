import { httpServer } from "./app-server/index";
import { mouse } from "@nut-tree/nut-js";
import "dotenv/config";
import "./wss-server/index";

const APP_PORT = +process.env.APP_PORT || 3000;

httpServer.listen(APP_PORT, () => {
    console.log(`App Server running at http://localhost:${APP_PORT}/`);
});

process.on("SIGINT", async () => {
    httpServer.close();
    process.exit();
});
