import { Server } from 'socket.io';
export var IO = null;
export const connecToSocketIo = async (httpServer) => {
    return new Promise((resolve, reject) => {
        try {
            const SocketIo = new Server(httpServer);
            IO = SocketIo;
            global.logger.info('Socket server established successfully ✔️');
            resolve(IO);
        }
        catch (e) {
            reject(e);
        }
    });
};
//# sourceMappingURL=socket.service.js.map