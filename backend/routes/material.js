const express = require('express')
const router = express.Router();
const {getMaterial} = require('../controllers/material');

router.route('/mat').get(getMaterial);

module.exports = router 