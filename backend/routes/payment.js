const express = require('express')
const router = express.Router();
const payment_init = require('../controllers/payment_init')
const { paymentHandler, Payu_Handler } = require('../controllers/payment_handle')
const { handleReferrals, withDraw } = require('../controllers/referal')

router.route('/referral').post(handleReferrals);
router.route('/withDraw').post(withDraw);
router.route('/request').post(payment_init);
router.route('/handle').post(paymentHandler);
router.route('/payu/success').post(Payu_Handler);
router.route('/payu/failure').post(Payu_Handler);

module.exports = router 