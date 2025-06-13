// import socketIO from 'socket.io-client'

// let client;

// export const connectSocket = () => {
//     // @ts-ignore
// client = socketIO.connect('https://webchat-dopi.onrender');
// console.log('подкл')
// }
// const getSocketClient = () => client;
// export default getSocketClient;

import { io, Socket } from 'socket.io-client';

let client: Socket | null = null;

export const connectSocket = (): void => {
<<<<<<< HEAD
    client = io('https://webchat-dopi.onrender.com');
=======
    client = io('https://webchat-dopi.onrender');
>>>>>>> temp-branch
    console.log('подкл');
}

const getSocketClient = (): Socket | null => client;

export default getSocketClient;