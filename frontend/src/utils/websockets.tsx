import { io, Socket } from "socket.io-client";

export let socket: Socket;

export const runSocket = () => {
  if (!socket)
    socket = io("https://thawing-harbor-02998.herokuapp.com/", {
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
