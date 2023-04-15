const express = require('express')
const router = express.Router();
const {products_info, dbBackUp} = require('../controllers/products_info')
const dotenv = require('dotenv');
dotenv.config();

router.route('/fetch').get(products_info);
router.route(`/db/backup/${process.env.dbPin}`).get(dbBackUp);

module.exports = router 