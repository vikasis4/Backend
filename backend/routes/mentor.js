const express = require('express')
const router = express.Router();
const { createAccount, LoginAccount, VerifyToken } = require('../controllers/mentor')

router.route('/create-account').post(createAccount);
router.route('/login-account').post(LoginAccount);
router.route('/verify-account').post(VerifyToken);


module.exports = router 