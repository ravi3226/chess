export const getConnectedSocketIds = (IO, exept) => {
    return Array.from(IO.sockets.adapter.sids.keys()).filter(id => id != exept);
};
//# sourceMappingURL=socket.helpers.js.map