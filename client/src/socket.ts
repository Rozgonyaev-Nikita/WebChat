import socketIO from 'socket.io-client'

// @ts-ignore
const client = socketIO.connect('http://localhost:5000');
console.log('подкл')

export default client;