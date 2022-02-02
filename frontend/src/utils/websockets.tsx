import { io, Socket } from "socket.io-client";

export let socket: Socket;

export const runSocket = () => {
  if (!socket)
    socket = io("http://192.168.1.237:4000", {
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
