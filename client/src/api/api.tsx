import Axios from 'axios';

const baseProd = 'https://no-name-chat.herokuapp.com/api/';
const baseDev = 'http://localhost:3001/api/'

const instance = Axios.create({
  baseURL: process.env.NODE_ENV === "development" ? baseDev : baseProd,

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,

});

export default instance;
