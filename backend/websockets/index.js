const Server = require("socket.io").Server;
const runSocketsEmitters = require("./emitters").runSockets;

const runSockets = (server) => {
    const io = new Server(server);
    io.on("connection", (socket) => {
        console.log("socket connected");
        runSocketsEmitters(io, socket);
    });
};

module.exports = runSockets;
