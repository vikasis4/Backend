const express = require('express')
const router = express.Router();
const {get_messages, update_messages} = require('../controllers/chat')

router.route('/get_messages').post(get_messages);
router.route('/post_messages').post(update_messages);

module.exports = router 