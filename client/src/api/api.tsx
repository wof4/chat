import Axios from 'axios';


const instance = Axios.create({
  // baseURL: 'http://localhost:3001/api/',
  baseURL: 'https://no-name-chat.herokuapp.com/api/',

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,

});

export default instance;
