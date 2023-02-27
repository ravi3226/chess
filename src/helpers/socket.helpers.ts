import { Server } from 'socket.io';

export const getConnectedSocketIds = (IO: Server, exept) : string[] => {
    return Array.from(IO.sockets.adapter.sids.keys()).filter(id => id != exept);
}