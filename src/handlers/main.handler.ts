import {Server, Socket} from 'socket.io'
import { gameJoin } from './game.handler.js';

const eventHanlders = {
    'game:join': async (IO: Server, socket: Socket, payload: any) => await gameJoin(IO, socket, payload)
}

export const SocketHanlder = async (IO: Server, socket: Socket) : Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            socket.onAny(async (eventName: string, payload: any) : Promise<void> => {
                eventHanlders[eventName] ? await eventHanlders[eventName](IO, socket, payload) : socket.emit('wrong', {msg: 'wrong event-name.'});
            })
            resolve();
        } catch(e) {
            reject(e);
        }
    })
}