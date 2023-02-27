import { gamehandler } from './game.handler.js';
const eventHanlders = {
    'game:join': (IO, socket, payload) => gamehandler(IO, socket, payload)
};
export const SocketHanlder = (IO, socket) => {
    socket.onAny((eventName, payload) => {
        eventHanlders[eventName] ? eventHanlders[eventName](IO, socket, payload) : socket.emit('wrong', { msg: 'wrong event-name.' });
    });
};
//# sourceMappingURL=index.handler.js.map