
const axios = require('axios').default;
const instance = axios.create({
  // baseURL: 'http://localhost:3000/api/',
  baseURL: 'https://no-name-chat.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = instance;
