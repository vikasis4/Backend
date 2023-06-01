const express = require('express')
const router = express.Router();
const { fcm, save_fcm, new_msg } = require('../controllers/fcm')

router.route('/fcm_notify').post(fcm);
router.route('/fcm_token').post(save_fcm);
router.route('/fcm_new_msg').post(new_msg);

module.exports = router 