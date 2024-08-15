// import socketIO from 'socket.io-client'

// let client;

// export const connectSocket = () => {
//     // @ts-ignore
// client = socketIO.connect('http://localhost:5000');
// console.log('подкл')
// }
// const getSocketClient = () => client;
// export default getSocketClient;

import { io, Socket } from 'socket.io-client';

let client: Socket | null = null;

export const connectSocket = (): void => {
    client = io('http://localhost:5000');
    console.log('подкл');
}

const getSocketClient = (): Socket | null => client;

export default getSocketClient;