const express = require('express');

const {
  postOtpLogin,
  getGoogleRegister,
  postUpdateUserWallet,
  Login,
  getUserWallet,
} = require('../controllers/userController');
const Authenticate = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/otp_registration', postOtpLogin);
router.get('/google_registration', getGoogleRegister);
router.post('/auth', Login);
router.post('/ad-auth', Login);
router.post('/updateuserwallet', Authenticate, postUpdateUserWallet);
router.get('/wallet', Authenticate, getUserWallet);

module.exports = router;