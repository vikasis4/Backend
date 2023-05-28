const express = require('express')
const router = express.Router();
const { startPay } = require('../CCavenue/run_node')


router.route('/pay/:id').get(startPay);

module.exports = router 