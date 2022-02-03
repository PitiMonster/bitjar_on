import { io, Socket } from "socket.io-client";

export let socket: Socket;

export const runSocket = () => {
  if (!socket)
    socket = io("http://localhost:8080", {
      reconnectionDelay: 1000,
      reconnection: true,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });
};
export const runEmitter = (eventName: string, data: Object) => {
    socket.emit(eventName, data);
  };
