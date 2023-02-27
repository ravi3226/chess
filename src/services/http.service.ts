import { createServer, Server } from "http";
import express from 'express';
import { serverConfig } from "../config/server.config.js";

export var httpServer: Server | null = null;

export const connectHttpServer = async () : Promise<Server> => {
    return new Promise((resolve, reject) => {
        try {
            const app = express();
            const httpServerI: Server = createServer(app);
            httpServer = httpServerI;

            httpServer.listen(serverConfig.port);
            global.logger.info('Http server established successfully ✔️')
            resolve(httpServer);
        } catch(e) {
            reject(e);
        }
    })
}