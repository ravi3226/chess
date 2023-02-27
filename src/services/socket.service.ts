import { Server } from 'socket.io'
import { Server as HttpServer } from 'http';

export var IO : Server | null = null;

export const connecToSocketIo = async (httpServer: HttpServer) : Promise<Server> => {
    return new Promise((resolve, reject) : void => {
        try {
            const SocketIo : Server = new Server(httpServer);
            IO = SocketIo;

            global.logger.info('Socket server established successfully ✔️');
            resolve(IO);
        } catch(e) {
            reject(e);
        }
    })
}