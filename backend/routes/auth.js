const register = require('../controllers/register')
const OTP = require('../controllers/otp')
const login = require('../controllers/login')
const verify = require('../controllers/verify')
const resend = require('../controllers/resend')
const { generateToken } = require('../controllers/agora')
const express = require('express')
const router = express.Router();


router.route('/register').post(register);
router.route('/otp/verify').post(OTP);
router.route('/login').post(login);
router.route('/token/verify').get(verify);
router.route('/otp/resend').post(resend);
router.route('/agora/token').post(generateToken);

module.exports = router 