import { createServer } from "http";
import express from 'express';
import { serverConfig } from "../config/server.config.js";
export var httpServer = null;
export const connectHttpServer = async () => {
    return new Promise((resolve, reject) => {
        try {
            const app = express();
            const httpServerI = createServer(app);
            httpServer = httpServerI;
            httpServer.listen(serverConfig.port);
            global.logger.info('Http server established successfully ✔️');
            resolve(httpServer);
        }
        catch (e) {
            reject(e);
        }
    });
};
//# sourceMappingURL=http.service.js.map