const express = require('express')
const router = express.Router();
const products_info = require('../controllers/products_info')

router.route('/fetch').get(products_info);

module.exports = router 