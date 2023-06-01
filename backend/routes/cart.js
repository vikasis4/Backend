const express = require('express')
const router = express.Router();
const updateCart = require('../controllers/cart');
const { comman_data } = require('../controllers/comman_data')

router.route('/updateCart').post(updateCart);
router.route('/getComman').get(comman_data);

module.exports = router 