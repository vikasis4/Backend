const express = require('express')
const router = express.Router();
const { createAccount, LoginAccount, VerifyToken } = require('../controllers/mentor_Auth')
const { UpdateSatus, handleNotes, fetchNotes } = require('../controllers/mentor_Misc')

router.route('/create-account').post(createAccount);
router.route('/login-account').post(LoginAccount);
router.route('/verify-account').post(VerifyToken);

router.route('/status_update').post(UpdateSatus);
router.route('/send_note').post(handleNotes);
router.route('/fetch_note').post(fetchNotes);


module.exports = router 