import { gameJoin } from './game.handler.js';
const eventHanlders = {
    'game:join': async (IO, socket, payload) => await gameJoin(IO, socket, payload)
};
export const SocketHanlder = async (IO, socket) => {
    return new Promise((resolve, reject) => {
        try {
            socket.onAny(async (eventName, payload) => {
                eventHanlders[eventName] ? await eventHanlders[eventName](IO, socket, payload) : socket.emit('wrong', { msg: 'wrong event-name.' });
            });
            resolve();
        }
        catch (e) {
            reject(e);
        }
    });
};
//# sourceMappingURL=main.handler.js.map