const axios = require('axios');
const getComList = require('./getComData');
const config = require('./config');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports = async (req, res) => {
    console.log('home');
    return res.end('<hi>home page</hi>')
};
