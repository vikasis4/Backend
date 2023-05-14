const express = require('express')
const router = express.Router();
const {fcm, save_fcm} = require('../controllers/fcm')

router.route('/fcm_notify').post(fcm);
router.route('/fcm_token').post(save_fcm);

module.exports = router 