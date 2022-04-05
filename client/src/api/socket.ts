import io from 'socket.io-client';


const baseProd = 'https://no-name-chat.herokuapp.com';
const baseDev = 'http://localhost:3001'

const env = (process.env.NODE_ENV === "development") ? baseDev : baseProd

const socket = io(env, { transports: ['websocket', 'polling', 'flashsocket'] });

export default socket;
