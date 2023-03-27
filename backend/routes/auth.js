const register = require('../controllers/register')
const express = require('express')
const router = express.Router();

router.route('/register').get(register);

module.exports = router 