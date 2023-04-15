const express = require('express')
const router = express.Router();
const { createAccount, LoginAccount, VerifyToken, FetchData } = require('../controllers/mentor')

router.route('/create-account').post(createAccount);
router.route('/login-account').post(LoginAccount);
router.route('/verify-account').post(VerifyToken);
router.route('/fetch-data').post(FetchData);


module.exports = router 