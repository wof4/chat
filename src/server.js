const express = require('express');
var path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const http = require('http');
const startSocket = require('./socket')
const server = http.Server(app);

require('dotenv').config();
const config = require('config')
const mongoose = require('mongoose');
const cors = require('cors')
const { apiRouter } = require('./routers.js');

const PORT = process.env.PORT || config.get("port");

app.use(express.static(path.join(__dirname, './build')));

app.use(cors({
  methods: "GET,POST,DELETE",
  allowedHeaders: ['Content-Type'],
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(cookieParser())
app.use('/api', apiRouter);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri", {
      useNewUrlParser: true,
      useUnifieTopologi: true,
      useCreateIndex: true
    }))
    startSocket(server);

    server.listen(PORT, () => {
      console.log(`Server has been started on ${PORT} port...`);
    });

  } catch (e) {
    console.log('something went wrong when starting the server')
    process.exit(1)
  }
};

start();

