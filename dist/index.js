import * as PinoLogger from 'pino';
import { connectToRedis } from './services/redis.service.js';
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
    connectHttpServer().then((httpServer) => {
        connecToSocketIo(httpServer).then((IO) => {
            IO.on(socketEvents.Connection, async (socket) => await SocketHanlder(IO, socket));
        }).catch((e) => {
            logger.error(e);
        });
    }).catch((e) => {
        logger.error(e);
    });
}).catch((e) => {
    logger.error(e.message);
});
//# sourceMappingURL=index.js.map