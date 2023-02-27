import * as PinoLogger from 'pino';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io'
import { connectToRedis } from './services/redis.service.js'
import { connectHttpServer } from './services/http.service.js';
import { connecToSocketIo } from './services/socket.service.js';
import { SocketHanlder } from './handlers/main.handler.js';
import { socketEvents } from './config/events.config.js';

/**
 * register logger for development env...
 */
const logger = PinoLogger.pino();
global.logger = logger;


connectToRedis().then(() => {

    connectHttpServer().then((httpServer : HttpServer) => {

        connecToSocketIo(httpServer).then((IO: Server) => {

            IO.on(socketEvents.Connection, async (socket: Socket) => await SocketHanlder(IO, socket));
            
        }).catch((e: Error) : void => {
            logger.error(e);

        })

    }).catch((e: Error) : void  => {
        logger.error(e);

    })

}).catch((e: Error) : void => {
    logger.error(e.message);

});