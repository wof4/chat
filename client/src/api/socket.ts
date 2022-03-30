import io from 'socket.io-client';

const production = 'https://no-name-chat.herokuapp.com';
const dev = 'http://localhost:3001'

const socket = io(production, { transports: ['websocket', 'polling', 'flashsocket'] });

export default socket;
