const { Router } = require('express');
const login = require('./controllers/login');
const Register = require('./controllers/register');
const getComData = require('./controllers/getComData');
const home = require('./controllers/home');
const apiRouter = new Router();

apiRouter.post('/login', login);
apiRouter.post('/register', Register);
apiRouter.get('/com_data', getComData);



exports.apiRouter = apiRouter;
