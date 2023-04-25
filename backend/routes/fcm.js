const express = require('express')
const router = express.Router();
const fcm = require('../controllers/fcm')

router.route('/fcm_notify').post(fcm);

module.exports = router 