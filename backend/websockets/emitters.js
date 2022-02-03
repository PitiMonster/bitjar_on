let ioObject;

exports.runSockets = (io, socket) => {
    ioObject = io;

    socket?.on("set unique id", (data) => {
        console.log(data);
        console.log("connect unique id: ", data.uniqueId);
        socket.join(data.uniqueId);
    });
};

exports.emitEvent = (body) => {
    const { eventName, userId, data } = body;
    console.log(userId.toString());
    ioObject?.to(userId.toString()).emit(eventName, data);
};

exports.emitBolt11 = (data) => {
    console.log(data.uniqueId.toString());
    ioObject?.to(data.uniqueId.toString()).emit("payment bolt11", {
        data: data.data,
    });
};
