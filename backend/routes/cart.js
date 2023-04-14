const express = require('express')
const router = express.Router();
const updateCart = require('../controllers/cart');

router.route('/updateCart').post(updateCart);

module.exports = router 