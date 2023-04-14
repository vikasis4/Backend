const express = require('express')
const router = express.Router();
const payment_init = require('../controllers/payment_init')
const {payment_failed, payment_success} = require('../controllers/payment_handle')

router.route('/request').post(payment_init);
router.route('/success').post(payment_success);
router.route('/failure').get(payment_failed);

module.exports = router 